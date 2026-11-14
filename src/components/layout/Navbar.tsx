'use client';

import { useState } from 'react';
import { Code2, Menu, Sparkles, Terminal, X } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { ThemeId } from '@/types';

const NAV_LINKS = [
  { href: '#architecture', label: 'Architecture' },
  { href: '#projects', label: 'Projects' },
  { href: '#sandboxes', label: 'Sandboxes' },
  { href: '#stack', label: 'Stack' },
  { href: '#packages', label: 'Upwork Packages' },
  { href: '#estimator', label: 'Scope Estimator' },
];

const THEME_OPTIONS: { id: ThemeId; label: string; dotClass: string }[] = [
  { id: 'obsidian', label: 'Obsidian', dotClass: 'bg-[#00F0FF]' },
  { id: 'linear', label: 'Linear', dotClass: 'bg-[#6366F1]' },
  { id: 'emerald', label: 'Emerald', dotClass: 'bg-[#10B981]' },
];

export function Navbar({ availability }: { availability: string }) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line-subtle bg-glass backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-2.5 focus-visible:outline-none"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line-hover bg-elevated text-accent-primary shadow-glow-sm transition group-hover:scale-105">
            <Terminal className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-primary">
              DevArchitect
              <Code2 className="h-3.5 w-3.5 text-accent-primary" />
            </span>
            <span className="block font-mono text-[11px] text-ink-muted">
              React · Next.js · Node.js
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:bg-white/5 hover:text-ink-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Theme Switcher + Availability */}
        <div className="hidden items-center gap-3 md:flex">
          <div
            role="group"
            aria-label="Color theme switcher"
            className="flex items-center rounded-xl border border-line-subtle bg-elevated/90 p-1"
          >
            {THEME_OPTIONS.map((opt) => {
              const active = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition',
                    active
                      ? 'bg-white/10 text-ink-primary shadow-sm'
                      : 'text-ink-muted hover:text-ink-primary'
                  )}
                >
                  <span className={cn('h-2 w-2 rounded-full', opt.dotClass)} />
                  {opt.label}
                </button>
              );
            })}
          </div>

          <Badge variant="emerald" pulse className="hidden xl:inline-flex">
            {availability}
          </Badge>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="rounded-lg border border-line-subtle bg-elevated p-2 text-ink-primary lg:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-line-subtle bg-elevated/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-white/5 hover:text-ink-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line-subtle pt-4">
            <div className="flex items-center gap-1 rounded-xl border border-line-subtle bg-canvas p-1">
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition',
                    theme === opt.id
                      ? 'bg-white/10 text-ink-primary'
                      : 'text-ink-muted'
                  )}
                >
                  <span className={cn('h-2 w-2 rounded-full', opt.dotClass)} />
                  {opt.label}
                </button>
              ))}
            </div>

            <Badge variant="emerald" pulse>
              <Sparkles className="h-3 w-3" />
              {availability}
            </Badge>
          </div>
        </div>
      )}
    </header>
  );
}
