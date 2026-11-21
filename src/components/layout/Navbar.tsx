'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { cn } from '@/lib/utils';
import type { ThemeId } from '@/types';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#demos', label: 'Demos' },
  { href: '#skills', label: 'Skills' },
  { href: '#process', label: 'Process' },
  { href: '#services', label: 'Services' },
];

const THEMES: { id: ThemeId; label: string; color: string }[] = [
  { id: 'obsidian', label: 'Cyan', color: 'bg-[#00F0FF]' },
  { id: 'linear', label: 'Indigo', color: 'bg-[#6366F1]' },
  { id: 'emerald', label: 'Emerald', color: 'bg-[#10B981]' },
];

function ThemeDots() {
  const { theme, setTheme } = useTheme();

  return (
    <div role="group" aria-label="Color theme" className="flex items-center gap-2">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          title={t.label}
          aria-label={`${t.label} theme`}
          aria-pressed={theme === t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            'h-3.5 w-3.5 rounded-full border-2 transition',
            t.color,
            theme === t.id
              ? 'scale-110 border-white/80'
              : 'border-transparent opacity-50 hover:opacity-100'
          )}
        />
      ))}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line-subtle bg-glass backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-base font-semibold tracking-tight text-ink-primary">
          Fahim<span className="text-accent-primary">.dev</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition hover:text-ink-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <ThemeDots />
          <a
            href="#estimate"
            className="rounded-lg bg-accent-primary px-3.5 py-1.5 text-xs font-semibold text-[#05080D] transition hover:brightness-110"
          >
            Get a quote
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-ink-primary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line-subtle px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-ink-muted hover:text-ink-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line-subtle pt-4">
            <ThemeDots />
            <a
              href="#estimate"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-accent-primary px-3.5 py-1.5 text-xs font-semibold text-[#05080D]"
            >
              Get a quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
