import type { Metadata, Viewport } from 'next';
import React from 'react';
import { preconnect } from 'react-dom';

import GoogleAnalytics from '@/components/Template/GoogleAnalytics';
import WeaveFlow from '@/components/WeaveFlow';
import './globals.css';

const SITE = 'https://ymeleka.com';
const NAME = 'Youhanna Meleka';
const longTitle = 'Youhanna Meleka — Co-founder & CEO, Ficio';
const description =
  'Youhanna Meleka is co-founder and CEO of Ficio, building embodied AI for the food supply chain. Formerly Tesla global supply; researching wide-bandgap semiconductors at Cornell.';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';

/* Applies a remembered theme before first paint, so there is no flash.
   With nothing remembered the CSS follows the system preference. */
const themeScript =
  "(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}})();";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: NAME },
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
      'Every living being needs food, water and air. Building embodied AI at Ficio to improve the supply of food.',
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
      'Every living being needs food, water and air. Building embodied AI at Ficio to improve the supply of food.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
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
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  preconnect('https://fonts.googleapis.com');
  preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' });

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="stylesheet" href={FONTS_URL} precedence="default" />
        <WeaveFlow />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
