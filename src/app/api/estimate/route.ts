import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  SCOPE_ADDONS,
  UPWORK_PACKAGES,
  estimateRequestSchema,
} from '@/config/packages';
import {
  checkRateLimit,
  getClientIdentifier,
  sanitizeText,
  verifySameOrigin,
} from '@/lib/security';
import { formatCurrency } from '@/lib/utils';
import type { EstimateMilestone, EstimateResponsePayload } from '@/types';

export async function POST(request: Request) {
  const originOk = verifySameOrigin(request);
  if (!originOk) {
    return NextResponse.json(
      { error: 'Cross-origin submission rejected.' },
      { status: 403 }
    );
  }

  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 15, 60_000);

  const rateHeaders = {
    'X-RateLimit-Limit': String(rateLimit.limit),
    'X-RateLimit-Remaining': String(rateLimit.remaining),
    'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetInMs / 1000)),
  };

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many estimate requests. Please wait a minute and retry.' },
      { status: 429, headers: rateHeaders }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400, headers: rateHeaders }
    );
  }

  const parsed = estimateRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: firstIssue?.message ?? 'Request validation failed.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers: rateHeaders }
    );
  }

  const { packageId, addons, urgency, clientNotes, targetStack } = parsed.data;
  const selectedPkg = UPWORK_PACKAGES.find((p) => p.id === packageId);
  if (!selectedPkg) {
    return NextResponse.json(
      { error: 'Selected package not found.' },
      { status: 404, headers: rateHeaders }
    );
  }

  // Deduplicate add-ons in case a crafted request sends repeated IDs.
  const uniqueAddonIds = Array.from(new Set(addons));
  const selectedAddons = SCOPE_ADDONS.filter((addon) =>
    uniqueAddonIds.includes(addon.id)
  );

  const addonMin = selectedAddons.reduce((sum, a) => sum + a.addedMinUsd, 0);
  const addonMax = selectedAddons.reduce((sum, a) => sum + a.addedMaxUsd, 0);
  const addonDays = selectedAddons.reduce((sum, a) => sum + a.addedDays, 0);

  const urgencyMultiplier = urgency === 'priority' ? 1.25 : 1;
  const estimatedMinUsd = Math.round((selectedPkg.minUsd + addonMin) * urgencyMultiplier);
  const estimatedMaxUsd = Math.round((selectedPkg.maxUsd + addonMax) * urgencyMultiplier);

  const rawMinDays = selectedPkg.minDays + addonDays;
  const rawMaxDays = selectedPkg.maxDays + addonDays;
  const minDays =
    urgency === 'priority' ? Math.max(1, Math.ceil(rawMinDays * 0.7)) : rawMinDays;
  const maxDays =
    urgency === 'priority' ? Math.max(minDays + 1, Math.ceil(rawMaxDays * 0.75)) : rawMaxDays;

  const estimatedTimeline = `${minDays} – ${maxDays} Days`;

  const milestones: EstimateMilestone[] = [
    {
      phase: 'Setup & core build',
      percentage: 40,
      amountMin: Math.round(estimatedMinUsd * 0.4),
      amountMax: Math.round(estimatedMaxUsd * 0.4),
      deliverable: 'Project setup, main screens or endpoints, and a live preview link',
    },
    {
      phase: 'Features & integrations',
      percentage: 40,
      amountMin: Math.round(estimatedMinUsd * 0.4),
      amountMax: Math.round(estimatedMaxUsd * 0.4),
      deliverable: 'The rest of the features, wired up to the database and APIs',
    },
    {
      phase: 'Testing & handover',
      percentage: 20,
      amountMin: Math.round(estimatedMinUsd * 0.2),
      amountMax: Math.round(estimatedMaxUsd * 0.2),
      deliverable: 'Bug fixes, final deploy, and a short walkthrough of the code',
    },
  ];

  const sanitizedNotes = sanitizeText(clientNotes, 600);
  const sanitizedStack = targetStack
    ? sanitizeText(targetStack, 80)
    : 'Next.js 15 + TypeScript + Node.js';

  const proposalId = crypto.randomBytes(3).toString('hex').toUpperCase();
  const addonListText =
    selectedAddons.length > 0
      ? selectedAddons.map((a) => `- ${a.label}`).join('\n')
      : '- Core package scope only';

  const briefMarkdown = [
    `# Upwork Project Brief (#${proposalId})`,
    `Package: ${selectedPkg.title}`,
    `Estimated Fixed Range: ${formatCurrency(estimatedMinUsd)} - ${formatCurrency(estimatedMaxUsd)}`,
    `Target Timeline: ${estimatedTimeline} (${urgency === 'priority' ? 'Priority Sprint' : 'Standard'})`,
    `Preferred Stack: ${sanitizedStack}`,
    ``,
    `Selected Modules:`,
    addonListText,
    ``,
    `Client Notes:`,
    sanitizedNotes,
  ].join('\n');

  const responsePayload: EstimateResponsePayload = {
    id: proposalId,
    generatedAt: new Date().toISOString(),
    packageTitle: selectedPkg.title,
    estimatedMinUsd,
    estimatedMaxUsd,
    estimatedTimeline,
    milestones,
    sanitizedNotes,
    briefMarkdown,
    securityMeta: {
      validatedBy: 'zod',
      sanitized: true,
      originVerified: originOk,
    },
  };

  return NextResponse.json(responsePayload, {
    status: 200,
    headers: rateHeaders,
  });
}
