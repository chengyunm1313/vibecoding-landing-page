import Image from 'next/image';

import type { LandingContent } from '@/types/landing';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { MetricChip } from '@/components/ui/metric-chip';

export function Hero({ content }: { content: LandingContent }) {
  return (
    <section className="section-padding pt-10 md:pt-16">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="hero-rise">
            <Badge>{content.hero.eyebrow}</Badge>
            <h1 className="font-display mt-6 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-[var(--color-neutral)] sm:text-5xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              {content.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                href={content.line.oaUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaId="hero-primary-signup"
                placement="hero-primary"
              >
                立即報名
              </Button>
              <Button href="#curriculum" variant="secondary">
                查看課程亮點
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {content.trustMetrics.map((metric) => (
                <MetricChip key={metric.label} value={metric.value} label={metric.label} />
              ))}
            </div>

            <div className="mt-10 grid gap-3 rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 text-sm text-slate-600 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:grid-cols-3">
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
            <div className="absolute inset-x-8 top-8 h-40 rounded-full bg-[rgba(45,212,191,0.22)] blur-3xl" />
            <div className="noise-ring relative rounded-[36px] bg-[linear-gradient(180deg,rgba(13,148,136,0.08),rgba(255,255,255,0.96))] p-5 shadow-[0_35px_100px_rgba(15,23,42,0.1)]">
              <div className="rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-white p-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="font-display text-lg font-bold text-[var(--color-neutral)]">
                      成果預覽面板
                    </div>
                    <div className="text-sm text-slate-500">工作坊完成後你會帶走的東西</div>
                  </div>
                  <Badge tone="neutral">MVP Ready</Badge>
                </div>

                <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50">
                  <Image
                    src="/hero-dashboard.svg"
                    alt="銷售頁與追蹤設定的成果示意畫面"
                    width={900}
                    height={700}
                    className="h-auto w-full"
                    priority
                  />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] bg-slate-50 p-4">
                    <Icon name="grid" className="h-6 w-6 text-[var(--color-primary)]" />
                    <div className="mt-3 text-sm font-semibold text-[var(--color-neutral)]">
                      網站成品
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      完整 Hero、CTA、FAQ 與高轉換內容排序。
                    </div>
                  </div>
                  <div className="rounded-[24px] bg-slate-50 p-4">
                    <Icon name="chart" className="h-6 w-6 text-[var(--color-primary)]" />
                    <div className="mt-3 text-sm font-semibold text-[var(--color-neutral)]">
                      追蹤設定
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      CTA、頁面滾動與再行銷資料基礎同步建立。
                    </div>
                  </div>
                  <div className="rounded-[24px] bg-slate-50 p-4">
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
