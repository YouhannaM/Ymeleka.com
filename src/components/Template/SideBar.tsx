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
            <a href="mailto:youhanna@ymeleka.com">youhanna@ymeleka.com</a>
          </p>
        </header>
      </section>

      <section className="blurb">
        <h2>About</h2>
        <p>
          Hi, I am Youhanna. A Penn State ISME graduate and Tesla Alumnus. I am
          passionate about leveraging technology to multiply human capacity and
          improve how people live. With experience leading global supply chains
          at Tesla, I specialize in creating resilient, data-driven solutions
          that drive both business value and positive social impact.
        </p>
        <ul className="actions">
          <li>
            <Link href="/about" className="button">
              About Me
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
