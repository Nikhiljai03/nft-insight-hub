
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'glassmorphism backdrop-blur-xl bg-white/80' : 'bg-transparent'
      )}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-display font-bold tracking-tight text-foreground">
              NFT Insight Hub
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="link-underline text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="link-underline text-sm font-medium">
              About
            </Link>
            <a href="#methodology" className="link-underline text-sm font-medium">
              Methodology
            </a>
            <a href="#results" className="link-underline text-sm font-medium">
              Results
            </a>
            <a href="#challenges" className="link-underline text-sm font-medium">
              Challenges
            </a>
          </nav>

          <div className="hidden md:block">
            <Button size="sm" className="rounded-full px-6">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        className={cn(
          'md:hidden absolute w-full glassmorphism backdrop-blur-xl bg-white/90 transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-screen py-6' : 'max-h-0 py-0 overflow-hidden'
        )}
      >
        <div className="container px-4 sm:px-6 flex flex-col space-y-4">
          <Link
            to="/"
            className="block py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <a
            href="#methodology"
            className="block py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Methodology
          </a>
          <a
            href="#results"
            className="block py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Results
          </a>
          <a
            href="#challenges"
            className="block py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Challenges
          </a>
          <Button className="mt-2 w-full rounded-full">Get Started</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
