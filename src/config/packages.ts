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
    .min(10, 'Tell me a bit more about the project (at least 10 characters).')
    .max(600, 'Please keep it under 600 characters.'),
  targetStack: z
    .string()
    .trim()
    .max(80, 'Keep the stack note under 80 characters.')
    .optional(),
});

export const UPWORK_PACKAGES: UpworkPackage[] = [
  {
    id: 'figma-ui',
    title: 'Figma to React',
    priceRange: '$60 – $150',
    minUsd: 60,
    maxUsd: 150,
    turnaround: '2–4 days',
    minDays: 2,
    maxDays: 4,
    description: 'Your design, built as a clean, responsive React or Next.js site.',
    deliverables: [
      'Looks right on mobile, tablet and desktop',
      'Reusable components',
      'Live preview link to review',
    ],
    iconName: 'laptop',
  },
  {
    id: 'node-api',
    title: 'Node.js API',
    priceRange: '$80 – $200',
    minUsd: 80,
    maxUsd: 200,
    turnaround: '3–5 days',
    minDays: 3,
    maxDays: 5,
    description: 'A backend for your app: endpoints, database, auth and integrations.',
    deliverables: [
      'Login and user roles',
      'PostgreSQL or MongoDB setup',
      'Docs and a Postman collection',
    ],
    iconName: 'server',
  },
  {
    id: 'fullstack-mvp',
    title: 'Full-stack MVP',
    priceRange: '$250 – $600+',
    minUsd: 250,
    maxUsd: 600,
    turnaround: '1–3 weeks',
    minDays: 7,
    maxDays: 21,
    description: 'Your idea taken from zero to a working, deployed product.',
    deliverables: [
      'Frontend, backend and database',
      'Admin dashboard and auth',
      'Deployed on your domain',
    ],
    iconName: 'cpu',
  },
];

export const SCOPE_ADDONS: ScopeAddon[] = [
  {
    id: 'stripe-webhooks',
    label: 'Payments (Stripe)',
    addedMinUsd: 55,
    addedMaxUsd: 110,
    addedDays: 2,
  },
  {
    id: 'auth-rbac',
    label: 'Login & user roles',
    addedMinUsd: 45,
    addedMaxUsd: 90,
    addedDays: 1,
  },
  {
    id: 'postgres-prisma',
    label: 'Database setup',
    addedMinUsd: 50,
    addedMaxUsd: 100,
    addedDays: 2,
  },
  {
    id: 'docker-cicd',
    label: 'Docker & auto-deploy',
    addedMinUsd: 40,
    addedMaxUsd: 75,
    addedDays: 1,
  },
];
