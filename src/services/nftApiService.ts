
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

// This simulates real API data with realistic values based on recent market trends
const generateRealisticMarketData = (): NFTMarketData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  // Create data starting 12 months ago until current month
  return months.map((month, index) => {
    // Simulate NFT market trends with realistic numbers
    // The market had a peak in early months and then stabilized
    const monthPosition = (index + currentMonth + 1) % 12;
    const trendFactor = monthPosition < 6 ? 1.5 - (monthPosition * 0.1) : 0.8 + (Math.random() * 0.4);
    
    const baseVolume = 2800 + (Math.random() * 500);
    const volume = Math.round(baseVolume * trendFactor);
    const sales = Math.round(volume * 0.75 * (0.9 + (Math.random() * 0.2)));
    const users = Math.round(sales * 0.6 * (0.85 + (Math.random() * 0.3)));
    
    return {
      month,
      volume,
      sales,
      users
    };
  });
};

const generateRealisticCategoryData = () => {
  return [
    { name: 'Art', value: 38 + Math.floor(Math.random() * 10) },
    { name: 'Collectibles', value: 26 + Math.floor(Math.random() * 8) },
    { name: 'Gaming', value: 20 + Math.floor(Math.random() * 6) },
    { name: 'Metaverse', value: 16 + Math.floor(Math.random() * 4) }
  ];
};

export const nftApiService = {
  // Get market trend data
  getMarketData: async (): Promise<NFTMarketData[]> => {
    try {
      // In a production app, this would be a real API call:
      // const response = await fetch(`${OPENSEA_API_BASE}/market/stats`, {
      //   headers: { 'X-API-KEY': SAMPLE_API_KEY }
      // });
      // const data = await response.json();
      
      // For now, we'll generate realistic simulated data
      const data = generateRealisticMarketData();
      
      return data;
    } catch (error) {
      console.error("Failed to fetch NFT market data:", error);
      toast({
        title: "API Error",
        description: "Failed to load market data. Please try again later.",
        variant: "destructive"
      });
      return [];
    }
  },
  
  // Get category distribution data
  getCategoryData: async () => {
    try {
      // In production, this would fetch from a real API
      // For now, return simulated data
      return generateRealisticCategoryData();
    } catch (error) {
      console.error("Failed to fetch NFT category data:", error);
      toast({
        title: "API Error",
        description: "Failed to load category data. Please try again later.",
        variant: "destructive"
      });
      return [];
    }
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
  }
};
