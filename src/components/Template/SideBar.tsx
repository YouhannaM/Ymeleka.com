'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ContactIcons from '../Contact/ContactIcons';

const SideBar: React.FC = () => {
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
            <a href="mailto:ymeleka1@gmail.com">ymeleka1@gmail.com</a>
          </p>
        </header>
      </section>

      <section className="blurb">
        <h2>About</h2>
        <p>
          Hi, I&apos;m Youhanna. I&apos;m an entrepreneurial Systems Engineer
          passionate about leveraging technology to multiply human capacity.
        </p>
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
