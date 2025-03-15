
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Introduction from '@/components/sections/Introduction';
import Methodology from '@/components/sections/Methodology';
import Results from '@/components/sections/Results';
import Challenges from '@/components/sections/Challenges';
import FutureWork from '@/components/sections/FutureWork';
import ChartSection from '@/components/ui/ChartSection';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BookOpen, Download } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Introduction />
        
        {/* Research Papers Section */}
        <section className="py-16 bg-muted/20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="Literature" 
              title="Research Background" 
              subtitle="Our analysis builds on existing research in the NFT space, focusing on security challenges and market dynamics."
              gradient
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard className="h-full" glowEffect>
                <h3 className="text-xl font-bold mb-4">Security Research</h3>
                <p className="text-muted-foreground mb-6">
                  Ma, K., Huang, J., He, N., et al. (2023) explored key security vulnerabilities across NFT marketplaces, identifying spoofing, tampering, and DoS attacks as primary concerns.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-accent">Security Analysis</span>
                  <Button variant="ghost" size="sm" className="group">
                    <span>Read Paper</span>
                    <ArrowUpRight className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
              </GlassCard>
              
              <GlassCard className="h-full" glowEffect>
                <h3 className="text-xl font-bold mb-4">Market Dynamics</h3>
                <p className="text-muted-foreground mb-6">
                  Wang, Q., Li, R., Wang, Q., & Chen, S. (2021) provided an overview of NFT technology and future directions, highlighting the correlation between market activities and blockchain developments.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-accent">Market Analysis</span>
                  <Button variant="ghost" size="sm" className="group">
                    <span>Read Paper</span>
                    <ArrowUpRight className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
        
        <Methodology />
        
        {/* Interactive Data Section */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="Analytics" 
              title="Interactive Market Data"
              subtitle="Explore our comprehensive dataset of NFT market trends and patterns."
            />
            
            <ChartSection />
            
            <div className="mt-12 text-center">
              <Button className="mr-4">
                <Download className="mr-2 h-4 w-4" />
                Download Full Report
              </Button>
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                API Documentation
              </Button>
            </div>
          </div>
        </section>
        
        <Results />
        <Challenges />
        <FutureWork />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
