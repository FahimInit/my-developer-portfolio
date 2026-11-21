<div align="center">

# Fahim.dev — Full-Stack Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

*Personal portfolio built with Next.js 15, strict TypeScript, interactive browser demos, and a quick project estimator.*

[GitHub Repository](https://github.com/FahimInit/my-developer-portfolio) · [Upwork Profile](https://www.upwork.com) · [Issues](https://github.com/FahimInit/my-developer-portfolio/issues)

</div>

---

## 🛠️ Tech Stack & Architecture

Built with a feature-sliced layout separating UI primitives, interactive feature modules, and server utilities.

```mermaid
graph TD
    A["Client Browser / Next.js SSR"] -->|Security Headers| B["App Router (src/app)"]
    B --> C{"API Route (/api/estimate)"}
    C -->|Origin & Rate-Limit Check| D1["Security Layer (src/lib/security)"]
    D1 -->|Zod Schema Validation| D2["Sanitized Estimate & Milestone Brief"]

    B --> E["Feature Modules (src/features)"]
    E --> F1["Hero (Interactive Canvas Particles, CodeCard & TechMarquee)"]
    E --> F2["Project Sandboxes (MultiTenantSaaS, Aura, SpatialAI, PulseMetrics)"]
    E --> F3["Scope Calculator (Fixed-Price Packages & Upwork Brief Generator)"]

    B --> G["Design System & Theme Engine (src/components)"]
    G --> H["CSS Variables (:root Obsidian, .theme-linear, .theme-emerald)"]
```

---

## 📂 Directory Structure

```text
src/
├── app/
│   ├── api/estimate/route.ts     # Rate-limited, Zod-validated estimate endpoint
│   ├── globals.css               # Multi-theme CSS variables & animations
│   ├── layout.tsx                # Root layout & metadata
│   └── page.tsx                  # Home page composing Hero, Work, Skills, Process & Services
├── components/
│   ├── layout/                   # Navbar, Footer, ThemeProvider
│   └── ui/                       # Button, Badge, Card, Modal, SectionHeading
├── config/
│   ├── packages.ts               # Service packages, add-ons & shared Zod schema
│   └── projects.ts               # Featured projects & tech stack groups
├── features/
│   ├── hero/                     # Hero, CodeCard, TechMarquee & interactive ParticleField
│   ├── project-sandboxes/        # ProjectShowcase + Ecommerce, Visualizer & Analytics demos
│   └── scope-calculator/         # Fixed-price package cards & interactive estimate builder
├── lib/
│   ├── env.ts                    # Zod-validated environment config
│   ├── security.ts               # Sliding-window rate limiter, same-origin check & sanitizer
│   └── utils.ts                  # cn() class merger and formatting helpers
└── types/
    └── index.ts                  # Shared TypeScript interfaces
```

---

## 🚀 Getting Started

1. **Clone & install:**
   ```bash
   git clone https://github.com/FahimInit/my-developer-portfolio.git
   cd my-developer-portfolio
   npm install
   ```

2. **Run locally:**
   ```bash
   npm run dev
   ```

3. **Typecheck & production build:**
   ```bash
   npm run typecheck
   npm run build
   ```

---

## 📄 License

MIT
