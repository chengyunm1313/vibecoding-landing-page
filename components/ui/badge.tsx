export function Badge({
  children,
  tone = 'primary',
}: {
  children: React.ReactNode;
  tone?: 'primary' | 'neutral';
}) {
  const toneClass =
    tone === 'primary'
      ? 'border-[rgba(13,148,136,0.14)] bg-white/80 text-[var(--color-primary)]'
      : 'border-[rgba(15,23,42,0.08)] bg-white/75 text-[var(--color-neutral)]';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${toneClass}`}
    >
      {children}
    </span>
  );
}
