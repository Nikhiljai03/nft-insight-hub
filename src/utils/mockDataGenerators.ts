
import { NFTItem } from '@/services/nftApiService';

export const generateMockTransactionHistory = (nft: NFTItem) => {
  const history = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);
  
  let lastPrice = nft.price * 0.7;
  
  for (let i = 0; i < 15; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (i * 12));
    
    const priceChange = (Math.random() * 0.25) - 0.05;
    lastPrice = Math.max(0.01, lastPrice * (1 + priceChange));
    
    const events = ['Sale', 'Transfer', 'Listing', 'Offer', 'Auction'];
    const randomEvent = i === 14 && nft.lastSale ? 'Last Sale' : 
                       i === 0 ? 'Minted' : 
                       events[Math.floor(Math.random() * events.length)];
    
    const volume = randomEvent === 'Sale' || randomEvent === 'Last Sale' ? 
                  Math.round(Math.random() * 4) + 1 : 0;
    
    const sentiment = randomEvent === 'Sale' || randomEvent === 'Last Sale' ? 
                     (priceChange > 0 ? 'Bullish' : priceChange < 0 ? 'Bearish' : 'Neutral') : 'Neutral';
    
    history.push({
      date: date.toISOString(),
      price: Number(lastPrice.toFixed(3)),
      event: randomEvent,
      volume: volume,
      sentiment: sentiment,
      wallet: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      priceChange: priceChange * 100
    });
  }
  
  if (nft.lastSale) {
    history.push({
      date: nft.lastSale.date,
      price: nft.lastSale.price,
      event: 'Last Sale',
      volume: 1,
      sentiment: 'Neutral',
      wallet: nft.owner || `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      priceChange: 0
    });
  }
  
  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export type TransactionHistoryItem = {
  date: string;
  price: number;
  event: string;
  volume: number;
  sentiment: string;
  wallet: string;
  priceChange: number;
};
