import type { ProjectSpec, SkillGroup } from '@/types';

export const PROJECTS: ProjectSpec[] = [
  {
    id: 'multi-tenant-saas',
    title: 'MultiTenantSaaS',
    category: 'Full-Stack Next.js',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'RBAC'],
    shortDesc:
      'A team workspace app where every organization gets its own isolated space, with roles and permissions for its members.',
    githubUrl: 'https://github.com/FahimInit/MultiTenantSaaS',
    liveUrl: 'https://multi-tenant-saa-s-seven.vercel.app/',
  },
  {
    id: 'aura-ecommerce',
    title: 'Aura & Artifacts',
    category: 'Full-Stack Next.js',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    shortDesc:
      'Storefront for a home decor shop. The cart updates instantly, shipping is priced per zone, and orders go out through Stripe and courier webhooks.',
    demoType: 'ecommerce',
  },
  {
    id: 'spatial-ai',
    title: 'SpatialAI',
    category: 'React UI',
    tags: ['React', 'Canvas', 'Node.js', 'BullMQ'],
    shortDesc:
      'Turns a rough room sketch into a styled interior render. A slider lets you compare the raw layout with the finished look.',
    demoType: 'visualizer',
  },
  {
    id: 'pulse-metrics',
    title: 'PulseMetrics',
    category: 'Node.js API',
    tags: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
    shortDesc:
      'Analytics dashboard plus an API that ingests webhook events. Redis caching keeps the dashboard quick even under heavy traffic.',
    demoType: 'analytics',
  },
];

export const TECH_STACK: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'MongoDB', 'Redis'],
  },
  {
    label: 'Tools',
    items: ['Git', 'Docker', 'Vercel', 'Figma', 'Stripe'],
  },
];
