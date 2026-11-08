import type { Metadata, Viewport } from 'next';
import React from 'react';
import { preconnect } from 'react-dom';

import GoogleAnalytics from '@/components/Template/GoogleAnalytics';

const title = 'Youhanna Meleka — Co-founder & CEO, Ficio';
const description =
  'Youhanna Meleka is co-founder and CEO of Ficio, building AI-powered robots for the food supply chain. Formerly Tesla global supply, Cornell MEng in semiconductors.';

/* The approved page loads Inter Tight and Inter from Google Fonts. */
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://ymeleka.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: 'https://ymeleka.com/',
    title,
    description:
      'Food scarcity is an engineering problem. Building embodied AI at Ficio for a healthier, more resilient global food supply chain.',
    images: [
      {
        url: '/me.jpg',
        alt: 'Youhanna Meleka in the orchard with Ficio’s field sorter',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
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
