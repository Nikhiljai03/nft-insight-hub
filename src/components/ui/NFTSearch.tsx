
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { nftApiService, NFTCollection } from '@/services/nftApiService';
import GlassCard from './GlassCard';
import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from "@/hooks/use-toast";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

const NFTSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [showTrending, setShowTrending] = useState(true);
  const collectionsPerPage = 6;
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get trending collections if no search query
    if (!debouncedQuery) {
      fetchTrendingCollections();
      return;
    }
    
    const searchCollections = async () => {
      setIsSearching(true);
      setHasError(false);
      setShowTrending(false);
      try {
        const results = await nftApiService.searchCollections(debouncedQuery);
        setCollections(results);
        setTotalPages(Math.ceil(results.length / collectionsPerPage));
        setCurrentPage(1);
      } catch (error) {
        console.error("Error searching collections:", error);
        setHasError(true);
        toast({
          variant: "destructive",
          title: "Search Failed",
          description: "We couldn't connect to our NFT database. Please try again.",
        });
      } finally {
        setIsSearching(false);
      }
    };
    
    searchCollections();
  }, [debouncedQuery, toast]);
  
  const fetchTrendingCollections = async () => {
    setIsSearching(true);
    setHasError(false);
    try {
      const results = await nftApiService.getTrendingCollections();
      setCollections(results);
      setTotalPages(Math.ceil(results.length / collectionsPerPage));
      setCurrentPage(1);
      setShowTrending(true);
    } catch (error) {
      console.error("Error fetching trending collections:", error);
      setHasError(true);
      toast({
        variant: "destructive",
        title: "Couldn't Load Trending Collections",
        description: "We couldn't connect to our NFT database. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleViewCollection = (slug: string) => {
    navigate(`/collections/${slug}`);
  };

  const getCurrentPageCollections = () => {
    const startIndex = (currentPage - 1) * collectionsPerPage;
    const endIndex = startIndex + collectionsPerPage;
    return collections.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
          )}
          
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <span className="flex h-9 w-4 items-center justify-center">...</span>
                </PaginationItem>
              )}
            </>
          )}
          
          {pages}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <span className="flex h-9 w-4 items-center justify-center">...</span>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };
  
  const getBlockchainIcon = (blockchain: string) => {
    switch (blockchain.toLowerCase()) {
      case 'ethereum':
        return '⟠';
      case 'solana':
        return '◎';
      case 'polygon':
        return '⬡';
      case 'binance':
        return 'ᗸ';
      default:
        return '🔗';
    }
  }
  
  return (
    <div className="mb-12">
      <div className="mb-4 relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search any NFT collection (BAYC, CryptoPunks, Azuki, Art Blocks...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-md bg-background/50 border-primary/30 focus:border-primary focus:ring-primary"
        />
      </div>
      
      {showTrending && !debouncedQuery && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Trending Collections
          </h3>
          <Button variant="ghost" size="sm" onClick={fetchTrendingCollections}>
            Refresh
          </Button>
        </div>
      )}
      
      {isSearching && (
        <div className="text-center py-8">
          <div className="inline-block animate-pulse">
            <TrendingUp className="h-8 w-8 text-primary animate-bounce" />
          </div>
          <p className="mt-2 text-muted-foreground">
            {debouncedQuery ? 'Searching collections...' : 'Loading trending collections...'}
          </p>
        </div>
      )}
      
      {hasError && !isSearching && (
        <div className="text-center py-8">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <p className="text-muted-foreground mb-2">We're having trouble connecting to our NFT database</p>
          <Button onClick={() => debouncedQuery ? setQuery(debouncedQuery) : fetchTrendingCollections()} variant="outline" size="sm">
            Try Again
          </Button>
        </div>
      )}
      
      {!isSearching && !hasError && getCurrentPageCollections().length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {getCurrentPageCollections().map((collection) => (
            <GlassCard key={collection.slug} interactive glowEffect className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                <img 
                  src={collection.imageUrl || 'https://via.placeholder.com/400x300'} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{collection.name}</h3>
                <Badge variant="outline" className="ml-auto">
                  {getBlockchainIcon(collection.blockchain)} {collection.blockchain}
                </Badge>
              </div>
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

      {renderPagination()}
      
      {!isSearching && query && collections.length === 0 && !hasError && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No collections found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-2">Try searching for popular collections like "Bored Ape", "CryptoPunks", or "Art Blocks"</p>
        </div>
      )}
    </div>
  );
};

export default NFTSearch;
