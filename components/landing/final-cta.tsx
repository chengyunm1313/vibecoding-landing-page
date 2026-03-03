import type { LandingContent } from '@/types/landing';

import { Button } from '@/components/ui/button';

export function FinalCta({ content }: { content: LandingContent }) {
  return (
    <section className="section-padding">
      <div className="section-shell">
        <div className="noise-ring rounded-[40px] bg-[var(--color-neutral)] px-6 py-10 text-white md:px-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                Final CTA
              </div>
              <h2 className="font-display mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
                {content.finalCta.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
                {content.finalCta.description}
              </p>
            </div>

            <Button
              href={content.line.oaUrl}
              target="_blank"
              rel="noopener noreferrer"
              ctaId="final-signup"
              placement="final-cta"
              className="whitespace-nowrap"
            >
              現在加入 LINE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
