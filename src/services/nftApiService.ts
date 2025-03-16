
// This is a mock service that would be replaced with real API calls in production

export interface NFTCollection {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  blockchain: string; // e.g. "Ethereum", "Solana", "Polygon"
  contractAddress?: string;
  createdAt: string;
  stats: {
    floorPrice: number;
    totalVolume: number;
    numOwners: number;
    totalSupply: number;
    dailyVolume?: number;
    weeklyVolume?: number;
  };
}

export interface NFTItem {
  id: string;
  tokenId: string;
  name: string;
  description?: string;
  imageUrl: string;
  collectionSlug: string;
  price: number;
  rarity: string; // "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"
  owner?: string;
  listed: boolean;
  lastSale?: {
    price: number;
    date: string;
  };
  traits?: Array<{
    trait_type: string;
    value: string;
    rarity?: number;
  }>;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  volume: number;
}

// Mock data generator helper
const generateMockCollections = (count: number): NFTCollection[] => {
  const blockchains = ["Ethereum", "Solana", "Polygon", "Binance", "Avalanche"];
  const names = [
    "Bored Ape Yacht Club", "CryptoPunks", "Azuki", "Doodles", "Cool Cats", 
    "World of Women", "Art Blocks", "Clone X", "Moonbirds", "Meebits",
    "DeGods", "Pudgy Penguins", "Goblintown", "VeeFriends", "Cryptoadz",
    "Invisible Friends", "RTFKT", "NFT Worlds", "Mutant Ape Yacht Club",
    "Okay Bears", "CyberKongz", "Autoglyphs", "Hashmasks", "Loot",
    "Chromie Squiggle", "Lost Poets", "Wolf Game", "Fidenza", "Coolman's Universe",
    "Parallel Alpha", "Bored Ape Kennel Club", "Chain Runners", "Creepz",
    "Neo Tokyo", "Autoglyphs", "CyberBrokers", "Sappy Seals", "DeadFellaz",
    "Solana Monkey Business", "Degenerate Ape Academy", "Psychedelics Anonymous",
    "Cryptodickbutts", "Blitmap", "Veefriends", "Gutter Cat Gang", "Metaheroes",
    "The Doge Pound", "Cool Pets", "Goblintownwtf", "Kaiju Kingz"
  ];
  
  // Generate random collections
  return Array.from({length: count}, (_, i) => {
    const name = names[i % names.length];
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const blockchain = blockchains[Math.floor(Math.random() * blockchains.length)];
    const floorPrice = Number((Math.random() * 100).toFixed(3));
    const totalVolume = Math.floor(Math.random() * 500000);
    const numOwners = Math.floor(Math.random() * 10000) + 1000;
    const totalSupply = Math.floor(Math.random() * 10000) + 1000;
    
    return {
      id: `col-${i}`,
      slug,
      name,
      description: `A collection of ${totalSupply} unique NFTs on the ${blockchain} blockchain. Each NFT grants access to exclusive utilities and community perks.`,
      imageUrl: `https://picsum.photos/seed/${slug}/800/600`,
      blockchain,
      contractAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      stats: {
        floorPrice,
        totalVolume,
        numOwners,
        totalSupply,
        dailyVolume: Number((totalVolume * Math.random() * 0.01).toFixed(2)),
        weeklyVolume: Number((totalVolume * Math.random() * 0.05).toFixed(2))
      }
    };
  });
};

// Generate mock NFT items
const generateMockNFTItems = (collection: NFTCollection, count: number): NFTItem[] => {
  const rarityLevels = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"];
  const traitTypes = ["Background", "Body", "Eyes", "Mouth", "Head", "Clothes", "Accessories"];
  const traitValues = {
    "Background": ["Blue", "Red", "Green", "Yellow", "Purple", "Orange", "Black", "White"],
    "Body": ["Normal", "Robot", "Alien", "Zombie", "Ghost", "Ape", "Human"],
    "Eyes": ["Normal", "Laser", "Sunglasses", "Eyepatch", "Angry", "Sleepy", "Wide"],
    "Mouth": ["Smile", "Frown", "Open", "Closed", "Teeth", "Tongue", "Pipe"],
    "Head": ["Cap", "Hat", "Crown", "Bandana", "None", "Mohawk", "Beanie"],
    "Clothes": ["Suit", "T-Shirt", "Hoodie", "Armor", "None", "Dress", "Uniform"],
    "Accessories": ["Watch", "Necklace", "Earring", "Ring", "None", "Tattoo", "Weapon"]
  };
  
  return Array.from({length: count}, (_, i) => {
    const rarity = rarityLevels[Math.floor(Math.random() * rarityLevels.length)];
    const price = Number((collection.stats.floorPrice * (1 + Math.random() * 2)).toFixed(3));
    
    // Generate random traits
    const traits = traitTypes.map(type => {
      const possibleValues = traitValues[type as keyof typeof traitValues];
      const value = possibleValues[Math.floor(Math.random() * possibleValues.length)];
      return {
        trait_type: type,
        value,
        rarity: Number((Math.random()).toFixed(2))
      };
    });
    
    return {
      id: `${collection.slug}-${i}`,
      tokenId: `${i+1}`,
      name: `${collection.name} #${i+1}`,
      description: `A unique ${rarity.toLowerCase()} NFT from the ${collection.name} collection.`,
      imageUrl: `https://picsum.photos/seed/${collection.slug}-${i}/400/400`,
      collectionSlug: collection.slug,
      price,
      rarity,
      owner: `0x${Math.random().toString(16).slice(2, 42)}`,
      listed: Math.random() > 0.5,
      lastSale: Math.random() > 0.3 ? {
        price: Number((price * (0.8 + Math.random() * 0.4)).toFixed(3)),
        date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
      } : undefined,
      traits
    };
  });
};

// Generate price history
const generatePriceHistory = (collection: NFTCollection, days: number): PriceHistoryPoint[] => {
  const currentPrice = collection.stats.floorPrice;
  const history: PriceHistoryPoint[] = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create some volatility but with a general trend
    const volatility = 0.1; // 10% daily volatility
    let priceChange = (Math.random() * 2 - 1) * volatility;
    
    // Add some trends
    if (i % 7 === 0) priceChange += 0.05; // Weekly pump
    if (i % 30 === 0) priceChange -= 0.1; // Monthly correction
    
    // Calculate price based on current price with some randomness for previous days
    const dayPrice = Math.max(0.001, currentPrice * (1 + (priceChange * i / 10)));
    
    // Volume tends to increase with price changes
    const volume = Math.abs(priceChange) * collection.stats.totalVolume * (0.01 + Math.random() * 0.02);
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: Number(dayPrice.toFixed(3)),
      volume: Number(volume.toFixed(1))
    });
  }
  
  return history;
};

// Cache the generated collections to provide consistent data
let cachedCollections: NFTCollection[] = [];
let cachedPriceHistories: Record<string, PriceHistoryPoint[]> = {};
let cachedCollectionItems: Record<string, NFTItem[]> = {};

// Initialize with some data
const initializeCache = () => {
  if (cachedCollections.length === 0) {
    cachedCollections = generateMockCollections(50);
    
    // Generate price histories for each collection
    cachedCollections.forEach(collection => {
      cachedPriceHistories[collection.slug] = generatePriceHistory(collection, 90);
      cachedCollectionItems[collection.slug] = generateMockNFTItems(collection, 100);
    });
  }
};

// API methods
export const nftApiService = {
  // Search collections by name
  searchCollections: async (query: string): Promise<NFTCollection[]> => {
    initializeCache();
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    // Search by name, slug, or description
    const normalizedQuery = query.toLowerCase();
    return cachedCollections.filter(collection => 
      collection.name.toLowerCase().includes(normalizedQuery) || 
      collection.slug.toLowerCase().includes(normalizedQuery) ||
      collection.description.toLowerCase().includes(normalizedQuery) ||
      collection.blockchain.toLowerCase().includes(normalizedQuery)
    );
  },
  
  // Get trending collections
  getTrendingCollections: async (): Promise<NFTCollection[]> => {
    initializeCache();
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay
    
    // Sort by volume and return top collections
    return [...cachedCollections]
      .sort((a, b) => b.stats.totalVolume - a.stats.totalVolume)
      .slice(0, 12);
  },
  
  // Get collection by slug
  getCollectionBySlug: async (slug: string): Promise<NFTCollection | null> => {
    initializeCache();
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    
    const collection = cachedCollections.find(c => c.slug === slug);
    return collection || null;
  },
  
  // Get collection price history
  getCollectionPriceHistory: async (slug: string): Promise<PriceHistoryPoint[]> => {
    initializeCache();
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    
    return cachedPriceHistories[slug] || [];
  },
  
  // Get collection items
  getCollectionItems: async (slug: string): Promise<NFTItem[]> => {
    initializeCache();
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
    
    return cachedCollectionItems[slug] || [];
  },
  
  // Get item details
  getItemDetails: async (collectionSlug: string, tokenId: string): Promise<NFTItem | null> => {
    initializeCache();
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network delay
    
    const items = cachedCollectionItems[collectionSlug] || [];
    return items.find(item => item.tokenId === tokenId) || null;
  },
  
  // Get collections by blockchain
  getCollectionsByBlockchain: async (blockchain: string): Promise<NFTCollection[]> => {
    initializeCache();
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
    
    return cachedCollections.filter(collection => 
      collection.blockchain.toLowerCase() === blockchain.toLowerCase()
    );
  }
};
