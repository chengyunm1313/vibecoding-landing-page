import type { LandingContent } from '@/types/landing';

import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';

export function Schedule({ content }: { content: LandingContent }) {
  return (
    <section className="section-padding">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="課程時間與地點"
            title="把上課資訊清楚講明白，降低最後一哩的報名猶豫"
            description="當日期、形式、地點與準備工具一次說清楚，報名者就比較不需要回頭私訊確認細節。"
          />

          <div className="surface-card rounded-[36px] p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-[rgba(20,34,53,0.06)] bg-[rgba(20,34,53,0.03)] p-5">
                <div className="flex items-center gap-3 text-[var(--color-primary)]">
                  <Icon name="clock" className="h-5 w-5" />
                  <span className="subtitle-text">日期</span>
                </div>
                <div className="mt-4 text-xl font-semibold text-[var(--color-neutral)]">
                  {content.schedule.courseDate}
                </div>
              </div>
              <div className="rounded-[28px] border border-[rgba(20,34,53,0.06)] bg-[rgba(20,34,53,0.03)] p-5">
                <div className="flex items-center gap-3 text-[var(--color-primary)]">
                  <Icon name="clock" className="h-5 w-5" />
                  <span className="subtitle-text">時間</span>
                </div>
                <div className="mt-4 text-xl font-semibold text-[var(--color-neutral)]">
                  {content.schedule.courseTime}
                </div>
              </div>
              <div className="rounded-[28px] border border-[rgba(20,34,53,0.06)] bg-[rgba(20,34,53,0.03)] p-5">
                <div className="flex items-center gap-3 text-[var(--color-primary)]">
                  <Icon name="users" className="h-5 w-5" />
                  <span className="subtitle-text">形式</span>
                </div>
                <div className="mt-4 text-xl font-semibold text-[var(--color-neutral)]">
                  {content.schedule.format}
                </div>
              </div>
              <div className="rounded-[28px] border border-[rgba(20,34,53,0.06)] bg-[rgba(20,34,53,0.03)] p-5">
                <div className="flex items-center gap-3 text-[var(--color-primary)]">
                  <Icon name="map" className="h-5 w-5" />
                  <span className="subtitle-text">地點</span>
                </div>
                <div className="mt-4 text-xl font-semibold text-[var(--color-neutral)]">
                  {content.schedule.venue}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[28px] bg-[var(--color-neutral)] p-6 text-white">
              <div className="subtitle-text text-white/70">
                建議自備工具
              </div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {content.schedule.tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-3 text-sm text-white/88">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
