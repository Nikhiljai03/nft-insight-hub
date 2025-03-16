
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, PlayCircle, Wallet, Database, ArrowRight, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import TutorialVideo from '@/components/ui/TutorialVideo';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();
  
  const handleStartExploring = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Your Gateway to Blockchain NFT Analytics
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mb-10">
                NFT Insight Hub provides real-time blockchain data, comprehensive analytics, and market insights 
                for NFT collections across multiple blockchains.
              </p>
              
              <Button 
                onClick={handleStartExploring}
                className="relative group px-8 py-6 text-lg"
              >
                <span className="flex items-center gap-2">
                  Start Exploring NFTs
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
            
            {/* Tutorial Video Section */}
            <div className="mt-12">
              <TutorialVideo />
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-muted/20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="How It Works" 
              title="Understanding Blockchain NFT Analytics" 
              subtitle="Leveraging blockchain technology to provide comprehensive NFT insights"
              gradient
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary rounded-bl-xl">
                  1
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">Blockchain Data Indexing</h3>
                  <p className="text-muted-foreground mb-6">
                    Our platform continuously indexes data from Ethereum, Solana, Polygon, and other blockchains 
                    to provide up-to-date information on all NFT collections.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Multi-chain support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Real-time transaction data</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Smart contract analytics</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
              
              <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary rounded-bl-xl">
                  2
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">NFT Market Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Our platform analyzes sales, transfers, and listings to provide insights into 
                    floor prices, market caps, and trading volumes for NFT collections.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Price history tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Market sentiment analysis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Trading volume metrics</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
              
              <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary rounded-bl-xl">
                  3
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">NFT Rarity & Valuation</h3>
                  <p className="text-muted-foreground mb-6">
                    Our AI models analyze traits, rarity, and historical sales to provide accurate 
                    valuations for individual NFTs within collections.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>AI-powered rarity scoring</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Trait value assessment</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Fair market value predictions</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* Platform Features */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="Features" 
              title="Blockchain-Powered NFT Analytics" 
              subtitle="Comprehensive tools for NFT collectors, investors, and enthusiasts"
              gradient
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <GlassCard className="p-6 flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">Multi-Chain Portfolio Tracking</h3>
                  <p className="text-muted-foreground">
                    Track your NFT holdings across Ethereum, Solana, Polygon, and other blockchains in a single interface, 
                    with real-time valuation and performance metrics.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">Comprehensive Collection Database</h3>
                  <p className="text-muted-foreground">
                    Access detailed information on thousands of NFT collections, including floor prices, 
                    volume trends, ownership distribution, and marketplace activity.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">Advanced Analytics Dashboard</h3>
                  <p className="text-muted-foreground">
                    Visualize market trends with interactive charts and graphs showing historical price movements, 
                    volume patterns, and comparative collection performance.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">Real-Time Market Alerts</h3>
                  <p className="text-muted-foreground">
                    Set up customizable alerts for price movements, new listings, sales, and other events 
                    for your favorite collections or specific NFTs.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">Security and Authenticity Verification</h3>
                  <p className="text-muted-foreground">
                    Verify the authenticity of NFTs with our blockchain-based verification system that checks 
                    contract addresses, token standards, and transaction history.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">NFT Educational Resources</h3>
                  <p className="text-muted-foreground">
                    Access guides, tutorials, and market reports to deepen your understanding of NFTs, 
                    blockchain technology, and digital asset investment strategies.
                  </p>
                </div>
              </GlassCard>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={handleStartExploring}
                size="lg" 
                className="relative group px-8 py-6 text-lg"
              >
                <span className="flex items-center gap-2">
                  Explore the NFT Marketplace
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-muted/20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="FAQ" 
              title="Frequently Asked Questions" 
              subtitle="Get answers to common questions about our blockchain NFT analytics platform"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">How does your platform collect blockchain data?</h3>
                <p className="text-muted-foreground">
                  We use specialized blockchain indexers and APIs to continuously scan multiple blockchains, including 
                  Ethereum, Solana, and Polygon. This data is processed, normalized, and stored in our database 
                  to provide real-time insights.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">What blockchains do you currently support?</h3>
                <p className="text-muted-foreground">
                  We currently support Ethereum, Solana, Polygon, Binance Smart Chain, and Avalanche. We regularly 
                  add support for new blockchains based on market demand and adoption in the NFT space.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">How is rarity calculated for NFTs?</h3>
                <p className="text-muted-foreground">
                  Our platform uses a combination of statistical models to calculate rarity scores. We analyze trait 
                  distribution, trait combinations, and their frequency within collections to determine how rare 
                  each NFT is compared to others in its collection.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">Do I need a crypto wallet to use your platform?</h3>
                <p className="text-muted-foreground">
                  No, you don't need a wallet to browse collections and use basic features. However, connecting 
                  a wallet allows you to track your portfolio, receive personalized insights, and set up alerts 
                  for your NFT holdings.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">How up-to-date is your NFT data?</h3>
                <p className="text-muted-foreground">
                  Our platform updates data in near real-time, with most market changes reflected within minutes. 
                  Floor prices, sales, and listings are updated continuously across all supported marketplaces 
                  to ensure you have the most current information.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">Can I integrate your NFT data into my own application?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer an API service that allows developers to integrate our NFT data into their applications. 
                  Our API provides access to collection data, market metrics, price history, and more through 
                  a simple RESTful interface.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GetStarted;
