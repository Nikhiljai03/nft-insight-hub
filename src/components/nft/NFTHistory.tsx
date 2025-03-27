
import React from 'react';
import { NFTItem } from '@/services/nftApiService';
import GlassCard from '@/components/ui/GlassCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

// Mock transaction history since our NFT item doesn't have comprehensive history
const generateMockTransactionHistory = (nft: NFTItem) => {
  const history = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);
  
  // Start with price slightly lower than current
  let lastPrice = nft.price * 0.7;
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (i * 18)); // Spread events over ~6 months
    
    // Random price fluctuation
    const priceChange = (Math.random() * 0.2) - 0.05;
    lastPrice = Math.max(0.01, lastPrice * (1 + priceChange));
    
    history.push({
      date: date.toISOString(),
      price: Number(lastPrice.toFixed(3)),
      event: i === 9 && nft.lastSale ? 'Last Sale' : 
             i === 0 ? 'Minted' : 
             i % 3 === 0 ? 'Transfer' : 'Sale'
    });
  }
  
  // Add last sale if available
  if (nft.lastSale) {
    history.push({
      date: nft.lastSale.date,
      price: nft.lastSale.price,
      event: 'Last Sale'
    });
  }
  
  // Sort by date
  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

interface NFTHistoryProps {
  nft: NFTItem;
}

const NFTHistory: React.FC<NFTHistoryProps> = ({ nft }) => {
  const transactionHistory = generateMockTransactionHistory(nft);
  
  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-bold mb-6">NFT History</h3>
      
      <div className="h-80 mb-8">
        <ChartContainer
          config={{
            primary: {
              theme: {
                light: "#8884d8",
                dark: "#8884d8",
              },
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={transactionHistory}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} ETH`, 'Price']}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <h4 className="font-medium mb-3">Transaction History</h4>
      <div className="overflow-auto max-h-80">
        <table className="w-full">
          <thead className="bg-secondary/10">
            <tr>
              <th className="text-left p-3 rounded-tl-lg">Event</th>
              <th className="text-left p-3">Date</th>
              <th className="text-right p-3 rounded-tr-lg">Price</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((transaction, index) => (
              <tr key={index} className="border-b border-secondary/10">
                <td className="p-3">{transaction.event}</td>
                <td className="p-3">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="p-3 text-right">{transaction.price} ETH</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default NFTHistory;
