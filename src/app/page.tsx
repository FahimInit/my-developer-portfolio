import { Code2, MessageSquare, Monitor, Rocket, Server, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TECH_STACK } from '@/config/projects';
import { Hero } from '@/features/hero/Hero';
import { TechMarquee } from '@/features/hero/TechMarquee';
import { ProjectShowcase } from '@/features/project-sandboxes/ProjectShowcase';
import { ScopeCalculator } from '@/features/scope-calculator/ScopeCalculator';
import { env } from '@/lib/env';

const SKILL_ICONS: Record<string, typeof Monitor> = {
  Frontend: Monitor,
  Backend: Server,
  Tools: Wrench,
};

const STEPS = [
  {
    icon: MessageSquare,
    title: 'Talk',
    text: 'We go over what you need and agree on scope and price.',
  },
  {
    icon: Code2,
    title: 'Build',
    text: 'You get a preview link early, plus regular updates as I go.',
  },
  {
    icon: Rocket,
    title: 'Launch',
    text: 'I deploy it, hand over the code, and stick around for fixes.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        availability={env.NEXT_PUBLIC_AVAILABILITY_STATUS}
        githubUrl={env.NEXT_PUBLIC_GITHUB_URL}
      />
      <TechMarquee />

      <ProjectShowcase />

      <section id="skills" className="scroll-mt-20 border-t border-line-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="02 — Skills" title="What I work with" />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TECH_STACK.map((group) => {
              const Icon = SKILL_ICONS[group.label] ?? Wrench;
              return (
                <Card key={group.label} interactive className="p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-glow text-accent-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink-primary">{group.label}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-line-subtle bg-canvas/60 px-3 py-1.5 text-sm text-ink-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-20 border-t border-line-subtle bg-elevated/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="03 — Process" title="How we'd work together" />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} interactive className="relative overflow-hidden p-6">
                  <span className="absolute -right-2 -top-4 font-mono text-7xl font-bold text-white/[0.04]">
                    0{i + 1}
                  </span>
                  <Icon className="h-6 w-6 text-accent-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-ink-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{step.text}</p>
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
