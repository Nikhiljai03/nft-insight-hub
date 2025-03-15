
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  gradient?: boolean;
  size?: 'default' | 'large' | 'small';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
  gradient = false,
  size = 'default'
}) => {
  return (
    <div className={cn(
      'mb-12 md:mb-16',
      centered && 'text-center',
      className
    )}>
      {eyebrow && (
        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/20 text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className={cn(
        "section-title",
        gradient && "text-gradient",
        size === 'large' && "text-4xl md:text-5xl lg:text-6xl",
        size === 'small' && "text-2xl md:text-3xl lg:text-4xl",
        gradient && "animate-pulse-subtle"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "section-subtitle",
          size === 'large' && "text-xl md:text-2xl",
          size === 'small' && "text-base md:text-lg"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
