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
    <div className="max-w-3xl">
      <Badge>{eyebrow}</Badge>
      <h2 className="font-display mt-6 text-3xl font-bold tracking-tight text-[var(--color-neutral)] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{description}</p>
    </div>
  );
}
