
// This is a mock implementation of blockchain utilities
// In a real application, this would interface with actual wallets and blockchain

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

// Mock wallet instance
let walletState: WalletInfo | null = null;

// Simulated transaction history
const mockTransactions: BlockchainTransaction[] = [
  {
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    from: '0xUserAddress',
    to: '0xNFTMarketplace',
    value: '0.25',
    timestamp: Date.now() - 86400000, // 1 day ago
    status: 'confirmed'
  },
  {
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    from: '0xNFTCreator',
    to: '0xUserAddress',
    value: '0',
    timestamp: Date.now() - 172800000, // 2 days ago
    status: 'confirmed'
  }
];

// Blockchain utilities
const blockchainUtils = {
  // Check if MetaMask is installed
  isMetaMaskInstalled: (): boolean => {
    return typeof window !== 'undefined' && 
           typeof (window as any).ethereum !== 'undefined';
  },
  
  // Connect to wallet (mock implementation)
  connectWallet: async (provider: string): Promise<WalletInfo> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate random wallet address
    const randomAddress = `0x${Array.from({length: 40}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    // Simulate connection
    walletState = {
      address: randomAddress,
      provider,
      chainId: NETWORKS.ETHEREUM.chainId,
      balance: (Math.random() * 10).toFixed(4),
      connected: true
    };
    
    return walletState;
  },
  
  // Disconnect wallet
  disconnectWallet: async (): Promise<void> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    walletState = null;
  },
  
  // Get current wallet info
  getWalletInfo: (): WalletInfo | null => {
    return walletState;
  },
  
  // Get transaction history (mock implementation)
  getTransactionHistory: async (): Promise<BlockchainTransaction[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockTransactions;
  },
  
  // Sign message (mock implementation)
  signMessage: async (message: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (!walletState) {
      throw new Error('Wallet not connected');
    }
    
    // Generate random signature
    return `0x${Array.from({length: 130}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
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
  
  // Convert ETH to USD (mock implementation)
  ethToUsd: async (ethAmount: number): Promise<number> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock ETH price around $3000
    const ethPrice = 3000 + (Math.random() * 200 - 100);
    return ethAmount * ethPrice;
  }
};

export default blockchainUtils;
