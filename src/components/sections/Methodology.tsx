
import React from 'react';
import { Database, BarChart, PieChart, Layers } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Methodology = () => {
  return (
    <section id="methodology" className="container-section bg-secondary">
      <SectionHeading
        eyebrow="Methodology"
        title="Our Analytical Approach"
        subtitle="We employ a systematic methodology to collect, process, and visualize NFT data, leveraging multiple APIs and applying robust analytical techniques."
      />

      <Tabs defaultValue="data-collection" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
          <TabsTrigger value="data-collection">Data Collection</TabsTrigger>
          <TabsTrigger value="data-analysis">Data Analysis</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-collection">
          <GlassCard className="mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex items-center justify-center md:w-1/3">
                <Database className="h-32 w-32 text-primary/80" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">API Integration</h3>
                <p className="text-muted-foreground mb-6">
                  We collect comprehensive NFT data through strategic integration with multiple industry-leading APIs, ensuring broad coverage and depth of information.
                </p>
                
                <h4 className="font-bold mb-2">APIs Used:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="glassmorphism rounded-lg p-4 text-center">
                    <span className="font-medium">Alchemy</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4 text-center">
                    <span className="font-medium">OpenSea</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4 text-center">
                    <span className="font-medium">Rarible</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4 text-center">
                    <span className="font-medium">NFTGo</span>
                  </div>
                </div>
                
                <h4 className="font-bold mb-2">Selection Criteria:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                    Multi-blockchain support
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                    Comprehensive data availability
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                    Reliability and performance
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                    Cost-effectiveness
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
        
        <TabsContent value="data-analysis">
          <GlassCard className="mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex items-center justify-center md:w-1/3">
                <BarChart className="h-32 w-32 text-primary/80" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Processing & Analysis</h3>
                <p className="text-muted-foreground mb-6">
                  Our analytical framework processes raw NFT data through various statistical methods to identify patterns, trends, and correlations in the marketplace.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold mb-2">Storage Solution:</h4>
                    <p className="text-muted-foreground">
                      Relational databases with optimized schemas for efficient querying of transaction and metadata information.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Key Metrics:</h4>
                    <p className="text-muted-foreground">
                      Market capitalization, trading volume, price volatility, and liquidity indicators across various NFT categories.
                    </p>
                  </div>
                </div>
                
                <h4 className="font-bold mb-2">Analytical Methods:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glassmorphism rounded-lg p-4">
                    <span className="font-medium">Time Series Analysis</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4">
                    <span className="font-medium">Market Segmentation</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4">
                    <span className="font-medium">Price Prediction Models</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4">
                    <span className="font-medium">Sentiment Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
        
        <TabsContent value="visualization">
          <GlassCard className="mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex items-center justify-center md:w-1/3">
                <PieChart className="h-32 w-32 text-primary/80" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Data Visualization</h3>
                <p className="text-muted-foreground mb-6">
                  We transform complex NFT market data into intuitive visualizations that make trends and insights accessible to all stakeholders.
                </p>
                
                <h4 className="font-bold mb-2">Visualization Tools:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="glassmorphism rounded-lg p-4 text-center">
                    <span className="font-medium">Matplotlib</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4 text-center">
                    <span className="font-medium">Seaborn</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4 text-center">
                    <span className="font-medium">Tableau</span>
                  </div>
                  <div className="glassmorphism rounded-lg p-4 text-center">
                    <span className="font-medium">D3.js</span>
                  </div>
                </div>
                
                <h4 className="font-bold mb-2">Visualization Types:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                    <span className="text-muted-foreground">Interactive time series charts for price and volume trends</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                    <span className="text-muted-foreground">Market distribution heat maps by category and blockchain</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                    <span className="text-muted-foreground">Network graphs showing relationships between collections</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block h-4 w-4 rounded-full bg-primary/20 mt-1 mr-3"></span>
                    <span className="text-muted-foreground">Comparative performance dashboards for top projects</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
      
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard interactive={true} className="text-center p-8">
            <Layers className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Multi-Blockchain Approach</h3>
            <p className="text-muted-foreground">
              Our methodology encompasses data from Ethereum, Solana, Polygon, and other leading NFT blockchains for comprehensive insights.
            </p>
          </GlassCard>
          
          <GlassCard interactive={true} className="text-center p-8">
            <Layers className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Temporal Analysis</h3>
            <p className="text-muted-foreground">
              Longitudinal study of market trends across different time periods to identify seasonal patterns and long-term shifts.
            </p>
          </GlassCard>
          
          <GlassCard interactive={true} className="text-center p-8">
            <Layers className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Stakeholder Perspective</h3>
            <p className="text-muted-foreground">
              Analysis framed through the lens of different market participants: creators, collectors, investors, and platform operators.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
