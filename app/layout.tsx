import type { Metadata } from 'next';
import Script from 'next/script';
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';

import './globals.css';

import { AnalyticsProvider } from '@/components/providers/analytics-provider';
import { landingContent } from '@/data/landing-content';

const notoSansTc = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSerifTc = Noto_Serif_TC({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700', '900'],
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://username.github.io/vibecoding-landing-page';
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: landingContent.siteMeta.title,
  description: landingContent.siteMeta.description,
  keywords: landingContent.siteMeta.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: landingContent.siteMeta.title,
    description: landingContent.siteMeta.description,
    type: 'website',
    siteName: landingContent.siteMeta.siteName,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: landingContent.siteMeta.title,
    description: landingContent.siteMeta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${notoSansTc.variable} ${notoSerifTc.variable} antialiased`}>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}

        {metaPixelId ? (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        ) : null}

        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
