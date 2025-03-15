
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, PlayCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import TutorialVideo from '@/components/ui/TutorialVideo';

const GetStarted = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Getting Started with NFT Insight Hub
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mb-10">
                Your complete guide to navigating our platform, understanding NFT analytics, 
                and making the most of our tools and resources.
              </p>
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
              title="Getting Started in 3 Simple Steps" 
              subtitle="Follow this guide to start exploring NFT insights and analytics"
              gradient
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary rounded-bl-xl">
                  1
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">Explore Collections</h3>
                  <p className="text-muted-foreground mb-6">
                    Use our search feature to find and analyze specific NFT collections. Browse trending 
                    collections and discover new opportunities in the market.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Search by collection name</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>View floor prices and volumes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Browse collection details</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
              
              <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary rounded-bl-xl">
                  2
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">Analyze Market Data</h3>
                  <p className="text-muted-foreground mb-6">
                    Dive into our interactive charts and analytics tools to understand market trends, 
                    price movements, and trading volumes across the NFT ecosystem.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Review historical price data</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Compare market categories</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Track sales metrics</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
              
              <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary rounded-bl-xl">
                  3
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">Make Informed Decisions</h3>
                  <p className="text-muted-foreground mb-6">
                    Use our insights and research to guide your NFT strategy, whether you're collecting, 
                    creating, or investing in the digital asset space.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Set price alerts</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Download research reports</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Follow emerging trends</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="FAQ" 
              title="Frequently Asked Questions" 
              subtitle="Get answers to common questions about using our platform"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">How do I search for a specific NFT collection?</h3>
                <p className="text-muted-foreground">
                  Use the search bar on the homepage to enter a collection name. You can browse through the results 
                  and click on any collection card to view detailed analytics and insights.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">What does floor price mean?</h3>
                <p className="text-muted-foreground">
                  The floor price is the lowest price at which an NFT from a particular collection is currently 
                  listed for sale on the market. It's an important indicator of the collection's minimum value.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">How often is the data updated?</h3>
                <p className="text-muted-foreground">
                  Our platform refreshes market data every 5 minutes for active collections. Historical data and 
                  research reports are updated daily to ensure you have the most current information.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">Can I set alerts for price changes?</h3>
                <p className="text-muted-foreground">
                  Yes, on any collection detail page, you can click "Set Price Alert" to be notified when a 
                  collection's floor price reaches a certain threshold or changes by a specified percentage.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">How do I interpret the market charts?</h3>
                <p className="text-muted-foreground">
                  Our charts show trends over time, with interactive tooltips that display specific values when 
                  you hover over data points. You can switch between different metrics like volume, floor price, 
                  and sales using the tabs above each chart.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold mb-3">Do you offer API access to the data?</h3>
                <p className="text-muted-foreground">
                  Yes, we provide API access for developers and researchers who want to integrate our data into 
                  their own applications. Visit the API Documentation section for details on endpoints and authentication.
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
