
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 py-24">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse w-full max-w-3xl">
            <div className="h-8 bg-secondary/30 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-secondary/20 rounded mb-6"></div>
            <div className="h-4 bg-secondary/30 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-secondary/30 rounded w-3/4 mb-4"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingState;
