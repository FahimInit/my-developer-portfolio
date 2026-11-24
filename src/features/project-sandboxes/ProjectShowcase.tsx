'use client';

import { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Github,
  Package,
  Play,
  ShoppingBag,
  Sliders,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECTS } from '@/config/projects';
import { AnalyticsSandbox } from '@/features/project-sandboxes/AnalyticsSandbox';
import { EcommerceSandbox } from '@/features/project-sandboxes/EcommerceSandbox';
import { VisualizerSandbox } from '@/features/project-sandboxes/VisualizerSandbox';
import { cn } from '@/lib/utils';
import type { DemoType, ProjectSpec } from '@/types';

const DEMO_TABS: { id: DemoType; label: string; icon: typeof ShoppingBag }[] = [
  { id: 'ecommerce', label: 'Aura store', icon: ShoppingBag },
  { id: 'visualizer', label: 'SpatialAI', icon: Sliders },
  { id: 'analytics', label: 'PulseMetrics', icon: BarChart3 },
];

const PREVIEW: Record<string, { gradient: string; icon: typeof Users; iconColor: string }> = {
  'learnsphere-lms': {
    gradient: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    icon: BookOpen,
    iconColor: 'text-emerald-300',
  },
  'inventory-order-manager': {
    gradient: 'from-indigo-500/25 via-blue-500/10 to-transparent',
    icon: Package,
    iconColor: 'text-indigo-300',
  },
  'multi-tenant-saas': {
    gradient: 'from-cyan-500/25 via-sky-500/10 to-transparent',
    icon: Users,
    iconColor: 'text-cyan-300',
  },
};

const FALLBACK_PREVIEW = PREVIEW['learnsphere-lms']!;

function renderDemo(type: DemoType) {
  switch (type) {
    case 'ecommerce':
      return <EcommerceSandbox />;
    case 'visualizer':
      return <VisualizerSandbox />;
    case 'analytics':
      return <AnalyticsSandbox />;
  }
}

function getScreenshotSources(liveUrl: string): string[] {
  const encoded = encodeURIComponent(liveUrl);
  return [
    `https://s0.wp.com/mshots/v1/${encoded}?w=1200&h=750`,
    `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url`,
  ];
}

function getHostname(url?: string): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function ProjectPreview({
  project,
  featured = false,
}: {
  project: ProjectSpec;
  featured?: boolean;
}) {
  const style = PREVIEW[project.id] ?? FALLBACK_PREVIEW;
  const Icon = style.icon;
  const sources = [
    ...(project.previewImage ? [project.previewImage] : []),
    ...(project.liveUrl ? getScreenshotSources(project.liveUrl) : []),
  ];
  const [sourceIdx, setSourceIdx] = useState(0);
  const [loaded, setLoaded] = useState(Boolean(project.previewImage));

  const activeSrc = sources[sourceIdx];
  const hostname = getHostname(project.liveUrl);

  return (
    <div
      className={cn(
        'relative overflow-hidden border-b border-line-subtle bg-gradient-to-br',
        featured ? 'h-56 sm:h-72' : 'h-48 sm:h-56',
        style.gradient
      )}
    >
      <div className="bg-tech-grid absolute inset-0 opacity-45" />

      <div className="absolute inset-x-4 bottom-0 top-4 flex flex-col overflow-hidden rounded-t-xl border border-white/10 bg-canvas/90 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:inset-x-6 sm:top-5">
        {/* Mini browser chrome */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-elevated/90 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          </div>
          {hostname && (
            <span className="truncate rounded-md bg-canvas/80 px-2.5 py-0.5 font-mono text-[10px] text-ink-muted">
              {hostname}
            </span>
          )}
          <span className="w-8" aria-hidden="true" />
        </div>

        {/* Live website homepage preview */}
        <div className="relative flex-1 overflow-hidden bg-canvas">
          {activeSrc ? (
            <>
              <img
                src={activeSrc}
                alt={`${project.title} live homepage preview`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => {
                  setLoaded(false);
                  setSourceIdx((prev) => prev + 1);
                }}
                className={cn(
                  'h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03]',
                  loaded ? 'opacity-100' : 'opacity-0'
                )}
              />
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-muted">
                  <Icon className={cn('h-7 w-7 opacity-80', style.iconColor)} />
                  <span className="font-mono text-[11px]">Loading live preview…</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2.5 p-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                <Icon className={cn('h-5 w-5', style.iconColor)} />
              </span>
              <span className="font-mono text-xs text-ink-muted">{project.title}</span>
            </div>
          )}
        </div>
      </div>

      {project.liveUrl && (
        <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-canvas/85 px-2.5 py-1 text-[11px] font-medium text-emerald-400 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live
        </span>
      )}
    </div>
  );
}

export function ProjectShowcase() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('ecommerce');
  const [modalProject, setModalProject] = useState<ProjectSpec | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="01 — Work"
        title="Selected work"
        description="Real projects I've shipped and deployed, plus a few interactive demos below."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project, index) => {
          const isExpanded = expandedId === project.id;
          const isFeaturedFullRow = PROJECTS.length % 2 === 1 && index === 0;
          const hasDeepDive = Boolean(
            project.problemSolved || project.architecture || project.codeSnippet
          );

          return (
            <Card
              key={project.id}
              interactive
              className={cn(
                'group flex flex-col overflow-hidden',
                isFeaturedFullRow && 'md:col-span-2'
              )}
            >
              <ProjectPreview project={project} featured={isFeaturedFullRow} />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-ink-muted">{project.category}</p>
                    <h3 className="mt-1 text-lg font-semibold text-ink-primary">
                      {project.title}
                    </h3>
                  </div>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                      className="rounded-lg p-1.5 text-ink-muted transition hover:text-accent-primary"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {project.shortDesc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {hasDeepDive && isExpanded && (
                  <div className="mt-4 space-y-3 rounded-xl border border-line-subtle bg-canvas/70 p-3.5 text-xs">
                    {project.problemSolved && (
                      <div>
                        <p className="font-medium text-ink-primary">Problem solved</p>
                        <p className="mt-0.5 text-ink-muted">{project.problemSolved}</p>
                      </div>
                    )}
                    {project.architecture && (
                      <div>
                        <p className="font-medium text-ink-primary">How it&apos;s built</p>
                        <p className="mt-0.5 text-ink-muted">{project.architecture}</p>
                      </div>
                    )}
                    {project.codeSnippet && (
                      <pre className="custom-scrollbar overflow-x-auto rounded-lg border border-line-subtle bg-[#05070B] p-2.5 font-mono text-[11px] leading-relaxed text-sky-300">
                        <code>{project.codeSnippet}</code>
                      </pre>
                    )}
                  </div>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-accent-primary px-3.5 py-1.5 text-xs font-semibold text-[#05080D] transition hover:brightness-110"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Visit site
                      </a>
                    )}
                    {project.demoType && (
                      <Button variant="secondary" size="sm" onClick={() => setModalProject(project)}>
                        <Play className="h-3.5 w-3.5" />
                        Try demo
                      </Button>
                    )}
                  </div>

                  {hasDeepDive && (
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-ink-muted transition hover:text-accent-primary"
                    >
                      {isExpanded ? 'Hide details' : 'How it works'}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div id="demos" className="mt-24 scroll-mt-24">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Playground"
            title="Try the demos"
            description="These run in your browser, so go ahead and click around."
          />

          <div className="flex flex-wrap gap-2">
            {DEMO_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeDemo === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveDemo(tab.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition',
                    active
                      ? 'border-line-hover bg-accent-glow text-ink-primary'
                      : 'border-line-subtle text-ink-muted hover:text-ink-primary'
                  )}
                >
                  <Icon className={cn('h-4 w-4', active && 'text-accent-primary')} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">{renderDemo(activeDemo)}</div>
      </div>

      <Modal
        open={modalProject !== null}
        onClose={() => setModalProject(null)}
        title={modalProject?.title ?? 'Demo'}
        subtitle={modalProject?.category}
      >
        {modalProject?.demoType && renderDemo(modalProject.demoType)}
      </Modal>
    </section>
  );
}
