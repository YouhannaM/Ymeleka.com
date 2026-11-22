import React from 'react';

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
  lab: 'https://jena-xing.engineering.cornell.edu',
  brv: 'https://www.brventurefund.com/',
  email: 'ymm28@cornell.edu',
};

const socials = contact.filter((c) => c.link.startsWith('http'));
/* The footer row keeps every social, Email included. */
const socialRow = contact;

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
        'Co-founder and CEO of Ficio, building embodied AI for the food supply chain. Started a business at 14, worked a factory floor at 16, studied industrial, manufacturing and systems engineering at Penn State, managed 50+ suppliers across 12 countries at Tesla, and researches wide-bandgap semiconductors at Cornell. Evaluates companies and develops investment theses at Big Red Ventures.',
      jobTitle: 'Co-founder & CEO',
      email: `mailto:${LINKS.email}`,
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
          <h1>Food scarcity is an engineering problem.</h1>
          <p>
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
            I started a business at 14, was on a factory floor at 16, studied
            industrial, manufacturing and systems engineering at{' '}
            <a
              className="link"
              href={LINKS.pennState}
              target="_blank"
              rel="noopener"
            >
              Penn State
            </a>
            , managed 50+ suppliers end-to-end across 12 countries at Tesla, and
            now research wide-bandgap semiconductors at{' '}
            <a className="link" href={LINKS.lab} target="_blank" rel="noopener">
              Cornell
            </a>
            .
          </p>
          <p>
            Interested in emerging technologies and their applications to
            improve the world: AI infrastructure (chips, models, edge compute
            and applications). I evaluate companies, develop investment theses
            and do market research at{' '}
            <a className="link" href={LINKS.brv} target="_blank" rel="noopener">
              Big Red Ventures
            </a>
            .
          </p>
          <p className="reach">
            Reach out at{' '}
            <a className="link" href={`mailto:${LINKS.email}`}>
              {LINKS.email}
            </a>
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
