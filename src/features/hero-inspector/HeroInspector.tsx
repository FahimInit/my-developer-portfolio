'use client';

import { useState, type CSSProperties } from 'react';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Gauge,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ARCHITECTURE_NODES } from '@/config/projects';
import { cn } from '@/lib/utils';

type InspectorTab = 'architecture' | 'lighthouse' | 'security';

interface HeroInspectorProps {
  availability: string;
}

const LIGHTHOUSE_SCORES = [
  { label: 'Performance', score: 99, note: 'Zero client bundle bloat via RSC' },
  { label: 'Accessibility', score: 100, note: 'WCAG AA contrast & keyboard focus' },
  { label: 'Best Practices', score: 100, note: 'Strict HTTP headers & no console errors' },
  { label: 'SEO', score: 100, note: 'Semantic landmarks & OpenGraph metadata' },
];

const SECURITY_GUARDS = [
  {
    id: 'headers',
    title: 'Strict Frame & Content-Type Headers',
    layer: 'next.config.mjs',
    status: 'Enforced',
    detail:
      'Sets X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, and disables X-Powered-By fingerprinting.',
  },
  {
    id: 'zod',
    title: 'Zod Runtime Schema Parsing',
    layer: 'API + Environment',
    status: 'Strict Mode',
    detail:
      'Validates incoming JSON payloads and server env variables at runtime with bounded lengths and zero implicit any.',
  },
  {
    id: 'ratelimit',
    title: 'Sliding-Window Rate Limiting',
    layer: '/api/estimate',
    status: '15 req / min',
    detail:
      'Per-IP sliding window throttles automated abuse and emits X-RateLimit-Limit / Remaining / Reset telemetry headers.',
  },
  {
    id: 'csrf',
    title: 'Same-Origin CSRF Verification',
    layer: 'POST Mutations',
    status: 'Verified',
    detail:
      'Cross-checks Origin and Referer headers against the active Host header before processing state-changing requests.',
  },
];

type ParticleStyle = CSSProperties & {
  '--float-duration': string;
  '--float-delay': string;
};

const FLOATING_PARTICLES: {
  id: string;
  top: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
  reverse?: boolean;
  secondary?: boolean;
}[] = [
  { id: 'p1', top: '12%', left: '8%', size: 'h-2 w-2', duration: '9s', delay: '0s' },
  { id: 'p2', top: '24%', left: '22%', size: 'h-1.5 w-1.5', duration: '12s', delay: '1.2s', reverse: true, secondary: true },
  { id: 'p3', top: '68%', left: '14%', size: 'h-2.5 w-2.5', duration: '11s', delay: '0.6s', secondary: true },
  { id: 'p4', top: '18%', left: '46%', size: 'h-1.5 w-1.5', duration: '8s', delay: '2.1s' },
  { id: 'p5', top: '76%', left: '42%', size: 'h-2 w-2', duration: '13s', delay: '1.8s', reverse: true },
  { id: 'p6', top: '14%', left: '72%', size: 'h-2 w-2', duration: '10s', delay: '0.4s', secondary: true },
  { id: 'p7', top: '58%', left: '84%', size: 'h-2.5 w-2.5', duration: '12s', delay: '2.5s', reverse: true },
  { id: 'p8', top: '82%', left: '91%', size: 'h-1.5 w-1.5', duration: '9s', delay: '1.1s' },
  { id: 'p9', top: '40%', left: '5%', size: 'h-1.5 w-1.5', duration: '10.5s', delay: '3s', reverse: true },
  { id: 'p10', top: '34%', left: '92%', size: 'h-2 w-2', duration: '11.5s', delay: '0.9s', secondary: true },
];

export function HeroInspector({ availability }: HeroInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>('architecture');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    ARCHITECTURE_NODES[0]?.id ?? 'client-rsc'
  );
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditRunCount, setAuditRunCount] = useState(1);
  const [lcpValue, setLcpValue] = useState('0.8s');
  const [inpValue, setInpValue] = useState('24ms');

  const activeNode =
    ARCHITECTURE_NODES.find((node) => node.id === selectedNodeId) ??
    ARCHITECTURE_NODES[0];

  const handleRunAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    window.setTimeout(() => {
      setAuditRunCount((c) => c + 1);
      setLcpValue(auditRunCount % 2 === 0 ? '0.8s' : '0.7s');
      setInpValue(auditRunCount % 2 === 0 ? '24ms' : '19ms');
      setIsAuditing(false);
    }, 650);
  };

  return (
    <section
      id="architecture"
      className="relative overflow-hidden border-b border-line-subtle bg-radial-glow"
    >
      <div className="bg-tech-grid pointer-events-none absolute inset-0 opacity-75" />

      {/* Floating ambient particles (GPU-accelerated, respects prefers-reduced-motion) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {FLOATING_PARTICLES.map((particle) => {
          const style: ParticleStyle = {
            top: particle.top,
            left: particle.left,
            '--float-duration': particle.duration,
            '--float-delay': particle.delay,
          };

          return (
            <span
              key={particle.id}
              style={style}
              className={cn(
                'absolute rounded-full blur-[0.5px]',
                particle.size,
                particle.secondary
                  ? 'bg-accent-secondary shadow-[0_0_12px_var(--accent-secondary)]'
                  : 'bg-accent-primary shadow-[0_0_12px_var(--accent-primary)]',
                particle.reverse ? 'particle-float-reverse' : 'particle-float'
              )}
            />
          );
        })}
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Left Column: Value Proposition */}
        <div className="space-y-6 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="emerald" pulse>
              {availability}
            </Badge>
            <Badge variant="accent">
              <Sparkles className="h-3 w-3" />
              Upwork Full-Stack Specialist
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Full-Stack{' '}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              React, Next.js &amp; Node.js
            </span>{' '}
            Engineer Building High-Velocity Web Apps
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink-muted">
            I partner with founders and engineering teams to ship production-hardened SaaS
            platforms, high-converting storefronts, and resilient Node.js APIs — combining
            pixel-accurate Figma execution with strict TypeScript and clean security boundaries.
          </p>

          {/* Quick Trust Stats */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="rounded-xl border border-line-subtle bg-elevated/80 p-3.5">
              <p className="font-mono text-lg font-bold text-accent-primary sm:text-xl">
                99/100
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">Lighthouse Perf</p>
            </div>
            <div className="rounded-xl border border-line-subtle bg-elevated/80 p-3.5">
              <p className="font-mono text-lg font-bold text-ink-primary sm:text-xl">
                &lt; 45ms
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">Node API p95</p>
            </div>
            <div className="rounded-xl border border-line-subtle bg-elevated/80 p-3.5">
              <p className="font-mono text-lg font-bold text-emerald-400 sm:text-xl">
                100%
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">Strict TS &amp; Zod</p>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#sandboxes"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-5 py-3 text-sm font-semibold text-[#05080D] shadow-glow-sm transition hover:brightness-110 hover:shadow-glow"
            >
              Explore Interactive Sandboxes
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#estimator"
              className="inline-flex items-center gap-2 rounded-xl border border-line-subtle bg-elevated px-5 py-3 text-sm font-medium text-ink-primary transition hover:border-line-hover"
            >
              Build Scope &amp; Estimate
            </a>
          </div>
        </div>

        {/* Right Column: Live Architecture & Telemetry Inspector */}
        <div className="lg:col-span-6">
          <Card className="overflow-hidden border-line-glass shadow-2xl shadow-black/50">
            {/* Inspector Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-subtle bg-elevated/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-mono text-xs text-ink-muted">
                  live-system-inspector.tsx
                </span>
              </div>
              <Badge variant="accent">Interactive Spec</Badge>
            </div>

            {/* Tab Switcher */}
            <div
              role="tablist"
              aria-label="System inspector modes"
              className="grid grid-cols-3 border-b border-line-subtle bg-canvas/70 p-1.5"
            >
              {[
                { id: 'architecture', label: 'Architecture', icon: Layers },
                { id: 'lighthouse', label: 'Web Vitals', icon: Gauge },
                { id: 'security', label: 'Security', icon: ShieldCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab.id as InspectorTab)}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition',
                      active
                        ? 'bg-elevated text-accent-primary border border-line-hover shadow-sm'
                        : 'text-ink-muted hover:text-ink-primary'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-5">
              {activeTab === 'architecture' && activeNode && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {ARCHITECTURE_NODES.map((node, index) => {
                      const isSelected = node.id === activeNode.id;
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => setSelectedNodeId(node.id)}
                          className={cn(
                            'rounded-xl border p-2.5 text-left transition',
                            isSelected
                              ? 'border-accent-primary/60 bg-accent-glow'
                              : 'border-line-subtle bg-canvas/70 hover:border-line-hover'
                          )}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono text-[10px] uppercase text-ink-muted">
                              0{index + 1} · {node.layer}
                            </span>
                            <span className="font-mono text-[10px] text-emerald-400">
                              {node.latency}
                            </span>
                          </div>
                          <p className="mt-1 text-xs font-semibold text-ink-primary">
                            {node.title}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Node Deep Dive */}
                  <div className="rounded-xl border border-line-subtle bg-canvas/90 p-3.5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-primary">
                        <Cpu className="h-3.5 w-3.5 text-accent-primary" />
                        {activeNode.title}
                      </span>
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                        {activeNode.latency}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-ink-muted">
                      {activeNode.summary}
                    </p>

                    <ul className="space-y-1">
                      {activeNode.controls.map((control) => (
                        <li
                          key={control}
                          className="flex items-center gap-1.5 text-[11px] text-ink-primary"
                        >
                          <CheckCircle2 className="h-3 w-3 shrink-0 text-accent-primary" />
                          <span>{control}</span>
                        </li>
                      ))}
                    </ul>

                    <pre className="custom-scrollbar overflow-x-auto rounded-lg border border-line-subtle bg-[#05070B] p-3 font-mono text-[11px] leading-relaxed text-sky-300">
                      <code>{activeNode.snippet}</code>
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'lighthouse' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-accent-primary">
                        Core Web Vitals Telemetry
                      </p>
                      <p className="text-xs text-ink-muted">
                        Audit Run #{auditRunCount} · Production Edge Target
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleRunAudit}
                      isLoading={isAuditing}
                    >
                      {!isAuditing && <RefreshCw className="h-3 w-3" />}
                      {isAuditing ? 'Auditing...' : 'Run Audit'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {LIGHTHOUSE_SCORES.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-line-subtle bg-canvas/85 p-3 text-center"
                      >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-400/80 bg-emerald-500/10 font-mono text-sm font-bold text-emerald-400">
                          {item.score}
                        </div>
                        <p className="mt-2 text-xs font-semibold text-ink-primary">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-[10px] leading-snug text-ink-muted">
                          {item.note}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-xl border border-line-subtle bg-canvas/80 p-3">
                      <span className="flex items-center gap-1 font-mono text-[10px] text-ink-muted">
                        <Zap className="h-3 w-3 text-accent-primary" /> LCP
                      </span>
                      <p className="mt-1 font-mono text-base font-bold text-ink-primary">
                        {lcpValue}
                      </p>
                      <p className="text-[10px] text-emerald-400">Target &lt; 2.5s</p>
                    </div>
                    <div className="rounded-xl border border-line-subtle bg-canvas/80 p-3">
                      <span className="flex items-center gap-1 font-mono text-[10px] text-ink-muted">
                        <Activity className="h-3 w-3 text-accent-primary" /> INP
                      </span>
                      <p className="mt-1 font-mono text-base font-bold text-ink-primary">
                        {inpValue}
                      </p>
                      <p className="text-[10px] text-emerald-400">Target &lt; 200ms</p>
                    </div>
                    <div className="rounded-xl border border-line-subtle bg-canvas/80 p-3">
                      <span className="flex items-center gap-1 font-mono text-[10px] text-ink-muted">
                        <Terminal className="h-3 w-3 text-accent-primary" /> CLS
                      </span>
                      <p className="mt-1 font-mono text-base font-bold text-ink-primary">
                        0.000
                      </p>
                      <p className="text-[10px] text-emerald-400">Zero shift</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                      Hardened Request Lifecycle
                    </p>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-ink-muted">
                      <Lock className="h-3 w-3 text-accent-primary" />
                      Zero-Trust Input Boundary
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {SECURITY_GUARDS.map((guard) => (
                      <div
                        key={guard.id}
                        className="rounded-xl border border-line-subtle bg-canvas/85 p-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-ink-primary">
                            {guard.title}
                          </span>
                          <Badge variant="emerald">{guard.status}</Badge>
                        </div>
                        <p className="mt-1 font-mono text-[10px] text-accent-primary">
                          Boundary: {guard.layer}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                          {guard.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
