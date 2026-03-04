export function Badge({
  children,
  tone = 'primary',
}: {
  children: React.ReactNode;
  tone?: 'primary' | 'neutral';
}) {
  const toneClass =
    tone === 'primary'
      ? 'border-[rgba(29,79,115,0.12)] bg-[rgba(255,253,250,0.92)] text-[var(--color-primary)]'
      : 'border-[rgba(20,34,53,0.08)] bg-[rgba(255,253,250,0.82)] text-[var(--color-neutral)]';

  return (
    <span
      className={`subtitle-text inline-flex items-center gap-2 rounded-full border px-4 py-2 uppercase ${toneClass}`}
    >
      {children}
    </span>
  );
}
