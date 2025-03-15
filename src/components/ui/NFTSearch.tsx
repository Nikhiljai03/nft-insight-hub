
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp } from 'lucide-react';
import { nftApiService, NFTCollection } from '@/services/nftApiService';
import GlassCard from './GlassCard';
import { useDebounce } from '@/hooks/use-debounce';

const NFTSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  
  useEffect(() => {
    const searchCollections = async () => {
      if (!debouncedQuery) {
        setCollections([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const results = await nftApiService.searchCollections(debouncedQuery);
        setCollections(results);
      } catch (error) {
        console.error("Error searching collections:", error);
      } finally {
        setIsSearching(false);
      }
    };
    
    searchCollections();
  }, [debouncedQuery]);
  
  const handleViewCollection = (slug: string) => {
    navigate(`/collections/${slug}`);
  };
  
  return (
    <div className="mb-12">
      <div className="mb-4 relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search NFT collections (e.g. Bored Ape, CryptoPunks)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-md bg-background/50 border-primary/30 focus:border-primary focus:ring-primary"
        />
      </div>
      
      {isSearching && (
        <div className="text-center py-8">
          <div className="inline-block animate-pulse">
            <TrendingUp className="h-8 w-8 text-primary animate-bounce" />
          </div>
          <p className="mt-2 text-muted-foreground">Searching collections...</p>
        </div>
      )}
      
      {!isSearching && collections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {collections.map((collection) => (
            <GlassCard key={collection.slug} interactive glowEffect className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                <img 
                  src={collection.imageUrl || 'https://via.placeholder.com/400x300'} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{collection.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="glassmorphism rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Floor Price</div>
                  <div className="font-bold">{collection.stats.floorPrice} ETH</div>
                </div>
                <div className="glassmorphism rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Volume</div>
                  <div className="font-bold">{(collection.stats.totalVolume / 1000).toFixed(1)}K ETH</div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Owners: {collection.stats.numOwners.toLocaleString()}</span>
                <span>Items: {collection.stats.totalSupply.toLocaleString()}</span>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={() => handleViewCollection(collection.slug)}
              >
                View Collection Details
              </Button>
            </GlassCard>
          ))}
        </div>
      )}
      
      {!isSearching && query && collections.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No collections found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default NFTSearch;
