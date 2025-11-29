'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import ContactIcons from '../Contact/ContactIcons';

const SideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <section id="sidebar">
      <section id="intro">
        <Link href="/" className="logo">
          <Image
            src="/images/me.jpg"
            alt="Youhanna Meleka"
            width={200}
            height={200}
            priority
          />
        </Link>
        <header>
          <h2>Youhanna Meleka</h2>
          <p>
            <a href="mailto:contact@ymeleka.com">contact@ymeleka.com</a>
          </p>
        </header>
      </section>

      <section className="blurb">
        <h2>About</h2>
        <p>
          Hi, I&apos;m Youhanna. I&apos;m a Global Supply Chain Leader & Systems
          Engineer passionate about leveraging technology to multiply human
          capacity. At Tesla, I managed $300M+ in annual spend while achieving
          100% production uptime. I&apos;m focused on building agentic supply
          chains and exploring AI applications for global food security and
          education access.
        </p>
        <ul className="actions">
          <li>
            <Link href="/about" className="button">
              Learn More
            </Link>
          </li>
        </ul>
      </section>

      <section id="footer">
        <ContactIcons />
        <p className="copyright">
          &copy; Youhanna Meleka <Link href="/">ymeleka.com</Link>.
        </p>
      </section>
    </section>
  );
};

export default SideBar;
