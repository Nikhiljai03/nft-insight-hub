
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp + delay;
      }
      
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      if (progress <= 0) {
        requestAnimationFrame(step);
        return;
      }
      
      // Easing function: easeOutExpo
      const easedProgress = progress === 1
        ? 1
        : 1 - Math.pow(2, -10 * progress);
        
      setCount(easedProgress * end);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [end, duration, delay, isVisible]);
  
  return (
    <div ref={counterRef} className={cn("animate-counter opacity-0", className)}>
      <span className="number-display">
        {prefix}
        {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        {suffix}
      </span>
    </div>
  );
};

export default AnimatedCounter;
