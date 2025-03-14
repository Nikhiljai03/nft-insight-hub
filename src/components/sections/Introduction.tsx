
import React from 'react';
import { ExternalLink, Shield, TrendingUp } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const Introduction = () => {
  return (
    <section id="introduction" className="container-section">
      <SectionHeading
        eyebrow="Introduction"
        title="Understanding the NFT Landscape"
        subtitle="Non-fungible tokens (NFTs) have revolutionized digital ownership and created new opportunities for creators, collectors, and investors. Our research explores the evolving market dynamics and challenges."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <GlassCard className="text-center" delay={100}>
          <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Market Analysis</h3>
          <p className="text-muted-foreground">
            Comprehensive analysis of trading volumes, price trends, and market capitalization across major NFT platforms.
          </p>
        </GlassCard>

        <GlassCard className="text-center" delay={200}>
          <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Security Insights</h3>
          <p className="text-muted-foreground">
            Exploration of security challenges, including spoofing, tampering, and marketplace vulnerabilities.
          </p>
        </GlassCard>

        <GlassCard className="text-center" delay={300}>
          <ExternalLink className="mx-auto h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Practical Applications</h3>
          <p className="text-muted-foreground">
            Actionable insights for creators, collectors, and investors navigating the complex NFT ecosystem.
          </p>
        </GlassCard>
      </div>

      <div className="glassmorphism rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Problem Statement</h3>
            <p className="text-muted-foreground mb-6">
              The NFT market is rapidly evolving, but there's a lack of robust tools for comprehensive market analysis. Challenges like high gas fees, security concerns, and scalability hinder participation and understanding.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Objectives</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1.5 mr-3"></span>
                Develop a system to collect, analyze, and visualize NFT data
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1.5 mr-3"></span>
                Address usability and security challenges faced by creators, buyers, and sellers
              </li>
              <li className="flex items-start">
                <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1.5 mr-3"></span>
                Provide actionable insights for stakeholders in the NFT ecosystem
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <AnimatedCounter end={2500000} suffix="+" className="mb-2" />
                <p className="text-sm text-muted-foreground">NFTs Analyzed</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={45} suffix="%" className="mb-2" />
                <p className="text-sm text-muted-foreground">Market Growth YoY</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={4} className="mb-2" />
                <p className="text-sm text-muted-foreground">API Integrations</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={28} suffix="B" prefix="$" className="mb-2" />
                <p className="text-sm text-muted-foreground">Market Size</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
