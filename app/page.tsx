import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';
import React from 'react';

import contact from '@/data/contact';

/**
 * The homepage is the approved single-file design in src/site, served
 * as-is: its markup and CSS are read at build time and emitted
 * verbatim, and its script (public/site.js, unchanged) runs after
 * hydration so React never touches the sketches it draws into the DOM.
 * The only additions are the social links in the footer, generated
 * from src/data/contact.ts, and the styles for them.
 */

const siteDir = path.join(process.cwd(), 'src', 'site');
const pageCss = fs.readFileSync(path.join(siteDir, 'page.css'), 'utf8');
const pageHtml = fs.readFileSync(path.join(siteDir, 'page.html'), 'utf8');

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const socialLinks = contact
  .map((c) => {
    const external = c.link.startsWith('http');
    const attrs = external ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${escape(c.link)}"${attrs}>${escape(c.label)}</a>`;
  })
  .join('');

const markup = pageHtml.replace('<!--SOCIALS-->', socialLinks);

const integrationCss = `
footer .social{display:flex;flex-wrap:wrap;gap:6px 18px}
footer .social a{color:var(--mute);text-decoration:none;border-bottom:1px solid var(--line);padding-bottom:1px;transition:color .3s,border-color .3s}
footer .social a:hover,footer .social a:focus-visible{color:var(--ink);border-color:var(--ink)}
@media(max-width:760px){footer{flex-direction:column;align-items:flex-start;gap:14px}}
`;

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Youhanna Meleka',
  url: 'https://ymeleka.com/',
  image: 'https://ymeleka.com/me.jpg',
  jobTitle: 'Co-founder & CEO',
  worksFor: {
    '@type': 'Organization',
    name: 'Ficio',
    url: 'https://www.ficio.org',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Cornell University' },
    { '@type': 'CollegeOrUniversity', name: 'Penn State University' },
  ],
  knowsAbout: [
    'Robotics',
    'Food supply chain',
    'Semiconductors',
    'Supply chain management',
    'Venture capital',
  ],
  homeLocation: { '@type': 'Place', name: 'Ithaca, New York' },
  sameAs: contact.filter((c) => c.link.startsWith('http')).map((c) => c.link),
};

export default function HomePage() {
  return (
    <>
      <style
        // The approved stylesheet, verbatim, followed by the integration rules.
        dangerouslySetInnerHTML={{ __html: `${pageCss}\n${integrationCss}` }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div
        id="site"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <Script src="/site.js" strategy="afterInteractive" />
    </>
  );
}
