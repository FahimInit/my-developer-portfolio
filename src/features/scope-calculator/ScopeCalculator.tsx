'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Check, Copy, Cpu, Laptop, Send, Server } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SCOPE_ADDONS, UPWORK_PACKAGES, estimateRequestSchema } from '@/config/packages';
import { cn, formatCurrency } from '@/lib/utils';
import type {
  AddonId,
  EstimateResponsePayload,
  PackageId,
  UpworkPackage,
  UrgencyLevel,
} from '@/types';

const PACKAGE_ICONS: Record<UpworkPackage['iconName'], typeof Laptop> = {
  laptop: Laptop,
  server: Server,
  cpu: Cpu,
};

function optionClass(active: boolean) {
  return cn(
    'rounded-lg border px-3 py-2 text-left text-sm transition',
    active
      ? 'border-accent-primary/60 bg-accent-glow text-ink-primary'
      : 'border-line-subtle bg-canvas/60 text-ink-muted hover:border-line-hover hover:text-ink-primary'
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-primary">
        {label}
      </label>
      {children}
    </div>
  );
}

interface ScopeCalculatorProps {
  upworkUrl: string;
}

export function ScopeCalculator({ upworkUrl }: ScopeCalculatorProps) {
  const [selectedPkg, setSelectedPkg] = useState<PackageId>('fullstack-mvp');
  const [selectedAddons, setSelectedAddons] = useState<AddonId[]>([]);
  const [urgency, setUrgency] = useState<UrgencyLevel>('standard');
  const [targetStack, setTargetStack] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<EstimateResponsePayload | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleAddon = (id: AddonId) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const pickPackage = (id: PackageId) => {
    setSelectedPkg(id);
    document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Same schema the API uses, so most mistakes get caught before a round trip.
    const parsed = estimateRequestSchema.safeParse({
      packageId: selectedPkg,
      addons: selectedAddons,
      urgency,
      clientNotes,
      targetStack: targetStack.trim() || undefined,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please check the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as EstimateResponsePayload | { error?: string };

      if (!response.ok) {
        setError('error' in data && data.error ? data.error : 'Something went wrong. Try again?');
        return;
      }

      setEstimate(data as EstimateResponsePayload);
    } catch {
      setError("Couldn't reach the server. Try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!estimate) return;
    try {
      await navigator.clipboard.writeText(estimate.briefMarkdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked on non-HTTPS origins; nothing useful to do here.
    }
  };

  return (
    <section id="services" className="scroll-mt-20 border-t border-line-subtle">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="04 — Services"
          title="Services"
          description="Fixed prices, so you know the cost upfront. Need something different? Just ask."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {UPWORK_PACKAGES.map((pkg) => {
            const Icon = PACKAGE_ICONS[pkg.iconName];
            const isSelected = selectedPkg === pkg.id;

            return (
              <Card
                key={pkg.id}
                interactive
                className={cn('flex flex-col p-6', isSelected && 'border-accent-primary/50')}
              >
                <Icon className="h-5 w-5 text-accent-primary" />
                <h3 className="mt-4 text-lg font-semibold text-ink-primary">{pkg.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{pkg.description}</p>

                <p className="mt-4 text-2xl font-bold text-ink-primary">{pkg.priceRange}</p>
                <p className="text-xs text-ink-muted">{pkg.turnaround}</p>

                <ul className="mt-5 space-y-2">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Button
                    variant={isSelected ? 'primary' : 'secondary'}
                    className="w-full"
                    onClick={() => pickPackage(pkg.id)}
                  >
                    Get an estimate
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div id="estimate" className="mt-16 grid scroll-mt-24 grid-cols-1 gap-5 lg:grid-cols-5">
          <Card className="p-6 lg:col-span-3">
            <h3 className="text-lg font-semibold text-ink-primary">Quick estimate</h3>
            <p className="mt-1 text-sm text-ink-muted">Rough numbers in a few clicks.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <Field label="Package">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {UPWORK_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkg(pkg.id)}
                      className={optionClass(selectedPkg === pkg.id)}
                    >
                      <span className="block font-medium">{pkg.title}</span>
                      <span className="text-xs text-ink-muted">{pkg.priceRange}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Extras">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SCOPE_ADDONS.map((addon) => (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={cn(
                        optionClass(selectedAddons.includes(addon.id)),
                        'flex items-center justify-between'
                      )}
                    >
                      {addon.label}
                      <span className="text-xs text-ink-muted">+${addon.addedMinUsd}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Timeline">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={optionClass(urgency === 'standard')}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('priority')}
                    className={optionClass(urgency === 'priority')}
                  >
                    Rush (+25%)
                  </button>
                </div>
              </Field>

              <Field label="Preferred stack (optional)" htmlFor="stack">
                <input
                  id="stack"
                  type="text"
                  maxLength={80}
                  value={targetStack}
                  onChange={(e) => setTargetStack(e.target.value)}
                  placeholder="e.g. Next.js + PostgreSQL"
                  className="w-full rounded-lg border border-line-subtle bg-canvas px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted/60 focus:border-accent-primary focus:outline-none"
                />
              </Field>

              <Field label="What are you building?" htmlFor="notes">
                <textarea
                  id="notes"
                  rows={3}
                  maxLength={600}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="A couple of sentences is plenty."
                  className="w-full rounded-lg border border-line-subtle bg-canvas px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted/60 focus:border-accent-primary focus:outline-none"
                />
              </Field>

              {error && (
                <p role="alert" className="text-sm text-rose-400">
                  {error}
                </p>
              )}

              <Button type="submit" isLoading={isSubmitting}>
                <Send className="h-4 w-4" />
                Get estimate
              </Button>
            </form>
          </Card>

          <Card className="flex flex-col p-6 lg:col-span-2">
            {!estimate ? (
              <div className="flex flex-1 items-center justify-center text-center">
                <p className="max-w-xs text-sm text-ink-muted">
                  Your estimate will show up here, along with a short brief you can paste
                  into an Upwork message.
                </p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col">
                <p className="text-sm text-ink-muted">{estimate.packageTitle}</p>
                <p className="mt-1 text-3xl font-bold text-ink-primary">
                  {formatCurrency(estimate.estimatedMinUsd)} –{' '}
                  {formatCurrency(estimate.estimatedMaxUsd)}
                </p>
                <p className="text-sm text-ink-muted">{estimate.estimatedTimeline}</p>

                <div className="mt-6 space-y-3">
                  {estimate.milestones.map((m) => (
                    <div key={m.phase} className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-ink-primary">
                        {m.phase} <span className="text-ink-muted">· {m.percentage}%</span>
                      </span>
                      <span className="shrink-0 text-ink-muted">
                        {formatCurrency(m.amountMin)}–{formatCurrency(m.amountMax)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-primary">Brief</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-ink-muted transition hover:text-ink-primary"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="custom-scrollbar mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-canvas p-3 font-mono text-xs leading-relaxed text-ink-muted">
                  {estimate.briefMarkdown}
                </pre>

                <a
                  href={upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-semibold text-[#05080D] transition hover:brightness-110"
                >
                  Message me on Upwork
                </a>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
