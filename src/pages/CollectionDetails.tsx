import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { nftApiService, NFTCollection, NFTItem, PriceHistoryPoint } from '@/services/nftApiService';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, Users, Layers, LayoutGrid, BarChart3, Filter } from 'lucide-react';
import NFTGrid from '@/components/nft/NFTGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { useWallet } from '@/contexts/WalletContext';

const CollectionDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<NFTCollection | null>(null);
  const [nftItems, setNftItems] = useState<NFTItem[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');
  const navigate = useNavigate();
  const { wallet } = useWallet();

  useEffect(() => {
    if (!slug) return;

    const fetchCollectionData = async () => {
      try {
        setLoading(true);
        const collectionData = await nftApiService.getCollectionBySlug(slug);
        const itemsData = await nftApiService.getCollectionItems(slug);
        const historyData = await nftApiService.getCollectionPriceHistory(slug);

        setCollection(collectionData);
        setNftItems(itemsData);
        setPriceHistory(historyData);
      } catch (error) {
        console.error('Error fetching collection data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-6xl mx-auto px-4 py-24">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse w-full max-w-3xl">
              <div className="h-8 bg-secondary/30 rounded w-1/3 mb-6"></div>
              <div className="h-64 bg-secondary/20 rounded mb-6"></div>
              <div className="h-4 bg-secondary/30 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-secondary/30 rounded w-3/4 mb-4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-6xl mx-auto px-4 py-24">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Collection Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The collection you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 py-24">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collections
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <img
              src={collection.imageUrl}
              alt={collection.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div className="md:w-2/3">
            <SectionHeading
              eyebrow={collection.blockchain}
              title={collection.name}
              subtitle={collection.description}
              gradient
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-secondary/10 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Wallet className="h-4 w-4" />
                  <span>Floor Price</span>
                </div>
                <div className="text-lg font-bold">{collection.stats.floorPrice} ETH</div>
              </div>

              <div className="bg-secondary/10 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>Volume</span>
                </div>
                <div className="text-lg font-bold">{Math.floor(collection.stats.totalVolume).toLocaleString()} ETH</div>
              </div>

              <div className="bg-secondary/10 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span>Owners</span>
                </div>
                <div className="text-lg font-bold">{collection.stats.numOwners.toLocaleString()}</div>
              </div>

              <div className="bg-secondary/10 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Layers className="h-4 w-4" />
                  <span>Items</span>
                </div>
                <div className="text-lg font-bold">{collection.stats.totalSupply.toLocaleString()}</div>
              </div>
            </div>

            {wallet ? (
              <Button className="mt-6" onClick={() => setActiveTab('items')}>
                Browse Collection
              </Button>
            ) : (
              <Button className="mt-6" onClick={() => navigate('/wallet')}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet to Buy
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="items">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Items
            </TabsTrigger>
            <TabsTrigger value="activity">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Collection Items</h2>
              <Button variant="outline" size="sm" disabled>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <NFTGrid items={nftItems} collectionSlug={slug || ''} />
          </TabsContent>

          <TabsContent value="activity">
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-6">Price History</h3>
              
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={priceHistory}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} ETH`, 'Price']}
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <h3 className="text-xl font-bold mt-12 mb-6">Volume</h3>
              
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
            </GlassCard>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionDetails;
