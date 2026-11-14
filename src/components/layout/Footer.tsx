import { ArrowUpRight, Github, ShieldCheck, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface FooterProps {
  upworkUrl: string;
  githubUrl: string;
}

export function Footer({ upworkUrl, githubUrl }: FooterProps) {
  return (
    <footer className="border-t border-line-subtle bg-elevated/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-accent-primary" />
            <span className="text-sm font-semibold text-ink-primary">
              Full-Stack Web Developer · React, Next.js & Node.js Specialist
            </span>
          </div>
          <p className="max-w-xl text-xs text-ink-muted">
            Engineered with Next.js 15 App Router, Strict TypeScript (`noUncheckedIndexedAccess`),
            Zod runtime boundary validation, and CSS-variable multi-theme architecture.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="accent">Next.js 15 App Router</Badge>
            <Badge variant="neutral">Strict TS · 0 any</Badge>
            <Badge variant="emerald">
              <ShieldCheck className="h-3 w-3" />
              Zod Guarded API
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-subtle bg-canvas px-3.5 py-2 text-xs font-medium text-ink-primary transition hover:border-line-hover"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub Source
          </a>
          <a
            href={upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent-primary px-4 py-2 text-xs font-semibold text-[#05080D] shadow-glow-sm transition hover:brightness-110"
          >
            Hire on Upwork
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
