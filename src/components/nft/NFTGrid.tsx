
import React from 'react';
import { Link } from 'react-router-dom';
import { NFTItem } from '@/services/nftApiService';
import { Wallet, Clock } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface NFTGridProps {
  items: NFTItem[];
  collectionSlug: string;
  className?: string;
}

const NFTGrid: React.FC<NFTGridProps> = ({ items, collectionSlug, className }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No items found in this collection.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", className)}>
      {items.map((item) => (
        <Link key={item.id} to={`/collections/${collectionSlug}/${item.tokenId}`}>
          <GlassCard 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
          >
            <div className="relative">
              {item.rarity && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {item.rarity}
                </div>
              )}
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full aspect-square object-cover"
              />
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-medium mb-1 truncate">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
                {item.description || `A unique NFT from the ${collectionSlug.replace(/-/g, ' ')} collection.`}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 mr-1 text-primary" />
                  <span className="text-sm font-medium">{item.price} ETH</span>
                </div>
                
                {item.lastSale && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Last: {item.lastSale.price} ETH</span>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
};

export default NFTGrid;
