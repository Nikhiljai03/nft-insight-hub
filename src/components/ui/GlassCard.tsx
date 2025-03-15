
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  delay?: number;
  glowEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  interactive = false,
  delay = 0,
  glowEffect = false,
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
    card.style.boxShadow = `
      ${shadowX}px ${shadowY}px 20px rgba(139, 92, 246, 0.2),
      0 10px 20px rgba(0, 0, 0, 0.3)
    `;
  };
  
  const handleMouseLeave = () => {
    if (!interactive || !cardRef.current) return;
    
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    card.style.boxShadow = '';
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'glassmorphism rounded-2xl p-6 md:p-8 transition-all duration-300 ease-out',
        delay > 0 && 'opacity-0',
        interactive && 'hover:shadow-xl cursor-pointer',
        glowEffect && 'animate-pulse-glow',
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
