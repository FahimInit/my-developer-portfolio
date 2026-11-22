import type { EducationItem, ProjectSpec, SkillGroup } from '@/types';

// Ordered newest-first: always prepend new projects at index 0.
// Both ProjectShowcase and Hero CodeCard ("Latest live app") read from this order automatically.
export const PROJECTS: ProjectSpec[] = [
  {
    id: 'learnsphere-lms',
    title: 'LearnSphere LMS',
    category: 'Full-Stack Next.js',
    tags: ['React', 'TypeScript', 'Express', 'MongoDB', 'Docker'],
    shortDesc:
      'Learning management platform for creating courses, managing student enrollments, and tracking lessons in one place.',
    problemSolved:
      'Gave instructors and learners a clean, self-hosted course platform with role-based dashboards and containerized deployment.',
    architecture:
      'TypeScript React frontend backed by an Express & MongoDB REST API, packaged with Docker and automated CI checks.',
    githubUrl: 'https://github.com/FahimInit/learnsphere-lms',
    liveUrl: 'https://learnsphere-lms-three.vercel.app',
  },
  {
    id: 'inventory-order-manager',
    title: 'Inventory & Order Management',
    category: 'Full-Stack Next.js',
    tags: ['Next.js 15', 'TypeScript', 'ASP.NET Core', 'PostgreSQL', 'Tailwind CSS'],
    shortDesc:
      'Multi-tenant SaaS app for tracking product stock, managing incoming orders, and monitoring fulfillment status from one dashboard.',
    problemSolved:
      'Replaced scattered spreadsheets with a centralized order and inventory tracker so stock levels stay accurate as orders move through.',
    architecture:
      'Next.js 15 frontend paired with an ASP.NET Core (.NET 9) Clean Architecture backend and PostgreSQL.',
    githubUrl: 'https://github.com/FahimInit/Enterprise-Inventory-and-Order-Management-SaaS',
    liveUrl: 'https://enterprise-inventory-and-order-mana.vercel.app/',
  },
  {
    id: 'multi-tenant-saas',
    title: 'MultiTenantSaaS',
    category: 'Full-Stack Next.js',
    tags: ['Next.js', 'TypeScript', 'ASP.NET Core', 'RBAC', 'Tailwind CSS'],
    shortDesc:
      'A team workspace app where every organization gets its own isolated space, with roles and permissions for its members.',
    problemSolved:
      'Gave multiple teams a single deployed app where each organization only sees its own data, members, and billing settings.',
    architecture:
      'Next.js App Router frontend connected to an ASP.NET Core Clean Architecture API with tenant-scoped role checks.',
    githubUrl: 'https://github.com/FahimInit/MultiTenantSaaS',
    liveUrl: 'https://multi-tenant-saa-s-seven.vercel.app/',
  },
];

export const TECH_STACK: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    label: 'Backend & Languages',
    items: ['Node.js', 'Express', 'Python', 'C++', 'Java', 'PostgreSQL', 'Prisma', 'MongoDB', 'Redis'],
  },
  {
    label: 'Tools & Workflow',
    items: ['Git', 'Docker', 'Vercel', 'Figma', 'Stripe API', 'REST APIs'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'BSc. in Computer Science & Engineering',
    institution: 'American International University-Bangladesh (AIUB)',
    duration: '2023 – Present',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Rajshahi Education Board Govt. Model School & College',
    duration: '2020 – 2022',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Niamatpur Government Bahumukhi Model High School',
    duration: '2015 – 2020',
  },
];

export const CONTACT_INFO = {
  email: 'fahimmuhtashim19@gmail.com',
  linkedin: 'https://www.linkedin.com/in/md-fahim-muhtashim-427684285',
  whatsapp: 'https://wa.me/+8801759939994',
  phoneDisplay: '+880 1759-939994',
};
