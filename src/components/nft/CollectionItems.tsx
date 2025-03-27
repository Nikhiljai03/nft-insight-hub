
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import NFTGrid from '@/components/nft/NFTGrid';
import { NFTItem } from '@/services/nftApiService';

interface CollectionItemsProps {
  items: NFTItem[];
  collectionSlug: string;
}

const CollectionItems: React.FC<CollectionItemsProps> = ({ items, collectionSlug }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Collection Items</h2>
        <Button variant="outline" size="sm" disabled>
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      <NFTGrid items={items} collectionSlug={collectionSlug} />
    </>
  );
};

export default CollectionItems;
