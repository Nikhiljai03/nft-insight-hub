
import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import ChartSection from '@/components/ui/ChartSection';

const Results = () => {
  return (
    <section id="results" className="container-section">
      <SectionHeading
        eyebrow="Results & Discussion"
        title="Key Market Insights"
        subtitle="Our comprehensive analysis reveals important trends in the NFT marketplace, highlighting opportunities and challenges for stakeholders."
      />

      <div className="mb-16">
        <ChartSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <GlassCard>
          <h3 className="text-2xl font-bold mb-4">Market Capitalization Trends</h3>
          <p className="text-muted-foreground mb-6">
            Analysis of market capitalization reveals cyclical patterns with significant growth in Q3-Q4, followed by consolidation in Q1. Art and collectible NFTs maintain the largest market share, while gaming NFTs show the fastest growth rate.
          </p>
          
          <div className="space-y-4">
            <div className="glassmorphism rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Art NFTs</span>
                <span className="text-sm text-primary">45% Market Share</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Collectibles</span>
                <span className="text-sm text-primary">30% Market Share</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Gaming Assets</span>
                <span className="text-sm text-primary">15% Market Share</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Metaverse Land</span>
                <span className="text-sm text-primary">10% Market Share</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard>
          <h3 className="text-2xl font-bold mb-4">Trading Activity Insights</h3>
          <p className="text-muted-foreground mb-6">
            Trading volume analysis indicates a correlation between marketplace promotions and activity spikes. The average holding period for NFTs has increased from 45 days to 72 days over the past year, suggesting a shift from speculative to collector-focused behavior.
          </p>
          
          <div className="space-y-4">
            <div className="glassmorphism rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">Daily Active Users</span>
              <div className="flex items-center">
                <span className="font-bold mr-2">78,500</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">+12.4%</span>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">Average Transaction Value</span>
              <div className="flex items-center">
                <span className="font-bold mr-2">$1,240</span>
                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">-3.6%</span>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">New Collections (Monthly)</span>
              <div className="flex items-center">
                <span className="font-bold mr-2">1,850</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">+8.2%</span>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">Average Holding Period</span>
              <div className="flex items-center">
                <span className="font-bold mr-2">72 days</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">+60%</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mb-16">
        <h3 className="text-2xl font-bold mb-6">Implications for Stakeholders</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-3">For Creators</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Focus on building long-term community engagement over short-term sales
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Explore multi-chain deployment to reduce gas costs and reach wider audiences
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Implement robust security measures to protect intellectual property
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-3">For Collectors</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Diversify collections across different categories and blockchains
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Prioritize projects with strong fundamentals and active development
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Use analytical tools to identify undervalued assets with growth potential
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-3">For Platforms</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Enhance security measures to prevent spoofing and tampering attacks
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Implement solutions to reduce gas fees and improve transaction speeds
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Develop better discovery mechanisms for niche collections
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>

      <div className="glassmorphism rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Key Research Findings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col h-full">
            <h4 className="text-xl font-bold mb-3">Market Evolution</h4>
            <p className="text-muted-foreground mb-4">
              Our research indicates that the NFT market is transitioning from a speculative phase to a more mature ecosystem with emphasis on utility and long-term value. The dramatic price volatility observed in early 2021-2022 has stabilized, giving way to more sustainable growth patterns.
            </p>
            <p className="text-muted-foreground">
              This maturation is accompanied by increasing institutional adoption, with major brands, entertainment companies, and traditional art galleries entering the space with strategic long-term investments.
            </p>
          </div>
          
          <div className="flex flex-col h-full">
            <h4 className="text-xl font-bold mb-3">Future Directions</h4>
            <p className="text-muted-foreground mb-4">
              Cross-chain interoperability emerges as a critical factor for continued market growth. Projects that enable seamless movement of NFTs between blockchains show significantly higher user engagement and trading activity.
            </p>
            <p className="text-muted-foreground">
              Additionally, our data suggests that NFTs with clear utility beyond collectibility—such as access rights, governance, or integration with virtual worlds—maintain value better during market downturns and attract more diverse investor profiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
