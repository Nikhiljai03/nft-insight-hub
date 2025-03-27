
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PriceHistoryPoint } from '@/services/nftApiService';

interface VolumeChartProps {
  priceHistory: PriceHistoryPoint[];
}

const VolumeChart: React.FC<VolumeChartProps> = ({ priceHistory }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={priceHistory}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} ETH`, 'Volume']}
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <Area 
            type="monotone" 
            dataKey="volume" 
            stroke="#82ca9d" 
            fill="#82ca9d" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;
