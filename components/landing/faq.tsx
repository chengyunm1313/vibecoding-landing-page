'use client';

import { useState } from 'react';

import type { LandingContent } from '@/types/landing';

import { trackFaqToggle } from '@/lib/analytics';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';

export function Faq({ content }: { content: LandingContent }) {
  const [openId, setOpenId] = useState(content.faq[0]?.id);

  return (
    <section className="section-padding">
      <div className="section-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="把常見疑問先回答完，讓報名決策更直覺"
          description="這一區先放最常被問的四題。之後若要補更多課程細節，也能直接照現有結構延伸。"
        />

        <div className="mt-14 space-y-4">
          {content.faq.map((item) => {
            const isOpen = openId === item.id;

            return (
              <article key={item.id} className="surface-card rounded-[28px] px-5 py-4 md:px-7 md:py-5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  onClick={() => {
                    const nextOpen = !isOpen;
                    setOpenId(nextOpen ? item.id : '');
                    trackFaqToggle(item.id, nextOpen);
                  }}
                >
                  <span className="text-lg font-semibold leading-8 text-[var(--color-neutral)]">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 ${
                      isOpen
                        ? 'border-[rgba(29,79,115,0.18)] bg-[rgba(29,79,115,0.08)] text-[var(--color-primary)] rotate-90'
                        : 'border-[rgba(20,34,53,0.08)] bg-white text-slate-500'
                    }`}
                  >
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </span>
                </button>

                {isOpen ? (
                  <div role="region" className="mt-4 max-w-3xl pr-12 text-base leading-8 text-slate-600">
                    {item.answer}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
