
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import PriceHistoryChart from './PriceHistoryChart';
import VolumeChart from './VolumeChart';
import { PriceHistoryPoint } from '@/services/nftApiService';

interface CollectionAnalyticsProps {
  priceHistory: PriceHistoryPoint[];
}

const CollectionAnalytics: React.FC<CollectionAnalyticsProps> = ({ priceHistory }) => {
  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-bold mb-6">Price History</h3>
      <PriceHistoryChart priceHistory={priceHistory} />
      
      <h3 className="text-xl font-bold mt-12 mb-6">Volume</h3>
      <VolumeChart priceHistory={priceHistory} />
    </GlassCard>
  );
};

export default CollectionAnalytics;
