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
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Area,
  Bar,
  Scatter
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Zap, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Generate market interest score
const generateMarketInterestData = () => {
  return [
    { name: 'Search Volume', value: Math.floor(Math.random() * 100) },
    { name: 'Social Media', value: Math.floor(Math.random() * 100) },
    { name: 'Trading Volume', value: Math.floor(Math.random() * 100) },
    { name: 'Collector Interest', value: Math.floor(Math.random() * 100) },
    { name: 'Rarity Appeal', value: Math.floor(Math.random() * 100) },
  ];
};

// Generate correlation data for this NFT vs other assets
const generateCorrelationData = () => {
  const dates = [];
  const now = new Date();
  
  // Generate dates for the past 6 months
  for (let i = 0; i < 6; i++) {
    const date = new Date(now);
    date.setMonth(now.getMonth() - i);
    dates.unshift(date.toISOString());
  }
  
  return dates.map(date => {
    return {
      date,
      'This NFT': Math.floor(Math.random() * 100),
      'Collection': Math.floor(Math.random() * 100),
      'Blue Chips': Math.floor(Math.random() * 100),
      'ETH': Math.floor(Math.random() * 100),
    };
  });
};

// Generate historical whale activity
const generateWhaleActivityData = () => {
  const dates = [];
  const now = new Date();
  
  // Generate dates for the past 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    dates.unshift(date.toISOString());
  }
  
  return dates.map(date => {
    return {
      date,
      buys: Math.floor(Math.random() * 5),
      sells: Math.floor(Math.random() * 5),
      wallets: Math.floor(Math.random() * 10) + 1,
    };
  });
};

interface NFTMarketInsightsProps {
  nft: NFTItem;
}

const NFTMarketInsights: React.FC<NFTMarketInsightsProps> = ({ nft }) => {
  const [marketInterestData, setMarketInterestData] = useState(generateMarketInterestData());
  const [correlationData, setCorrelationData] = useState(generateCorrelationData());
  const [whaleActivityData, setWhaleActivityData] = useState(generateWhaleActivityData());
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate overall interest score (average of all factors)
  const interestScore = Math.round(
    marketInterestData.reduce((sum, item) => sum + item.value, 0) / marketInterestData.length
  );
  
  // Determine market interest sentiment
  const getInterestSentiment = (score: number) => {
    if (score >= 75) return { text: 'High Interest', color: 'green' };
    if (score >= 50) return { text: 'Moderate Interest', color: 'blue' };
    if (score >= 25) return { text: 'Low Interest', color: 'orange' };
    return { text: 'Very Low Interest', color: 'red' };
  };
  
  const interestSentiment = getInterestSentiment(interestScore);
  
  // Simulated real-time data updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMarketInterestData(generateMarketInterestData());
      setCorrelationData(prevData => {
        const lastDate = new Date();
        
        // Add a new data point to correlation data
        const newPoint = {
          date: lastDate.toISOString(),
          'This NFT': Math.floor(Math.random() * 100),
          'Collection': Math.floor(Math.random() * 100),
          'Blue Chips': Math.floor(Math.random() * 100),
          'ETH': Math.floor(Math.random() * 100),
        };
        
        // Keep last 6 months of data
        const updatedData = [...prevData.slice(1), newPoint];
        return updatedData;
      });
      
      setWhaleActivityData(prevData => {
        const lastDate = new Date();
        
        // Add a new data point to whale activity data
        const newPoint = {
          date: lastDate.toISOString(),
          buys: Math.floor(Math.random() * 5),
          sells: Math.floor(Math.random() * 5),
          wallets: Math.floor(Math.random() * 10) + 1,
        };
        
        // Keep last 30 days of data
        const updatedData = [...prevData.slice(1), newPoint];
        return updatedData;
      });
      
      setRefreshTime(new Date());
    }, 45000); // Update every 45 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Market Insights & Analytics</h3>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">
            Live updates • Last: {refreshTime.toLocaleTimeString()}
          </p>
          <RefreshCw className="h-3 w-3 animate-spin text-primary opacity-50" />
        </div>
      </div>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interest">Market Interest</TabsTrigger>
          <TabsTrigger value="correlation">Price Correlation</TabsTrigger>
          <TabsTrigger value="whales">Whale Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Market Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{interestScore}</p>
                    <p className={`text-xs text-${interestSentiment.color}-500`}>{interestSentiment.text}</p>
                  </div>
                  <Activity className={`h-8 w-8 text-${interestSentiment.color}-500`} />
                </div>
                <Progress value={interestScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Correlation with ETH</CardTitle>
              </CardHeader>
              <CardContent>
                {correlationData.length > 0 && (
                  <div className="flex justify-between items-center">
                    <div>
                      {(() => {
                        const nftValue = correlationData[correlationData.length - 1]['This NFT'];
                        const ethValue = correlationData[correlationData.length - 1]['ETH'];
                        const correlation = (nftValue - ethValue) / 100;
                        const isPositive = correlation >= 0;
                        
                        return (
                          <>
                            <p className="text-2xl font-bold">{Math.abs(correlation).toFixed(2)}</p>
                            <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                              {isPositive ? 'Positive Correlation' : 'Negative Correlation'}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                    <Zap className="h-8 w-8 text-yellow-500" />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Whale Activity (30d)</CardTitle>
              </CardHeader>
              <CardContent>
                {whaleActivityData.length > 0 && (
                  <div className="flex justify-between items-center">
                    <div>
                      {(() => {
                        const totalBuys = whaleActivityData.reduce((sum, item) => sum + item.buys, 0);
                        const totalSells = whaleActivityData.reduce((sum, item) => sum + item.sells, 0);
                        const netActivity = totalBuys - totalSells;
                        const isPositive = netActivity > 0;
                        
                        return (
                          <>
                            <p className="text-2xl font-bold">{Math.abs(netActivity)}</p>
                            <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                              {isPositive ? 'Net Buying' : 'Net Selling'}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                    {(() => {
                      const totalBuys = whaleActivityData.reduce((sum, item) => sum + item.buys, 0);
                      const totalSells = whaleActivityData.reduce((sum, item) => sum + item.sells, 0);
                      const netActivity = totalBuys - totalSells;
                      const isPositive = netActivity > 0;
                      
                      return isPositive ? 
                        <TrendingUp className="h-8 w-8 text-green-500" /> : 
                        <TrendingDown className="h-8 w-8 text-red-500" />;
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-4">Market Interest Breakdown</h4>
              <div className="h-72">
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
                    <RadarChart outerRadius={90} data={marketInterestData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Interest Score"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Tooltip formatter={(value) => [`${value}/100`, 'Score']} />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-4">Correlation with Market</h4>
              <div className="h-72">
                <ChartContainer
                  config={{
                    'This NFT': {
                      theme: {
                        light: "#8884d8",
                        dark: "#8884d8",
                      },
                    },
                    'Collection': {
                      theme: {
                        light: "#82ca9d",
                        dark: "#82ca9d",
                      },
                    },
                    'ETH': {
                      theme: {
                        light: "#ffc658",
                        dark: "#ffc658",
                      },
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={correlationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short' })}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value}`, '']}
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="This NFT" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Collection" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="ETH" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="interest">
          <div className="space-y-6">
            <div className="bg-secondary/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Market Interest Score: {interestScore}/100</h4>
                <Badge className={`bg-${interestSentiment.color}-500`}>{interestSentiment.text}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                This score represents the overall market interest in this NFT based on various factors including search volume, 
                social media mentions, trading activity, collector behavior, and rarity appeal.
              </p>
              <Progress value={interestScore} className="h-2 mb-4" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {marketInterestData.map((item, index) => (
                  <div key={index} className="bg-background/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{item.value}/100</p>
                      <Badge variant={item.value > 75 ? "default" : item.value > 50 ? "outline" : "secondary"}>
                        {item.value > 75 ? 'High' : item.value > 50 ? 'Medium' : 'Low'}
                      </Badge>
                    </div>
                    <Progress value={item.value} className="h-1 mt-2" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="h-80">
              <ChartContainer
                config={{
                  Score: {
                    theme: {
                      light: "#8884d8",
                      dark: "#8884d8",
                    },
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius={150} data={marketInterestData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Interest Score"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip formatter={(value) => [`${value}/100`, 'Score']} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="correlation">
          <div className="space-y-6">
            <div className="bg-secondary/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Price Correlation Analysis</h4>
              <p className="text-sm text-muted-foreground">
                This chart shows how this NFT's price movements correlate with other assets over time. 
                A higher correlation means the assets tend to move in the same direction.
              </p>
            </div>
            
            <div className="h-96">
              <ChartContainer
                config={{
                  'This NFT': {
                    theme: {
                      light: "#8884d8",
                      dark: "#8884d8",
                    },
                  },
                  'Collection': {
                    theme: {
                      light: "#82ca9d",
                      dark: "#82ca9d",
                    },
                  },
                  'Blue Chips': {
                    theme: {
                      light: "#8dd1e1",
                      dark: "#8dd1e1",
                    },
                  },
                  'ETH': {
                    theme: {
                      light: "#ffc658",
                      dark: "#ffc658",
                    },
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short' })}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value} points`, '']}
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="This NFT" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Collection" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Blue Chips" stroke="#8dd1e1" />
                    <Line type="monotone" dataKey="ETH" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">NFT vs Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  {correlationData.length > 0 && (
                    <div className="flex justify-between items-center">
                      <div>
                        {(() => {
                          const nftValue = correlationData[correlationData.length - 1]['This NFT'];
                          const collectionValue = correlationData[correlationData.length - 1]['Collection'];
                          const correlation = Math.abs((nftValue - collectionValue) / 100).toFixed(2);
                          const strength = parseFloat(correlation) > 0.7 ? 'Strong' : parseFloat(correlation) > 0.4 ? 'Moderate' : 'Weak';
                          
                          return (
                            <>
                              <p className="text-2xl font-bold">{correlation}</p>
                              <p className="text-xs text-muted-foreground">{strength} Correlation</p>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">NFT vs Blue Chips</CardTitle>
                </CardHeader>
                <CardContent>
                  {correlationData.length > 0 && (
                    <div className="flex justify-between items-center">
                      <div>
                        {(() => {
                          const nftValue = correlationData[correlationData.length - 1]['This NFT'];
                          const blueChipsValue = correlationData[correlationData.length - 1]['Blue Chips'];
                          const correlation = Math.abs((nftValue - blueChipsValue) / 100).toFixed(2);
                          const strength = parseFloat(correlation) > 0.7 ? 'Strong' : parseFloat(correlation) > 0.4 ? 'Moderate' : 'Weak';
                          
                          return (
                            <>
                              <p className="text-2xl font-bold">{correlation}</p>
                              <p className="text-xs text-muted-foreground">{strength} Correlation</p>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">NFT vs ETH</CardTitle>
                </CardHeader>
                <CardContent>
                  {correlationData.length > 0 && (
                    <div className="flex justify-between items-center">
                      <div>
                        {(() => {
                          const nftValue = correlationData[correlationData.length - 1]['This NFT'];
                          const ethValue = correlationData[correlationData.length - 1]['ETH'];
                          const correlation = Math.abs((nftValue - ethValue) / 100).toFixed(2);
                          const strength = parseFloat(correlation) > 0.7 ? 'Strong' : parseFloat(correlation) > 0.4 ? 'Moderate' : 'Weak';
                          
                          return (
                            <>
                              <p className="text-2xl font-bold">{correlation}</p>
                              <p className="text-xs text-muted-foreground">{strength} Correlation</p>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="whales">
          <div className="space-y-6">
            <div className="bg-secondary/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Whale Activity (Last 30 Days)</h4>
              <p className="text-sm text-muted-foreground">
                This chart tracks buying and selling activity from wallets with significant holdings. 
                High whale activity can signal important price movements.
              </p>
            </div>
            
            <div className="h-80">
              <ChartContainer
                config={{
                  buys: {
                    theme: {
                      light: "#82ca9d",
                      dark: "#82ca9d",
                    },
                  },
                  sells: {
                    theme: {
                      light: "#ff8042",
                      dark: "#ff8042",
                    },
                  },
                  wallets: {
                    theme: {
                      light: "#8884d8",
                      dark: "#8884d8",
                    },
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={whaleActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'buys') return [value, 'Whale Buys'];
                        if (name === 'sells') return [value, 'Whale Sells'];
                        if (name === 'wallets') return [value, 'Active Whale Wallets'];
                        return [value, name];
                      }}
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="buys" fill="#82ca9d" name="Whale Buys" />
                    <Bar yAxisId="left" dataKey="sells" fill="#ff8042" name="Whale Sells" />
                    <Line yAxisId="right" type="monotone" dataKey="wallets" stroke="#8884d8" name="Active Whale Wallets" />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Whale Buys</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold">
                      {whaleActivityData.reduce((sum, item) => sum + item.buys, 0)}
                    </p>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Whale Sells</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold">
                      {whaleActivityData.reduce((sum, item) => sum + item.sells, 0)}
                    </p>
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Whale Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    {(() => {
                      const totalBuys = whaleActivityData.reduce((sum, item) => sum + item.buys, 0);
                      const totalSells = whaleActivityData.reduce((sum, item) => sum + item.sells, 0);
                      const netActivity = totalBuys - totalSells;
                      
                      let sentiment;
                      if (netActivity > 5) sentiment = { text: 'Very Bullish', color: 'green' };
                      else if (netActivity > 0) sentiment = { text: 'Bullish', color: 'green' };
                      else if (netActivity === 0) sentiment = { text: 'Neutral', color: 'blue' };
                      else if (netActivity > -5) sentiment = { text: 'Bearish', color: 'red' };
                      else sentiment = { text: 'Very Bearish', color: 'red' };
                      
                      return (
                        <>
                          <p className="text-lg font-bold">{sentiment.text}</p>
                          {sentiment.color === 'green' ? 
                            <TrendingUp className={`h-6 w-6 text-${sentiment.color}-500`} /> : 
                            sentiment.color === 'red' ? 
                            <TrendingDown className={`h-6 w-6 text-${sentiment.color}-500`} /> :
                            <Activity className={`h-6 w-6 text-${sentiment.color}-500`} />
                          }
                        </>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
};

export default NFTMarketInsights;
