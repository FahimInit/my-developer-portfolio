import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/config/projects';

const k = 'text-purple-400';
const p = 'text-sky-300';
const s = 'text-emerald-300';
const m = 'text-ink-muted';

export function CodeCard() {
  // PROJECTS is ordered newest-first, so index 0 (or first live app) is always the latest.
  const latest = PROJECTS.find((proj) => Boolean(proj.liveUrl)) ?? PROJECTS[0];
  const latestHref = latest?.liveUrl ?? latest?.githubUrl;

  return (
    <div className="relative mx-auto w-full max-w-md animate-float-slow">
      <div className="overflow-hidden rounded-2xl border border-line-glass bg-elevated/90 shadow-2xl shadow-black/50 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-line-subtle px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-xs text-ink-muted">about.ts</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/me.jpeg"
              alt="Md. Fahim Muhtashim"
              className="h-6 w-6 rounded-full border border-line-hover object-cover"
            />
            <span className="font-mono text-[11px] text-ink-muted">AIUB · CSE</span>
          </div>
        </div>

        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
          <code>
            <span className={k}>const</span> <span className="text-ink-primary">fahim</span>{' '}
            <span className={m}>=</span> <span className={m}>{'{'}</span>
            {'\n'}
            {'  '}<span className={p}>role</span><span className={m}>:</span>{' '}
            <span className={s}>&apos;Full-stack developer&apos;</span><span className={m}>,</span>
            {'\n'}
            {'  '}<span className={p}>degree</span><span className={m}>:</span>{' '}
            <span className={s}>&apos;BSc. in CS &amp; Engineering&apos;</span><span className={m}>,</span>
            {'\n'}
            {'  '}<span className={p}>stack</span><span className={m}>: [</span>
            <span className={s}>&apos;React&apos;</span><span className={m}>, </span>
            <span className={s}>&apos;Next.js&apos;</span><span className={m}>, </span>
            <span className={s}>&apos;Node&apos;</span><span className={m}>],</span>
            {'\n'}
            {'  '}<span className={p}>available</span><span className={m}>:</span>{' '}
            <span className="text-amber-300">true</span><span className={m}>,</span>
            {'\n'}
            <span className={m}>{'};'}</span>
          </code>
        </pre>
      </div>

      {latest && latestHref && (
        <a
          href={latestHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-xl border border-line-glass bg-elevated px-4 py-3 shadow-xl shadow-black/40 transition hover:border-line-hover sm:-left-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span>
            <span className="block text-[11px] text-ink-muted">Latest live app</span>
            <span className="block text-sm font-medium text-ink-primary">{latest.title}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-ink-muted" />
        </a>
      )}
    </div>
  );
}
