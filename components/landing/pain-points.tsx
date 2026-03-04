import type { LandingContent } from '@/types/landing';

import { SectionHeading } from '@/components/ui/section-heading';

export function PainPoints({ content }: { content: LandingContent }) {
  return (
    <section className="section-padding bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,252,247,0.72),rgba(255,255,255,0))]">
      <div className="section-shell">
        <SectionHeading
          eyebrow="你可能也卡在這裡"
          title="不是你不夠努力，而是大多數人缺少一條能把想法落成成果的路"
          description="這堂課聚焦在目標受眾最常見的三種卡點，讓頁面、追蹤與報名流程能一起串起來。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
          {content.painPoints.map((point) => (
            <article key={point.title} className="surface-card rounded-[28px] p-7">
              <div className="subtitle-text text-[var(--color-primary)]">
                常見卡點
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-8 text-[var(--color-neutral)]">
                {point.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">{point.description}</p>
            </article>
          ))}
        </div>

        <div className="noise-ring mt-10 rounded-[36px] bg-[var(--color-neutral)] px-7 py-8 text-white md:px-10">
          <div className="subtitle-text text-[rgba(255,255,255,0.72)]">
            這堂課會怎麼解
          </div>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[rgba(255,255,255,0.88)]">
            {content.solutionStatement}
          </p>
        </div>
      </div>
    </section>
  );
}
