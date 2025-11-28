import type { Metadata } from 'next';
import { Raleway, Source_Sans_3 } from 'next/font/google';
import React from 'react';

import GoogleAnalytics from '@/components/Template/GoogleAnalytics';
import Navigation from '@/components/Template/Navigation';
import '@/static/css/main.scss';

const sourceSans = Source_Sans_3({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

const raleway = Raleway({
  weight: ['400', '800', '900'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Youhanna Meleka',
    template: '%s | Youhanna Meleka',
  },
  description:
    'Youhanna Meleka - Global Supply Chain Leader & Systems Engineer. Passionate about leveraging technology to multiply human capacity and create positive social impact.',
  keywords: [
    'Youhanna Meleka',
    'supply chain',
    'systems engineer',
    'Tesla',
    'AI',
    'agentic supply chains',
    'global food security',
    'education access',
    'portfolio',
  ],
  authors: [{ name: 'Youhanna Meleka' }],
  creator: 'Youhanna Meleka',
  metadataBase: new URL('https://ymeleka.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ymeleka.com',
    siteName: 'Youhanna Meleka',
    title: 'Youhanna Meleka',
    description:
      'Global Supply Chain Leader & Systems Engineer. Creating resilient, data-driven solutions for business value and social impact.',
    images: [
      {
        url: '/images/me.jpg',
        width: 1200,
        height: 630,
        alt: 'Youhanna Meleka',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${raleway.variable}`}>
      <body>
        <div id="wrapper">
          <Navigation />
          {children}
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
