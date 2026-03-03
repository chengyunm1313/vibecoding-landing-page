export function MetricChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="noise-ring rounded-[28px] bg-white/75 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="font-display text-2xl font-bold text-[var(--color-neutral)]">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}
