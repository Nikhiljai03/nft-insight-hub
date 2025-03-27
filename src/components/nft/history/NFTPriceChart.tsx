
import React from 'react';
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
import { TransactionHistoryItem } from '@/utils/mockDataGenerators';

interface NFTPriceChartProps {
  chartData: TransactionHistoryItem[];
  chartView: string;
  avgPrice: number;
}

const NFTPriceChart: React.FC<NFTPriceChartProps> = ({ chartData, chartView, avgPrice }) => {
  return (
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
              data={chartData}
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
                y={avgPrice} 
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
              data={chartData.filter(item => item.volume > 0)}
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
              data={chartData}
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
                data={chartData.filter(item => item.event === 'Sale' || item.event === 'Last Sale')}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default NFTPriceChart;
