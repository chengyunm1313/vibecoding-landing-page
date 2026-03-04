export function MetricChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="noise-ring rounded-[28px] bg-[rgba(255,253,250,0.86)] px-5 py-4 shadow-[0_18px_50px_rgba(20,34,53,0.08)]">
      <div className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--color-neutral)]">
        {value}
      </div>
      <div className="mt-1 text-sm leading-6 text-slate-600">{label}</div>
    </div>
  );
}
