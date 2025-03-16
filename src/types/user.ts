
export interface UserProfile {
  id: string;               // Unique identifier (wallet address)
  name: string;             // Display name
  bio?: string;             // Optional short bio
  imageUrl: string | null;  // Profile image URL
  walletAddress: string;    // Connected wallet address
  createdAt: string;        // ISO date string of creation time
  updatedAt?: string;       // ISO date string of last update time
}
