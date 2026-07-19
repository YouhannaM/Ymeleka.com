import React from 'react';

import ContactIcons from '@/components/Contact/ContactIcons';
import {
  CornellPanorama,
  EgyptPanorama,
  FicioPanorama,
  PennStatePanorama,
  TeslaPanorama,
} from '@/components/Story/Backdrops';
import Cursor from '@/components/Story/Cursor';
import ScrollEffects from '@/components/Story/ScrollEffects';
import {
  CornellVignette,
  FicioVignette,
  PennStateVignette,
  PyramidsVignette,
  TeslaVignette,
} from '@/components/Story/Vignettes';

interface Chapter {
  id: string;
  marker: string;
  numeral: string;
  place: string;
  title: string;
  text: string;
  art: React.ReactNode;
  backdrop: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    id: 'origins',
    marker: 'Scene I',
    numeral: 'I',
    place: 'Cairo, Egypt',
    title: 'ORIGINS',
    text: 'Born and raised in Egypt, in the shadow of the pyramids, where I learned to navigate ambiguity and to make much from little.',
    art: <PyramidsVignette />,
    backdrop: <EgyptPanorama />,
  },
  {
    id: 'foundations',
    marker: 'Scene II',
    numeral: 'II',
    place: 'Happy Valley, PA',
    title: 'FOUNDATIONS',
    text: 'Industrial and Systems Engineering at Penn State. The Nittany Lion and a Beaver Stadium Saturday taught me what it looks like when 100,000 people move as one system.',
    art: <PennStateVignette />,
    backdrop: <PennStatePanorama />,
  },
  {
    id: 'scale',
    marker: 'Scene III',
    numeral: 'III',
    place: 'California',
    title: 'SCALE',
    text: 'Global supply chains at Tesla. Strategic sourcing, investment diligence, and operational efficiency across the value chain, at the speed the machines demanded.',
    art: <TeslaVignette />,
    backdrop: <TeslaPanorama />,
  },
  {
    id: 'depth',
    marker: 'Scene IV',
    numeral: 'IV',
    place: 'Ithaca, NY',
    title: 'DEPTH',
    text: "A Master's in Semiconductors and Quantum Materials Engineering at Cornell University, going a layer deeper to the atoms that compute.",
    art: <CornellVignette />,
    backdrop: <CornellPanorama />,
  },
  {
    id: 'ficio',
    marker: 'Scene V',
    numeral: 'V',
    place: 'What comes next',
    title: 'FICIO',
    text: 'Ficio is robotics for food. Multiplying human capacity, starting with how the world eats.',
    art: <FicioVignette />,
    backdrop: <FicioPanorama />,
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://ymeleka.com/#person',
      name: 'Youhanna Meleka',
      url: 'https://ymeleka.com',
      email: 'mailto:ymeleka1@gmail.com',
      image: 'https://ymeleka.com/images/me.jpg',
      jobTitle: 'Systems Engineer and Builder',
      description:
        'Youhanna Meleka is a systems engineer and builder. Born and raised in Egypt, he studied Industrial and Systems Engineering at Penn State, led global supply chains at Tesla, is pursuing a Master of Engineering in Semiconductors and Quantum Materials at Cornell University, and is building Ficio, robotics for food.',
      birthPlace: { '@type': 'Country', name: 'Egypt' },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'The Pennsylvania State University',
          sameAs: 'https://www.psu.edu',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Cornell University',
          sameAs: 'https://www.cornell.edu',
        },
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Ficio',
        description: 'Robotics for food',
      },
      knowsAbout: [
        'Supply chain management',
        'Strategic sourcing',
        'Systems engineering',
        'Semiconductors',
        'Quantum materials',
        'Robotics',
        'Manufacturing',
        'Artificial intelligence',
      ],
      sameAs: [
        'https://www.linkedin.com/in/youhanna-meleka/',
        'https://github.com/YouhannaM',
        'https://substack.com/@youhannam',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ymeleka.com/#website',
      url: 'https://ymeleka.com',
      name: 'Youhanna Meleka',
      description:
        'The personal site of Youhanna Meleka: Egypt, Penn State, Tesla, Cornell, and Ficio, robotics for food.',
      publisher: { '@id': 'https://ymeleka.com/#person' },
      inLanguage: 'en-US',
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollEffects />
      <Cursor />

      <header className="site-header">
        <span className="monogram">Y</span>
        <a className="header-link" href="mailto:ymeleka1@gmail.com">
          ymeleka1@gmail.com
        </a>
      </header>

      <section className="hero" aria-label="Introduction">
        <div className="hero-cluster">
          <p className="hero-line">
            SYSTEMS <em>for</em> ABUNDANCE
          </p>
          <p className="hero-tagline">
            Systems engineer and builder. Technology that multiplies human
            capacity.
          </p>
          <a className="pill-button" href="mailto:ymeleka1@gmail.com">
            get in touch
          </a>
        </div>
        <h1 className="hero-wordmark">
          Youhanna<span className="sr-only"> Meleka</span>
        </h1>
        <div className="hero-itinerary" aria-label="Life itinerary">
          <span>Cairo</span>
          <span>Happy Valley</span>
          <span>California</span>
          <span>Ithaca</span>
          <span>Ficio</span>
        </div>
      </section>

      <nav className="scene-rail" aria-label="Scenes">
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            data-scene-link={chapter.id}
            className="scene-rail-link"
          >
            <span className="scene-rail-label">{chapter.place}</span>
            <span className="scene-rail-numeral">{chapter.numeral}</span>
            <span className="hex" aria-hidden="true" />
          </a>
        ))}
      </nav>

      {chapters.map((chapter, i) => (
        <section
          key={chapter.id}
          id={chapter.id}
          data-reveal
          aria-labelledby={`${chapter.id}-title`}
          className={[
            'chapter',
            i % 2 === 0 ? 'is-dark' : 'is-light',
            i % 2 === 1 ? 'is-flipped' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="chapter-backdrop" aria-hidden="true">
            <div className="chapter-backdrop-inner" data-parallax="0.16">
              {chapter.backdrop}
            </div>
          </div>
          <span className="chapter-marker">{chapter.marker}</span>
          <span className="chapter-place">{chapter.place}</span>
          <div className="chapter-art" data-parallax="-0.05">
            <div className="vignette">{chapter.art}</div>
          </div>
          <div className="chapter-body">
            <h2 className="chapter-title" id={`${chapter.id}-title`}>
              {chapter.title}
            </h2>
            <p className="chapter-text">{chapter.text}</p>
            <div className="hex-row" aria-hidden="true">
              {chapters.map((c, j) => (
                <span
                  key={c.id}
                  className={j === i ? 'hex is-filled' : 'hex'}
                />
              ))}
            </div>
          </div>
          <div className="scene-next" aria-hidden="true">
            <span className="scene-next-label">
              Next:{' '}
              {i < chapters.length - 1 ? chapters[i + 1].place : "Let's build"}
            </span>
            <span className="scene-next-line" />
          </div>
        </section>
      ))}

      <section className="connect" data-reveal aria-label="Contact">
        <h2 className="connect-title">
          LET&rsquo;S <em>build</em>
        </h2>
        <p className="connect-text">
          I love connecting with builders, investors, and anyone betting on a
          future of abundance for humanity through technology.
        </p>
        <ContactIcons />
        <a className="pill-button" href="mailto:ymeleka1@gmail.com">
          ymeleka1@gmail.com
        </a>
      </section>

      <footer className="site-footer">
        <span>&copy; Youhanna Meleka</span>
        <a href="https://ymeleka.com">ymeleka.com</a>
      </footer>
    </main>
  );
}
