
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import blockchainUtils, { WalletInfo, NETWORKS } from '@/utils/blockchainUtils';
import { useToast } from '@/hooks/use-toast';

interface WalletContextType {
  wallet: WalletInfo | null;
  connecting: boolean;
  connectWallet: (provider: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  getFormattedAddress: () => string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();
  
  // Check local storage for previous wallet connections on mount
  useEffect(() => {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      try {
        const walletInfo = JSON.parse(storedWallet);
        setWallet(walletInfo);
        
        // Revalidate connection with provider
        if (walletInfo.provider === 'metamask' && blockchainUtils.isMetaMaskInstalled()) {
          console.log('Attempting to revalidate MetaMask connection');
          (window as any).ethereum.request({ method: 'eth_accounts' })
            .then((accounts: string[]) => {
              console.log('MetaMask accounts:', accounts);
              if (accounts.length === 0 || accounts[0].toLowerCase() !== walletInfo.address.toLowerCase()) {
                // Wallet no longer connected or changed
                console.log('Wallet no longer connected, clearing stored wallet');
                localStorage.removeItem('wallet');
                setWallet(null);
              }
            })
            .catch((error: any) => {
              console.error('Error revalidating MetaMask connection:', error);
              localStorage.removeItem('wallet');
              setWallet(null);
            });
        }
      } catch (e) {
        console.error('Error parsing stored wallet:', e);
        localStorage.removeItem('wallet');
      }
    }
  }, []);
  
  // Set up event listeners for wallet changes
  useEffect(() => {
    if (blockchainUtils.isMetaMaskInstalled()) {
      console.log('Setting up MetaMask event listeners');
      
      // Listen for account changes
      blockchainUtils.listenForAccountChanges((accounts) => {
        console.log('MetaMask account changed:', accounts);
        if (accounts.length === 0) {
          // User disconnected their wallet
          setWallet(null);
          localStorage.removeItem('wallet');
          toast({
            title: "Wallet Disconnected",
            description: "Your wallet has been disconnected.",
          });
        } else if (wallet && accounts[0].toLowerCase() !== wallet.address.toLowerCase()) {
          // User switched accounts, update the wallet info
          connectWallet('metamask').catch(console.error);
        }
      });
      
      // Listen for chain changes
      blockchainUtils.listenForChainChanges((chainId) => {
        console.log('MetaMask chain changed:', chainId);
        if (wallet && wallet.provider === 'metamask') {
          // User switched networks, update the wallet info
          connectWallet('metamask').catch(console.error);
        }
      });
    }
    
    // Clean up event listeners
    return () => {
      // No explicit cleanup needed as listeners are bound to the ethereum object
    };
  }, [wallet]);
  
  const connectWallet = async (provider: string): Promise<void> => {
    try {
      console.log(`Attempting to connect to ${provider}...`);
      setConnecting(true);
      const walletInfo = await blockchainUtils.connectWallet(provider);
      console.log('Connection successful:', walletInfo);
      setWallet(walletInfo);
      
      // Save to local storage
      localStorage.setItem('wallet', JSON.stringify(walletInfo));
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${blockchainUtils.formatAddress(walletInfo.address)}`,
      });
      
      // Don't return walletInfo here since the function should return void
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error.message || "Could not connect to wallet. Please try again.",
      });
      throw error;
    } finally {
      setConnecting(false);
    }
  };
  
  const disconnectWallet = async (): Promise<void> => {
    try {
      await blockchainUtils.disconnectWallet();
      setWallet(null);
      
      // Remove from local storage
      localStorage.removeItem('wallet');
      localStorage.removeItem('user-profile');
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } catch (error: any) {
      console.error("Error disconnecting wallet:", error);
      toast({
        variant: "destructive",
        title: "Disconnection Failed",
        description: error.message || "Could not disconnect wallet. Please try again.",
      });
    }
  };
  
  const getFormattedAddress = () => {
    if (!wallet || !wallet.address) return '';
    return blockchainUtils.formatAddress(wallet.address);
  };
  
  return (
    <WalletContext.Provider
      value={{
        wallet,
        connecting,
        connectWallet,
        disconnectWallet,
        getFormattedAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
