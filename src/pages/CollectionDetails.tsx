
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { InfoIcon, Share2, Star, Clock, Activity, DollarSign, Users, Link } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { nftApiService } from '@/services/nftApiService';
import { useToast } from "@/hooks/use-toast";

const CollectionDetails = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCollectionDetails = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const collectionData = await nftApiService.getCollectionBySlug(slug);
        setCollection(collectionData);
        
        const historyData = await nftApiService.getCollectionPriceHistory(slug);
        setPriceHistory(historyData);
      } catch (error) {
        console.error("Error fetching collection details:", error);
        toast({
          title: "Error",
          description: "Failed to load collection details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCollectionDetails();
  }, [slug, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-primary/20 rounded-full mb-4"></div>
            <div className="h-8 w-64 bg-primary/20 rounded mb-2"></div>
            <div className="h-4 w-48 bg-primary/10 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Collection Not Found</h2>
            <p className="text-muted-foreground mb-6">The collection you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Collection Hero */}
        <section className="py-8">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={collection.imageUrl || "https://via.placeholder.com/500"} 
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{collection.name}</h1>
                  <Button variant="ghost" size="icon">
                    <Star className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-6">{collection.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <GlassCard className="p-4">
                    <div className="flex flex-col items-center">
                      <DollarSign className="h-5 w-5 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Floor Price</span>
                      <span className="text-lg font-bold">{collection.stats.floorPrice} ETH</span>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4">
                    <div className="flex flex-col items-center">
                      <Activity className="h-5 w-5 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Volume</span>
                      <span className="text-lg font-bold">{(collection.stats.totalVolume / 1000).toFixed(1)}K ETH</span>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4">
                    <div className="flex flex-col items-center">
                      <Users className="h-5 w-5 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Owners</span>
                      <span className="text-lg font-bold">{collection.stats.numOwners.toLocaleString()}</span>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4">
                    <div className="flex flex-col items-center">
                      <Clock className="h-5 w-5 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Items</span>
                      <span className="text-lg font-bold">{collection.stats.totalSupply.toLocaleString()}</span>
                    </div>
                  </GlassCard>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full px-6">
                    View on OpenSea
                  </Button>
                  <Button variant="outline" className="rounded-full px-6">
                    View on Etherscan
                  </Button>
                  <Button variant="secondary" className="rounded-full px-6" onClick={() => {
                    toast({
                      title: "Alert Added",
                      description: "You'll be notified of price changes for this collection",
                    });
                  }}>
                    Set Price Alert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Collection Analytics */}
        <section className="py-8">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="Analytics" 
              title="Price History" 
              subtitle="Track floor price and volume changes over time"
            />
            
            <GlassCard className="p-6 mt-8">
              <Tabs defaultValue="price" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="price">Floor Price</TabsTrigger>
                  <TabsTrigger value="volume">Trading Volume</TabsTrigger>
                </TabsList>
                
                <TabsContent value="price" className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={priceHistory}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} ETH`, 'Floor Price']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="volume" className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={priceHistory}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} ETH`, 'Volume']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Bar dataKey="volume" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </GlassCard>
          </div>
        </section>
        
        {/* Collection Items */}
        <section className="py-8">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="Explore" 
              title="Collection Items" 
              subtitle="Browse the NFTs in this collection"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <GlassCard key={item} className="overflow-hidden">
                  <div className="aspect-square w-full overflow-hidden mb-4">
                    <img 
                      src={`https://via.placeholder.com/400?text=NFT ${item}`}
                      alt={`NFT ${item}`}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{collection.name} #{item}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="font-medium">{(collection.stats.floorPrice * (0.9 + Math.random() * 0.2)).toFixed(3)} ETH</span>
                    </div>
                    <Button className="w-full mt-4" size="sm" onClick={() => {
                      toast({
                        title: "Coming Soon",
                        description: "NFT purchasing will be available in the next update",
                      });
                    }}>
                      View Details
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="rounded-full px-8" onClick={() => {
                toast({
                  title: "Loading More",
                  description: "Additional items will be available soon",
                });
              }}>
                Load More
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CollectionDetails;
