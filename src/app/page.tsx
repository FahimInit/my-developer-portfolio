import { Code2, Database, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { TECH_STACK } from '@/config/projects';
import { HeroInspector } from '@/features/hero-inspector/HeroInspector';
import { ProjectShowcase } from '@/features/project-sandboxes/ProjectShowcase';
import { ScopeCalculator } from '@/features/scope-calculator/ScopeCalculator';
import { env } from '@/lib/env';
import type { TechStackCategory } from '@/types';

const STACK_GROUPS: {
  key: TechStackCategory;
  title: string;
  subtitle: string;
  icon: typeof Code2;
}[] = [
  {
    key: 'frontend',
    title: 'Frontend & Interactive UI',
    subtitle: 'React 19 · Next.js 15 · Strict TypeScript',
    icon: Code2,
  },
  {
    key: 'backend',
    title: 'Backend APIs & Data Layer',
    subtitle: 'Node.js · PostgreSQL · Redis · Webhooks',
    icon: Database,
  },
  {
    key: 'devops',
    title: 'DevOps, Figma & Hardening',
    subtitle: 'CI/CD · Docker · Core Web Vitals',
    icon: Wrench,
  },
];

export default function PortfolioHomePage() {
  return (
    <>
      <HeroInspector availability={env.NEXT_PUBLIC_AVAILABILITY_STATUS} />

      <ProjectShowcase />

      {/* Production Engineering Capabilities & Tech Stack Matrix */}
      <section
        id="stack"
        className="border-t border-line-subtle bg-elevated/35 py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <Badge variant="accent">Production Engineering Matrix</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
              Full-Stack Tooling &amp; Architecture Standards
            </h2>
            <p className="max-w-2xl text-sm text-ink-muted">
              Pragmatic, battle-tested technologies organized for maintainability, strict
              type safety, and predictable deployment speed.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {STACK_GROUPS.map((group) => {
              const Icon = group.icon;
              const items = TECH_STACK[group.key];

              return (
                <Card key={group.key} className="p-6">
                  <div className="flex items-center gap-3 border-b border-line-subtle pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-subtle bg-canvas text-accent-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink-primary">
                        {group.title}
                      </h3>
                      <p className="font-mono text-[11px] text-ink-muted">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-line-subtle bg-canvas/75 p-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-ink-primary">
                            {item.name}
                          </span>
                          <Badge
                            variant={
                              item.level === 'Specialist' ? 'accent' : 'emerald'
                            }
                          >
                            {item.level}
                          </Badge>
                        </div>
                        <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <ScopeCalculator upworkUrl={env.NEXT_PUBLIC_UPWORK_PROFILE_URL} />
    </>
  );
}
