import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { env } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: 'Full-Stack Web Developer | React, Next.js & Node.js Specialist',
  description:
    'Enterprise-grade full-stack developer portfolio featuring live interactive React/Next.js sandboxes, strict TypeScript architecture, Zod-validated API routes, and fixed-price Upwork packages.',
  openGraph: {
    title: 'Full-Stack Web Developer | React, Next.js & Node.js Specialist',
    description:
      'Explore live interactive Next.js sandboxes, architecture telemetry, and validated Upwork fixed-price scope estimation.',
    type: 'website',
    url: env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Stack React, Next.js & Node.js Specialist',
    description:
      'Production-hardened web apps built with Next.js 15, TypeScript, Tailwind CSS, and Node.js.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-canvas font-sans text-ink-primary antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar availability={env.NEXT_PUBLIC_AVAILABILITY_STATUS} />
            <main className="flex-1">{children}</main>
            <Footer
              upworkUrl={env.NEXT_PUBLIC_UPWORK_PROFILE_URL}
              githubUrl={env.NEXT_PUBLIC_GITHUB_URL}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
