import type { LandingContent } from '@/types/landing';

import { SectionHeading } from '@/components/ui/section-heading';

export function CurriculumRoadmap({ content }: { content: LandingContent }) {
  return (
    <section id="curriculum" className="section-anchor section-padding">
      <div className="section-shell">
        <SectionHeading
          eyebrow="課程核心內容"
          title="5 個步驟，把銷售頁、追蹤與部署流程一次串起來"
          description="課程不是單點教學，而是一條連續的實作路徑。每一步都對應一個你可以帶走的結果。"
        />

        <div className="mt-14 space-y-5">
          {content.curriculum.map((item) => (
            <article
              key={item.step}
              className="surface-card grid gap-6 rounded-[32px] p-6 md:grid-cols-[120px_1fr_280px] md:items-center md:p-8"
            >
              <div>
                <div className="subtitle-text text-slate-400">STEP</div>
                <div className="font-display mt-2 text-5xl font-bold tracking-[-0.05em] text-[var(--color-primary)]">
                  {item.step}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-neutral)]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.detail}</p>
              </div>
              <div className="rounded-[24px] border border-[rgba(20,34,53,0.06)] bg-[rgba(20,34,53,0.03)] px-5 py-4">
                <div className="subtitle-text text-[var(--color-primary)]">
                  這一步的產出
                </div>
                <div className="mt-3 text-base font-medium leading-7 text-[var(--color-neutral)]">
                  {item.outcome}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
