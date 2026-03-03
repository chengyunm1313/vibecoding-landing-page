'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { trackPageView, trackScrollDepth, trackSectionView } from '@/lib/analytics';

const scrollMilestones = [25, 50, 75, 100];

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    const seenDepths = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - viewportHeight;
      const depth = documentHeight <= 0 ? 100 : Math.round((scrollTop / documentHeight) * 100);

      scrollMilestones.forEach((milestone) => {
        if (depth >= milestone && !seenDepths.has(milestone)) {
          seenDepths.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const seenSections = new Set<string>();
    const sections = document.querySelectorAll<HTMLElement>('[data-track-section]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionName = entry.target.getAttribute('data-track-section');
          if (!sectionName || seenSections.has(sectionName)) {
            return;
          }

          seenSections.add(sectionName);
          trackSectionView(sectionName);
        });
      },
      {
        threshold: 0.35,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
