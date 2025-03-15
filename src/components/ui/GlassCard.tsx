
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  delay?: number;
  glowEffect?: boolean;
  glowColor?: 'primary' | 'accent' | 'blue' | 'purple';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  interactive = false,
  delay = 0,
  glowEffect = false,
  glowColor = 'primary'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && delay > 0) {
      const timeout = setTimeout(() => {
        cardRef.current?.classList.add('animate-scale-in');
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Add dynamic shadow effect based on mouse position
    const shadowX = (x - centerX) / 25;
    const shadowY = (y - centerY) / 25;
    
    // Get the appropriate glow color based on the prop
    let shadowColor = 'rgba(139, 92, 246, 0.2)'; // Default purple
    if (glowColor === 'blue') shadowColor = 'rgba(59, 130, 246, 0.2)';
    if (glowColor === 'accent') shadowColor = 'rgba(56, 189, 248, 0.2)';
    if (glowColor === 'primary') shadowColor = 'rgba(147, 51, 234, 0.2)';
    
    card.style.boxShadow = `
      ${shadowX}px ${shadowY}px 20px ${shadowColor},
      0 10px 20px rgba(0, 0, 0, 0.3)
    `;
  };
  
  const handleMouseLeave = () => {
    if (!interactive || !cardRef.current) return;
    
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    card.style.boxShadow = '';
  };

  const getGlowClass = () => {
    if (!glowEffect) return '';
    
    switch (glowColor) {
      case 'blue': return 'animate-pulse-glow-blue';
      case 'accent': return 'animate-pulse-glow-accent';
      case 'purple': return 'animate-pulse-glow-purple';
      default: return 'animate-pulse-glow';
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'glassmorphism rounded-2xl p-6 md:p-8 transition-all duration-300 ease-out',
        delay > 0 && 'opacity-0',
        interactive && 'hover:shadow-xl cursor-pointer',
        getGlowClass(),
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default GlassCard;
