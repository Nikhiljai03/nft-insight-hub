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

export interface NFTCollectionItem {
  id: number;
  name: string;
  price: number;
  rarity: string;
  imageUrl: string;
  traits: {
    trait_type: string;
    value: string;
  }[];
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

// Create a mapping of collection items for each collection slug
const mockCollectionItems = {
  'bored-ape-yacht-club': [
    {
      id: 1234,
      name: 'Bored Ape #1234',
      price: 19.5,
      rarity: 'Legendary',
      imageUrl: 'https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?auto=format&w=1000',
      traits: [
        { trait_type: 'Background', value: 'Blue' },
        { trait_type: 'Fur', value: 'Brown' },
        { trait_type: 'Eyes', value: 'Bored' }
      ]
    },
    {
      id: 8765,
      name: 'Bored Ape #8765',
      price: 24.8,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gae/RBX3jwgykdaQO3rjTcKNf5OVwdukKO46oOAV3zZeiaMqIXdt5aeMLFBVCrXqEa_28kEPF7YyiA7sMUG-TgNvG3HTTpb-983-DAWrQ5s?auto=format&w=1000',
      traits: [
        { trait_type: 'Background', value: 'Yellow' },
        { trait_type: 'Fur', value: 'Golden' },
        { trait_type: 'Eyes', value: 'Angry' }
      ]
    },
    {
      id: 5678,
      name: 'Bored Ape #5678',
      price: 20.2,
      rarity: 'Rare',
      imageUrl: 'https://i.seadn.io/gae/eOUl6r7CRoebRj_XG-SgPNB5L7LGrrrBpjQ8hXOuBIx_wJSV0JSeFzJxcSv59QF1nBSk-xCY_h2u9VF98BFoX5U-OF1NkykiNcB5?auto=format&w=1000',
      traits: [
        { trait_type: 'Background', value: 'Green' },
        { trait_type: 'Fur', value: 'Black' },
        { trait_type: 'Eyes', value: 'Sleepy' }
      ]
    },
    {
      id: 9012,
      name: 'Bored Ape #9012',
      price: 35.1,
      rarity: 'Mythic',
      imageUrl: 'https://i.seadn.io/gae/7tBBFhkKCCk8ZHrYOQg-9UkGpXNhF9-lpC0SSeUlzKMqZCHBTPOqJJPo7xWZVnAQOEQyU-fBtg9rjQQKwYfVwLQbGEJhZLtcJ8Zc9Q?auto=format&w=1000',
      traits: [
        { trait_type: 'Background', value: 'Orange' },
        { trait_type: 'Fur', value: 'White' },
        { trait_type: 'Eyes', value: 'Zombie' }
      ]
    },
    {
      id: 2468,
      name: 'Bored Ape #2468',
      price: 18.9,
      rarity: 'Uncommon',
      imageUrl: 'https://i.seadn.io/gae/uyGNXQPGLvuGaX-sXGR2i4Thn2gR4YJ0DGCjEXXlVYQBMS_xYZclb6mQKaIwEfKv_qcYYnhskZGzGdMEXcx-0YbWg61Zu8767S6hJw?auto=format&w=1000',
      traits: [
        { trait_type: 'Background', value: 'Purple' },
        { trait_type: 'Fur', value: 'Gray' },
        { trait_type: 'Eyes', value: 'Laser' }
      ]
    },
    {
      id: 3690,
      name: 'Bored Ape #3690',
      price: 22.3,
      rarity: 'Rare',
      imageUrl: 'https://i.seadn.io/gae/HIuF8P8farZfYi9U54uDUdGo7RfKg-yN3sidZ_E-lGONCYrGQAuKz-NifS6gF0k4dEcQwiV2J-5Kk-zJVVRbExwSfTF91U1cWwoNDZI?auto=format&w=1000',
      traits: [
        { trait_type: 'Background', value: 'Red' },
        { trait_type: 'Fur', value: 'Pink' },
        { trait_type: 'Eyes', value: 'X' }
      ]
    },
    {
      id: 4812,
      name: 'Bored Ape #4812',
      price: 25.7,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gae/OEK9sqCljiEzWKXVk1qgZl1l91J5BaJx8UO8rOGY7bUl4TGmZ-GaL-4DQOecEQTrPqgHc9nzQkVnNzEMTAdbQnPyMCVIzcQ67zKWN-E?auto=format&w=1000',
      traits: [
        { trait_type: 'Background', value: 'Black' },
        { trait_type: 'Fur', value: 'Robot' },
        { trait_type: 'Eyes', value: 'Cyborg' }
      ]
    },
    {
      id: 7531,
      name: 'Bored Ape #7531',
      price: 17.8,
      rarity: 'Common',
      imageUrl: 'https://i.seadn.io/gae/MR637rQTpGce0iTrHv1B2gYTmcVqa0kfb0vJGGFSOIRGJ4fVYixWTXrum-PqQOGg5J9PVZzl0uU_7wm1sVLH_itEHRE5Fc3ra2ig?auto=format&w=1000',
      traits: [
        { trait_type: 'Background', value: 'White' },
        { trait_type: 'Fur', value: 'Tan' },
        { trait_type: 'Eyes', value: 'Coins' }
      ]
    }
  ],
  'cryptopunks': [
    {
      id: 7804,
      name: 'CryptoPunk #7804',
      price: 87.5,
      rarity: 'Legendary',
      imageUrl: 'https://i.seadn.io/gcs/files/cede82bd6d256b31cb0e29cd1fc0c9dd.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Alien' },
        { trait_type: 'Accessory', value: 'Cap Forward' }
      ]
    },
    {
      id: 3100,
      name: 'CryptoPunk #3100',
      price: 99.0,
      rarity: 'Legendary',
      imageUrl: 'https://i.seadn.io/gcs/files/f2dc2f24e9ede73f3db83087c7a8da2b.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Alien' },
        { trait_type: 'Accessory', value: 'Headband' }
      ]
    },
    {
      id: 5217,
      name: 'CryptoPunk #5217',
      price: 75.4,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gcs/files/48c3bf282f7c8e03bc0d230a8da20217.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Ape' },
        { trait_type: 'Accessory', value: 'Gold Chain' }
      ]
    },
    {
      id: 8857,
      name: 'CryptoPunk #8857',
      price: 65.2,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gcs/files/8c7ffbb5585a01f7d5c025a9167162d3.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Zombie' },
        { trait_type: 'Accessory', value: '3D Glasses' }
      ]
    },
    {
      id: 2140,
      name: 'CryptoPunk #2140',
      price: 70.1,
      rarity: 'Rare',
      imageUrl: 'https://i.seadn.io/gcs/files/98eb9db12b9252d1a01a4d72ece4e9cf.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Female' },
        { trait_type: 'Accessory', value: 'Tiara' }
      ]
    },
    {
      id: 6529,
      name: 'CryptoPunk #6529',
      price: 68.3,
      rarity: 'Rare',
      imageUrl: 'https://i.seadn.io/gcs/files/2279f8e66d0b12be651322306d6e0f30.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Male' },
        { trait_type: 'Accessory', value: 'Cowboy Hat' }
      ]
    },
    {
      id: 1,
      name: 'CryptoPunk #1',
      price: 82.4,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gcs/files/285e01c87a64c3852720fd31a46a2203.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Male' },
        { trait_type: 'Accessory', value: 'Mohawk' }
      ]
    },
    {
      id: 9998,
      name: 'CryptoPunk #9998',
      price: 92.1,
      rarity: 'Mythic',
      imageUrl: 'https://i.seadn.io/gcs/files/1e4fbcec1ae5e3c8f968a52137b841a0.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Female' },
        { trait_type: 'Accessory', value: 'Wild Hair' }
      ]
    }
  ],
  'azuki': [
    {
      id: 9605,
      name: 'Azuki #9605',
      price: 15.7,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gae/V2eIsMdA1c2dVjL7HvLoe9nAEkR-rZJyj-cE6AyW3yE2Q2XC0LLz7g2CbdMxKUWDw5I3_MQQAnOkcABtpXcxmYMCAekAKCxJ0jhnGA?auto=format&w=1000',
      traits: [
        { trait_type: 'Hair', value: 'Blue' },
        { trait_type: 'Clothing', value: 'Kimono' }
      ]
    },
    {
      id: 4217,
      name: 'Azuki #4217',
      price: 17.3,
      rarity: 'Legendary',
      imageUrl: 'https://i.seadn.io/gae/NAg58ecLEabYoxbnwUXIyZYEWBuFKZJ0WLBamTYayJT33jIFgg_L5NgDZLO3jXSKxLQVLd9Uv9pEzCLwVtwCeJYhGhi6MzuLRiXlvg?auto=format&w=1000',
      traits: [
        { trait_type: 'Hair', value: 'Red' },
        { trait_type: 'Clothing', value: 'Hoodie' }
      ]
    },
    {
      id: 7653,
      name: 'Azuki #7653',
      price: 12.8,
      rarity: 'Rare',
      imageUrl: 'https://i.seadn.io/gae/0S6Z5G4v2LmXWCFVbkEMZZ8TCL9jAq2QmWFC_3dOUJITB0rSq9OgKQNvNFpruAXOLYAyI4BzyfN6Byio_HjNxNE9yNm_JfD0d0C8?auto=format&w=1000',
      traits: [
        { trait_type: 'Hair', value: 'Purple' },
        { trait_type: 'Clothing', value: 'School Uniform' }
      ]
    },
    {
      id: 2831,
      name: 'Azuki #2831',
      price: 14.5,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gae/iofetZEyiEIGcNyJKpbOafb_efJyakSV7EKUIGXq8POdyOxv3nJgEBX-LCpbKxfbQgIGz_S8-zByPMOL9t_fF4bqQGYYgR-5QNq4?auto=format&w=1000',
      traits: [
        { trait_type: 'Hair', value: 'Black' },
        { trait_type: 'Clothing', value: 'Suit' }
      ]
    },
    {
      id: 5129,
      name: 'Azuki #5129',
      price: 13.2,
      rarity: 'Uncommon',
      imageUrl: 'https://i.seadn.io/gae/EB6mz4XDlmM7ygKFbTr-KFRa6I4LZz6-8MbCgHLU_VuCpNOgoxBCRCxhINr4nuRvoqRK3Xgp_hM85NMzKQpNrSa1W8aWYcwYDoPFJnY?auto=format&w=1000',
      traits: [
        { trait_type: 'Hair', value: 'Green' },
        { trait_type: 'Clothing', value: 'T-Shirt' }
      ]
    },
    {
      id: 9311,
      name: 'Azuki #9311',
      price: 16.9,
      rarity: 'Mythic',
      imageUrl: 'https://i.seadn.io/gae/TAgZ7D6wZH4UNfrGvkUCdbvK8SQyWC6EYgL11tLtRULKsfvt1RBUzl6Mj5UxnTM1QNLg9aNr4cCIrOYvcgpHqdcMUYcQY8FrMuqj_g?auto=format&w=1000',
      traits: [
        { trait_type: 'Hair', value: 'Gold' },
        { trait_type: 'Clothing', value: 'Armor' }
      ]
    },
    {
      id: 1873,
      name: 'Azuki #1873',
      price: 11.5,
      rarity: 'Common',
      imageUrl: 'https://i.seadn.io/gae/8WDR2YaWBqGMKQqgIPl74ZQrH99_gODrfwgW0n9hjnkd0rdao89nHgcvGNxm8zBHBK_XyGUYAFYUPB5_sQQhW0h-cUXUdQG824tiWw?auto=format&w=1000',
      traits: [
        { trait_type: 'Hair', value: 'Brown' },
        { trait_type: 'Clothing', value: 'Casual' }
      ]
    },
    {
      id: 6528,
      name: 'Azuki #6528',
      price: 18.2,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gae/EcvMpvYpP-7S0CVx-nxysfF0FDKqJ4W9SellO7k24zKvcxVQQRSYiN_3mG-aciQJZvpmEhjI0FOKuZwNNf5jiRKC0DSUdGLoXVjn?auto=format&w=1000',
      traits: [
        { trait_type: 'Hair', value: 'Pink' },
        { trait_type: 'Clothing', value: 'Cyber' }
      ]
    }
  ],
};

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
  },
  
  getCollectionItems: async (slug: string): Promise<NFTCollectionItem[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Return items for the requested collection or an empty array if not found
    return mockCollectionItems[slug] || [];
  }
};
