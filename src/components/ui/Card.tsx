import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glass?: boolean;
  children: ReactNode;
}

export function Card({
  interactive = false,
  glass = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line-subtle transition-all duration-200',
        glass ? 'bg-glass backdrop-blur-md' : 'bg-elevated',
        interactive && 'hover:border-line-hover hover:shadow-glow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
