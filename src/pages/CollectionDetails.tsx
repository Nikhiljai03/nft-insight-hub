
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { nftApiService, NFTCollection, NFTItem, PriceHistoryPoint } from '@/services/nftApiService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, BarChart3 } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

// Import the new components
import LoadingState from '@/components/nft/LoadingState';
import EmptyState from '@/components/nft/EmptyState';
import CollectionHeader from '@/components/nft/CollectionHeader';
import CollectionStats from '@/components/nft/CollectionStats';
import CollectionItems from '@/components/nft/CollectionItems';
import CollectionAnalytics from '@/components/nft/CollectionAnalytics';

const CollectionDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<NFTCollection | null>(null);
  const [nftItems, setNftItems] = useState<NFTItem[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');
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
    return <LoadingState />;
  }

  if (!collection) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 py-24">
        <CollectionHeader 
          collection={collection} 
          hasWallet={!!wallet}
          onBrowseClick={() => setActiveTab('items')}
        />

        <CollectionStats 
          floorPrice={collection.stats.floorPrice}
          totalVolume={collection.stats.totalVolume}
          numOwners={collection.stats.numOwners}
          totalSupply={collection.stats.totalSupply}
        />

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
            <CollectionItems 
              items={nftItems} 
              collectionSlug={slug || ''} 
            />
          </TabsContent>

          <TabsContent value="activity">
            <CollectionAnalytics priceHistory={priceHistory} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionDetails;
