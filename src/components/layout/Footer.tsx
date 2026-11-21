import { FileText, Github, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/config/projects';

interface FooterProps {
  upworkUrl: string;
  githubUrl: string;
}

export function Footer({ upworkUrl, githubUrl }: FooterProps) {
  return (
    <footer className="border-t border-line-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Md. Fahim Muhtashim. Built with Next.js.</p>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="inline-flex items-center gap-1.5 transition hover:text-ink-primary"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-ink-primary"
          >
            LinkedIn
          </a>
          <a
            href={CONTACT_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-ink-primary"
          >
            WhatsApp
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-ink-primary"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-ink-primary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-ink-primary"
          >
            Upwork
          </a>
        </div>
      </div>
    </footer>
  );
}
