import {
  Code2,
  GraduationCap,
  Mail,
  MessageCircle,
  MessageSquare,
  Monitor,
  Rocket,
  Server,
  Wrench,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACT_INFO, EDUCATION, TECH_STACK } from '@/config/projects';
import { Hero } from '@/features/hero/Hero';
import { TechMarquee } from '@/features/hero/TechMarquee';
import { ProjectShowcase } from '@/features/project-sandboxes/ProjectShowcase';
import { ScopeCalculator } from '@/features/scope-calculator/ScopeCalculator';
import { env } from '@/lib/env';

const SKILL_ICONS: Record<string, typeof Monitor> = {
  Frontend: Monitor,
  'Backend & Languages': Server,
  'Tools & Workflow': Wrench,
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
          <SectionHeading eyebrow="02 — Skills & Education" title="What I work with" />

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

          {/* Education Strip */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {EDUCATION.map((item) => (
              <Card key={item.degree} interactive className="flex items-start gap-3.5 p-5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-subtle bg-canvas text-accent-primary">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div>
                  <span className="font-mono text-[11px] text-accent-primary">
                    {item.duration}
                  </span>
                  <h4 className="mt-0.5 text-sm font-semibold text-ink-primary">
                    {item.degree}
                  </h4>
                  <p className="mt-1 text-xs text-ink-muted">{item.institution}</p>
                </div>
              </Card>
            ))}
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

      {/* Direct Contact Strip */}
      <section id="contact" className="border-t border-line-subtle bg-elevated/30">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h3 className="text-lg font-semibold text-ink-primary">
              Prefer reaching out directly?
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Drop me an email or message on WhatsApp or LinkedIn anytime.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-line-subtle bg-elevated px-4 py-2.5 text-xs font-medium text-ink-primary transition hover:border-line-hover"
            >
              <Mail className="h-4 w-4 text-accent-primary" />
              {CONTACT_INFO.email}
            </a>
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line-subtle bg-elevated px-4 py-2.5 text-xs font-medium text-ink-primary transition hover:border-line-hover"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              WhatsApp
            </a>
            <a
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-4 py-2.5 text-xs font-semibold text-[#05080D] transition hover:brightness-110"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
