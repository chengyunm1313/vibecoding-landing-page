import type { LandingContent } from '@/types/landing';

import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';

const stepIcons = ['message', 'grid', 'shield', 'chart'] as const;

export function SignupFlow({ content }: { content: LandingContent }) {
  return (
    <section
      id="signup-flow"
      data-track-section="signup-flow"
      className="section-anchor section-padding"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="報名流程說明"
          title="把報名流程先講清楚，讓頁面本身就能完成一半客服工作"
          description="從加入 LINE 到輸入後五碼，這段流程設計直接對應到後續 LINE 與 GAS 狀態機，不會在整合時重做。"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {content.signupFlow.map((step, index) => (
            <article key={step.title} className="surface-card relative rounded-[32px] p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(29,79,115,0.12)] text-[var(--color-primary)]">
                  <Icon name={stepIcons[index]} className="h-6 w-6" />
                </div>
                <div className="font-display text-3xl font-bold tracking-[-0.04em] text-[rgba(20,34,53,0.18)]">
                  0{index + 1}
                </div>
              </div>
              <div className="subtitle-text mt-6 text-[var(--color-primary)]">
                報名步驟 {index + 1}
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[var(--color-neutral)]">
                {step.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
