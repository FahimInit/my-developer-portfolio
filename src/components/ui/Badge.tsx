import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'accent' | 'emerald' | 'neutral' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pulse?: boolean;
  children: ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  accent:
    'bg-accent-glow text-accent-primary border-accent-primary/30',
  emerald:
    'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  neutral:
    'bg-white/5 text-ink-muted border-line-subtle',
  outline:
    'bg-transparent text-ink-primary border-line-glass',
};

export function Badge({
  variant = 'neutral',
  pulse = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
