import { toast } from "@/components/ui/use-toast";

// Sample API endpoints - would need actual API keys in production
const OPENSEA_API_BASE = "https://api.opensea.io/api/v2";
const SAMPLE_API_KEY = "demo_key"; // Replace with real key in production

export interface NFTCollection {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  stats: {
    floorPrice: number;
    totalVolume: number;
    numOwners: number;
    totalSupply: number;
  };
}

export interface NFTMarketData {
  month: string;
  volume: number;
  sales: number;
  users: number;
}

export interface NFTCategoryData {
  name: string;
  value: number;
}

export interface NFTPriceHistory {
  date: string;
  price: number;
  volume: number;
}

const mockMarketData: NFTMarketData[] = [
  { month: 'Jan', volume: 3200, sales: 1230, users: 830 },
  { month: 'Feb', volume: 2800, sales: 1300, users: 910 },
  { month: 'Mar', volume: 4100, sales: 1520, users: 1050 },
  { month: 'Apr', volume: 3700, sales: 1400, users: 980 },
  { month: 'May', volume: 4700, sales: 1600, users: 1120 },
  { month: 'Jun', volume: 5800, sales: 1820, users: 1280 },
  { month: 'Jul', volume: 5200, sales: 1900, users: 1350 },
  { month: 'Aug', volume: 6100, sales: 2100, users: 1450 },
  { month: 'Sep', volume: 5900, sales: 2000, users: 1400 },
  { month: 'Oct', volume: 6500, sales: 2200, users: 1500 },
  { month: 'Nov', volume: 7200, sales: 2400, users: 1650 },
  { month: 'Dec', volume: 7800, sales: 2600, users: 1750 },
];

const mockCategoryData: NFTCategoryData[] = [
  { name: 'Art', value: 40 },
  { name: 'Collectibles', value: 25 },
  { name: 'Gaming', value: 20 },
  { name: 'Metaverse', value: 15 },
];

const mockCollections: NFTCollection[] = [
  {
    slug: 'bored-ape-yacht-club',
    name: 'Bored Ape Yacht Club',
    description: 'The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain.',
    imageUrl: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 18.75,
      totalVolume: 280500,
      numOwners: 5600,
      totalSupply: 10000
    }
  },
  {
    slug: 'cryptopunks',
    name: 'CryptoPunks',
    description: 'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard.',
    imageUrl: 'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 63.95,
      totalVolume: 756400,
      numOwners: 3314,
      totalSupply: 10000
    }
  },
  {
    slug: 'azuki',
    name: 'Azuki',
    description: 'Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future.',
    imageUrl: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 14.2,
      totalVolume: 217800,
      numOwners: 4650,
      totalSupply: 10000
    }
  },
  {
    slug: 'doodles',
    name: 'Doodles',
    description: 'A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000.',
    imageUrl: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 8.65,
      totalVolume: 124500,
      numOwners: 5200,
      totalSupply: 10000
    }
  },
  {
    slug: 'mutant-ape-yacht-club',
    name: 'Mutant Ape Yacht Club',
    description: 'The Mutant Ape Yacht Club is a collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a Mutant Ape in the public sale.',
    imageUrl: 'https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 6.75,
      totalVolume: 175300,
      numOwners: 6800,
      totalSupply: 20000
    }
  },
];

const getMockPriceHistory = (slug: string): NFTPriceHistory[] => {
  // Generate mock price history based on the collection slug
  const collection = mockCollections.find(c => c.slug === slug);
  if (!collection) return [];
  
  const basePrice = collection.stats.floorPrice;
  const lastMonth = new Date();
  const history: NFTPriceHistory[] = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(lastMonth);
    date.setDate(date.getDate() - i);
    
    const randomPriceFactor = 0.8 + (Math.random() * 0.4); // Between 0.8 and 1.2
    const randomVolumeFactor = 0.7 + (Math.random() * 0.6); // Between 0.7 and 1.3
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat((basePrice * randomPriceFactor).toFixed(2)),
      volume: Math.floor(collection.stats.totalVolume / 100 * randomVolumeFactor),
    });
  }
  
  return history;
};

export const nftApiService = {
  // Get market trend data
  getMarketData: async (): Promise<NFTMarketData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockMarketData;
  },
  
  // Get category distribution data
  getCategoryData: async (): Promise<NFTCategoryData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockCategoryData;
  },
  
  // Search for an NFT collection
  searchCollections: async (query: string): Promise<NFTCollection[]> => {
    try {
      // In a production app, this would be:
      // const response = await fetch(`${OPENSEA_API_BASE}/collections?query=${query}`, {
      //   headers: { 'X-API-KEY': SAMPLE_API_KEY }
      // });
      // return await response.json();
      
      // For demo purposes, return simulated results
      if (!query) return [];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate fake but realistic collection data
      const sampleCollections = [
        {
          slug: "bored-ape-yacht-club",
          name: "Bored Ape Yacht Club",
          description: "A collection of 10,000 unique Bored Ape NFTs",
          imageUrl: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500&auto=format",
          stats: {
            floorPrice: 18.2,
            totalVolume: 841526,
            numOwners: 5632,
            totalSupply: 10000
          }
        },
        {
          slug: "cryptopunks",
          name: "CryptoPunks",
          description: "10,000 uniquely generated characters on Ethereum",
          imageUrl: "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500&auto=format",
          stats: {
            floorPrice: 28.3,
            totalVolume: 756340,
            numOwners: 3732,
            totalSupply: 10000
          }
        },
        {
          slug: "azuki",
          name: "Azuki",
          description: "A brand for the metaverse. Built by the community.",
          imageUrl: "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500&auto=format",
          stats: {
            floorPrice: 7.8,
            totalVolume: 284923,
            numOwners: 4872,
            totalSupply: 10000
          }
        }
      ];
      
      // Filter collections based on query
      return sampleCollections.filter(collection => 
        collection.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Failed to search NFT collections:", error);
      toast({
        title: "Search Failed",
        description: "Unable to search collections. Please try again.",
        variant: "destructive"
      });
      return [];
    }
  },
  
  getCollectionBySlug: async (slug: string): Promise<NFTCollection | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockCollections.find(c => c.slug === slug) || null;
  },
  
  getCollectionPriceHistory: async (slug: string): Promise<NFTPriceHistory[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return getMockPriceHistory(slug);
  }
};
