export type AnalyticsEventName =
  | 'line_cta_click'
  | 'section_view'
  | 'faq_toggle'
  | 'scroll_depth';

export type RegistrationState =
  | 'idle'
  | 'waiting_payment'
  | 'waiting_last5'
  | 'pending'
  | 'confirmed';

export type RegistrationRow = {
  id: string;
  timestamp: string;
  userId: string;
  displayName: string;
  last5: string;
  amount: number;
  status: RegistrationState;
  source: string;
  courseDate: string;
  remark?: string;
};

export type ErrorLogRow = {
  timestamp: string;
  errorMessage: string;
  rawPayload: string;
};

export type CtaPlacement =
  | 'header'
  | 'hero-primary'
  | 'hero-secondary'
  | 'pricing'
  | 'mobile-sticky'
  | 'final-cta';

export type LineCtaPayload = {
  cta_id: string;
  cta_label: string;
  placement: CtaPlacement;
  pricing_tier?: string;
  destination: string;
};

export type SiteMeta = {
  title: string;
  description: string;
  siteName: string;
  keywords: string[];
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  countdownLabel: string;
  deadlineLabel: string;
  seatsLabel: string;
};

export type TrustMetric = {
  value: string;
  label: string;
};

export type Outcome = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

export type PainPoint = {
  title: string;
  description: string;
};

export type InstructorMetric = {
  value: string;
  label: string;
};

export type InstructorContent = {
  name: string;
  role: string;
  bio: string;
  highlights: string[];
  metrics: InstructorMetric[];
  image: {
    src: string;
    alt: string;
  };
};

export type CurriculumItem = {
  step: string;
  title: string;
  detail: string;
  outcome: string;
  bullets?: string[];
};

export type ScheduleContent = {
  courseDate: string;
  courseTime: string;
  format: string;
  venue: string;
  tools: string[];
};

export type Testimonial = {
  quote: string;
  author: string;
  tag: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  note: string;
  featured?: boolean;
};

export type SignupStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type LandingContent = {
  siteMeta: SiteMeta;
  hero: HeroContent;
  trustMetrics: TrustMetric[];
  outcomes: Outcome[];
  painPoints: PainPoint[];
  solutionStatement: string;
  instructor: InstructorContent;
  curriculum: CurriculumItem[];
  schedule: ScheduleContent;
  testimonials: Testimonial[];
  pricing: {
    plans: PricingPlan[];
    urgency: string[];
  };
  signupFlow: SignupStep[];
  faq: FaqItem[];
  finalCta: {
    title: string;
    description: string;
  };
  footer: {
    contactEmail: string;
    privacyNote: string;
  };
  line: {
    oaUrl: string;
  };
};
