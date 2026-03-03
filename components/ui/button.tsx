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
      'bg-[var(--color-cta)] text-white shadow-[0_20px_50px_rgba(234,88,12,0.28)] hover:-translate-y-0.5 hover:bg-[#c54b10]',
    secondary:
      'border border-[rgba(15,23,42,0.1)] bg-white/80 text-[var(--color-neutral)] hover:-translate-y-0.5 hover:border-[rgba(13,148,136,0.3)] hover:bg-white',
    ghost:
      'text-[var(--color-neutral)] hover:bg-white/65',
  }[variant];

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${variantClass} ${className}`}
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
      {variant !== 'ghost' ? <Icon name="arrowRight" className="h-4 w-4" /> : null}
    </a>
  );
}
