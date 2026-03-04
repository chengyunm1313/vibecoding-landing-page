import type { LandingContent } from '@/types/landing';

import { SectionHeading } from '@/components/ui/section-heading';

export function Testimonials({ content }: { content: LandingContent }) {
  return (
    <section className="section-padding bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(234,239,243,0.38),rgba(255,255,255,0))]">
      <div className="section-shell">
        <SectionHeading
          eyebrow="社會證明"
          title="讓報名者看到，這門課的重點不是聽完，而是真的做完"
          description="在正式學員見證補齊前，先保留真實語氣的回饋結構，後續只需替換內容，不用重做整個版。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {content.testimonials.map((item) => (
            <figure key={item.author} className="surface-card rounded-[32px] p-7">
              <div className="subtitle-text inline-flex rounded-full border border-[rgba(20,34,53,0.08)] bg-white/80 px-3 py-1 text-[var(--color-primary)]">
                {item.tag}
              </div>
              <div className="font-display mt-6 text-5xl leading-none text-[var(--color-primary)]">“</div>
              <blockquote className="mt-4 text-lg leading-8 text-[var(--color-neutral)]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-[rgba(20,34,53,0.08)] pt-5">
                <div className="text-sm font-semibold text-[var(--color-neutral)]">{item.author}</div>
                <div className="mt-1 text-sm text-slate-500">真實學員回饋語氣示意</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
