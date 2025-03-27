
import React from 'react';
import { Wallet, BarChart3, Users, Layers } from 'lucide-react';

interface CollectionStatsProps {
  floorPrice: number;
  totalVolume: number;
  numOwners: number;
  totalSupply: number;
}

const CollectionStats: React.FC<CollectionStatsProps> = ({
  floorPrice,
  totalVolume,
  numOwners,
  totalSupply
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      <div className="bg-secondary/10 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Wallet className="h-4 w-4" />
          <span>Floor Price</span>
        </div>
        <div className="text-lg font-bold">{floorPrice} ETH</div>
      </div>

      <div className="bg-secondary/10 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <BarChart3 className="h-4 w-4" />
          <span>Volume</span>
        </div>
        <div className="text-lg font-bold">{Math.floor(totalVolume).toLocaleString()} ETH</div>
      </div>

      <div className="bg-secondary/10 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Users className="h-4 w-4" />
          <span>Owners</span>
        </div>
        <div className="text-lg font-bold">{numOwners.toLocaleString()}</div>
      </div>

      <div className="bg-secondary/10 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Layers className="h-4 w-4" />
          <span>Items</span>
        </div>
        <div className="text-lg font-bold">{totalSupply.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default CollectionStats;
