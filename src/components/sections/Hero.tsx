
import React, { useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = clientX / innerWidth - 0.5;
      const moveY = clientY / innerHeight - 0.5;
      
      const offsetX = moveX * 20;
      const offsetY = moveY * 20;
      
      heroRef.current.style.setProperty('--move-x', `${offsetX}px`);
      heroRef.current.style.setProperty('--move-y', `${offsetY}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 25%, rgba(var(--primary), 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(var(--accent), 0.1) 0%, transparent 50%)
        `,
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute pointer-events-none inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute rounded-full w-[20rem] h-[20rem] bg-primary/5 top-[-5rem] right-[-5rem] blur-3xl transform translate-x-[calc(var(--move-x)*-1)] translate-y-[calc(var(--move-y)*-1)]" />
        <div className="absolute rounded-full w-[25rem] h-[25rem] bg-primary/10 bottom-[-10rem] left-[-10rem] blur-3xl transform translate-x-[var(--move-x)] translate-y-[var(--move-y)]" />
      </div>

      <div className="container max-w-6xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary animate-fade-in">
          NFT Market Analysis
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tight max-w-4xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Analyzing NFTs on the Blockchain
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Market Insights, Challenges, and Applications for the Future of Digital Ownership
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Button size="lg" className="rounded-full px-8">
            Explore Insights
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            View Methodology
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#introduction" aria-label="Scroll down">
          <ArrowDownCircle className="h-10 w-10 text-primary/70" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
