'use client';

import { useState, type FormEvent } from 'react';
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Cpu,
  FileCode,
  Laptop,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  SCOPE_ADDONS,
  UPWORK_PACKAGES,
  estimateRequestSchema,
} from '@/config/packages';
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

interface ScopeCalculatorProps {
  upworkUrl: string;
}

export function ScopeCalculator({ upworkUrl }: ScopeCalculatorProps) {
  const [selectedPkg, setSelectedPkg] = useState<PackageId>('fullstack-mvp');
  const [selectedAddons, setSelectedAddons] = useState<AddonId[]>([
    'postgres-prisma',
  ]);
  const [urgency, setUrgency] = useState<UrgencyLevel>('standard');
  const [targetStack, setTargetStack] = useState('Next.js 15 + TypeScript + PostgreSQL');
  const [clientNotes, setClientNotes] = useState(
    'Building a client-facing SaaS dashboard with Stripe billing and clean responsive UI from Figma.'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<string | null>(null);
  const [estimateResult, setEstimateResult] =
    useState<EstimateResponsePayload | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const toggleAddon = (addonId: AddonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSelectPackage = (pkgId: PackageId) => {
    setSelectedPkg(pkgId);
    const estimatorEl = document.getElementById('estimator');
    estimatorEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);

    const parsed = estimateRequestSchema.safeParse({
      packageId: selectedPkg,
      addons: selectedAddons,
      urgency,
      clientNotes,
      targetStack: targetStack.trim() || undefined,
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setValidationError(firstIssue?.message ?? 'Please review your scope inputs.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed.data),
      });

      const remainingHeader = response.headers.get('X-RateLimit-Remaining');
      if (remainingHeader !== null) {
        setRateLimitRemaining(remainingHeader);
      }

      const data = (await response.json()) as
        | EstimateResponsePayload
        | { error?: string };

      if (!response.ok) {
        const message =
          'error' in data && typeof data.error === 'string'
            ? data.error
            : 'Unable to generate estimate right now.';
        setValidationError(message);
        return;
      }

      setEstimateResult(data as EstimateResponsePayload);
    } catch {
      setValidationError('Network error while contacting /api/estimate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBrief = async () => {
    if (!estimateResult) return;
    try {
      await navigator.clipboard.writeText(estimateResult.briefMarkdown);
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <section
      id="packages"
      className="mx-auto max-w-7xl border-t border-line-subtle px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Upwork Fixed-Price Packages */}
      <div className="space-y-2">
        <Badge variant="accent">Upwork Fixed-Price &amp; Milestone Packages</Badge>
        <h2 className="text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
          Predictable Scopes Built for Fast Ship Cycles
        </h2>
        <p className="max-w-2xl text-sm text-ink-muted">
          Choose a base engagement model below to pre-fill the validated brief generator,
          or customize deliverables for a tailored Upwork milestone proposal.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {UPWORK_PACKAGES.map((pkg) => {
          const Icon = PACKAGE_ICONS[pkg.iconName];
          const isSelected = selectedPkg === pkg.id;

          return (
            <Card
              key={pkg.id}
              interactive
              className={cn(
                'flex flex-col justify-between p-6',
                isSelected && 'border-accent-primary/60 shadow-glow-sm'
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-subtle bg-canvas text-accent-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <Badge variant={isSelected ? 'accent' : 'neutral'}>
                    {pkg.badge}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-ink-primary">
                    {pkg.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
                    <span className="font-bold text-emerald-400">
                      {pkg.priceRange}
                    </span>
                    <span className="flex items-center gap-1 text-ink-muted">
                      <Clock className="h-3.5 w-3.5" />
                      {pkg.turnaround}
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-ink-muted">
                  {pkg.description}
                </p>

                <ul className="space-y-2 border-t border-line-subtle pt-4">
                  {pkg.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-ink-primary"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4">
                <Button
                  variant={isSelected ? 'primary' : 'secondary'}
                  className="w-full"
                  onClick={() => handleSelectPackage(pkg.id)}
                >
                  {isSelected ? 'Selected in Estimator' : 'Configure This Scope'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Validated Brief & Scope Estimator */}
      <div
        id="estimator"
        className="mt-14 scroll-mt-24 grid grid-cols-1 gap-8 lg:grid-cols-12"
      >
        <Card className="p-6 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-subtle pb-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent-primary">
                POST /api/estimate · Zod Validated
              </span>
              <h3 className="text-lg font-semibold text-ink-primary">
                Interactive Scope &amp; Milestone Brief Generator
              </h3>
            </div>
            <Badge variant="emerald">
              <ShieldCheck className="h-3 w-3" />
              Rate-Limited API
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            {/* Base Package Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-ink-primary">
                1. Base Engagement Tier
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {UPWORK_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkg(pkg.id)}
                    className={cn(
                      'rounded-xl border p-3 text-left transition',
                      selectedPkg === pkg.id
                        ? 'border-accent-primary/60 bg-accent-glow'
                        : 'border-line-subtle bg-canvas/70 hover:border-line-hover'
                    )}
                  >
                    <p className="text-xs font-semibold text-ink-primary">
                      {pkg.badge}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-emerald-400">
                      {pkg.priceRange}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Add-Ons */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-ink-primary">
                2. Optional Architecture Modules
              </label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {SCOPE_ADDONS.map((addon) => {
                  const active = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={cn(
                        'rounded-xl border p-3 text-left transition',
                        active
                          ? 'border-accent-primary/60 bg-accent-glow'
                          : 'border-line-subtle bg-canvas/70 hover:border-line-hover'
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-ink-primary">
                          {addon.label}
                        </span>
                        <span className="font-mono text-[11px] text-accent-primary">
                          +${addon.addedMinUsd}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-ink-muted">
                        {addon.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Urgency & Stack */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink-primary">
                  3. Delivery Cadence
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: 'standard', label: 'Standard Pace' },
                      { id: 'priority', label: 'Priority Sprint (+25%)' },
                    ] as { id: UrgencyLevel; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setUrgency(opt.id)}
                      className={cn(
                        'rounded-lg border px-2.5 py-2 text-xs font-medium transition',
                        urgency === opt.id
                          ? 'border-accent-primary/60 bg-accent-glow text-accent-primary'
                          : 'border-line-subtle bg-canvas text-ink-muted hover:text-ink-primary'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="target-stack-input"
                  className="text-xs font-medium text-ink-primary"
                >
                  4. Preferred Tech Stack
                </label>
                <input
                  id="target-stack-input"
                  type="text"
                  maxLength={80}
                  value={targetStack}
                  onChange={(e) => setTargetStack(e.target.value)}
                  placeholder="e.g. Next.js 15, Node.js, PostgreSQL"
                  className="w-full rounded-lg border border-line-subtle bg-canvas px-3 py-2 text-xs text-ink-primary placeholder:text-ink-muted focus:border-accent-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Client Brief Notes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="client-notes-input"
                  className="text-xs font-medium text-ink-primary"
                >
                  5. Project Goal / Requirements (10–600 chars)
                </label>
                <span className="font-mono text-[10px] text-ink-muted">
                  {clientNotes.length}/600
                </span>
              </div>
              <textarea
                id="client-notes-input"
                rows={3}
                maxLength={600}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Describe your Figma screens, API integrations, or MVP timeline..."
                className="w-full rounded-xl border border-line-subtle bg-canvas px-3.5 py-2.5 text-xs text-ink-primary placeholder:text-ink-muted focus:border-accent-primary focus:outline-none"
              />
            </div>

            {validationError && (
              <div
                role="alert"
                className="rounded-lg border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-300"
              >
                {validationError}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <Button type="submit" isLoading={isSubmitting}>
                <Send className="h-3.5 w-3.5" />
                Generate Validated Scope Brief
              </Button>

              {rateLimitRemaining !== null && (
                <span className="font-mono text-[11px] text-ink-muted">
                  X-RateLimit-Remaining: {rateLimitRemaining}
                </span>
              )}
            </div>
          </form>
        </Card>

        {/* Right Output Panel: Generated Brief & Milestone Schedule */}
        <Card className="flex flex-col justify-between p-6 lg:col-span-5">
          {!estimateResult ? (
            <div className="flex h-full flex-col justify-between space-y-6">
              <div className="space-y-3">
                <Badge variant="outline">
                  <FileCode className="h-3 w-3 text-accent-primary" />
                  Awaiting Proposal Spec
                </Badge>
                <h4 className="text-lg font-semibold text-ink-primary">
                  Ready to Copy into Your Upwork Invitation
                </h4>
                <p className="text-xs leading-relaxed text-ink-muted">
                  Submit the form on the left to hit the hardened{' '}
                  <code className="font-mono text-accent-primary">
                    POST /api/estimate
                  </code>{' '}
                  endpoint. It validates inputs with Zod, sanitizes free text, and returns a
                  structured fixed-price milestone plan.
                </p>
              </div>

              <div className="rounded-xl border border-line-subtle bg-canvas/80 p-4 space-y-2.5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent-primary">
                  What You Get on Every Contract
                </p>
                {[
                  'Clean Git repository with typed TypeScript modules',
                  'Live Vercel staging link within the first 48 hours',
                  'Zero hidden dependencies or unvalidated API endpoints',
                  'Async Loom walkthroughs & handover documentation',
                ].map((point) => (
                  <p
                    key={point}
                    className="flex items-center gap-2 text-xs text-ink-muted"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-line-subtle pb-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                    Proposal #{estimateResult.id}
                  </p>
                  <h4 className="text-base font-semibold text-ink-primary">
                    {estimateResult.packageTitle}
                  </h4>
                </div>
                <Badge variant="emerald">Zod Verified</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line-subtle bg-canvas/90 p-3">
                  <p className="font-mono text-[10px] text-ink-muted">
                    Estimated Range
                  </p>
                  <p className="mt-1 font-mono text-base font-bold text-emerald-400">
                    {formatCurrency(estimateResult.estimatedMinUsd)} –{' '}
                    {formatCurrency(estimateResult.estimatedMaxUsd)}
                  </p>
                </div>
                <div className="rounded-xl border border-line-subtle bg-canvas/90 p-3">
                  <p className="font-mono text-[10px] text-ink-muted">
                    Target Turnaround
                  </p>
                  <p className="mt-1 font-mono text-base font-bold text-ink-primary">
                    {estimateResult.estimatedTimeline}
                  </p>
                </div>
              </div>

              {/* Milestone Breakdown */}
              <div className="space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                  Recommended Upwork Milestones
                </p>
                {estimateResult.milestones.map((m) => (
                  <div
                    key={m.phase}
                    className="rounded-lg border border-line-subtle bg-canvas/80 p-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between font-medium text-ink-primary">
                      <span>
                        {m.phase} ({m.percentage}%)
                      </span>
                      <span className="font-mono text-accent-primary">
                        {formatCurrency(m.amountMin)}–{formatCurrency(m.amountMax)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-ink-muted">
                      {m.deliverable}
                    </p>
                  </div>
                ))}
              </div>

              {/* Copyable Brief */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-ink-muted">
                    Formatted Upwork Brief
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-1 rounded border border-line-subtle bg-canvas px-2.5 py-1 font-mono text-[11px] text-ink-primary transition hover:border-line-hover"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        Copied Brief
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy for Upwork
                      </>
                    )}
                  </button>
                </div>
                <pre className="custom-scrollbar max-h-36 overflow-auto rounded-xl border border-line-subtle bg-[#05070B] p-3 font-mono text-[11px] leading-relaxed text-slate-300">
                  <code>{estimateResult.briefMarkdown}</code>
                </pre>
              </div>

              <a
                href={upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-primary px-4 py-2.5 text-xs font-semibold text-[#05080D] shadow-glow-sm transition hover:brightness-110"
              >
                Send Scope via Upwork Contract
              </a>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
