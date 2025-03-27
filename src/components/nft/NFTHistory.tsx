
import React, { useState, useEffect } from 'react';
import { NFTItem } from '@/services/nftApiService';
import GlassCard from '@/components/ui/GlassCard';
import { RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateMockTransactionHistory, TransactionHistoryItem } from '@/utils/mockDataGenerators';
import NFTHistoryStats from './history/NFTHistoryStats';
import NFTTransactionTable from './history/NFTTransactionTable';
import NFTPriceChart from './history/NFTPriceChart';

interface NFTHistoryProps {
  nft: NFTItem;
}

const NFTHistory: React.FC<NFTHistoryProps> = ({ nft }) => {
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistoryItem[]>([]);
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
      
      <NFTHistoryStats stats={stats} />
      
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
      
      <NFTPriceChart 
        chartData={filteredData} 
        chartView={chartView} 
        avgPrice={stats.avgPrice} 
      />
      
      <h4 className="font-medium mb-3">Transaction History</h4>
      <NFTTransactionTable transactions={filteredData} />
    </GlassCard>
  );
};

export default NFTHistory;
