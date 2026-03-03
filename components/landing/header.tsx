import type { LandingContent } from '@/types/landing';

import { Button } from '@/components/ui/button';

export function Header({ content }: { content: LandingContent }) {
  return (
    <>
      <header className="sticky top-4 z-50 mx-auto hidden w-[min(1120px,calc(100%-32px))] md:block">
        <div className="surface-card noise-ring flex items-center justify-between rounded-full px-6 py-4">
          <div>
            <div className="font-display text-base font-bold text-[var(--color-neutral)]">
              Vibe Coding 工作術
            </div>
            <div className="text-sm text-slate-500">AI 實作工作坊 × 可部署銷售頁</div>
          </div>

          <nav className="flex items-center gap-3">
            <Button href="#curriculum" variant="ghost">
              查看課程亮點
            </Button>
            <Button
              href={content.line.oaUrl}
              target="_blank"
              rel="noopener noreferrer"
              ctaId="header-signup"
              placement="header"
            >
              立即報名
            </Button>
          </nav>
        </div>
      </header>

      <div className="fixed inset-x-0 bottom-3 z-50 px-3 md:hidden">
        <div className="surface-card noise-ring flex items-center justify-between gap-3 rounded-full px-4 py-3">
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              現在卡位
            </div>
            <div className="truncate text-sm font-medium text-[var(--color-neutral)]">
              加入 LINE 取得優惠與報名流程
            </div>
          </div>
          <Button
            href={content.line.oaUrl}
            target="_blank"
            rel="noopener noreferrer"
            ctaId="mobile-sticky-signup"
            placement="mobile-sticky"
            className="px-4 py-3 text-xs"
          >
            立即報名
          </Button>
        </div>
      </div>
    </>
  );
}
