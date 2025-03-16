import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { 
  Wallet, ArrowRight, ShieldCheck, Clock, History, 
  Hexagon, Shield, CreditCard, Info, AlertTriangle 
} from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import blockchainUtils, { NETWORKS } from '@/utils/blockchainUtils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('connect');
  const { wallet, connecting, connectWallet } = useWallet();
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsMetaMaskInstalled(blockchainUtils.isMetaMaskInstalled());
    
    if (wallet) {
      setActiveTab('dashboard');
    }
  }, [wallet]);
  
  const handleConnect = async (provider: string) => {
    try {
      await connectWallet(provider);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };
  
  const InstallMetaMaskAlert = () => (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>MetaMask Not Installed</AlertTitle>
      <AlertDescription>
        <p className="mb-2">MetaMask is not installed in your browser. You need to install it to use this feature.</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.open('https://metamask.io/download.html', '_blank')}
        >
          Install MetaMask
        </Button>
      </AlertDescription>
    </Alert>
  );
  
  const ConnectTab = () => (
    <TabsContent value="connect" className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Choose a Wallet Provider</h3>
      
      {!isMetaMaskInstalled && <InstallMetaMaskAlert />}
      
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
            <Button 
              onClick={() => handleConnect('metamask')} 
              disabled={connecting || !isMetaMaskInstalled}
            >
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
            <Button 
              onClick={() => handleConnect('walletconnect')} 
              disabled={connecting}
              variant="outline"
            >
              Coming Soon
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
            <Button 
              onClick={() => handleConnect('coinbase')} 
              disabled={connecting}
              variant="outline"
            >
              Coming Soon
            </Button>
          </div>
        </GlassCard>
      </div>
    </TabsContent>
  );
  
  const DashboardTab = () => {
    if (!wallet) {
      return (
        <TabsContent value="dashboard" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Wallet Not Connected</AlertTitle>
            <AlertDescription>
              You need to connect a wallet to view your dashboard.
            </AlertDescription>
          </Alert>
          <Button onClick={() => setActiveTab('connect')}>
            Connect Wallet
          </Button>
        </TabsContent>
      );
    }
    
    return (
      <TabsContent value="dashboard" className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <GlassCard className="flex-1">
            <h3 className="text-lg font-bold mb-2">Wallet Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-mono text-sm">{blockchainUtils.formatAddress(wallet.address)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Network:</span>
                <span>
                  {Object.values(NETWORKS).find(n => 
                    'chainId' in n && n.chainId === wallet.chainId
                  )?.name || `Chain ID: ${wallet.chainId}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Balance:</span>
                <span>{wallet.balance} ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Provider:</span>
                <span className="capitalize">{wallet.provider}</span>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="flex-1">
            <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/collections')}
              >
                <History className="mr-2 h-4 w-4" />
                Browse NFT Collections
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(blockchainUtils.getExplorerUrl(wallet.chainId, wallet.address, 'address'), '_blank')}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                View on Explorer
              </Button>
            </div>
          </GlassCard>
        </div>
        
        <GlassCard>
          <h3 className="text-lg font-bold mb-4">Transaction History</h3>
          <div className="text-center py-8 text-muted-foreground">
            <History className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>Your transaction history will appear here</p>
            <p className="text-sm">Coming soon: Transaction history integration</p>
          </div>
        </GlassCard>
      </TabsContent>
    );
  };
  
  const AboutTab = () => (
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
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading 
            eyebrow="Blockchain" 
            title="Wallet Integration" 
            subtitle="Connect your crypto wallet to get the full experience and access all features"
            gradient
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <GlassCard>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="connect">Connect</TabsTrigger>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                  </TabsList>
                  
                  <ConnectTab />
                  <DashboardTab />
                  <AboutTab />
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
                
                <Button 
                  className="w-full" 
                  onClick={() => setActiveTab('connect')}
                  disabled={connecting}
                >
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
