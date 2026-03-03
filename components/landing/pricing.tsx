import type { LandingContent } from '@/types/landing';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';

export function Pricing({ content }: { content: LandingContent }) {
  return (
    <section
      id="pricing"
      data-track-section="pricing"
      className="section-anchor section-padding"
    >
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="價格方案與 CTA"
            title="用清楚方案與急迫感資訊，幫報名者更快做決定"
            description="所有報名入口統一導向 LINE，頁面本身先把價格、名額與流程講明白，減少私訊來回確認。"
          />

          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-3">
              {content.pricing.plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-[32px] p-6 ${
                    plan.featured
                      ? 'bg-[var(--color-neutral)] text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]'
                      : 'surface-card'
                  }`}
                >
                  <div
                    className={`text-sm font-semibold uppercase tracking-[0.22em] ${
                      plan.featured ? 'text-[rgba(255,255,255,0.64)]' : 'text-[var(--color-primary)]'
                    }`}
                  >
                    {plan.name}
                  </div>
                  <div className="font-display mt-5 text-4xl font-bold">{plan.price}</div>
                  <p
                    className={`mt-4 text-sm leading-7 ${
                      plan.featured ? 'text-[rgba(255,255,255,0.82)]' : 'text-slate-600'
                    }`}
                  >
                    {plan.note}
                  </p>
                </article>
              ))}
            </div>

            <div className="noise-ring rounded-[36px] bg-[linear-gradient(135deg,rgba(13,148,136,0.08),rgba(255,255,255,0.96),rgba(234,88,12,0.1))] p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                    報名提醒
                  </div>
                  <ul className="mt-5 space-y-3 text-slate-600">
                    {content.pricing.urgency.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm">
                          <Icon name="check" className="h-4 w-4" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    href={content.line.oaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    ctaId="pricing-signup"
                    placement="pricing"
                    pricingTier="early-bird"
                    className="w-full whitespace-nowrap px-7"
                  >
                    加入 LINE 立即報名
                  </Button>
                  <div className="text-center text-sm text-slate-500">
                    由 LINE 發送課程資訊、匯款說明與後續確認
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
