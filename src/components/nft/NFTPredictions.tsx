
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
  AreaChart,
  Legend
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

// Generate mock future price prediction data
const generatePricePredictions = (nft: NFTItem) => {
  const predictions = [];
  const startDate = new Date();
  const currentPrice = nft.price;
  
  // Generate 3 scenarios: bullish, bearish, and neutral
  const scenarios = [
    { 
      name: 'Bullish', 
      factor: 1.2, 
      volatility: 0.05, 
      color: '#10b981',
      description: 'Strong market conditions lead to significant appreciation',
      probability: 30
    },
    { 
      name: 'Neutral', 
      factor: 1.05, 
      volatility: 0.03, 
      color: '#6366f1',
      description: 'Steady market conditions with minimal price movement',
      probability: 50
    },
    { 
      name: 'Bearish', 
      factor: 0.9, 
      volatility: 0.04, 
      color: '#ef4444',
      description: 'Weak market conditions lead to depreciation',
      probability: 20
    }
  ];
  
  // Generate data for each scenario
  scenarios.forEach(scenario => {
    const scenarioData = [];
    let lastPrice = currentPrice;
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + (i * 30)); // Monthly predictions
      
      // Calculate price with trend and some randomness
      const trendFactor = Math.pow(scenario.factor, i/12);
      const randomFactor = 1 + ((Math.random() * 2 - 1) * scenario.volatility);
      lastPrice = currentPrice * trendFactor * randomFactor;
      
      scenarioData.push({
        date: date.toISOString(),
        price: Number(lastPrice.toFixed(3)),
        scenario: scenario.name
      });
    }
    
    predictions.push({
      ...scenario,
      data: scenarioData
    });
  });
  
  return predictions;
};

// Generate mock sentiment data
const generateSentimentData = () => {
  const sentiments = ['Positive', 'Neutral', 'Negative'];
  const sources = ['Twitter', 'Discord', 'Reddit', 'Telegram', 'News'];
  
  return sources.map(source => {
    const positive = Math.floor(Math.random() * 100);
    const neutral = Math.floor(Math.random() * (100 - positive));
    const negative = 100 - positive - neutral;
    
    return {
      source,
      positive,
      neutral,
      negative
    };
  });
};

interface NFTPredictionsProps {
  nft: NFTItem;
}

const NFTPredictions: React.FC<NFTPredictionsProps> = ({ nft }) => {
  const pricePredictions = generatePricePredictions(nft);
  const sentimentData = generateSentimentData();
  
  // Prepare combined data for the chart
  const combinedChartData = [];
  const numPoints = pricePredictions[0].data.length;
  
  for (let i = 0; i < numPoints; i++) {
    const dataPoint: any = {
      date: pricePredictions[0].data[i].date
    };
    
    pricePredictions.forEach(scenario => {
      dataPoint[scenario.name] = scenario.data[i].price;
    });
    
    combinedChartData.push(dataPoint);
  }
  
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Price Predictions</h3>
        <div className="text-xs text-muted-foreground bg-secondary/10 px-3 py-1 rounded-full">
          AI-Generated Forecast
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {pricePredictions.map((scenario, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className={`bg-opacity-10 py-4 ${
              scenario.name === 'Bullish' ? 'bg-green-500' : 
              scenario.name === 'Bearish' ? 'bg-red-500' : 'bg-blue-500'
            }`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{scenario.name}</CardTitle>
                {scenario.name === 'Bullish' ? <TrendingUp className="w-5 h-5 text-green-500" /> : 
                 scenario.name === 'Bearish' ? <TrendingDown className="w-5 h-5 text-red-500" /> : 
                 <AlertTriangle className="w-5 h-5 text-blue-500" />}
              </div>
              <CardDescription>
                {scenario.probability}% probability
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground mb-2">
                {scenario.description}
              </p>
              <p className="font-medium">
                Projected price (12m): <span className="font-bold">{scenario.data[scenario.data.length-1].price.toFixed(3)} ETH</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="h-80 mb-8">
        <ChartContainer
          config={{
            Bullish: {
              theme: {
                light: "#10b981",
                dark: "#10b981",
              },
            },
            Neutral: {
              theme: {
                light: "#6366f1",
                dark: "#6366f1",
              },
            },
            Bearish: {
              theme: {
                light: "#ef4444",
                dark: "#ef4444",
              },
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={combinedChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} ETH`, '']}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Legend />
              {pricePredictions.map((scenario, index) => (
                <Line 
                  key={index}
                  type="monotone" 
                  dataKey={scenario.name} 
                  stroke={scenario.color} 
                  activeDot={{ r: 8 }}
                  name={`${scenario.name} (${scenario.probability}%)`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-6">Market Sentiment Analysis</h3>
        <div className="h-60">
          <ChartContainer
            config={{
              positive: {
                theme: {
                  light: "#10b981",
                  dark: "#10b981",
                },
              },
              neutral: {
                theme: {
                  light: "#6366f1",
                  dark: "#6366f1",
                },
              },
              negative: {
                theme: {
                  light: "#ef4444",
                  dark: "#ef4444",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sentimentData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="#10b981" name="Positive" />
                <Area type="monotone" dataKey="neutral" stackId="1" stroke="#6366f1" fill="#6366f1" name="Neutral" />
                <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" name="Negative" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </GlassCard>
  );
};

export default NFTPredictions;
