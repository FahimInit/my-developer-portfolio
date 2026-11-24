'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { CodeCard } from '@/features/hero/CodeCard';
import { ParticleField } from '@/features/hero/ParticleField';

interface HeroProps {
  availability: string;
  githubUrl: string;
}

const TYPED_PHRASES = [
  'React, Next.js & Node.',
  'Full-Stack SaaS Apps.',
  'Fast UI & Solid APIs.',
  'Clean TypeScript Code.',
];

export function Hero({ availability, githubUrl }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(TYPED_PHRASES[0] ?? '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPED_PHRASES[phraseIndex] ?? TYPED_PHRASES[0] ?? '';

    const nextTick = () => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else if (displayText.length > 0) {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPED_PHRASES.length);
      }
    };

    const isFullPhrase = !isDeleting && displayText === currentPhrase;
    const delay = isFullPhrase ? 2200 : isDeleting ? 35 : 65;

    const timer = window.setTimeout(nextTick, delay);
    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-line-subtle bg-radial-glow"
    >
      <div className="bg-tech-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* Soft colour blobs behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-accent-glow blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'var(--accent-secondary)' }}
      />

      <ParticleField containerRef={sectionRef} />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-elevated/70 px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {availability}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink-primary sm:text-5xl sm:leading-tight">
            Hi, I&apos;m Fahim.
            <br />
            <span className="text-ink-muted">I build </span>
            <span className="inline-block min-h-[1.2em] bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              {displayText}
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-1 animate-pulse bg-accent-primary"
              />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base text-ink-muted lg:mx-0">
            CS senior and full-stack developer. I turn ideas and Figma designs into fast,
            clean web applications and build the backends behind them.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-5 py-2.5 text-sm font-semibold text-[#05080D] shadow-glow-sm transition hover:shadow-glow hover:brightness-110"
            >
              See my work
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line-subtle bg-elevated/70 px-5 py-2.5 text-sm font-medium text-ink-primary transition hover:border-line-hover"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <CodeCard />
      </div>
    </section>
  );
}
