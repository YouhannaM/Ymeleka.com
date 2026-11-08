# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with Turbopack (http://localhost:3000)
npm run dev

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Build for production
npm run build

# Build and export (for deployment)
npm run predeploy  # This runs 'npm run build' which includes static export

# Analyze bundle size
npm run analyze
```

## Architecture Overview

This is Youhanna Meleka's personal site: a Next.js shell (static export to GitHub Pages) that serves one approved, hand-finished homepage.

### Technology Stack
- **Next.js 16** with App Router and Turbopack, `output: 'export'`
- **TypeScript**, **React 19**
- **Biome** for linting and formatting of code; **Prettier** for markdown, CSS and SCSS
- **Jest** with React Testing Library and SWC
- **Node 20+**

### How the homepage works
- `src/site/page.html` and `src/site/page.css` are the approved design, kept verbatim (markup and stylesheet from the single-file handoff). `app/page.tsx` reads them at build time and emits them as-is.
- `public/site.js` is the design's inline script, unchanged. It draws every sketch at runtime and is loaded with `next/script` `afterInteractive`, so React hydrates before the DOM is mutated. Do not inline it back into React.
- The footer's `<!--SOCIALS-->` placeholder is filled from `src/data/contact.ts`, which is also the source of the JSON-LD `sameAs` list. Edit socials there.
- Fonts (Inter Tight, Inter) load from Google Fonts via a hoisted stylesheet link in `app/layout.tsx`, as in the approved file. `next/font/google` is avoided because Turbopack's dev server fails on Inter Tight.
- Assets referenced by the page live at the site root in `/public` (`me.jpg`, `vitruvian.jpg`, `starry.jpg`, `napoleon.jpg`, `favicon.svg`, `favicon-512.png`, `apple-touch-icon.png`).
- `src/site/` and `public/site.js` are excluded from Biome and Prettier so the approved files are never reformatted.

### Design rules (from the handoff)
- Black, white and grey only (`#1d1d1f`, `#6e6e73`, `#f5f5f7`, `#000`); the single accent is Ficio orange, used only for Ficio.
- Inter Tight 600 for headlines, Inter for body. No trailing periods on headlines. Highlighted words are grey, not italic.
- Sketches are programmatic SVG in graphite tones; no stock images.
- The copy is approved. Do not rewrite it. The final `monochrome system` block at the end of the stylesheet intentionally overrides earlier rules.

### Other routes
- `app/not-found.tsx` is a minimal 404 in the same type system.
- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` (search and AI crawlers allowed explicitly) and `sitemap.xml`; `public/llms.txt` is a plain-text summary for AI readers.
- Search presence: `app/layout.tsx` carries the title, description, Open Graph profile card (`/og.jpg`, 1200x630), Twitter card and favicons (including the 192px PNG Google needs); `app/page.tsx` emits a JSON-LD graph (Person, Organization Ficio, WebSite, ProfilePage) whose `sameAs` comes from `src/data/contact.ts`.
- `src/components/` still holds the earlier template's components with their tests; nothing on the homepage depends on them.

### Deployment
- Static export to `/out`
- GitHub Actions deploys `main` to GitHub Pages; custom domain via `CNAME`
