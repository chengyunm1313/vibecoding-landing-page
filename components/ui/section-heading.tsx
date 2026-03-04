import { Badge } from '@/components/ui/badge';

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <Badge>{eyebrow}</Badge>
      <h2 className="font-display mt-6 max-w-4xl text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-[var(--color-neutral)] md:text-5xl">
        {title}
      </h2>
      <div className="mt-6 h-px w-20 bg-[linear-gradient(90deg,var(--color-primary),rgba(199,104,54,0.24))]" />
      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{description}</p>
    </div>
  );
}
