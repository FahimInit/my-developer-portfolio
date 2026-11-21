interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
}

export function SectionHeading({ title, eyebrow, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 flex items-center gap-2 font-mono text-xs text-accent-primary">
          <span className="h-px w-6 bg-accent-primary" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm text-ink-muted sm:text-base">{description}</p>
      )}
    </div>
  );
}
