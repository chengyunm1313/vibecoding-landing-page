import type { LandingContent } from '@/types/landing';

import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';

const iconMap = ['grid', 'chart', 'rocket'] as const;

export function ResultsShowcase({ content }: { content: LandingContent }) {
  return (
    <section
      id="results"
      data-track-section="results"
      className="section-anchor section-padding"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="你會帶走的成果"
          title="不是學完而已，而是把能賣、能追、能上線的成果直接做出來"
          description="成果展示放在前面，因為這門課要解決的不是知識焦慮，而是讓你在最短時間內得到一個真的可交付的作品。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {content.outcomes.map((outcome, index) => (
            <article
              key={outcome.id}
              className="surface-card stagger-fade rounded-[32px] p-7"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(29,79,115,0.1)] text-[var(--color-primary)]">
                  <Icon name={iconMap[index]} className="h-6 w-6" />
                </div>
                <div className="text-sm font-semibold tracking-[0.16em] text-slate-400">
                  0{index + 1}
                </div>
              </div>
              <h3 className="mt-6 text-[1.7rem] font-semibold tracking-[-0.03em] text-[var(--color-neutral)]">
                {outcome.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">{outcome.summary}</p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
                {outcome.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Icon
                      name="check"
                      className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
