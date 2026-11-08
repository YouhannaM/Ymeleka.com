import type { Metadata, Viewport } from 'next';
import React from 'react';
import { preconnect } from 'react-dom';

import GoogleAnalytics from '@/components/Template/GoogleAnalytics';

const SITE = 'https://ymeleka.com';
const NAME = 'Youhanna Meleka';
const title = 'Youhanna Meleka';
const longTitle = 'Youhanna Meleka — Co-founder & CEO, Ficio';
const description =
  'Youhanna Meleka is co-founder and CEO of Ficio, building AI-powered robots for the food supply chain. Formerly Tesla global supply, Cornell MEng in semiconductors.';

/* The approved page loads Inter Tight and Inter from Google Fonts. */
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    absolute: title,
  },
  description,
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE }],
  creator: NAME,
  publisher: NAME,
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: `${SITE}/`,
    siteName: NAME,
    locale: 'en_US',
    title: longTitle,
    description:
      'Food scarcity is an engineering problem. Building embodied AI at Ficio for a healthier, more resilient global food supply chain.',
    firstName: 'Youhanna',
    lastName: 'Meleka',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Youhanna Meleka in the orchard with Ficio’s field sorter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@YouhannaMeleka',
    creator: '@YouhannaMeleka',
    title: longTitle,
    description:
      'Food scarcity is an engineering problem. Building embodied AI at Ficio for a healthier, more resilient global food supply chain.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  preconnect('https://fonts.googleapis.com');
  preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' });

  return (
    <html lang="en">
      <body>
        <link rel="stylesheet" href={FONTS_URL} precedence="default" />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
