
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { InfoIcon, Share2, Star, Clock, Activity, DollarSign, Users, Link, Filter, ArrowDownUp, Search } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { nftApiService } from '@/services/nftApiService';
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const CollectionDetails = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [collectionItems, setCollectionItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-high');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
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
        
        const itemsData = await nftApiService.getCollectionItems(slug);
        setCollectionItems(itemsData);
        setFilteredItems(itemsData);
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
  
  useEffect(() => {
    // Filter and sort items whenever search query or sort option changes
    if (collectionItems.length > 0) {
      let items = [...collectionItems];
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        items = items.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.rarity.toLowerCase().includes(query)
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'price-high':
          items.sort((a, b) => b.price - a.price);
          break;
        case 'price-low':
          items.sort((a, b) => a.price - b.price);
          break;
        case 'rarity':
          // Sort by rarity ranking (Mythic > Legendary > Epic > Rare > Uncommon > Common)
          const rarityRank = { 'Mythic': 6, 'Legendary': 5, 'Epic': 4, 'Rare': 3, 'Uncommon': 2, 'Common': 1 };
          items.sort((a, b) => (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0));
          break;
        case 'name':
          items.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
      
      setFilteredItems(items);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [searchQuery, sortBy, collectionItems]);
  
  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: document.getElementById('items-section').offsetTop - 100, behavior: 'smooth' });
  };

  // Render pagination component
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
          <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>
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
                    src={collection?.imageUrl || "https://via.placeholder.com/500"} 
                    alt={collection?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{collection?.name}</h1>
                  <Button variant="ghost" size="icon">
                    <Star className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-6">{collection?.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <GlassCard className="p-4">
                    <div className="flex flex-col items-center">
                      <DollarSign className="h-5 w-5 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Floor Price</span>
                      <span className="text-lg font-bold">{collection?.stats.floorPrice} ETH</span>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4">
                    <div className="flex flex-col items-center">
                      <Activity className="h-5 w-5 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Volume</span>
                      <span className="text-lg font-bold">{collection?.stats.totalVolume ? (collection.stats.totalVolume / 1000).toFixed(1) + 'K' : '0'} ETH</span>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4">
                    <div className="flex flex-col items-center">
                      <Users className="h-5 w-5 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Owners</span>
                      <span className="text-lg font-bold">{collection?.stats.numOwners?.toLocaleString()}</span>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4">
                    <div className="flex flex-col items-center">
                      <Clock className="h-5 w-5 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Items</span>
                      <span className="text-lg font-bold">{collection?.stats.totalSupply?.toLocaleString()}</span>
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
        <section id="items-section" className="py-8">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="Explore" 
              title="Collection Items" 
              subtitle="Browse the NFTs in this collection"
            />
            
            <div className="flex flex-col md:flex-row gap-4 mt-8 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or rarity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <ArrowDownUp className="mr-2 h-4 w-4" />
                      <span>Sort By</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="rarity">Rarity</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {getCurrentPageItems().map((item) => (
                    <GlassCard key={item.id} className="overflow-hidden">
                      <div className="aspect-square w-full overflow-hidden mb-4">
                        <img 
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          loading="lazy" // Add lazy loading for better performance
                          onError={(e) => {
                            // Fallback image if the original fails to load
                            e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`;
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1">{item.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Price</span>
                          <span className="font-medium">{item.price} ETH</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">Rarity</span>
                          <span className={`font-medium ${
                            item.rarity === 'Legendary' ? 'text-yellow-500' :
                            item.rarity === 'Mythic' ? 'text-purple-500' :
                            item.rarity === 'Epic' ? 'text-blue-500' :
                            item.rarity === 'Rare' ? 'text-green-500' :
                            item.rarity === 'Uncommon' ? 'text-gray-500' : ''
                          }`}>{item.rarity}</span>
                        </div>
                        
                        {item.traits && item.traits.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <span className="text-xs text-muted-foreground block mb-2">Traits:</span>
                            <div className="flex flex-wrap gap-2">
                              {item.traits.map((trait, index) => (
                                <div key={index} className="px-2 py-1 bg-background/50 rounded-md text-xs">
                                  {trait.trait_type}: {trait.value}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
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
                
                {renderPagination()}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? `No items found matching "${searchQuery}"`
                    : "No items available in this collection"
                  }
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CollectionDetails;
