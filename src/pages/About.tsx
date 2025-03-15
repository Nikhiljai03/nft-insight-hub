
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { FileText, Users, Shield, Lightbulb } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                About NFT Insight Hub
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mb-10">
                We provide comprehensive analysis and insights into the NFT marketplace, helping collectors, 
                creators, and investors make informed decisions in the digital asset space.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8">
                  Our Mission
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 bg-muted/20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="Our Mission" 
              title="What Drives Us" 
              subtitle="We're committed to bringing transparency and clarity to the NFT ecosystem."
              gradient
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <GlassCard className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Data-Driven Insights</h3>
                  <p className="text-muted-foreground flex-grow">
                    We aggregate and analyze data from across the NFT landscape to provide comprehensive insights that
                    help our users understand market trends, identify opportunities, and make informed decisions.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Community Education</h3>
                  <p className="text-muted-foreground flex-grow">
                    We believe in empowering the NFT community through education. Our resources help both newcomers and
                    experienced collectors understand the technology, trends, and best practices in the space.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Security Advocacy</h3>
                  <p className="text-muted-foreground flex-grow">
                    Security is paramount in the NFT space. We research and highlight best practices for securing digital
                    assets and help users understand and mitigate risks in the market.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Innovation Focus</h3>
                  <p className="text-muted-foreground flex-grow">
                    The NFT space is constantly evolving. We track emerging trends, new technologies, and innovative
                    use cases to help our community stay at the forefront of this dynamic market.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading 
              eyebrow="Our Team" 
              title="The People Behind NFT Insight Hub" 
              subtitle="A dedicated team of researchers, data analysts, and blockchain experts."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-muted">
                  <img 
                    src="https://via.placeholder.com/200x200" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Alex Morgan</h3>
                <p className="text-primary">Founder & Lead Researcher</p>
                <p className="text-muted-foreground mt-4">
                  Blockchain specialist with a background in data science and market analysis.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-muted">
                  <img 
                    src="https://via.placeholder.com/200x200" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Samantha Chen</h3>
                <p className="text-primary">Data Analytics Lead</p>
                <p className="text-muted-foreground mt-4">
                  Expert in blockchain analytics and visualization of complex market trends.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-muted">
                  <img 
                    src="https://via.placeholder.com/200x200" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Marcus Johnson</h3>
                <p className="text-primary">Security Researcher</p>
                <p className="text-muted-foreground mt-4">
                  Specializes in smart contract security and NFT marketplace analysis.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
