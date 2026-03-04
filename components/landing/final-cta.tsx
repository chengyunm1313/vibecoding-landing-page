import type { LandingContent } from '@/types/landing';

import { Button } from '@/components/ui/button';

export function FinalCta({ content }: { content: LandingContent }) {
  return (
    <section className="section-padding">
      <div className="section-shell">
        <div className="noise-ring rounded-[40px] bg-[linear-gradient(135deg,#142235,#1d3249)] px-6 py-10 text-white md:px-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="subtitle-text text-white/60">
                最後一個提醒
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold leading-[1.08] tracking-[-0.045em] md:text-5xl">
                {content.finalCta.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
                {content.finalCta.description}
              </p>
              <div className="mt-6 text-sm leading-7 text-white/60">
                先加入 LINE，不代表立即購買；你會先收到課程說明、優惠與後續報名步驟。
              </div>
            </div>

            <Button
              href={content.line.oaUrl}
              target="_blank"
              rel="noopener noreferrer"
              ctaId="final-signup"
              placement="final-cta"
              className="whitespace-nowrap"
            >
              現在加入 LINE 卡位
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
