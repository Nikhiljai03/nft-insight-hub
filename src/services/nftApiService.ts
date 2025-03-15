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
  {
    slug: 'art-blocks',
    name: 'Art Blocks',
    description: 'Art Blocks is a first of its kind platform focused on genuinely programmable on-demand generative content that is stored immutably on the Ethereum Blockchain.',
    imageUrl: 'https://i.seadn.io/gae/FG0QJ00fN3c_FWuPeUr9-T__iQl63j9qqMm-dBBSGbyWKYuMicxhxHqCbqz6-tIWh7NYfT9WpRTTQgGLLz3q2PNYnDHtg5KN9wAK?auto=format&dpr=1&w=3000',
    stats: {
      floorPrice: 1.25,
      totalVolume: 430800,
      numOwners: 12500,
      totalSupply: 180000
    }
  },
  {
    slug: 'pudgy-penguins',
    name: 'Pudgy Penguins',
    description: 'Pudgy Penguins is a collection of 8,888 NFTs, accelerating Web3 innovation through IP utilization and community empowerment.',
    imageUrl: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqIDgOa?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 6.53,
      totalVolume: 120400,
      numOwners: 3800,
      totalSupply: 8888
    }
  },
  {
    slug: 'cool-cats-nft',
    name: 'Cool Cats NFT',
    description: 'Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain.',
    imageUrl: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 2.87,
      totalVolume: 95600,
      numOwners: 4200,
      totalSupply: 9999
    }
  },
  {
    slug: 'world-of-women-nft',
    name: 'World of Women',
    description: 'World of Women is a collection of 10,000 NFTs giving you access to strong, diverse and powerful women.',
    imageUrl: 'https://i.seadn.io/gae/7rQxqp2cAN4J-pFJ6A22Ncbd4FSxJ-UyZEPJQj6JT0US1K4XNOhNBqL4LTzTlzuDpzUPF5zvSi2YjgZLFBC-FaRQEbFJQYSvZDZUQQ?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 3.19,
      totalVolume: 110200,
      numOwners: 5100,
      totalSupply: 10000
    }
  },
  {
    slug: 'clonex',
    name: 'CloneX',
    description: 'CloneX is a collection of 20,000 next-gen Avatars, created by RTFKT and artist Takashi Murakami.',
    imageUrl: 'https://i.seadn.io/gae/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 5.72,
      totalVolume: 198500,
      numOwners: 7800,
      totalSupply: 20000
    }
  },
  {
    slug: 'meebits',
    name: 'Meebits',
    description: 'Meebits are 20,000 unique 3D voxel characters, created by a custom generative algorithm, registered on the Ethereum blockchain.',
    imageUrl: 'https://i.seadn.io/gae/d784iHHbqQFVH1XYD6HoT4u3y_Fsu_9FZUltWjnOzoYv7qqB5dLUqpOJ_G-2Mhl1n1IGS1SzYF1QS_gg4uEjWsxHnREJgBX6q0Z64A?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 3.95,
      totalVolume: 145900,
      numOwners: 6300,
      totalSupply: 20000
    }
  },
  {
    slug: 'veefriends',
    name: 'VeeFriends',
    description: 'VeeFriends is a collection of 10,255 NFTs created by Gary Vaynerchuk with meaningful attributes that create access and utility.',
    imageUrl: 'https://i.seadn.io/gae/5y-UCAXiNOFXH551w5bWdZEYOCdHPwbqmcKb-xa3uVQEjQgxvih3HtZWSmzqDqd0uk7kIqFrZhw32Gt6xPBFg4t_n9BKhpou-dwnOg?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 4.29,
      totalVolume: 87600,
      numOwners: 4900,
      totalSupply: 10255
    }
  }
];

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
    },
    {
      id: 7252,
      name: 'CryptoPunk #7252',
      price: 62.8,
      rarity: 'Rare',
      imageUrl: 'https://i.seadn.io/gcs/files/ef34304cfb08ba9d53ecac4a52ab9bc8.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Male' },
        { trait_type: 'Accessory', value: 'Beanie' }
      ]
    },
    {
      id: 2338,
      name: 'CryptoPunk #2338',
      price: 61.2,
      rarity: 'Uncommon',
      imageUrl: 'https://i.seadn.io/gcs/files/0ce0b3a1f97672ea7e9bc935236e3732.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Male' },
        { trait_type: 'Accessory', value: 'Earring' }
      ]
    },
    {
      id: 4156,
      name: 'CryptoPunk #4156',
      price: 76.9,
      rarity: 'Epic',
      imageUrl: 'https://i.seadn.io/gcs/files/24efd3a69ca70caa17290a4cfb021134.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Ape' },
        { trait_type: 'Accessory', value: 'Bandana' }
      ]
    },
    {
      id: 5822,
      name: 'CryptoPunk #5822',
      price: 95.3,
      rarity: 'Legendary',
      imageUrl: 'https://i.seadn.io/gcs/files/6fc6f297e5edce7556d3b1edbcbfc09a.png?auto=format&dpr=1&w=1000',
      traits: [
        { trait_type: 'Type', value: 'Alien' },
        { trait_type: 'Accessory', value: 'Bandana' }
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
  ]
};

const extendedCollections = [
  {
    slug: 'moonbirds',
    name: 'Moonbirds',
    description: 'A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits.',
    imageUrl: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 7.12,
      totalVolume: 168000,
      numOwners: 6400,
      totalSupply: 10000
    }
  },
  {
    slug: 'otherdeed',
    name: 'Otherdeed for Otherside',
    description: 'Otherdeed is the key to claiming land in Otherside, Yuga Labs\' upcoming metaverse.',
    imageUrl: 'https://i.seadn.io/gae/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 1.65,
      totalVolume: 345800,
      numOwners: 34700,
      totalSupply: 100000
    }
  },
  {
    slug: 'doodles-2',
    name: 'Doodles 2',
    description: 'Doodles 2 is a full-scale evolution of the Doodles experience from a collectible NFT to a digital identity platform, enabling every holder to create their own, personalized and fully on-chain characters.',
    imageUrl: 'https://i.seadn.io/gcs/files/bc25bd2b22bf20a1e64ff06d49452991.png?auto=format&dpr=1&w=1000',
    stats: {
      floorPrice: 0.42,
      totalVolume: 7690,
      numOwners: 28000,
      totalSupply: 23075
    }
  }
];

const getMockPriceHistory = (slug: string): NFTPriceHistory[] => {
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
  getMarketData: async (): Promise<NFTMarketData[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockMarketData;
  },
  
  getCategoryData: async (): Promise<NFTCategoryData[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockCategoryData;
  },
  
  searchCollections: async (query: string): Promise<NFTCollection[]> => {
    try {
      if (!query) return [];
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const queryLower = query.toLowerCase();
      const results = extendedCollections.filter(collection => 
        collection.name.toLowerCase().includes(queryLower) ||
        collection.description.toLowerCase().includes(queryLower) ||
        collection.slug.toLowerCase().includes(queryLower.replace(/\s+/g, '-'))
      );
      
      if (results.length === 0 && queryLower.length > 0) {
        return mockCollections.slice(0, 6);
      }
      
      return results;
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const collection = mockCollections.find(c => c.slug === slug);
    if (collection) return collection;
    
    const extendedCollection = extendedCollections.find(c => c.slug === slug && 
      !mockCollections.some(mc => mc.slug === c.slug));
    
    return extendedCollection || null;
  },
  
  getCollectionPriceHistory: async (slug: string): Promise<NFTPriceHistory[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return getMockPriceHistory(slug);
  },
  
  getCollectionItems: async (slug: string): Promise<NFTCollectionItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (mockCollectionItems[slug]) {
      return mockCollectionItems[slug];
    }
    
    const collection = await nftApiService.getCollectionBySlug(slug);
    if (collection) {
      const placeholderItems: NFTCollectionItem[] = [];
      const itemCount = Math.min(12, collection.stats.totalSupply);
      
      for (let i = 1; i <= itemCount; i++) {
        const id = Math.floor(Math.random() * 10000);
        const rarity = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'][Math.floor(Math.random() * 6)];
        const price = collection.stats.floorPrice * (0.8 + Math.random() * 0.8);
        
        placeholderItems.push({
          id,
          name: `${collection.name} #${id}`,
          price: parseFloat(price.toFixed(2)),
          rarity,
          imageUrl: `https://picsum.photos/seed/${slug}-${id}/400/400`,
          traits: [
            { trait_type: 'Background', value: ['Blue', 'Green', 'Red', 'Purple', 'Yellow'][Math.floor(Math.random() * 5)] },
            { trait_type: 'Rarity', value: rarity }
          ]
        });
      }
      
      return placeholderItems;
    }
    
    return [];
  }
};
