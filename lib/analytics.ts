import type { AnalyticsEventName, LineCtaPayload } from '@/types/landing';

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

type BrowserWindow = Window & {
  gtag?: (
    command: 'event' | 'config' | 'js',
    eventName: string,
    params?: AnalyticsPayload | Date,
  ) => void;
  fbq?: (command: 'track' | 'trackCustom', eventName: string, params?: AnalyticsPayload) => void;
};

const isBrowser = () => typeof window !== 'undefined';

const getAnalyticsWindow = () => window as BrowserWindow;

const dispatchEvent = (eventName: AnalyticsEventName, payload: AnalyticsPayload) => {
  if (!isBrowser()) {
    return;
  }

  const analyticsWindow = getAnalyticsWindow();
  analyticsWindow.gtag?.('event', eventName, payload);
};

export const trackPageView = (path: string) => {
  if (!isBrowser()) {
    return;
  }

  const analyticsWindow = getAnalyticsWindow();
  analyticsWindow.gtag?.('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '', {
    page_path: path,
  });
  analyticsWindow.fbq?.('track', 'PageView');
};

export const trackLineCtaClick = (payload: LineCtaPayload) => {
  dispatchEvent('line_cta_click', payload);
  if (!isBrowser()) {
    return;
  }

  getAnalyticsWindow().fbq?.('track', 'Lead', payload);
};

export const trackSectionView = (section: string) => {
  dispatchEvent('section_view', { section });
};

export const trackFaqToggle = (questionId: string, isOpen: boolean) => {
  dispatchEvent('faq_toggle', { question_id: questionId, is_open: isOpen });
};

export const trackScrollDepth = (depth: number) => {
  dispatchEvent('scroll_depth', { depth });
};
