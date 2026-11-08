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

const SITE = 'https://ymeleka.com';
const socials = contact
  .filter((c) => c.link.startsWith('http'))
  .map((c) => c.link);

/* One connected graph: the person, the company he founded, the site,
   and this page as his profile page. Google reads the ProfilePage and
   Person types for name searches; the sameAs links tie the entity to
   his social profiles. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Youhanna Meleka',
      givenName: 'Youhanna',
      familyName: 'Meleka',
      url: `${SITE}/`,
      image: {
        '@type': 'ImageObject',
        url: `${SITE}/me.jpg`,
        width: 1600,
        height: 1200,
        caption: 'Youhanna Meleka in the orchard with Ficio’s field sorter',
      },
      description:
        'Co-founder and CEO of Ficio, building embodied AI for a healthier, more resilient global food supply chain, starting with in-field apple harvesting and sorting robots. Formerly Global Supply Manager at Tesla; MEng in Semiconductors and Quantum Materials at Cornell University.',
      jobTitle: 'Co-founder & CEO',
      worksFor: { '@id': `${SITE}/#ficio` },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Co-founder and Chief Executive Officer',
        occupationLocation: { '@type': 'City', name: 'Ithaca, New York' },
      },
      birthPlace: { '@type': 'Place', name: 'Cairo, Egypt' },
      homeLocation: { '@type': 'Place', name: 'Ithaca, New York' },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Cornell University',
          sameAs: 'https://www.cornell.edu/',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'The Pennsylvania State University',
          sameAs: 'https://www.psu.edu/',
        },
      ],
      memberOf: [
        {
          '@type': 'Organization',
          name: 'Cornell University Physical Intelligence',
          url: 'https://cornellphysicalintelligence.com',
        },
        {
          '@type': 'Organization',
          name: 'Big Red Ventures',
          url: 'https://www.brventurefund.com/',
        },
      ],
      knowsAbout: [
        'Robotics',
        'Embodied AI',
        'Food supply chain',
        'Agricultural automation',
        'Apple harvesting and sorting robots',
        'Semiconductors',
        'Wide-bandgap semiconductors',
        'Data center architecture',
        'Supply chain management',
        'Strategic sourcing',
        'Manufacturing',
        'Venture capital',
        'Deep tech diligence',
      ],
      sameAs: socials,
    },
    {
      '@type': 'Organization',
      '@id': `${SITE}/#ficio`,
      name: 'Ficio',
      url: 'https://www.ficio.org',
      description:
        'Embodied AI for a healthier, more resilient global food supply chain, starting with in-field apple harvesting and sorting robots.',
      founder: { '@id': `${SITE}/#person` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'Youhanna Meleka',
      description:
        'The personal site of Youhanna Meleka, co-founder and CEO of Ficio.',
      about: { '@id': `${SITE}/#person` },
      publisher: { '@id': `${SITE}/#person` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE}/#profile`,
      url: `${SITE}/`,
      name: 'Youhanna Meleka — Co-founder & CEO, Ficio',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': `${SITE}/#person` },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/og.jpg` },
      dateModified: new Date().toISOString().slice(0, 10),
      inLanguage: 'en-US',
    },
  ],
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
