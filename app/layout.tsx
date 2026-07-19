import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import React from 'react';

import GoogleAnalytics from '@/components/Template/GoogleAnalytics';
import '@/static/css/story.scss';

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Youhanna Meleka',
    template: '%s | Youhanna Meleka',
  },
  description:
    'Youhanna Meleka is a hardware-obsessed operator-founder working where atoms, machines, and software meet. From prep cook to Tesla supply chains to Ficio: betting that whoever owns the kitchen ingredient data layer owns the future of restaurant automation.',
  keywords: [
    'Youhanna Meleka',
    'systems engineer',
    'supply chain',
    'Tesla',
    'Cornell University',
    'Penn State',
    'semiconductors',
    'quantum materials',
    'Ficio',
    'robotics for food',
    'Egypt',
  ],
  authors: [{ name: 'Youhanna Meleka' }],
  creator: 'Youhanna Meleka',
  metadataBase: new URL('https://ymeleka.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/images/favicon/apple-icon-180x180.png', sizes: '180x180' },
      { url: '/images/favicon/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/images/favicon/apple-icon-120x120.png', sizes: '120x120' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ymeleka.com',
    siteName: 'Youhanna Meleka',
    title: 'Youhanna Meleka',
    description:
      'From the pyramids of Egypt to Penn State, Tesla, Cornell, and Ficio. Systems for a future of abundance.',
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
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Flags JS availability before paint so scroll animations only
            hide content when they can also reveal it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
