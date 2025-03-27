
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet } from 'lucide-react';
import { NFTCollection } from '@/services/nftApiService';

interface CollectionHeaderProps {
  collection: NFTCollection;
  hasWallet: boolean;
  onBrowseClick: () => void;
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({ 
  collection, 
  hasWallet,
  onBrowseClick
}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Collections
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/3">
          <img
            src={collection.imageUrl}
            alt={collection.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-2/3">
          <SectionHeading
            eyebrow={collection.blockchain}
            title={collection.name}
            subtitle={collection.description}
            gradient
          />

          {hasWallet ? (
            <Button className="mt-6" onClick={onBrowseClick}>
              Browse Collection
            </Button>
          ) : (
            <Button className="mt-6" onClick={() => navigate('/wallet')}>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet to Buy
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CollectionHeader;
