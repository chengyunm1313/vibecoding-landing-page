'use client';

import { trackLineCtaClick } from '@/lib/analytics';
import type { CtaPlacement } from '@/types/landing';

import { Icon } from './icon';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  target?: '_blank' | '_self';
  rel?: string;
  className?: string;
  ctaId?: string;
  placement?: CtaPlacement;
  pricingTier?: string;
};

export function Button({
  href,
  children,
  variant = 'primary',
  target,
  rel,
  className = '',
  ctaId,
  placement,
  pricingTier,
}: ButtonProps) {
  const variantClass = {
    primary:
      'bg-[var(--color-cta)] text-white shadow-[0_20px_50px_rgba(199,104,54,0.24)] hover:bg-[#b85a29]',
    secondary:
      'border border-[rgba(20,34,53,0.1)] bg-[rgba(255,253,250,0.9)] text-[var(--color-neutral)] hover:border-[rgba(29,79,115,0.24)] hover:bg-white',
    ghost:
      'text-[var(--color-neutral)] hover:bg-white/70',
  }[variant];

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 ease-out ${variantClass} ${className}`}
      onClick={() => {
        if (!ctaId || !placement) {
          return;
        }

        trackLineCtaClick({
          cta_id: ctaId,
          cta_label: typeof children === 'string' ? children : ctaId,
          placement,
          pricing_tier: pricingTier,
          destination: href,
        });
      }}
    >
      <span>{children}</span>
      {variant !== 'ghost' ? (
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      ) : null}
    </a>
  );
}
