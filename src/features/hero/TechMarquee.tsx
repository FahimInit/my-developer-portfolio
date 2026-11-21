import { TECH_STACK } from '@/config/projects';

export function TechMarquee() {
  const items = TECH_STACK.flatMap((group) => group.items);
  // Render the list twice so the -50% translate loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div className="mask-fade-x overflow-hidden border-b border-line-subtle bg-elevated/30 py-5">
      <div className="flex w-max animate-marquee">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap pr-12 text-sm font-medium text-ink-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
