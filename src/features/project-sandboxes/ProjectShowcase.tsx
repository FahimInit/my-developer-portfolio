'use client';

import { useState } from 'react';
import {
  BarChart3,
  ExternalLink,
  Github,
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

// Each project gets its own colour so the grid doesn't look like four copies of one card.
const PREVIEW: Record<string, { gradient: string; icon: typeof Users; iconColor: string }> = {
  'multi-tenant-saas': {
    gradient: 'from-cyan-500/25 via-sky-500/10 to-transparent',
    icon: Users,
    iconColor: 'text-cyan-300',
  },
  'aura-ecommerce': {
    gradient: 'from-amber-500/25 via-orange-500/10 to-transparent',
    icon: ShoppingBag,
    iconColor: 'text-amber-300',
  },
  'spatial-ai': {
    gradient: 'from-violet-500/25 via-fuchsia-500/10 to-transparent',
    icon: Sliders,
    iconColor: 'text-violet-300',
  },
  'pulse-metrics': {
    gradient: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    icon: BarChart3,
    iconColor: 'text-emerald-300',
  },
};

const FALLBACK_PREVIEW = PREVIEW['multi-tenant-saas']!;

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

function ProjectPreview({ project }: { project: ProjectSpec }) {
  const style = PREVIEW[project.id] ?? FALLBACK_PREVIEW;
  const Icon = style.icon;

  return (
    <div
      className={cn(
        'relative h-44 overflow-hidden border-b border-line-subtle bg-gradient-to-br',
        style.gradient
      )}
    >
      <div className="bg-tech-grid absolute inset-0 opacity-50" />

      {/* Mini browser window — slides up a little on hover */}
      <div className="absolute inset-x-8 bottom-0 top-7 rounded-t-xl border border-white/10 bg-canvas/85 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
            <Icon className={cn('h-5 w-5', style.iconColor)} />
          </span>
          <div className="flex-1 space-y-2">
            <div className="h-2 w-2/3 rounded bg-white/15" />
            <div className="h-2 w-1/2 rounded bg-white/5" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 px-4">
          <div className="h-10 rounded-md bg-white/5" />
          <div className="h-10 rounded-md bg-white/5" />
          <div className="h-10 rounded-md bg-white/5" />
        </div>
      </div>

      {project.liveUrl && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-canvas/80 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
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

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="01 — Work"
        title="Selected work"
        description="A few things I've built. One is live, the others you can try right here on the page."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <Card key={project.id} interactive className="group flex flex-col overflow-hidden">
            <ProjectPreview project={project} />

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

              <div className="mt-auto flex gap-2 pt-6">
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
            </div>
          </Card>
        ))}
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
