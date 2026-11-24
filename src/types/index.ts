export type ThemeId = 'obsidian' | 'linear' | 'emerald';

export type DemoType = 'ecommerce' | 'visualizer' | 'analytics';

export type ProjectCategory =
  | 'Full-Stack Next.js'
  | 'React UI'
  | 'Node.js & Python';

export interface ProjectSpec {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  shortDesc: string;
  problemSolved?: string;
  architecture?: string;
  codeSnippet?: string;
  githubUrl?: string;
  liveUrl?: string;
  previewImage?: string;
  demoType?: DemoType;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
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
