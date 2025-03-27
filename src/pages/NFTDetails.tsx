
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

const NFTDetails = () => {
  const { slug, tokenId } = useParams<{ slug: string; tokenId: string }>();
  const [nft, setNft] = useState<NFTItem | null>(null);
  const [loading, setLoading] = useState(true);
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
  }, [slug, tokenId]);

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
            <TabsList className="mb-6">
              <TabsTrigger value="purchase">Purchase</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="traits">Traits</TabsTrigger>
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
                      className="w-full h-auto rounded-lg"
                    />
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
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="traits">
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold mb-4">Traits & Attributes</h3>
                
                {!nft.traits || nft.traits.length === 0 ? (
                  <p className="text-muted-foreground">No traits available for this NFT.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NFTDetails;
