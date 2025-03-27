
import React from 'react';
import { TransactionHistoryItem } from '@/utils/mockDataGenerators';

interface NFTHistoryStatsProps {
  stats: {
    avgPrice: number;
    highPrice: number;
    lowPrice: number;
    transactions: number;
    volume: number;
  };
}

const NFTHistoryStats: React.FC<NFTHistoryStatsProps> = ({ stats }) => {
  return (
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
  );
};

export default NFTHistoryStats;
