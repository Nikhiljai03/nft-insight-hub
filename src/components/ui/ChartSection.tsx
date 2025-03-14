
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from './GlassCard';

const marketData = [
  { month: 'Jan', volume: 1200, sales: 900, users: 500 },
  { month: 'Feb', volume: 1900, sales: 1200, users: 700 },
  { month: 'Mar', volume: 1400, sales: 1100, users: 800 },
  { month: 'Apr', volume: 2200, sales: 1700, users: 1200 },
  { month: 'May', volume: 1800, sales: 1400, users: 1100 },
  { month: 'Jun', volume: 2500, sales: 2100, users: 1500 },
  { month: 'Jul', volume: 3200, sales: 2700, users: 1800 },
  { month: 'Aug', volume: 2800, sales: 2200, users: 1600 },
  { month: 'Sep', volume: 3800, sales: 3000, users: 2000 },
  { month: 'Oct', volume: 4200, sales: 3500, users: 2200 },
  { month: 'Nov', volume: 4800, sales: 3800, users: 2500 },
  { month: 'Dec', volume: 5500, sales: 4200, users: 2800 }
];

const categoryData = [
  { name: 'Art', value: 45 },
  { name: 'Collectibles', value: 30 },
  { name: 'Gaming', value: 15 },
  { name: 'Metaverse', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('volume');
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-6">NFT Market Trends</h3>
        <Tabs defaultValue="volume" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="volume">Trading Volume</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="comparison">Sales Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="volume" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={marketData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorVolume)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={marketData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" />
                  <Bar dataKey="users" fill="hsl(var(--muted-foreground))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GlassCard>
  );
};

export default ChartSection;
