import { FinalCta } from '@/components/landing/final-cta';
import { CurriculumRoadmap } from '@/components/landing/curriculum-roadmap';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Instructor } from '@/components/landing/instructor';
import { PainPoints } from '@/components/landing/pain-points';
import { Pricing } from '@/components/landing/pricing';
import { ResultsShowcase } from '@/components/landing/results-showcase';
import { Schedule } from '@/components/landing/schedule';
import { SignupFlow } from '@/components/landing/signup-flow';
import { Testimonials } from '@/components/landing/testimonials';
import { landingContent } from '@/data/landing-content';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: landingContent.siteMeta.siteName,
  description: landingContent.siteMeta.description,
  provider: {
    '@type': 'Person',
    name: landingContent.instructor.name,
  },
  offers: landingContent.pricing.plans.map((plan) => ({
    '@type': 'Offer',
    category: plan.name,
    priceCurrency: 'TWD',
    price: plan.price,
    availability: 'https://schema.org/InStock',
  })),
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: landingContent.schedule.format,
    startDate: landingContent.schedule.courseDate,
    location: {
      '@type': 'Place',
      name: landingContent.schedule.venue,
    },
  },
};

export default function Home() {
  return (
    <>
      <Header content={landingContent} />

      <main className="overflow-x-hidden pb-24 md:pb-0">
        <Hero content={landingContent} />
        <ResultsShowcase content={landingContent} />
        <PainPoints content={landingContent} />
        <Instructor content={landingContent} />
        <CurriculumRoadmap content={landingContent} />
        <Schedule content={landingContent} />
        <Testimonials content={landingContent} />
        <Pricing content={landingContent} />
        <SignupFlow content={landingContent} />
        <Faq content={landingContent} />
        <FinalCta content={landingContent} />
      </main>

      <Footer content={landingContent} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
