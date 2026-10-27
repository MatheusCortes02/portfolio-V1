# Portfolio — Matheus Cortes

Personal portfolio of Matheus Cortes, a Software Engineering student at UVV (Brazil) focused on web development and cybersecurity. The site brings together projects with case studies, certifications, security write-ups and public GitHub activity, in Portuguese and English.

**Live:** [matheuscortes.vercel.app](https://matheuscortes.vercel.app/)

![Site opening on desktop](.github/readme/captura-computador.webp)

## Tech stack

- Next.js 16.4.2 and React 19.3.1
- TypeScript 6.0.3
- Hand-written CSS, no component framework
- Lenis 1.3.27 for scrolling
- Vitest 5.0.5 for tests
- Animations modelled and rendered in Blender 5.2

## What the site does

- Projects with a category filter; each one opens a case study covering what I did, the challenge, the result and what I would do differently
- A mobile layout designed for phones, not a squeezed desktop: swipeable carousels for projects, skills and certifications
- Portuguese (`/`) and English (`/en`) versions
- Accessibility: WAI-ARIA tabs, menu and modal in `<dialog>`, a skip link and alt text on every screenshot; animations turn off with `prefers-reduced-motion`
- Search: metadata, Open Graph, JSON-LD (`ProfilePage` and `Person`), `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt`
- Security: Content Security Policy and security headers in `next.config.ts`, a proxy that turns away known scrapers, self-hosted fonts and no secrets in the repository
- Contact form through Web3Forms

## Running locally

Requires Node.js.

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # tests
npm run lint     # ESLint
npm run build    # production build
npm run start    # serve the build
```

For the contact form to deliver messages, create a `.env.local` file with your Web3Forms access key:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=your-key
```

## Structure

```
src/
├── app/            routes (pt and en), robots, sitemap, llms.txt and styles
├── componentes/    page, navigation, case study modal and animations
├── conteudo/       copy, projects, certifications and skills
├── fontes/         self-hosted fonts (SIL Open Font License)
└── lib/            pure logic: SEO, scrolling, language, contact, animations
```

The code is written in Portuguese. Every behaviour has an acceptance criterion with an ID (`EST-01`, `EST-02`…), and the matching test carries the same ID in its name.

## Rights

© 2026 Matheus Cortes. All rights reserved.

The code is public for reference only. Reusing, copying or redistributing the code, copy, visual identity, images or animations requires permission. Screenshots of client projects belong to their respective owners; the old engravings used as a base are in the public domain.
