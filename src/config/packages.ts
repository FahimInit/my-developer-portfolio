import { z } from 'zod';
import type { ScopeAddon, UpworkPackage } from '@/types';

export const estimateRequestSchema = z.object({
  packageId: z.enum(['figma-ui', 'node-api', 'fullstack-mvp']),
  addons: z
    .array(
      z.enum(['stripe-webhooks', 'auth-rbac', 'postgres-prisma', 'docker-cicd'])
    )
    .max(4)
    .default([]),
  urgency: z.enum(['standard', 'priority']).default('standard'),
  clientNotes: z
    .string()
    .trim()
    .min(10, 'Please include at least 10 characters describing your goal or scope.')
    .max(600, 'Project brief must be 600 characters or fewer.'),
  targetStack: z
    .string()
    .trim()
    .max(80, 'Target stack note must be 80 characters or fewer.')
    .optional(),
});

export const UPWORK_PACKAGES: UpworkPackage[] = [
  {
    id: 'figma-ui',
    title: 'Figma to Pixel-Perfect React / Next.js UI',
    badge: 'Fastest Turnaround',
    priceRange: '$60 – $150 Fixed',
    minUsd: 60,
    maxUsd: 150,
    turnaround: '2 – 4 Days',
    minDays: 2,
    maxDays: 4,
    description:
      'Have a Figma design or rough wireframe? I convert it into clean, responsive, modular React/Next.js components styled with Tailwind CSS.',
    deliverables: [
      '100% responsive across Mobile, Tablet & Desktop',
      'Clean, reusable TypeScript/React component architecture',
      '95+ Google Lighthouse Performance & Accessibility score',
      'Deployed live preview link on Vercel for instant review',
    ],
    iconName: 'laptop',
  },
  {
    id: 'node-api',
    title: 'Custom Node.js REST API & Integration',
    badge: 'Backend & Data',
    priceRange: '$80 – $200 Fixed',
    minUsd: 80,
    maxUsd: 200,
    turnaround: '3 – 5 Days',
    minDays: 3,
    maxDays: 5,
    description:
      'Need secure endpoints, database modeling, or third-party webhook integrations? I build reliable, documented Node.js backends.',
    deliverables: [
      'Secure JWT Authentication & role-based access control',
      'PostgreSQL or MongoDB schema with fast indexed queries',
      'Payment, Courier, or AI API integration with error retries',
      'Postman / OpenAPI collection & clear setup documentation',
    ],
    iconName: 'server',
  },
  {
    id: 'fullstack-mvp',
    title: 'Full-Stack Next.js MVP Build',
    badge: 'End-to-End Solution',
    priceRange: '$250 – $600+ Fixed / $15/hr',
    minUsd: 250,
    maxUsd: 600,
    turnaround: '1 – 3 Weeks',
    minDays: 7,
    maxDays: 21,
    description:
      'Launch your SaaS, internal tool, or custom e-commerce platform from scratch with a modern, scalable React + Node.js stack.',
    deliverables: [
      'Complete Frontend UI + Backend API + Database architecture',
      'Admin dashboard, user authentication & CRUD workflows',
      'Production deployment with custom domain & SSL setup',
      'Daily async updates & clean Git repository handover',
    ],
    iconName: 'cpu',
  },
];

export const SCOPE_ADDONS: ScopeAddon[] = [
  {
    id: 'stripe-webhooks',
    label: 'Stripe / Courier Webhook Pipeline',
    description: 'Signature verification, idempotent retries & live status sync',
    addedMinUsd: 55,
    addedMaxUsd: 110,
    addedDays: 2,
  },
  {
    id: 'auth-rbac',
    label: 'JWT / OAuth2 + Role-Based Access',
    description: 'Protected routes, session rotation & Admin/Client roles',
    addedMinUsd: 45,
    addedMaxUsd: 90,
    addedDays: 1,
  },
  {
    id: 'postgres-prisma',
    label: 'PostgreSQL Schema & Prisma ORM',
    description: 'Indexed relational tables, seed scripts & migrations',
    addedMinUsd: 50,
    addedMaxUsd: 100,
    addedDays: 2,
  },
  {
    id: 'docker-cicd',
    label: 'Docker + GitHub Actions CI/CD',
    description: 'Automated typecheck, build verification & zero-downtime deploy',
    addedMinUsd: 40,
    addedMaxUsd: 75,
    addedDays: 1,
  },
];
