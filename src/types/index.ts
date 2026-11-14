export type ThemeId = 'obsidian' | 'linear' | 'emerald';

export type DemoType = 'ecommerce' | 'visualizer' | 'analytics';

export type ProjectCategory = 'All' | 'Full-Stack Next.js' | 'React UI' | 'Node.js API';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectSpec {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  tags: string[];
  shortDesc: string;
  metrics: ProjectMetric[];
  architecture: string;
  githubUrl: string;
  demoType: DemoType;
}

export type TechStackCategory = 'frontend' | 'backend' | 'devops';

export interface TechStackItem {
  name: string;
  level: 'Specialist' | 'Advanced';
  desc: string;
}

export type TechStackMap = Record<TechStackCategory, TechStackItem[]>;

export interface ArchitectureNode {
  id: string;
  title: string;
  layer: string;
  latency: string;
  summary: string;
  controls: string[];
  snippet: string;
}

export type PackageId = 'figma-ui' | 'node-api' | 'fullstack-mvp';

export type AddonId =
  | 'stripe-webhooks'
  | 'auth-rbac'
  | 'postgres-prisma'
  | 'docker-cicd';

export type UrgencyLevel = 'standard' | 'priority';

export interface UpworkPackage {
  id: PackageId;
  title: string;
  badge: string;
  priceRange: string;
  minUsd: number;
  maxUsd: number;
  turnaround: string;
  minDays: number;
  maxDays: number;
  description: string;
  deliverables: string[];
  iconName: 'laptop' | 'server' | 'cpu';
}

export interface ScopeAddon {
  id: AddonId;
  label: string;
  description: string;
  addedMinUsd: number;
  addedMaxUsd: number;
  addedDays: number;
}

export interface EstimateMilestone {
  phase: string;
  percentage: number;
  amountMin: number;
  amountMax: number;
  deliverable: string;
}

export interface EstimateRequestPayload {
  packageId: PackageId;
  addons: AddonId[];
  urgency: UrgencyLevel;
  clientNotes: string;
  targetStack?: string;
}

export interface EstimateResponsePayload {
  id: string;
  generatedAt: string;
  packageTitle: string;
  estimatedMinUsd: number;
  estimatedMaxUsd: number;
  estimatedTimeline: string;
  milestones: EstimateMilestone[];
  sanitizedNotes: string;
  briefMarkdown: string;
  securityMeta: {
    validatedBy: 'zod';
    sanitized: boolean;
    originVerified: boolean;
  };
}
