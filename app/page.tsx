import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import PageWrapper from './components/PageWrapper';

export const metadata: Metadata = {
  description:
    'Youhanna Meleka is a Global Supply Chain Leader and Systems Engineer passionate about using technology to create positive social impact.',
};

export default function HomePage() {
  return (
    <PageWrapper>
      <article className="post" id="index">
        <header>
          <div className="title">
            <h2>
              <Link href="/about">Welcome</Link>
            </h2>
            <p>Global Supply Chain Leader & Systems Engineer</p>
          </div>
        </header>
        <p>
          {' '}
          I'm passionate about leveraging technology to multiply human capacity
          and improve how people live. With experience leading global supply
          chains at Tesla, I specialize in creating resilient, data-driven
          solutions that drive both business value and positive social impact.
        </p>
        <p>
          {' '}
          Learn more <Link href="/about">about me</Link>, check out my{' '}
          <Link href="/resume">resume</Link>, explore my{' '}
          <Link href="/projects">projects</Link>, or{' '}
          <Link href="/contact">get in touch</Link>.
        </p>
      </article>
    </PageWrapper>
  );
}
