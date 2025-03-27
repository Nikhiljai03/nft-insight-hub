
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Trait {
  trait_type: string;
  value: string;
  rarity?: number;
}

interface NFTTraitsChartProps {
  traits: Trait[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1', '#82ca9d', '#a4de6c'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}%`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const NFTTraitsChart: React.FC<NFTTraitsChartProps> = ({ traits }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sortBy, setSortBy] = useState<'name' | 'value'>('value');
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Format data for pie chart
  const chartData = traits
    .filter(trait => trait.rarity !== undefined)
    .map((trait, index) => ({
      name: trait.trait_type,
      value: trait.rarity ? Math.round(trait.rarity * 1000) / 10 : 0, // Convert to percentage
      trait: trait.value
    }))
    .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : b.value - a.value);

  useEffect(() => {
    // Simulating real-time updates every 30 seconds
    const timer = setInterval(() => {
      setRefreshCounter(prev => prev + 1);
    }, 30000);
    
    return () => clearInterval(timer);
  }, []);

  const toggleSortBy = () => {
    setSortBy(prev => prev === 'name' ? 'value' : 'name');
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-secondary/10 rounded-lg">
        <p className="text-muted-foreground">No rarity data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Trait Rarity Distribution</h4>
        <Button variant="outline" size="sm" onClick={toggleSortBy} className="h-8">
          <ArrowUpDown className="h-3.5 w-3.5 mr-2" />
          Sort by {sortBy === 'name' ? 'Value' : 'Name'}
        </Button>
      </div>
      
      <div className="h-80">
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
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}-${refreshCounter}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Rarity']}
                labelFormatter={(label) => `Trait: ${label}`}
              />
              <Legend formatter={(value, entry, index) => {
                return `${value}: ${chartData[index]?.trait || ''}`;
              }}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Data updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
};

export default NFTTraitsChart;
