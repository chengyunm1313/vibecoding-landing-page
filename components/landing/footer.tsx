import type { LandingContent } from '@/types/landing';

export function Footer({ content }: { content: LandingContent }) {
  return (
    <footer className="border-t border-[rgba(15,23,42,0.08)] py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-display text-xl font-bold text-[var(--color-neutral)]">
            Vibe Coding 工作術
          </div>
          <div className="mt-3 text-sm leading-7 text-slate-500">
            聯絡信箱：{content.footer.contactEmail}
            <br />
            {content.footer.privacyNote}
          </div>
        </div>

        <div className="text-sm text-slate-500">
          <div>所有報名入口皆導向 LINE 官方帳號</div>
          <div className="mt-2">© 2026 Vibe Coding 工作術</div>
        </div>
      </div>
    </footer>
  );
}
