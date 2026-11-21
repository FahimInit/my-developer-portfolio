import { Github } from 'lucide-react';

interface FooterProps {
  upworkUrl: string;
  githubUrl: string;
}

export function Footer({ upworkUrl, githubUrl }: FooterProps) {
  return (
    <footer className="border-t border-line-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Fahim. Built with Next.js.</p>
        <div className="flex items-center gap-5">
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
