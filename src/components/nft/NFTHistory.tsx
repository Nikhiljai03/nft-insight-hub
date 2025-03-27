import React, { useState, useEffect } from 'react';
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
  AreaChart,
  ReferenceLine,
  ComposedChart,
  Bar,
  Scatter,
  Legend
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Repeat, TrendingUp, RefreshCw } from 'lucide-react';

const generateMockTransactionHistory = (nft: NFTItem) => {
  const history = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);
  
  let lastPrice = nft.price * 0.7;
  
  for (let i = 0; i < 15; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (i * 12));
    
    const priceChange = (Math.random() * 0.25) - 0.05;
    lastPrice = Math.max(0.01, lastPrice * (1 + priceChange));
    
    const events = ['Sale', 'Transfer', 'Listing', 'Offer', 'Auction'];
    const randomEvent = i === 14 && nft.lastSale ? 'Last Sale' : 
                       i === 0 ? 'Minted' : 
                       events[Math.floor(Math.random() * events.length)];
    
    const volume = randomEvent === 'Sale' || randomEvent === 'Last Sale' ? 
                  Math.round(Math.random() * 4) + 1 : 0;
    
    const sentiment = randomEvent === 'Sale' || randomEvent === 'Last Sale' ? 
                     (priceChange > 0 ? 'Bullish' : priceChange < 0 ? 'Bearish' : 'Neutral') : 'Neutral';
    
    history.push({
      date: date.toISOString(),
      price: Number(lastPrice.toFixed(3)),
      event: randomEvent,
      volume: volume,
      sentiment: sentiment,
      wallet: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      priceChange: priceChange * 100
    });
  }
  
  if (nft.lastSale) {
    history.push({
      date: nft.lastSale.date,
      price: nft.lastSale.price,
      event: 'Last Sale',
      volume: 1,
      sentiment: 'Neutral',
      wallet: nft.owner || `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      priceChange: 0
    });
  }
  
  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

interface NFTHistoryProps {
  nft: NFTItem;
}

const NFTHistory: React.FC<NFTHistoryProps> = ({ nft }) => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [timeRange, setTimeRange] = useState('6m');
  const [chartView, setChartView] = useState('price');
  const [refreshTime, setRefreshTime] = useState(new Date());
  
  useEffect(() => {
    setTransactionHistory(generateMockTransactionHistory(nft));
    
    const intervalId = setInterval(() => {
      setTransactionHistory(prev => {
        const lastItem = prev[prev.length - 1];
        const newDate = new Date(new Date(lastItem.date).getTime() + 12 * 24 * 60 * 60 * 1000);
        const priceChange = (Math.random() * 0.18) - 0.05;
        const newPrice = Math.max(0.01, lastItem.price * (1 + priceChange));
        
        const events = ['Sale', 'Transfer', 'Listing', 'Offer'];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        const newItem = {
          date: newDate.toISOString(),
          price: Number(newPrice.toFixed(3)),
          event: randomEvent,
          volume: randomEvent === 'Sale' ? Math.round(Math.random() * 3) + 1 : 0,
          sentiment: priceChange > 0 ? 'Bullish' : priceChange < 0 ? 'Bearish' : 'Neutral',
          wallet: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
          priceChange: priceChange * 100
        };
        
        setRefreshTime(new Date());
        return [...prev, newItem];
      });
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [nft]);
  
  const getFilteredData = () => {
    if (!transactionHistory.length) return [];
    
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (timeRange) {
      case '1w':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case '1m':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3m':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case 'all':
        return transactionHistory;
      default: // 6m
        cutoffDate.setMonth(now.getMonth() - 6);
    }
    
    return transactionHistory.filter(item => new Date(item.date) >= cutoffDate);
  };
  
  const filteredData = getFilteredData();
  
  const calculateStats = () => {
    if (!filteredData.length) return { avgPrice: 0, highPrice: 0, lowPrice: 0, transactions: 0, volume: 0 };
    
    const prices = filteredData.map(item => item.price);
    const salesData = filteredData.filter(item => item.event === 'Sale' || item.event === 'Last Sale');
    
    return {
      avgPrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
      highPrice: Math.max(...prices),
      lowPrice: Math.min(...prices),
      transactions: salesData.length,
      volume: salesData.reduce((sum, item) => sum + item.volume, 0)
    };
  };
  
  const stats = calculateStats();
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Bullish': return 'text-green-500';
      case 'Bearish': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };
  
  const getEventIcon = (event: string) => {
    switch (event) {
      case 'Sale':
      case 'Last Sale':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'Transfer':
        return <Repeat className="h-4 w-4 text-blue-500" />;
      case 'Listing':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case 'Offer':
        return <ArrowDown className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };
  
  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">NFT History & Analytics</h3>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">
            Live updates • Last: {refreshTime.toLocaleTimeString()}
          </p>
          <RefreshCw className="h-3 w-3 animate-spin text-primary opacity-50" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-secondary/10 p-3 rounded-lg md:col-span-1">
          <p className="text-xs text-muted-foreground mb-1">Avg. Price</p>
          <p className="text-lg font-bold">{stats.avgPrice.toFixed(3)} ETH</p>
        </div>
        <div className="bg-secondary/10 p-3 rounded-lg md:col-span-1">
          <p className="text-xs text-muted-foreground mb-1">Highest</p>
          <p className="text-lg font-bold">{stats.highPrice.toFixed(3)} ETH</p>
        </div>
        <div className="bg-secondary/10 p-3 rounded-lg md:col-span-1">
          <p className="text-xs text-muted-foreground mb-1">Lowest</p>
          <p className="text-lg font-bold">{stats.lowPrice.toFixed(3)} ETH</p>
        </div>
        <div className="bg-secondary/10 p-3 rounded-lg md:col-span-1">
          <p className="text-xs text-muted-foreground mb-1">Transactions</p>
          <p className="text-lg font-bold">{stats.transactions}</p>
        </div>
        <div className="bg-secondary/10 p-3 rounded-lg md:col-span-1">
          <p className="text-xs text-muted-foreground mb-1">Volume</p>
          <p className="text-lg font-bold">{stats.volume}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <Tabs defaultValue="price" onValueChange={setChartView} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="combined">Combined</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1w">Last Week</SelectItem>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-80 mb-8">
        <ChartContainer
          config={{
            primary: {
              theme: {
                light: "#8884d8",
                dark: "#8884d8",
              },
            },
            secondary: {
              theme: {
                light: "#82ca9d",
                dark: "#82ca9d",
              },
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'price' ? (
              <AreaChart
                data={filteredData}
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
                <ReferenceLine 
                  y={stats.avgPrice} 
                  stroke="#FF8042" 
                  strokeDasharray="3 3" 
                  label={{ value: 'Avg Price', position: 'right', fill: '#FF8042' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            ) : chartView === 'volume' ? (
              <ComposedChart
                data={filteredData.filter(item => item.volume > 0)}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [value, 'Volume']}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Bar dataKey="volume" fill="#82ca9d" />
              </ComposedChart>
            ) : (
              <ComposedChart
                data={filteredData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'price') return [`${value} ETH`, 'Price'];
                    if (name === 'volume') return [value, 'Volume'];
                    return [value, name];
                  }}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.3} 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="volume" 
                  barSize={20} 
                  fill="#82ca9d" 
                />
                <Scatter 
                  yAxisId="left"
                  dataKey="price" 
                  fill="#FF8042" 
                  name="Event"
                  data={filteredData.filter(item => item.event === 'Sale' || item.event === 'Last Sale')}
                />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <h4 className="font-medium mb-3">Transaction History</h4>
      <div className="overflow-auto max-h-80">
        <table className="w-full">
          <thead className="bg-secondary/10">
            <tr>
              <th className="text-left p-3 rounded-tl-lg">Event</th>
              <th className="text-left p-3 hidden md:table-cell">Date</th>
              <th className="text-left p-3 hidden md:table-cell">Wallet</th>
              <th className="text-right p-3">Price</th>
              <th className="text-right p-3 rounded-tr-lg">Change</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((transaction, index) => (
              <tr key={index} className="border-b border-secondary/10">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {getEventIcon(transaction.event)}
                    <span>{transaction.event}</span>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="p-3 hidden md:table-cell">
                  <span className="font-mono text-xs">{transaction.wallet}</span>
                </td>
                <td className="p-3 text-right">{transaction.price} ETH</td>
                <td className="p-3 text-right">
                  {transaction.priceChange !== 0 && (
                    <Badge variant={transaction.priceChange > 0 ? "default" : "destructive"} className="ml-auto">
                      {transaction.priceChange > 0 ? '+' : ''}{transaction.priceChange.toFixed(1)}%
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default NFTHistory;
