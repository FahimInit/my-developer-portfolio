import type { EducationItem, ProjectSpec, SkillGroup } from '@/types';

export const PROJECTS: ProjectSpec[] = [
  {
    id: 'multi-tenant-saas',
    title: 'MultiTenantSaaS',
    category: 'Full-Stack Next.js',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'RBAC', 'Vercel'],
    shortDesc:
      'A team workspace app where every organization gets its own isolated space, with roles and permissions for its members.',
    problemSolved:
      'Gave multiple teams a single deployed app where each organization only sees its own data, members, and billing settings.',
    architecture:
      'Next.js App Router with tenant-scoped routes, role-based access checks, and modular dashboard components.',
    githubUrl: 'https://github.com/FahimInit/MultiTenantSaaS',
    liveUrl: 'https://multi-tenant-saa-s-seven.vercel.app/',
  },
  {
    id: 'inventory-order-manager',
    title: 'Inventory & Order Management',
    category: 'Full-Stack Next.js',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    shortDesc:
      'Web app for tracking product stock, managing incoming orders, and monitoring fulfillment status from one dashboard.',
    problemSolved:
      'Replaced scattered spreadsheets with a centralized order and inventory tracker so stock levels stay accurate as orders move through.',
    architecture:
      'Next.js App Router with responsive data tables, real-time stock status indicators, and clean state updates.',
    liveUrl: 'https://enterprise-inventory-and-order-mana.vercel.app/',
  },
  {
    id: 'aura-digital',
    title: 'Aura Digital Solutions',
    category: 'Full-Stack Next.js',
    tags: ['Next.js', 'Tailwind CSS', 'Stripe API', 'Vercel'],
    shortDesc:
      'Web agency and marketing automation platform built for small businesses that need fast landing pages and client dashboards.',
    problemSolved:
      'Helped small-to-medium businesses launch modern, high-converting sites with automated billing instead of stitching multiple tools together.',
    architecture:
      'Static marketing pages paired with dynamic Next.js dashboard routes, Stripe subscription checkout, and webhook fulfillment.',
    liveUrl: 'https://ucabm.vercel.app/',
    demoType: 'ecommerce',
  },
  {
    id: 'aura-cafe',
    title: 'The Aura Cafe',
    category: 'React UI',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    shortDesc:
      'Website for a modern cafe featuring an interactive menu, table reservation flow, and photo gallery.',
    problemSolved:
      'Replaced a static menu page with a mobile-friendly site where customers can browse dishes and book a table in under a minute.',
    architecture:
      'Statically generated Next.js pages for fast mobile load times with responsive Tailwind layouts.',
    liveUrl: 'https://aura-cafe-chi.vercel.app/',
  },
  {
    id: 'yt-playlist-downloader',
    title: 'YouTube Playlist Downloader',
    category: 'Node.js & Python',
    tags: ['Python', 'Node.js', 'YouTube API v3', 'FFmpeg'],
    shortDesc:
      'Automated script that downloads entire YouTube playlists in parallel while keeping titles and track order intact.',
    problemSolved:
      'Saved hours of downloading educational videos one by one and handled connection drops and rate limits automatically.',
    architecture:
      'Node.js fetches playlist metadata from the YouTube API and hands tasks to a Python worker pool running FFmpeg.',
    githubUrl: 'https://github.com/FahimInit',
    codeSnippet: `from pytube import Playlist

def download_playlist(url, path):
    pl = Playlist(url)
    for video in pl.videos:
        video.streams.get_highest_resolution().download(path)`,
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
