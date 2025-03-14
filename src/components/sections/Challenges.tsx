
import React from 'react';
import { ShieldAlert, Zap, Users } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

const Challenges = () => {
  return (
    <section id="challenges" className="container-section bg-secondary">
      <SectionHeading
        eyebrow="Challenges"
        title="Barriers to NFT Adoption"
        subtitle="Our research identified several key challenges that hinder wider adoption and efficient functioning of the NFT marketplace."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <GlassCard className="lg:col-span-1">
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Security Risks</h3>
            </div>
            
            <div className="space-y-4 mb-6 flex-grow">
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">Spoofing Attacks</h4>
                <p className="text-muted-foreground text-sm">
                  Counterfeit NFTs that mimic legitimate collections, leading to financial losses and reputation damage.
                </p>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">Tampering Vulnerabilities</h4>
                <p className="text-muted-foreground text-sm">
                  Risks to off-chain metadata that can compromise the integrity and value of NFTs.
                </p>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">Marketplace Dependencies</h4>
                <p className="text-muted-foreground text-sm">
                  Centralized points of failure that could affect NFT accessibility and tradability.
                </p>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4 bg-red-50/50">
              <h4 className="font-bold mb-2">Impact Assessment</h4>
              <div className="flex items-center">
                <div className="w-full bg-secondary rounded-full h-2 mr-2">
                  <div className="bg-red-500 rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium">High</span>
              </div>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="lg:col-span-1">
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Usability Issues</h3>
            </div>
            
            <div className="space-y-4 mb-6 flex-grow">
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">High Gas Fees</h4>
                <p className="text-muted-foreground text-sm">
                  Prohibitive transaction costs on Ethereum that limit participation, especially for lower-value NFTs.
                </p>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">Scalability Limitations</h4>
                <p className="text-muted-foreground text-sm">
                  Network congestion during peak periods resulting in delayed transactions and poor user experience.
                </p>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">Technical Barriers</h4>
                <p className="text-muted-foreground text-sm">
                  Complex wallet setup and management processes that discourage non-technical users.
                </p>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4 bg-amber-50/50">
              <h4 className="font-bold mb-2">Impact Assessment</h4>
              <div className="flex items-center">
                <div className="w-full bg-secondary rounded-full h-2 mr-2">
                  <div className="bg-amber-500 rounded-full h-2" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium">Medium-High</span>
              </div>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="lg:col-span-1">
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Market Challenges</h3>
            </div>
            
            <div className="space-y-4 mb-6 flex-grow">
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">Valuation Uncertainty</h4>
                <p className="text-muted-foreground text-sm">
                  Lack of standardized frameworks for determining fair value, leading to price volatility and market inefficiency.
                </p>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">Liquidity Concerns</h4>
                <p className="text-muted-foreground text-sm">
                  Difficulty in selling NFTs outside of popular collections, creating potential for illiquid assets.
                </p>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <h4 className="font-bold mb-2">Market Fragmentation</h4>
                <p className="text-muted-foreground text-sm">
                  Dispersed trading across multiple platforms and blockchains that fragments liquidity and complicates price discovery.
                </p>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-4 bg-blue-50/50">
              <h4 className="font-bold mb-2">Impact Assessment</h4>
              <div className="flex items-center">
                <div className="w-full bg-secondary rounded-full h-2 mr-2">
                  <div className="bg-blue-500 rounded-full h-2" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm font-medium">Medium</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mb-16">
        <h3 className="text-2xl font-bold mb-6">Proposed Solutions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Security Enhancements</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Implementation of on-chain verification systems for authentic NFT collections
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Decentralized storage solutions for metadata to prevent tampering
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Cross-platform authentication standards to reduce marketplace dependencies
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Usability Improvements</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Layer-2 scaling solutions to reduce gas fees and improve transaction speeds
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Simplified wallet interfaces and fiat on-ramps for non-technical users
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Batch transaction mechanisms to optimize gas usage during minting and trading
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Market Efficiency</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Standardized valuation metrics based on rarity, utility, and market activity
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Liquidity pools for NFT trading to address issues with illiquid assets
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Cross-chain bridges to consolidate liquidity across different blockchains
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Regulatory Clarity</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Industry-led standards for transparent disclosure of NFT attributes and rights
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Clear guidelines for intellectual property rights associated with NFTs
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                Consumer protection frameworks tailored to the unique aspects of NFT ownership
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>

      <div className="glassmorphism rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Research-Based Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
              "Security concerns in NFT marketplaces extend beyond smart contract vulnerabilities to include marketplace dependencies that create centralized points of failure."
            </blockquote>
            <p className="text-sm text-right">— Wang, Z., Zhang, L., & Wang, X. (2022)</p>
            
            <p className="mt-6 text-muted-foreground">
              Our research confirms these findings, with 65% of surveyed NFT owners expressing concerns about the long-term accessibility of their assets if marketplace platforms cease operations or change their terms of service.
            </p>
          </div>
          
          <div>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
              "The non-fungible token (NFT) market exhibits unique challenges related to liquidity, with significant disparity between high-value collections and the long tail of the market."
            </blockquote>
            <p className="text-sm text-right">— Ali, O., Momin, M., Shrestha, A., et al. (2023)</p>
            
            <p className="mt-6 text-muted-foreground">
              Our analysis of trading data supports this observation, showing that the top 5% of collections account for over 80% of total trading volume, while the remaining 95% of collections struggle with liquidity issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenges;
