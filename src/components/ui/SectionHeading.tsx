
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  gradient?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
  gradient = false,
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
        gradient && "text-gradient"
      )}>
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
