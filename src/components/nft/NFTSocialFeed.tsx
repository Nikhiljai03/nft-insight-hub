
import React, { useState } from 'react';
import { NFTItem } from '@/services/nftApiService';
import GlassCard from '@/components/ui/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share2, Twitter, MessageCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Generate mock social data
const generateMockSocialData = (nft: NFTItem) => {
  const platforms = ['Twitter', 'Discord', 'Reddit'];
  const usernames = [
    'CryptoWhale', 'NFTCollector', 'BlockchainBob', 'MetaverseQueen',
    'TokenTitan', 'DigitalArtFan', 'EtherEagle', 'Web3Wanderer',
    'CryptoPunk', 'ApeHolder', 'NFTEnthusiast', 'ChainChampion'
  ];
  
  const comments = [
    `This ${nft.rarity} ${nft.name} is absolutely fire! 🔥`,
    `Just saw the floor price rising for this collection. Bullish!`,
    `The artist behind this piece is incredible, love the detail.`,
    `Would trade my whole portfolio for this beauty.`,
    `Not sure about the valuation on this one, seems overpriced tbh.`,
    `The utility on this NFT is underrated. Access to exclusive events!`,
    `Day 1 holder here, never selling this gem.`,
    `Future blue chip for sure, mark my words.`,
    `This reminds me of classic art with a digital twist.`,
    `The community around this collection is amazing.`,
    `Just joined the Discord, everyone's hyped about this drop.`,
    `Anyone else notice the hidden traits in this one?`
  ];
  
  // Generate posts for each platform
  return platforms.map(platform => {
    const posts = Array.from({ length: 5 + Math.floor(Math.random() * 5) }, (_, i) => {
      const username = usernames[Math.floor(Math.random() * usernames.length)];
      const comment = comments[Math.floor(Math.random() * comments.length)];
      const likes = Math.floor(Math.random() * 100);
      const replies = Math.floor(Math.random() * 20);
      const timeAgo = Math.floor(Math.random() * 48); // Hours ago
      
      return {
        id: `${platform}-${i}`,
        username,
        handle: `@${username.toLowerCase()}`,
        avatar: `https://i.pravatar.cc/150?u=${username}`,
        content: comment,
        likes,
        replies,
        timeAgo,
        platform
      };
    });
    
    return {
      platform,
      posts
    };
  });
};

interface NFTSocialFeedProps {
  nft: NFTItem;
}

const NFTSocialFeed: React.FC<NFTSocialFeedProps> = ({ nft }) => {
  const [commentText, setCommentText] = useState('');
  const socialData = generateMockSocialData(nft);
  
  const handlePostComment = () => {
    if (!commentText.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    toast.success('Comment posted successfully!');
    setCommentText('');
  };
  
  const SocialPlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'Twitter':
        return <Twitter className="h-4 w-4" />;
      case 'Discord':
        return <MessageCircle className="h-4 w-4" />;
      case 'Reddit':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-bold mb-6">Community Discussion</h3>
      
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Share your thoughts</CardTitle>
            <CardDescription>
              Join the conversation about {nft.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What do you think about this NFT?"
              className="min-h-[100px]"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handlePostComment}>Post Comment</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue={socialData[0].platform} className="w-full">
        <TabsList className="mb-6">
          {socialData.map((platform) => (
            <TabsTrigger key={platform.platform} value={platform.platform}>
              <div className="flex items-center gap-2">
                <SocialPlatformIcon platform={platform.platform} />
                {platform.platform}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {socialData.map((platformData) => (
          <TabsContent key={platformData.platform} value={platformData.platform}>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {platformData.posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={post.avatar} alt={post.username} />
                          <AvatarFallback>{post.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{post.username}</CardTitle>
                            <CardDescription className="text-xs">{post.handle}</CardDescription>
                          </div>
                          <CardDescription className="text-xs">{post.timeAgo} hours ago</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm">{post.content}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex gap-4 text-muted-foreground">
                      <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                        <Heart className="h-3.5 w-3.5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>{post.replies}</span>
                      </button>
                      <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </GlassCard>
  );
};

export default NFTSocialFeed;
