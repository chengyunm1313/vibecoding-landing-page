import type { LandingContent } from '@/types/landing';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

const pricePattern = /^(\d[\d,]*)(元)$/;
const planCtas: Record<string, string> = {
  單人票: '加入 LINE 詢問方案',
  早鳥優惠: '先用早鳥方案卡位',
  雙人團報: '加入 LINE 詢問團報',
};

const getPriceParts = (price: string) => {
  const matched = price.match(pricePattern);

  if (!matched) {
    return null;
  }

  return {
    amount: matched[1],
    unit: matched[2],
  };
};

export function Pricing({ content }: { content: LandingContent }) {
  return (
    <section
      id="pricing"
      data-track-section="pricing"
      className="section-anchor section-padding"
    >
      <div className="section-shell">
        <div className="space-y-8">
          <div>
            <Badge>價格方案與 CTA</Badge>
            <h2 className="font-display mt-6 max-w-4xl text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-[var(--color-neutral)] md:text-5xl">
              用清楚方案與價格節奏，讓報名者更快做決定
            </h2>
            <div className="mt-6 h-px w-24 bg-[linear-gradient(90deg,var(--color-primary),rgba(199,104,54,0.35))]" />
          </div>

          <div className="space-y-6">
            <div className="grid gap-5 lg:grid-cols-[0.96fr_1.08fr_0.96fr]">
              {content.pricing.plans.map((plan) => {
                const priceParts = getPriceParts(plan.price);
                const ctaLabel = planCtas[plan.name] ?? '加入 LINE 詢問方案';

                return (
                  <article
                    key={plan.name}
                    className={`relative flex min-h-[380px] flex-col rounded-[32px] border p-7 ${
                      plan.featured
                        ? 'border-[rgba(199,104,54,0.24)] bg-[linear-gradient(180deg,rgba(255,246,239,0.96),rgba(255,253,250,1))] shadow-[0_24px_80px_rgba(199,104,54,0.14)]'
                        : 'border-[rgba(20,34,53,0.08)] bg-[rgba(255,253,250,0.9)] shadow-[0_18px_50px_rgba(20,34,53,0.05)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className={`subtitle-text ${
                            plan.featured
                              ? 'text-[var(--color-cta)]'
                              : 'text-[var(--color-primary)]'
                          }`}
                        >
                          {plan.name}
                        </div>
                        <div className="mt-2 text-sm text-slate-500">
                          {plan.featured ? '推薦第一次報名者優先卡位' : '適合不同報名情境'}
                        </div>
                      </div>

                      {plan.featured ? (
                        <div className="rounded-full bg-[var(--color-cta)] px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white">
                          最推薦
                        </div>
                      ) : null}
                    </div>

                    {priceParts ? (
                      <div className="mt-10 flex items-end gap-2 text-[var(--color-neutral)]">
                        <span className="font-display text-[4rem] font-bold leading-none tracking-[-0.08em] md:text-[4.35rem]">
                          {priceParts.amount}
                        </span>
                        <span className="pb-2 text-[1.75rem] font-semibold">{priceParts.unit}</span>
                      </div>
                    ) : (
                      <div className="font-display mt-10 text-[3.5rem] font-bold leading-none tracking-[-0.06em] text-[var(--color-neutral)] md:text-[3.8rem]">
                        {plan.price}
                      </div>
                    )}

                    <p className="mt-6 text-base leading-8 text-slate-600">{plan.note}</p>

                    <div className="mt-auto pt-6">
                      <Button
                        href={content.line.oaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        ctaId={`pricing-${plan.name}`}
                        placement="pricing"
                        pricingTier={plan.name}
                        variant={plan.featured ? 'primary' : 'secondary'}
                        className="w-full justify-center whitespace-nowrap"
                      >
                        {ctaLabel}
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="noise-ring rounded-[36px] bg-[linear-gradient(135deg,rgba(29,79,115,0.08),rgba(255,253,250,0.98),rgba(199,104,54,0.08))] p-6 md:p-8">
              <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr] xl:items-stretch">
                <div>
                  <div className="subtitle-text text-[var(--color-primary)]">
                    報名提醒
                  </div>
                  <ul className="mt-5 space-y-4 text-slate-600">
                    {content.pricing.urgency.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm">
                          <Icon name="check" className="h-4 w-4" />
                        </span>
                        <span className="text-base leading-8">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[28px] bg-[var(--color-neutral)] p-5 text-white shadow-[0_24px_70px_rgba(20,34,53,0.16)] md:p-6">
                  <div className="subtitle-text text-white/65">
                    下一步很簡單
                  </div>
                  <h3 className="font-display mt-4 max-w-[12ch] text-[2rem] font-bold leading-[1.14] tracking-[-0.04em] md:text-[2.35rem]">
                    先加入 LINE，確認資訊後再決定是否報名
                  </h3>
                  <p className="mt-4 text-base leading-8 text-white/78">
                    點進去後你會先收到課程說明、匯款方式與後續步驟，不是直接被逼著下單。
                  </p>

                  <Button
                    href={content.line.oaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    ctaId="pricing-signup"
                    placement="pricing"
                    pricingTier="early-bird"
                    className="mt-6 w-full justify-center whitespace-nowrap bg-white text-[var(--color-neutral)] shadow-none hover:bg-white/92"
                  >
                    加入 LINE 立即卡位
                  </Button>

                  <div className="mt-4 text-center text-sm leading-7 text-white/60">
                    由 LINE 發送課程資訊、匯款說明與後續確認
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-2xl text-base leading-8 text-slate-600">
                這一區不需要炫技，只需要把方案差異、推薦選項與報名動作說清楚。現在的重點是讓人一眼知道該選哪一個，以及下一步要做什麼。
              </div>

              <div className="rounded-[28px] border border-[rgba(20,34,53,0.08)] bg-[rgba(255,253,250,0.76)] p-6 shadow-[0_20px_60px_rgba(20,34,53,0.06)]">
                <div className="subtitle-text text-[var(--color-primary)]">
                  這一段應該傳達的 3 件事
                </div>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                  <li className="flex items-start gap-3">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    <span>哪個方案最適合第一次報名的人</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    <span>現在行動有什麼優惠或截止條件</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    <span>點擊之後會發生什麼事，不要讓人猜</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
