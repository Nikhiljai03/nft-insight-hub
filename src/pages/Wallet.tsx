
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { Wallet, ArrowRight, ShieldCheck, Clock, History, Hexagon, Shield, CreditCard, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('connect');
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();
  
  const handleConnectMetamask = () => {
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      
      toast({
        title: "Wallet Connection Simulated",
        description: "This is a demo of the wallet connection flow. In production, this would connect to MetaMask.",
      });
    }, 1500);
  };
  
  const handleConnectWalletConnect = () => {
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      
      toast({
        title: "Wallet Connection Simulated",
        description: "This is a demo of the wallet connection flow. In production, this would connect to WalletConnect.",
      });
    }, 1500);
  };
  
  const handleConnectCoinbase = () => {
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      
      toast({
        title: "Wallet Connection Simulated",
        description: "This is a demo of the wallet connection flow. In production, this would connect to Coinbase Wallet.",
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading 
            eyebrow="Blockchain" 
            title="Connect Your Wallet" 
            subtitle="Connect your crypto wallet to get the full experience and access all features"
            gradient
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <GlassCard>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="connect">Connect Wallet</TabsTrigger>
                    <TabsTrigger value="about">About Wallet Integration</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="connect" className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Choose a Wallet Provider</h3>
                    
                    <div className="space-y-4">
                      <GlassCard className="hover:bg-secondary/10 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                              <Hexagon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold">MetaMask</h4>
                              <p className="text-sm text-muted-foreground">Connect to your MetaMask wallet</p>
                            </div>
                          </div>
                          <Button onClick={handleConnectMetamask} disabled={connecting}>
                            {connecting ? 'Connecting...' : 'Connect'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </GlassCard>
                      
                      <GlassCard className="hover:bg-secondary/10 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                              <Wallet className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold">WalletConnect</h4>
                              <p className="text-sm text-muted-foreground">Works with most mobile wallets</p>
                            </div>
                          </div>
                          <Button onClick={handleConnectWalletConnect} disabled={connecting} variant="outline">
                            {connecting ? 'Connecting...' : 'Connect'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </GlassCard>
                      
                      <GlassCard className="hover:bg-secondary/10 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                              <CreditCard className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold">Coinbase Wallet</h4>
                              <p className="text-sm text-muted-foreground">Connect using Coinbase Wallet</p>
                            </div>
                          </div>
                          <Button onClick={handleConnectCoinbase} disabled={connecting} variant="outline">
                            {connecting ? 'Connecting...' : 'Connect'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </GlassCard>
                    </div>
                    
                    <Alert className="mt-6">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Demo Mode</AlertTitle>
                      <AlertDescription>
                        This is a demonstration of wallet connections. No actual blockchain transactions will occur.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                  
                  <TabsContent value="about">
                    <h3 className="text-xl font-bold mb-4">Why Connect Your Wallet</h3>
                    <p className="text-muted-foreground mb-6">
                      Connecting your wallet to NFT Insight Hub provides enhanced functionality and personalized analytics. 
                      Here's what you'll get access to:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                        <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Portfolio Tracking</h4>
                          <p className="text-sm text-muted-foreground">View your NFT holdings and their current market value</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                        <History className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Transaction History</h4>
                          <p className="text-sm text-muted-foreground">See all your past NFT purchases and sales</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Real-Time Alerts</h4>
                          <p className="text-sm text-muted-foreground">Get notified about price changes for your collections</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Secure Trading</h4>
                          <p className="text-sm text-muted-foreground">Buy and sell NFTs directly through our secure platform</p>
                        </div>
                      </div>
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Your Security Matters</AlertTitle>
                      <AlertDescription>
                        We never store your private keys or seed phrases. All wallet connections use 
                        industry-standard security protocols.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </GlassCard>
            </div>
            
            <div>
              <GlassCard className="h-full">
                <h3 className="text-lg font-bold mb-4">Benefits of Connecting</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm">Access to exclusive NFT insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm">Personalized portfolio analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm">Price alerts for watched collections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm">One-click NFT trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm">Gas price optimization</span>
                  </li>
                </ul>
                
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Secure by Design
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our platform never requests or stores your private keys or seed phrases.
                    All connections are read-only by default.
                  </p>
                </div>
                
                <Button className="w-full" onClick={() => setActiveTab('connect')}>
                  Connect Wallet Now
                </Button>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WalletPage;
