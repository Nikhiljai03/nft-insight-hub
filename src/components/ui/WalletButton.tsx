
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, ExternalLink, Copy, ChevronDown } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import blockchainUtils from '@/utils/blockchainUtils';

const WalletButton: React.FC = () => {
  const { wallet, connecting, disconnectWallet, getFormattedAddress } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleConnectClick = () => {
    navigate('/wallet');
  };
  
  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };
  
  const handleViewOnExplorer = () => {
    if (wallet?.address && wallet?.chainId) {
      const url = blockchainUtils.getExplorerUrl(
        wallet.chainId, 
        wallet.address, 
        'address'
      );
      window.open(url, '_blank');
    }
  };
  
  if (!wallet) {
    return (
      <Button 
        variant="outline" 
        className="flex items-center gap-2" 
        onClick={handleConnectClick}
        disabled={connecting}
      >
        <Wallet className="h-4 w-4" />
        <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
      </Button>
    );
  }
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          <span>{getFormattedAddress()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleCopyAddress}>
          <Copy className="h-4 w-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleViewOnExplorer}>
          <ExternalLink className="h-4 w-4" />
          <span>View on Explorer</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center gap-2 text-destructive focus:text-destructive" 
          onClick={() => disconnectWallet()}
        >
          <LogOut className="h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletButton;
