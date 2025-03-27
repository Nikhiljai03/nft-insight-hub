
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface Trait {
  trait_type: string;
  value: string;
  rarity?: number;
}

interface NFTTraitsChartProps {
  traits: Trait[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1', '#82ca9d', '#a4de6c'];

const NFTTraitsChart: React.FC<NFTTraitsChartProps> = ({ traits }) => {
  // Format data for pie chart
  const chartData = traits
    .filter(trait => trait.rarity !== undefined)
    .map((trait, index) => ({
      name: trait.trait_type,
      value: trait.rarity ? Math.round(trait.rarity * 1000) / 10 : 0, // Convert to percentage
    }));

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-secondary/10 rounded-lg">
        <p className="text-muted-foreground">No rarity data available</p>
      </div>
    );
  }

  return (
    <div className="h-72">
      <ChartContainer
        config={{
          primary: {
            theme: {
              light: "#0088FE",
              dark: "#0088FE",
            },
          },
          secondary: {
            theme: {
              light: "#00C49F",
              dark: "#00C49F",
            },
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${percent.toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Rarity']}
              labelFormatter={(label) => `Trait: ${label}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default NFTTraitsChart;
