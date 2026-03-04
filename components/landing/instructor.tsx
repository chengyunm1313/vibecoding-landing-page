import Image from 'next/image';

import type { LandingContent } from '@/types/landing';

import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';

export function Instructor({ content }: { content: LandingContent }) {
  return (
    <section className="section-padding">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="surface-card noise-ring rounded-[36px] p-5">
            <div className="overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#eaf1f5,#fffdfa)]">
              <Image
                src={content.instructor.image.src}
                alt={content.instructor.image.alt}
                width={900}
                height={960}
                className="aspect-[0.92] w-full object-cover object-center"
              />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="講師介紹"
              title={`讓 ${content.instructor.name} 帶你把抽象需求，變成真的上線成果`}
              description={content.instructor.bio}
            />

            <div className="mt-8 inline-flex rounded-full border border-[rgba(29,79,115,0.12)] bg-[rgba(255,253,250,0.88)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
              {content.instructor.role}
            </div>

            <ul className="mt-8 space-y-4">
              {content.instructor.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-slate-600">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(29,79,115,0.12)]">
                    <Icon name="check" className="h-4 w-4 text-[var(--color-primary)]" />
                  </span>
                  <span className="leading-7">{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {content.instructor.metrics.map((metric) => (
                <div key={metric.label} className="surface-card rounded-[28px] px-5 py-6">
                  <div className="font-display text-3xl font-bold tracking-[-0.04em] text-[var(--color-neutral)]">
                    {metric.value}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
