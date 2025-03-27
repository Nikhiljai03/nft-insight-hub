
import React, { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Wallet, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import GlassCard from '@/components/ui/GlassCard';
import { useNavigate } from 'react-router-dom';

interface PurchaseNFTProps {
  nftId: string;
  collectionName: string;
  price: number;
  imageUrl: string;
}

const PurchaseNFT: React.FC<PurchaseNFTProps> = ({ nftId, collectionName, price, imageUrl }) => {
  const { wallet } = useWallet();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!wallet) {
      toast({
        variant: "destructive",
        title: "Wallet Not Connected",
        description: "Please connect your wallet to purchase this NFT.",
      });
      navigate('/wallet');
      return;
    }

    // Check if user has enough balance
    if (parseFloat(wallet.balance) < price) {
      toast({
        variant: "destructive",
        title: "Insufficient Funds",
        description: `You need at least ${price} ETH to purchase this NFT.`,
      });
      return;
    }

    try {
      setPurchasing(true);
      
      // This would be replaced with actual blockchain transaction code
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${collectionName} #${nftId}!`,
      });
      
      // Redirect to profile page or NFT detail
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      
    } catch (error: any) {
      console.error("Purchase error:", error);
      toast({
        variant: "destructive",
        title: "Purchase Failed",
        description: error.message || "Could not complete the purchase. Please try again.",
      });
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img 
            src={imageUrl} 
            alt={`${collectionName} #${nftId}`} 
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        <div className="w-full md:w-2/3">
          <h3 className="text-xl font-bold mb-2">{collectionName} #{nftId}</h3>
          
          <div className="my-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-bold">{price} ETH</span>
            </div>
            
            <div className="flex justify-between mb-4">
              <span className="text-muted-foreground">Network:</span>
              <span>{wallet?.chainId === 1 ? 'Ethereum Mainnet' : 'Test Network'}</span>
            </div>
          </div>
          
          {!wallet && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Wallet Not Connected</AlertTitle>
              <AlertDescription>
                You need to connect your wallet before you can purchase this NFT.
              </AlertDescription>
            </Alert>
          )}
          
          {wallet && parseFloat(wallet.balance) < price && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Insufficient Balance</AlertTitle>
              <AlertDescription>
                Your current balance ({wallet.balance} ETH) is less than the NFT price.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            {wallet ? (
              <Button 
                onClick={handlePurchase} 
                disabled={purchasing || parseFloat(wallet.balance) < price}
                className="w-full sm:w-auto"
              >
                {purchasing ? 'Processing...' : `Buy Now for ${price} ETH`}
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/wallet')}
                className="w-full sm:w-auto"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default PurchaseNFT;
