
// Real implementation of blockchain utilities that interface with actual wallets

// Types
export interface WalletInfo {
  address: string;
  provider: 'metamask' | 'walletconnect' | 'coinbase' | string;
  chainId: number;
  balance: string;
  connected: boolean;
}

export interface BlockchainTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

// Network names and IDs
export const NETWORKS = {
  ETHEREUM: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    symbol: 'ETH',
    blockExplorer: 'https://etherscan.io'
  },
  POLYGON: {
    name: 'Polygon',
    chainId: 137,
    symbol: 'MATIC',
    blockExplorer: 'https://polygonscan.com'
  },
  SOLANA: {
    name: 'Solana',
    symbol: 'SOL',
    blockExplorer: 'https://explorer.solana.com'
  },
  BINANCE: {
    name: 'BNB Chain',
    chainId: 56,
    symbol: 'BNB',
    blockExplorer: 'https://bscscan.com'
  },
  AVALANCHE: {
    name: 'Avalanche',
    chainId: 43114,
    symbol: 'AVAX',
    blockExplorer: 'https://snowtrace.io'
  }
};

// Wallet interface functions
const blockchainUtils = {
  // Check if MetaMask is installed
  isMetaMaskInstalled: (): boolean => {
    return typeof window !== 'undefined' && 
           typeof (window as any).ethereum !== 'undefined';
  },
  
  // Connect to wallet with real providers
  connectWallet: async (provider: string): Promise<WalletInfo> => {
    if (provider === 'metamask') {
      // Connect to MetaMask
      if (!blockchainUtils.isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed');
      }
      
      try {
        console.log('Requesting MetaMask accounts...');
        // Request account access
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        console.log('MetaMask accounts received:', accounts);
        
        if (accounts.length === 0) {
          throw new Error('No accounts found');
        }
        
        // Get current chain ID
        const chainId = await (window as any).ethereum.request({ 
          method: 'eth_chainId' 
        });
        
        console.log('Current chain ID:', chainId);
        
        // Get ETH balance
        const balance = await (window as any).ethereum.request({ 
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        
        // Convert balance from wei to ETH
        const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);
        
        const walletInfo = {
          address: accounts[0],
          provider: 'metamask',
          chainId: parseInt(chainId, 16),
          balance: ethBalance,
          connected: true
        };
        
        console.log('Wallet info created:', walletInfo);
        
        return walletInfo;
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        throw error;
      }
    } 
    else if (provider === 'walletconnect') {
      // In a real app, you would connect to WalletConnect here
      throw new Error('WalletConnect integration not yet implemented');
    } 
    else if (provider === 'coinbase') {
      // In a real app, you would connect to Coinbase Wallet here
      throw new Error('Coinbase Wallet integration not yet implemented');
    } 
    else {
      throw new Error(`Unsupported wallet provider: ${provider}`);
    }
  },
  
  // Disconnect wallet
  disconnectWallet: async (): Promise<void> => {
    // No specific disconnect method for MetaMask
    // Just clear the local state
    return Promise.resolve();
  },
  
  // Listen for account changes (MetaMask)
  listenForAccountChanges: (callback: (accounts: string[]) => void) => {
    if (blockchainUtils.isMetaMaskInstalled()) {
      (window as any).ethereum.on('accountsChanged', callback);
    }
  },
  
  // Listen for chain changes (MetaMask)
  listenForChainChanges: (callback: (chainId: string) => void) => {
    if (blockchainUtils.isMetaMaskInstalled()) {
      (window as any).ethereum.on('chainChanged', callback);
    }
  },
  
  // Format address for display
  formatAddress: (address: string): string => {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  },
  
  // Get block explorer URL for transaction
  getExplorerUrl: (chainId: number, hash: string, type: 'tx' | 'address' = 'tx'): string => {
    let baseUrl = NETWORKS.ETHEREUM.blockExplorer;
    
    // Find the matching network
    Object.values(NETWORKS).forEach(network => {
      if ('chainId' in network && network.chainId === chainId) {
        baseUrl = network.blockExplorer;
      }
    });
    
    return `${baseUrl}/${type}/${hash}`;
  },
  
  // Get transaction history (would be implemented with a real blockchain API)
  getTransactionHistory: async (address: string): Promise<BlockchainTransaction[]> => {
    // In a real app, you would call a blockchain API like Etherscan or Alchemy
    // For now, return an empty array
    return [];
  },
  
  // Sign message with wallet
  signMessage: async (message: string): Promise<string> => {
    if (!blockchainUtils.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }
    
    try {
      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }
      
      const signature = await (window as any).ethereum.request({
        method: 'personal_sign',
        params: [message, accounts[0]],
      });
      
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }
};

export default blockchainUtils;
