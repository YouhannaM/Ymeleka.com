import React from 'react';

import BrandMark from '@/components/BrandMark';
import FicioMark from '@/components/FicioMark';
import SiteNav from '@/components/SiteNav';
import contact from '@/data/contact';

const SITE = 'https://ymeleka.com';
const LINKS = {
  linkedin:
    contact.find((c) => c.label === 'LinkedIn')?.link ??
    'https://www.linkedin.com/in/youhanna-meleka/',
  ficio: 'https://www.ficio.org',
  pennState: 'https://www.psu.edu/',
  tesla: 'https://www.tesla.com/',
  lab: 'https://jena-xing.engineering.cornell.edu',
  cupi: 'https://cornellphysicalintelligence.com',
  brv: 'https://www.brventurefund.com/',
};

const socials = contact.filter((c) => c.link.startsWith('http'));
/* The footer row shows the public profiles only; no email on the page. */
const socialRow = socials;

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
      },
      description:
        'Co-founder and CEO of Ficio, building embodied AI for the food supply chain. Every living being needs food, water and air; improving the supply of food improves availability and resilience of global production. In factories since he can remember, studied industrial, systems, and manufacturing engineering at Penn State, managed 50+ suppliers across 12 countries at Tesla, and researches wide-bandgap semiconductors at Cornell as part of his MEng. Interested in AI infrastructure, green energy, and space. Leads technical programs at Cornell University Physical Intelligence and evaluates companies and develops investment theses at Big Red Ventures.',
      jobTitle: 'Co-founder & CEO',
      worksFor: { '@id': `${SITE}/#ficio` },
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
          sameAs: LINKS.pennState,
        },
      ],
      memberOf: [
        { '@type': 'Organization', name: 'Big Red Ventures', url: LINKS.brv },
        {
          '@type': 'Organization',
          name: 'Cornell University Physical Intelligence',
          url: 'https://cornellphysicalintelligence.com',
        },
      ],
      knowsAbout: [
        'Robotics',
        'Embodied AI',
        'Food supply chain',
        'AI infrastructure',
        'Semiconductors',
        'Wide-bandgap semiconductors',
        'Edge compute',
        'Green energy',
        'Space technology',
        'Supply chain management',
        'Venture capital',
        'Market research',
      ],
      sameAs: socials.map((c) => c.link),
    },
    {
      '@type': 'Organization',
      '@id': `${SITE}/#ficio`,
      name: 'Ficio',
      url: LINKS.ficio,
      description: 'Embodied AI for the food supply chain.',
      founder: { '@id': `${SITE}/#person` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'Youhanna Meleka',
      about: { '@id': `${SITE}/#person` },
      publisher: { '@id': `${SITE}/#person` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE}/#profile`,
      url: `${SITE}/`,
      name: 'Youhanna Meleka',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': `${SITE}/#person` },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/og.jpg` },
      inLanguage: 'en-US',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteNav page="home" />
      <main className="home">
        <div className="home-text">
          <h1 className="sr-only">Youhanna Meleka</h1>
          <p>
            Every living being needs food, water and air. Improving the supply
            of food improves availability and resilience of global production.
            I&rsquo;m{' '}
            <a
              className="link"
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener"
            >
              Youhanna Meleka
            </a>
            , co-founder and CEO of{' '}
            <a
              className="ficio-link"
              href={LINKS.ficio}
              target="_blank"
              rel="noopener"
            >
              <FicioMark />
              Ficio
            </a>
            , where we build embodied AI for the food supply chain.
          </p>
          <p>
            I&rsquo;ve been in factories since I can remember, studied
            industrial, systems, and manufacturing engineering at{' '}
            <a
              className="link"
              href={LINKS.pennState}
              target="_blank"
              rel="noopener"
            >
              <BrandMark brand="penn-state" />
              Penn State
            </a>
            , managed 50+ suppliers end-to-end across 12 countries at{' '}
            <a
              className="link"
              href={LINKS.tesla}
              target="_blank"
              rel="noopener"
            >
              <BrandMark brand="tesla" />
              Tesla
            </a>
            , and now research wide-bandgap semiconductors at{' '}
            <a className="link" href={LINKS.lab} target="_blank" rel="noopener">
              <BrandMark brand="cornell" />
              Cornell
            </a>{' '}
            as part of my MEng.
          </p>
          <p>
            Interested in emerging technologies and their applications to
            improve the world: AI infrastructure, green energy, and space. I
            lead technical programs at{' '}
            <a
              className="link"
              href={LINKS.cupi}
              target="_blank"
              rel="noopener"
            >
              <BrandMark brand="cupi" />
              Cornell Physical Intelligence
            </a>
            , and evaluate companies, develop investment theses and do market
            research at{' '}
            <a className="link" href={LINKS.brv} target="_blank" rel="noopener">
              <BrandMark brand="brv" />
              Big Red Ventures
            </a>
            .
          </p>
          <nav className="socials" aria-label="Social links">
            {socialRow.map((c) => (
              <a
                key={c.label}
                href={c.link}
                target={c.link.startsWith('http') ? '_blank' : undefined}
                rel={c.link.startsWith('http') ? 'noopener' : undefined}
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>
      </main>
    </>
  );
}
