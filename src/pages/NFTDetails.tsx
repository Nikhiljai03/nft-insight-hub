
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { nftApiService, NFTItem } from '@/services/nftApiService';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag, Clock, Shield, Award } from 'lucide-react';
import PurchaseNFT from '@/components/nft/PurchaseNFT';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NFTSocialFeed from '@/components/nft/NFTSocialFeed';
import NFTPredictions from '@/components/nft/NFTPredictions';
import NFTTraitsChart from '@/components/nft/NFTTraitsChart';
import NFTHistory from '@/components/nft/NFTHistory';
import NFTMarketInsights from '@/components/nft/NFTMarketInsights';
import LoadingState from '@/components/nft/LoadingState';

const NFTDetails = () => {
  const { slug, tokenId } = useParams<{ slug: string; tokenId: string }>();
  const [nft, setNft] = useState<NFTItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug || !tokenId) return;

    const fetchNFT = async () => {
      try {
        setLoading(true);
        const nftItem = await nftApiService.getItemDetails(slug, tokenId);
        setNft(nftItem);
      } catch (error) {
        console.error('Error fetching NFT details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
    
    // Set up auto-refresh for real-time data (every 2 minutes)
    const interval = setInterval(() => {
      fetchNFT();
      console.log('Refreshing NFT data...');
    }, 120000);
    
    setRefreshInterval(interval);
    
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [slug, tokenId]);

  if (loading) {
    return <LoadingState />;
  }

  if (!nft) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-6xl mx-auto px-4 py-24">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">NFT Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The NFT you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
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
          <Button variant="ghost" onClick={() => navigate(`/collections/${slug}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
          </Button>
        </div>

        <SectionHeading
          eyebrow={nft.rarity}
          title={nft.name}
          subtitle={`From the ${nft.collectionSlug} collection`}
          gradient
        />

        <div className="mt-8">
          <Tabs defaultValue="purchase" className="w-full">
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="purchase">Purchase</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="traits">Traits</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="insights">Market Insights</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
            
            <TabsContent value="purchase">
              <PurchaseNFT
                nftId={nft.tokenId}
                collectionName={nft.collectionSlug.replace(/-/g, ' ')}
                price={nft.price}
                imageUrl={nft.imageUrl}
              />
            </TabsContent>
            
            <TabsContent value="details">
              <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2">
                    <img
                      src={nft.imageUrl}
                      alt={nft.name}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                      <h4 className="font-medium mb-2">Last updated</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleString()} • Data refreshes every 2 minutes
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Asset Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Tag className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Token ID</p>
                          <p className="text-sm text-muted-foreground">{nft.tokenId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Last Sale</p>
                          <p className="text-sm text-muted-foreground">
                            {nft.lastSale
                              ? `${nft.lastSale.price} ETH on ${new Date(nft.lastSale.date).toLocaleDateString()}`
                              : 'No previous sales'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Owner</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            {nft.owner ? nft.owner.substring(0, 6) + '...' + nft.owner.substring(nft.owner.length - 4) : 'Unknown'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Rarity</p>
                          <p className="text-sm text-muted-foreground">{nft.rarity}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{nft.description}</p>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-secondary/10 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                        <p className="text-lg font-bold">{nft.price} ETH</p>
                      </div>
                      
                      <div className="bg-secondary/10 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">USD Value</p>
                        <p className="text-lg font-bold">${(nft.price * 3500).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="traits">
              <GlassCard className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Traits & Attributes</h3>
                    
                    {!nft.traits || nft.traits.length === 0 ? (
                      <p className="text-muted-foreground">No traits available for this NFT.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {nft.traits.map((trait, index) => (
                          <div key={index} className="bg-secondary/10 rounded-lg p-4">
                            <p className="text-xs text-muted-foreground uppercase mb-1">{trait.trait_type}</p>
                            <p className="font-medium">{trait.value}</p>
                            {trait.rarity !== undefined && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Rarity: {(trait.rarity * 100).toFixed(1)}%
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <NFTTraitsChart traits={nft.traits || []} />
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="history">
              <NFTHistory nft={nft} />
            </TabsContent>
            
            <TabsContent value="insights">
              <NFTMarketInsights nft={nft} />
            </TabsContent>
            
            <TabsContent value="predictions">
              <NFTPredictions nft={nft} />
            </TabsContent>
            
            <TabsContent value="social">
              <NFTSocialFeed nft={nft} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NFTDetails;
