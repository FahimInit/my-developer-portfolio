'use client';

import { useState } from 'react';
import {
  BarChart3,
  ExternalLink,
  Eye,
  Github,
  Layers,
  ShoppingBag,
  Sliders,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { PROJECTS } from '@/config/projects';
import { AnalyticsSandbox } from '@/features/project-sandboxes/AnalyticsSandbox';
import { EcommerceSandbox } from '@/features/project-sandboxes/EcommerceSandbox';
import { VisualizerSandbox } from '@/features/project-sandboxes/VisualizerSandbox';
import { cn } from '@/lib/utils';
import type { DemoType, ProjectCategory, ProjectSpec } from '@/types';

const FILTER_CATEGORIES: ProjectCategory[] = [
  'All',
  'Full-Stack Next.js',
  'React UI',
  'Node.js API',
];

const SANDBOX_TABS: {
  id: DemoType;
  label: string;
  subtitle: string;
  icon: typeof ShoppingBag;
}[] = [
  {
    id: 'ecommerce',
    label: 'Aura E-Commerce',
    subtitle: 'Cart & Courier Webhook Demo',
    icon: ShoppingBag,
  },
  {
    id: 'visualizer',
    label: 'SpatialAI CAD',
    subtitle: 'Split-View Canvas & BullMQ',
    icon: Sliders,
  },
  {
    id: 'analytics',
    label: 'PulseMetrics API',
    subtitle: 'Redis Cache & Stream Telemetry',
    icon: BarChart3,
  },
];

function renderSandbox(type: DemoType) {
  switch (type) {
    case 'ecommerce':
      return <EcommerceSandbox />;
    case 'visualizer':
      return <VisualizerSandbox />;
    case 'analytics':
      return <AnalyticsSandbox />;
  }
}

export function ProjectShowcase() {
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory>('All');
  const [inlineSandbox, setInlineSandbox] = useState<DemoType>('ecommerce');
  const [modalProject, setModalProject] = useState<ProjectSpec | null>(null);

  const filteredProjects =
    categoryFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === categoryFilter);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Header + Category Filters */}
      <div className="flex flex-col justify-between gap-6 border-b border-line-subtle pb-8 md:flex-row md:items-end">
        <div className="space-y-2">
          <Badge variant="accent">Production Case Studies</Badge>
          <h2 className="text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
            Featured Spec Systems &amp; Architecture
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            Every project below showcases a distinct engineering domain — full-stack headless
            commerce, interactive React canvas UI, and high-throughput Node.js telemetry.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-1.5"
        >
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setCategoryFilter(category)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-xs font-medium transition',
                categoryFilter === category
                  ? 'border-accent-primary/60 bg-accent-glow text-accent-primary'
                  : 'border-line-subtle bg-elevated text-ink-muted hover:text-ink-primary'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div
        className={cn(
          'mt-8 grid grid-cols-1 gap-6',
          filteredProjects.length === 4 ? 'md:grid-cols-2' : 'lg:grid-cols-3'
        )}
      >
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            interactive
            className="flex flex-col justify-between p-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline">{project.category}</Badge>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inspect ${project.title} on GitHub`}
                  className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted transition hover:text-accent-primary"
                >
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold leading-snug text-ink-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  {project.shortDesc}
                </p>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 rounded-xl border border-line-subtle bg-canvas/80 p-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-mono text-xs font-bold text-accent-primary">
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-[10px] text-ink-muted">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Architecture Note */}
              <div className="rounded-xl border border-line-subtle bg-elevated/70 p-3">
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  <Layers className="h-3 w-3 text-accent-primary" />
                  Architecture Summary
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                  {project.architecture}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-line-subtle bg-canvas/70 px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-line-subtle">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent-primary px-3 py-1.5 text-xs font-semibold text-[#05080D] shadow-glow-sm transition-all duration-200 hover:brightness-110 hover:shadow-glow"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live App
                </a>
              )}
              {project.demoType && (
                <Button
                  variant={project.liveUrl ? 'secondary' : 'primary'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setModalProject(project)}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Launch Interactive Sandbox
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Inline Interactive Sandbox Switcher */}
      <div id="sandboxes" className="mt-14 space-y-5 scroll-mt-24">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge variant="emerald">Zero-Mockup Testing</Badge>
            <h3 className="mt-2 text-xl font-bold text-ink-primary sm:text-2xl">
              Try Live Component Sandboxes Inline
            </h3>
            <p className="mt-1 text-xs text-ink-muted">
              Switch between all three interactive modules below — test state calculations,
              drag the CAD comparison viewport, or trigger simulated webhook bursts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SANDBOX_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = inlineSandbox === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInlineSandbox(tab.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition',
                    active
                      ? 'border-accent-primary/60 bg-accent-glow text-ink-primary shadow-glow-sm'
                      : 'border-line-subtle bg-elevated text-ink-muted hover:text-ink-primary'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4',
                      active ? 'text-accent-primary' : 'text-ink-muted'
                    )}
                  />
                  <div>
                    <p className="text-xs font-semibold leading-none">{tab.label}</p>
                    <p className="mt-0.5 font-mono text-[10px] opacity-75">
                      {tab.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {renderSandbox(inlineSandbox)}
      </div>

      {/* Fullscreen Sandbox Modal */}
      <Modal
        open={modalProject !== null}
        onClose={() => setModalProject(null)}
        title={modalProject?.title ?? 'Interactive Sandbox'}
        subtitle={modalProject?.category}
      >
        {modalProject && (
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-ink-muted">
              {modalProject.architecture}
            </p>
            {modalProject.demoType && renderSandbox(modalProject.demoType)}
          </div>
        )}
      </Modal>
    </section>
  );
}
