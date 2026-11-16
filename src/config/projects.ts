import type { ArchitectureNode, ProjectSpec, TechStackMap } from '@/types';

export const PROJECTS: ProjectSpec[] = [
  {
    id: 'multi-tenant-saas',
    title: 'MultiTenantSaaS — Role-Based Team Workspace & Platform',
    category: 'Full-Stack Next.js',
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Multi-Tenant',
      'RBAC',
      'Vercel',
    ],
    shortDesc:
      'Production-deployed multi-tenant SaaS application featuring isolated organization workspaces, role-based access control, and streamlined team management workflows.',
    metrics: [
      { label: 'Deployment', value: 'Vercel Live' },
      { label: 'Isolation', value: 'Tenant RBAC' },
      { label: 'Stack', value: 'Full-Stack' },
    ],
    architecture:
      'Tenant-scoped Next.js App Router architecture enforcing workspace isolation, modular UI primitives, and clean state boundaries across organization contexts.',
    githubUrl: 'https://github.com/FahimInit/MultiTenantSaaS',
    liveUrl: 'https://multi-tenant-saa-s-seven.vercel.app/',
  },
  {
    id: 'aura-ecommerce',
    title: 'Aura & Artifacts — Headless E-Commerce & Admin',
    category: 'Full-Stack Next.js',
    tags: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'Node.js API',
      'PostgreSQL',
      'Stripe & Courier Webhook',
    ],
    shortDesc:
      'High-converting artisanal home decor storefront featuring optimistic cart updates, automated courier dispatch calculations, and real-time inventory sync.',
    metrics: [
      { label: 'Lighthouse Perf', value: '99/100' },
      { label: 'Checkout Speed', value: '< 1.2s' },
      { label: 'API Latency', value: '42ms' },
    ],
    architecture:
      'Built with Next.js App Router (Server Actions + SSR) connected to a stateless Node.js/Express microservice handling multi-zone courier rates and idempotent webhook retries.',
    githubUrl: 'https://github.com',
    demoType: 'ecommerce',
  },
  {
    id: 'spatial-ai',
    title: 'SpatialAI — Interior & Architectural Visualizer SaaS',
    category: 'React UI',
    tags: [
      'React 19',
      'Next.js',
      'Node.js REST API',
      'Canvas WebGL',
      'Tailwind CSS',
      'Cloudflare R2',
    ],
    shortDesc:
      'Interactive architectural staging web app that transforms raw CAD/sketch room layouts into photorealistic interior renders with real-time material swapping.',
    metrics: [
      { label: 'UI Frame Rate', value: '60 FPS' },
      { label: 'Render Queue', value: 'Async BullMQ' },
      { label: 'Core Web Vitals', value: '100% Pass' },
    ],
    architecture:
      'Client-side interactive split-view canvas built in React with pointer-capture drag hooks, backed by an asynchronous Node.js job queue for GPU render dispatch.',
    githubUrl: 'https://github.com',
    demoType: 'visualizer',
  },
  {
    id: 'pulse-metrics',
    title: 'PulseMetrics — Real-Time SaaS Analytics & Pipeline',
    category: 'Node.js API',
    tags: [
      'Node.js',
      'Express',
      'Next.js App Router',
      'PostgreSQL',
      'Redis Cache',
      'REST API',
    ],
    shortDesc:
      'Multi-tenant telemetry dashboard and high-throughput ingestion API capable of aggregating thousands of webhook events per minute with zero data loss.',
    metrics: [
      { label: 'Throughput', value: '12k req/min' },
      { label: 'Cache Hit Ratio', value: '94.8%' },
      { label: 'Query Time', value: '18ms avg' },
    ],
    architecture:
      'High-concurrency Node.js REST API utilizing Redis time-series caching and PostgreSQL indexed partitions, feeding a reactive Next.js dashboard.',
    githubUrl: 'https://github.com',
    demoType: 'analytics',
  },
];

export const TECH_STACK: TechStackMap = {
  frontend: [
    {
      name: 'React.js (v18 / v19)',
      level: 'Specialist',
      desc: 'Custom hooks, optimistic UI updates, Zustand state, and zero-jank rendering.',
    },
    {
      name: 'Next.js (App & Pages)',
      level: 'Specialist',
      desc: 'SSR, ISR, Server Components, Server Actions, and edge middleware patterns.',
    },
    {
      name: 'TypeScript (Strict)',
      level: 'Specialist',
      desc: 'End-to-end typed API contracts, Zod runtime parsing, and zero-any discipline.',
    },
    {
      name: 'Tailwind CSS & Design Systems',
      level: 'Specialist',
      desc: 'Responsive layouts, CSS token theming, accessible dialogs, and smooth motion.',
    },
  ],
  backend: [
    {
      name: 'Node.js & Express / Fastify',
      level: 'Specialist',
      desc: 'RESTful API design, JWT Auth, rate-limiting, and idempotent webhook handlers.',
    },
    {
      name: 'PostgreSQL & Prisma',
      level: 'Advanced',
      desc: 'Relational schema modeling, composite indexes, migrations, and fast queries.',
    },
    {
      name: 'MongoDB & Redis',
      level: 'Advanced',
      desc: 'Aggregation pipelines, sliding-window rate limits, and time-series caching.',
    },
    {
      name: 'Third-Party Integrations',
      level: 'Specialist',
      desc: 'Stripe, OpenAI, Courier APIs, SendGrid, and OAuth2 provider pipelines.',
    },
  ],
  devops: [
    {
      name: 'Git & GitHub Actions',
      level: 'Advanced',
      desc: 'Clean PR workflows, automated typecheck/lint gates, and preview deployments.',
    },
    {
      name: 'Vercel & Docker',
      level: 'Advanced',
      desc: 'Edge deployments, multi-stage Node containers, and strict env validation.',
    },
    {
      name: 'Figma-to-Code Precision',
      level: 'Specialist',
      desc: 'Pixel-accurate responsive builds, semantic landmarks, and zero CLS shift.',
    },
    {
      name: 'Security & Performance',
      level: 'Specialist',
      desc: 'Core Web Vitals tuning, OWASP headers, input sanitization, and bundle splitting.',
    },
  ],
};

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'client-rsc',
    title: 'Next.js 15 App Router',
    layer: 'Presentation & RSC Edge',
    latency: '14ms TTFB',
    summary:
      'Server Components render initial HTML with zero client JS bloat, streaming interactive islands only where user interaction is needed.',
    controls: [
      'Strict TypeScript + zero client-side secrets',
      'Automatic code-splitting per feature boundary',
      'Zero Cumulative Layout Shift (0.000 CLS)',
    ],
    snippet: `// src/app/page.tsx (Server Component)
export default async function PortfolioPage() {
  return (
    <main className="mx-auto max-w-7xl px-4">
      <HeroInspector />
      <ProjectShowcase />
      <ScopeCalculator />
    </main>
  );
}`,
  },
  {
    id: 'zod-guard',
    title: 'Zod Guard & Rate Limiter',
    layer: 'Security Boundary',
    latency: '2ms overhead',
    summary:
      'Every POST payload and environment variable passes strict Zod schema validation, origin verification, and sliding-window throttling.',
    controls: [
      'Same-origin CSRF check on state mutations',
      'Sliding-window per-IP throttling (15 req/min)',
      'HTML & control-character text sanitization',
    ],
    snippet: `const limit = checkRateLimit(getClientIdentifier(req));
if (!limit.allowed) {
  return NextResponse.json(
    { error: 'Rate limit exceeded' },
    { status: 429 }
  );
}`,
  },
  {
    id: 'node-service',
    title: 'Node.js / Express Microservice',
    layer: 'Domain & Webhook Engine',
    latency: '24ms p95',
    summary:
      'Stateless business logic computes courier zones, validates Stripe webhook signatures, and dispatches async BullMQ jobs without blocking the main event loop.',
    controls: [
      'Idempotency keys prevent duplicate order writes',
      'Exponential backoff on downstream courier APIs',
      'Structured JSON logging with correlation IDs',
    ],
    snippet: `export async function dispatchOrderWebhook(order: OrderInput) {
  const payload = orderSchema.parse(order);
  return queue.add('courier.dispatch', payload, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 500 },
  });
}`,
  },
  {
    id: 'data-layer',
    title: 'PostgreSQL + Redis Cache',
    layer: 'Persistence & Telemetry',
    latency: '8ms read',
    summary:
      'Relational integrity for transactional orders and tenants paired with Redis read-through caching for sub-20ms analytics queries.',
    controls: [
      'Parameterized Prisma queries (SQLi-proof)',
      'Composite indexes on tenant_id + created_at',
      '94.8% cache hit ratio on hot dashboards',
    ],
    snippet: `const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

const metrics = await prisma.eventLog.groupBy({
  by: ['eventType'],
  where: { tenantId, createdAt: { gte: windowStart } },
  _count: true,
});`,
  },
];
