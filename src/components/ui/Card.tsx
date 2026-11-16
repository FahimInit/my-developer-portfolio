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
        'rounded-2xl border border-line-subtle transition-all duration-300 ease-out will-change-transform',
        glass ? 'bg-glass backdrop-blur-md' : 'bg-elevated',
        interactive &&
          'hover:-translate-y-1 hover:scale-[1.015] hover:border-line-hover hover:shadow-glow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
