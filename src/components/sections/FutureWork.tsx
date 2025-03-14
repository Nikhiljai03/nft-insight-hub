
import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

const FutureWork = () => {
  return (
    <section id="future-work" className="container-section">
      <SectionHeading
        eyebrow="Conclusion"
        title="Future Directions & Applications"
        subtitle="Our research has laid the groundwork for continued exploration and development of NFT analytics tools and methodologies."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <GlassCard>
          <h3 className="text-2xl font-bold mb-6">Summary of Findings</h3>
          
          <div className="space-y-6 text-muted-foreground">
            <p>
              Our comprehensive analysis of NFTs on the blockchain has provided valuable insights into market trends, challenges, and potential applications. We've established a systematic approach to collecting and analyzing NFT data through multiple APIs, enabling deeper understanding of this evolving ecosystem.
            </p>
            
            <p>
              Key findings include the identification of cyclical market patterns, the growing importance of utility beyond collectibility, and the critical security and usability challenges that must be addressed for wider adoption. The transition from purely speculative activity to more sustainable collector behavior indicates market maturation.
            </p>
            
            <p>
              The research also highlights the importance of cross-chain interoperability, standardized valuation frameworks, and improved security measures as essential components for the future growth of the NFT space.
            </p>
          </div>
        </GlassCard>
        
        <GlassCard>
          <h3 className="text-2xl font-bold mb-6">Contributions</h3>
          
          <div className="space-y-4">
            <div className="glassmorphism rounded-lg p-4">
              <h4 className="font-bold mb-2">Analytical Framework</h4>
              <p className="text-muted-foreground text-sm">
                A comprehensive methodology for collecting, processing, and visualizing NFT data across multiple blockchains and marketplaces.
              </p>
            </div>
            
            <div className="glassmorphism rounded-lg p-4">
              <h4 className="font-bold mb-2">Market Insights</h4>
              <p className="text-muted-foreground text-sm">
                Data-driven analysis of market trends, category distribution, and user behavior patterns to inform decision-making.
              </p>
            </div>
            
            <div className="glassmorphism rounded-lg p-4">
              <h4 className="font-bold mb-2">Challenge Identification</h4>
              <p className="text-muted-foreground text-sm">
                Systematic assessment of security, usability, and market challenges with proposed solutions based on empirical evidence.
              </p>
            </div>
            
            <div className="glassmorphism rounded-lg p-4">
              <h4 className="font-bold mb-2">Stakeholder Guidance</h4>
              <p className="text-muted-foreground text-sm">
                Actionable insights and recommendations for creators, collectors, investors, and platform operators in the NFT ecosystem.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mb-16">
        <h3 className="text-2xl font-bold mb-6">Future Research Directions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glassmorphism rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-bold mb-3">Emerging Blockchains</h4>
            <p className="text-muted-foreground mb-4">
              Expand analysis to include NFTs on emerging layer-1 and layer-2 blockchain solutions with unique technical characteristics and market dynamics.
            </p>
            <a href="#" className="inline-flex items-center text-primary font-medium">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="glassmorphism rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-bold mb-3">AI-Enhanced Analytics</h4>
            <p className="text-muted-foreground mb-4">
              Integrate machine learning algorithms to predict market trends, identify undervalued assets, and detect anomalous trading patterns or potential security threats.
            </p>
            <a href="#" className="inline-flex items-center text-primary font-medium">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="glassmorphism rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-bold mb-3">Interoperability Standards</h4>
            <p className="text-muted-foreground mb-4">
              Research and develop cross-chain standards for NFT metadata, ownership verification, and trading to improve market efficiency and asset liquidity.
            </p>
            <a href="#" className="inline-flex items-center text-primary font-medium">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </GlassCard>

      <div className="glassmorphism rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Join Our Research Community</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Connect with researchers, developers, and industry professionals working to advance NFT analytics, security, and usability. Contribute to open-source tools and collaborate on future research initiatives.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full px-8">
            Subscribe to Updates
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            Access Research Papers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FutureWork;
