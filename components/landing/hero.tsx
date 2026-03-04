import Image from 'next/image';

import type { LandingContent } from '@/types/landing';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { MetricChip } from '@/components/ui/metric-chip';
import { withPublicPath } from '@/lib/public-path';

export function Hero({ content }: { content: LandingContent }) {
  return (
    <section className="section-padding pt-8 md:pt-14">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="hero-rise">
            <Badge>{content.hero.eyebrow}</Badge>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-[rgba(20,34,53,0.08)] bg-white/80 px-3 py-1.5">
                零基礎也能跟著完成
              </span>
              <span className="rounded-full border border-[rgba(20,34,53,0.08)] bg-white/80 px-3 py-1.5">
                不是只學概念，而是直接做出頁面
              </span>
            </div>
            <h1 className="font-display mt-7 max-w-4xl text-3xl font-bold leading-[0.98] tracking-[-0.055em] text-[var(--color-neutral)] sm:text-4xl lg:text-[4rem]">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.3rem]">
              {content.hero.subtitle}
            </p>

            <div className="mt-8 grid gap-3 rounded-[30px] border border-[rgba(20,34,53,0.08)] bg-[rgba(255,253,250,0.82)] p-4 text-sm text-slate-600 shadow-[0_20px_60px_rgba(20,34,53,0.06)] sm:grid-cols-3">
              <div>
                <div className="subtitle-text uppercase text-[var(--color-primary)]">
                  開課日期
                </div>
                <div className="mt-2 font-medium text-[var(--color-neutral)]">
                  {content.schedule.courseDate}
                </div>
              </div>
              <div>
                <div className="subtitle-text uppercase text-[var(--color-primary)]">
                  上課形式
                </div>
                <div className="mt-2 font-medium text-[var(--color-neutral)]">
                  {content.schedule.format}
                </div>
              </div>
              <div>
                <div className="subtitle-text uppercase text-[var(--color-primary)]">
                  上課地點
                </div>
                <div className="mt-2 font-medium text-[var(--color-neutral)]">
                  {content.schedule.venue}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                href={content.line.oaUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaId="hero-primary-signup"
                placement="hero-primary"
              >
                立即加入 LINE
              </Button>
              <Button href="#curriculum" variant="secondary">
                先看課程內容
              </Button>
            </div>

            <div className="mt-4 text-sm leading-7 text-slate-500">
              適合講師、顧問、內容創作者，或任何想先做出第一個可上線頁面的人。
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {content.trustMetrics.map((metric) => (
                <MetricChip key={metric.label} value={metric.value} label={metric.label} />
              ))}
            </div>

            <div className="mt-10 grid gap-3 rounded-[32px] border border-[rgba(20,34,53,0.08)] bg-[rgba(255,253,250,0.84)] p-5 text-sm text-slate-600 shadow-[0_24px_80px_rgba(20,34,53,0.08)] sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <Icon name="clock" className="h-5 w-5 text-[var(--color-primary)]" />
                <span>{content.hero.countdownLabel}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="shield" className="h-5 w-5 text-[var(--color-primary)]" />
                <span>{content.hero.deadlineLabel}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="users" className="h-5 w-5 text-[var(--color-primary)]" />
                <span>{content.hero.seatsLabel}</span>
              </div>
            </div>
          </div>

          <div className="hero-rise relative lg:justify-self-end">
            <div className="absolute inset-x-10 top-8 h-40 rounded-full bg-[rgba(29,79,115,0.14)] blur-3xl" />
            <div className="noise-ring relative rounded-[40px] bg-[linear-gradient(180deg,rgba(29,79,115,0.08),rgba(255,253,250,0.98))] p-5 shadow-[0_35px_100px_rgba(20,34,53,0.12)]">
              <div className="rounded-[30px] border border-[rgba(20,34,53,0.08)] bg-[var(--color-surface-strong)] p-4">
                <div className="flex items-center justify-between border-b border-[rgba(20,34,53,0.08)] pb-4">
                  <div>
                    <div className="font-display text-lg font-bold text-[var(--color-neutral)]">
                      成果預覽面板
                    </div>
                    <div className="text-sm text-slate-500">工作坊結束前，你會真的做出這些東西</div>
                  </div>
                  <Badge tone="neutral">MVP Ready</Badge>
                </div>

                <div className="mt-5 rounded-[24px] border border-[rgba(20,34,53,0.08)] bg-[rgba(20,34,53,0.02)] px-5 py-4">
                  <div className="subtitle-text uppercase text-[var(--color-primary)]">
                    你不是只會拿到教材
                  </div>
                  <div className="mt-3 text-base leading-7 text-[var(--color-neutral)]">
                    你會離開教室時，同時帶走可公開的頁面、可追蹤的事件，和一條自己之後還能複製的發版流程。
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-[24px] border border-[rgba(20,34,53,0.08)] bg-slate-50">
                  <Image
                    src={withPublicPath('/hero-dashboard.svg')}
                    alt="銷售頁與追蹤設定的成果示意畫面"
                    width={900}
                    height={700}
                    className="h-auto w-full"
                    priority
                  />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] border border-[rgba(20,34,53,0.05)] bg-[rgba(20,34,53,0.03)] p-4">
                    <Icon name="grid" className="h-6 w-6 text-[var(--color-primary)]" />
                    <div className="mt-3 text-sm font-semibold text-[var(--color-neutral)]">
                      網站成品
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      完整 Hero、CTA、FAQ 與高轉換內容排序。
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-[rgba(20,34,53,0.05)] bg-[rgba(20,34,53,0.03)] p-4">
                    <Icon name="chart" className="h-6 w-6 text-[var(--color-primary)]" />
                    <div className="mt-3 text-sm font-semibold text-[var(--color-neutral)]">
                      追蹤設定
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      CTA、頁面滾動與再行銷資料基礎同步建立。
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-[rgba(20,34,53,0.05)] bg-[rgba(20,34,53,0.03)] p-4">
                    <Icon name="rocket" className="h-6 w-6 text-[var(--color-primary)]" />
                    <div className="mt-3 text-sm font-semibold text-[var(--color-neutral)]">
                      部署完成
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      GitHub Pages 發版流程與後續版本控管一起理解。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
