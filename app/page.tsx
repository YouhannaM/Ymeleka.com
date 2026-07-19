import React from 'react';

import ContactIcons from '@/components/Contact/ContactIcons';
import {
  CornellVignette,
  FicioVignette,
  PennStateVignette,
  PyramidsVignette,
  TeslaVignette,
} from '@/components/Story/Vignettes';

interface Chapter {
  marker: string;
  place: string;
  title: string;
  text: string;
  stats?: string[];
  art: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    marker: 'Chapter I',
    place: 'Cairo, Egypt',
    title: 'ORIGINS',
    text: 'Born and raised in Egypt, in the shadow of the pyramids — where I learned to navigate ambiguity, and that resourcefulness is how wonders get built.',
    art: <PyramidsVignette />,
  },
  {
    marker: 'Chapter II',
    place: 'Happy Valley, PA',
    title: 'FOUNDATIONS',
    text: 'Industrial & Systems Engineering at Penn State. Beaver Stadium on a Saturday taught me what it feels like when a system of 100,000 people moves as one.',
    art: <PennStateVignette />,
  },
  {
    marker: 'Chapter III',
    place: 'California',
    title: 'SCALE',
    text: 'Global supply chains at Tesla — strategic sourcing, investment diligence, and operational efficiency across the value chain, at the speed the machines demanded.',
    stats: ['Spend: $300M+ / yr', 'COGS saved: $43M'],
    art: <TeslaVignette />,
  },
  {
    marker: 'Chapter IV',
    place: 'Ithaca, NY',
    title: 'DEPTH',
    text: "Master's in Semiconductors & Quantum Materials Engineering at Cornell — going a layer deeper, to the atoms that compute.",
    art: <CornellVignette />,
  },
  {
    marker: 'Chapter V',
    place: 'What comes next',
    title: 'FICIO',
    text: 'Robotics for food. Multiplying human capacity, starting with how the world eats.',
    art: <FicioVignette />,
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <span className="monogram">Y</span>
        <a className="header-link" href="mailto:ymeleka1@gmail.com">
          ymeleka1@gmail.com
        </a>
      </header>

      <section className="hero">
        <div className="hero-cluster">
          <h1 className="hero-line">
            SYSTEMS <em>for</em> ABUNDANCE
          </h1>
          <div className="hero-stats">
            <span>Spend managed: $300M+</span>
            <span>COGS saved: $43M</span>
          </div>
          <a className="pill-button" href="mailto:ymeleka1@gmail.com">
            get in touch
          </a>
        </div>
        <div className="hero-wordmark">Youhanna</div>
        <div className="hero-itinerary">
          <span>Cairo</span>
          <span>Happy Valley</span>
          <span>California</span>
          <span>Ithaca</span>
          <span>Ficio</span>
        </div>
      </section>

      {chapters.map((chapter, i) => (
        <section
          key={chapter.marker}
          className={[
            'chapter',
            i % 2 === 0 ? 'is-dark' : 'is-light',
            i % 2 === 1 ? 'is-flipped' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="chapter-marker">{chapter.marker}</span>
          <span className="chapter-place">{chapter.place}</span>
          <div className="chapter-art">
            <div className="vignette">{chapter.art}</div>
          </div>
          <div className="chapter-body">
            <h2 className="chapter-title">{chapter.title}</h2>
            <p className="chapter-text">{chapter.text}</p>
            {chapter.stats && (
              <div className="chapter-stats">
                {chapter.stats.map((stat) => (
                  <span key={stat}>{stat}</span>
                ))}
              </div>
            )}
            <div className="hex-row">
              {chapters.map((c, j) => (
                <span
                  key={c.marker}
                  className={j === i ? 'hex is-filled' : 'hex'}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="connect">
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
