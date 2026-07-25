# CLAUDE.md — Academic GitHub Pages Site

## Project Overview

Build a personal academic website hosted on **GitHub Pages** using **Next.js (static export)** + **shadcn/ui** + **MDX**. The site showcases research guides, technical writing, and projects with a clean, modern design that signals both academic rigor and frontend craft. No bloat — every dependency earns its place.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Static export (`output: 'export'`), file-based routing |
| Styling | Tailwind CSS 3 + shadcn/ui | Design system without the weight |
| Content | MDX via `@next/mdx` or `next-mdx-remote` | Markdown files → rendered pages with React components |
| Dark mode | `next-themes` + shadcn's built-in dark tokens | Toggle in nav, respects system preference |
| Deployment | GitHub Pages via `gh-pages` branch or Actions | `next export` → static HTML/CSS/JS |
| Icons | `lucide-react` (ships with shadcn) | Consistent, tree-shakeable |
| Fonts | Inter (body) + JetBrains Mono (code) via `next/font` | Self-hosted, no CLS |

### What NOT to install

- No CMS, no database, no server runtime
- No `styled-components`, `emotion`, or CSS-in-JS
- No `framer-motion` unless a specific animation is requested later
- No analytics packages in v1

---

## Repository Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: build + deploy to gh-pages
├── public/
│   ├── images/                 # Profile photo, project screenshots, og-image
│   └── files/                  # CV PDF, downloadable assets
├── content/
│   └── guides/                 # MDX files — each guide lives here
│       ├── gpu-cluster-setup.mdx
│       ├── containerization.mdx
│       └── llm-fine-tuning.mdx
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, theme provider, nav, footer
│   │   ├── page.tsx            # Homepage / hero
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── guides/
│   │   │   ├── page.tsx        # Guide index (card grid)
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Individual guide (rendered MDX)
│   │   ├── projects/
│   │   │   └── page.tsx        # Project showcase grid
│   │   └── contact/
│   │       └── page.tsx        # Links, email, socials
│   ├── components/
│   │   ├── ui/                 # shadcn components (button, card, badge, etc.)
│   │   ├── site-header.tsx     # Sticky nav + dark mode toggle + mobile menu
│   │   ├── site-footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── guide-card.tsx      # Card for guide index
│   │   ├── project-card.tsx
│   │   ├── mdx-components.tsx  # Custom renderers for MDX elements
│   │   ├── table-of-contents.tsx  # Auto-generated from headings
│   │   ├── copy-button.tsx     # Click-to-copy on code blocks
│   │   └── theme-toggle.tsx
│   ├── lib/
│   │   ├── mdx.ts              # Read + parse MDX files from content/
│   │   ├── utils.ts            # cn() helper (shadcn standard)
│   │   └── constants.ts        # Site metadata, nav links, social URLs
│   └── styles/
│       └── globals.css         # Tailwind directives + custom prose overrides
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── components.json             # shadcn config
└── package.json
```

---

## Page-by-Page Specifications

### 1. Root Layout (`layout.tsx`)

- Wrap everything in `ThemeProvider` from `next-themes` (attribute `class`, default `system`)
- Load Inter + JetBrains Mono via `next/font/google`, apply as CSS variables
- Render `<SiteHeader />` and `<SiteFooter />` around `{children}`
- Set metadata: title template `"%s | [Your Name]"`, description, og-image

### 2. Homepage (`page.tsx`)

**Hero section:**
- Large heading: name + one-liner ("PhD Candidate · HPC · Applied ML" or similar)
- Subtext: 2-3 sentences positioning statement
- Profile photo (rounded, subtle border, ~120px)
- Two CTA buttons: "Read Guides" → `/guides`, "View CV" → PDF download
- Subtle gradient or mesh background — tasteful, not a template

**Below the fold:**
- "Featured Guides" — 3 most recent guide cards (pull from MDX frontmatter)
- "Selected Projects" — 2-3 project cards
- Keep it tight. No testimonials, no blog feed, no infinite scroll.

### 3. Guides Index (`/guides/page.tsx`)

- Page title + short intro paragraph
- Responsive card grid (1 col mobile, 2 col md, 3 col lg)
- Each `<GuideCard>` shows: title, description, tags (as shadcn `<Badge>`), estimated read time, date
- Cards link to `/guides/[slug]`
- Sort by date descending
- Optional: filter by tag (client-side, simple toggle badges at top)

### 4. Individual Guide (`/guides/[slug]/page.tsx`)

- Two-column layout on desktop: main content (prose) + sticky sidebar (table of contents)
- Single column on mobile, TOC collapses into a dropdown or accordion at top
- MDX rendered with custom components (see below)
- Frontmatter rendered as header: title, date, author, tags, read time
- Previous / Next guide navigation at bottom
- "Back to Guides" breadcrumb link

### 5. Projects (`/projects/page.tsx`)

- Grid of project cards
- Each card: title, description, tech stack badges, thumbnail image, links (GitHub, live demo, paper)
- Use shadcn `<Card>` with hover state

### 6. About (`/about/page.tsx`)

- Bio section (longer form)
- Research interests
- Education timeline (clean, minimal — not a full CV, link to PDF for that)
- Tech stack / skills (icon grid or grouped badges)

### 7. Contact (`/contact/page.tsx`)

- No contact form (static site). Instead:
- Email link (with a copy button)
- GitHub, LinkedIn, Google Scholar, ORCID links
- Office location / institution if desired
- Clean layout, centered, minimal

---

## Component Specifications

### `<SiteHeader />`

- Sticky, blurred background (`backdrop-blur-md`)
- Left: site name/logo (text, not image — links to `/`)
- Center or right: nav links — Home, Guides, Projects, About, Contact
- Right edge: `<ThemeToggle />` (sun/moon icon swap)
- Mobile: hamburger → slide-out `<Sheet>` (shadcn) with nav links
- Active link gets underline or subtle highlight
- Border bottom with `border-border` for separation

### `<ThemeToggle />`

- Uses `useTheme()` from `next-themes`
- Renders sun icon (light) / moon icon (dark) via lucide-react
- `<Button variant="ghost" size="icon">`
- No label, just icon — tooltip on hover

### `<GuideCard />`

- shadcn `<Card>` with `<CardHeader>`, `<CardContent>`, `<CardFooter>`
- Title as `<CardTitle>`, description as `<CardDescription>`
- Footer: tags as `<Badge variant="secondary">`, read time as muted text
- Entire card is a link (wrap in `<Link>`)
- Hover: subtle lift (`hover:-translate-y-1 transition-transform`)

### `<TableOfContents />`

- Reads headings (h2, h3) from the rendered MDX
- Renders as a nested list in the sidebar
- Highlights current section on scroll (Intersection Observer)
- Smooth scroll on click
- Desktop: sticky `top-20` in sidebar
- Mobile: collapsible at top of article

### `<CopyButton />`

- Appears top-right of every code block
- Copies code content to clipboard
- Shows checkmark icon briefly after copy
- Uses `navigator.clipboard.writeText()`

### MDX Components (`mdx-components.tsx`)

Map standard markdown elements to styled versions:

| Element | Rendering |
|---|---|
| `h1`-`h4` | Tailwind typography classes + `id` for anchor links |
| `p` | `text-muted-foreground leading-7` |
| `a` | Underline + external link icon for external URLs |
| `code` (inline) | `bg-muted rounded px-1.5 py-0.5 font-mono text-sm` |
| `pre > code` | Syntax highlighted block (use `rehype-pretty-code` with `shiki`) + `<CopyButton />` |
| `blockquote` | Left border accent, italic, muted background |
| `table` | shadcn `<Table>` components |
| `img` | `next/image` with rounded corners, optional caption via alt text |
| `ul` / `ol` | Proper spacing, custom bullet/number styling |
| Custom: `<Callout>` | Info/warning/tip boxes with icon + colored left border |
| Custom: `<Steps>` | Numbered step-by-step instructions with vertical line connector |

---

## MDX / Content Pipeline

### Frontmatter Schema (each `.mdx` file in `content/guides/`)

```yaml
---
title: "Building a Multi-Node GPU Cluster from Scratch"
description: "A complete guide to setting up a bare-metal GPU cluster for ML training and inference."
date: "2025-01-15"
tags: ["HPC", "GPU", "Linux", "Networking"]
author: "[Your Name]"
draft: false
---
```

### Content Loading (`lib/mdx.ts`)

- Use Node `fs` to read `content/guides/*.mdx` at build time
- Parse frontmatter with `gray-matter`
- Compile MDX with `next-mdx-remote/rsc` (RSC-compatible) or `@next/mdx`
- Generate `slug` from filename (strip `.mdx`)
- Calculate `readTime` from word count (~200 wpm)
- Export functions:
  - `getAllGuides()` → sorted metadata array
  - `getGuideBySlug(slug)` → full content + metadata
  - `getGuideSlugs()` → for `generateStaticParams()`

### Syntax Highlighting

- Use `rehype-pretty-code` with `shiki`
- Theme: `github-dark` for dark mode, `github-light` for light mode (dual themes)
- Line numbers on blocks >5 lines
- Line highlighting support (`// [!code highlight]` or `{1,3-5}` syntax)
- Language label in top-right of code block

---

## Theming & Design Tokens

### shadcn Theme

Use shadcn's default CSS variable system in `globals.css`. Customize:

```css
@layer base {
  :root {
    /* Light mode — clean, slightly warm whites */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 221 83% 53%;       /* A confident blue — not default gray */
    --primary-foreground: 210 40% 98%;
    --accent: 210 40% 96%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --radius: 0.5rem;
  }

  .dark {
    /* Dark mode — deep, not pure black */
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    --primary: 217 91% 60%;
    --accent: 216 34% 17%;
    --muted: 223 47% 11%;
    --muted-foreground: 215 16% 57%;
  }
}
```

### Typography Scale

- Use Tailwind's `@tailwindcss/typography` plugin for prose content
- Customize `prose` to match shadcn tokens:
  - Headings: `font-semibold tracking-tight`
  - Body: `leading-7 text-muted-foreground`
  - Links: `text-primary underline underline-offset-4`
  - Code: match the inline code component styling

### Spacing Philosophy

- Generous whitespace — academic content needs room to breathe
- Section spacing: `py-16` or `py-20` on desktop, `py-10` on mobile
- Max content width: `max-w-3xl` for prose, `max-w-6xl` for grids
- Card gap: `gap-6`

---

## Static Export & GitHub Pages

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/REPO_NAME' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/REPO_NAME/' : '',
  images: {
    unoptimized: true,  // Required for static export
  },
  // MDX config if using @next/mdx
};

export default nextConfig;
```

> Replace `REPO_NAME` with the actual GitHub repo name. If using a custom domain or `username.github.io` repo, remove `basePath` and `assetPrefix`.

### GitHub Actions Deploy (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - id: deploy
        uses: actions/deploy-pages@v4
```

### Repository Settings

- Go to repo Settings → Pages → Source: **GitHub Actions**
- Add a `public/.nojekyll` file (empty) to prevent Jekyll processing

---

## shadcn Components to Install

Run these during setup (shadcn CLI):

```bash
npx shadcn@latest init
npx shadcn@latest add button card badge sheet separator
npx shadcn@latest add dropdown-menu tooltip accordion
npx shadcn@latest add table
```

Only add more if a specific feature needs them. Don't pre-install the whole library.

---

## Quality Checklist (before deploying)

- [ ] `npm run build` succeeds with zero errors and `output: 'export'`
- [ ] All pages render correctly in `out/` folder (open `index.html` locally)
- [ ] Dark mode toggle works and persists across navigation
- [ ] Mobile nav (Sheet) opens/closes correctly, links work
- [ ] All guide MDX files render with proper syntax highlighting
- [ ] Code blocks have copy buttons that work
- [ ] Table of contents highlights correct section on scroll
- [ ] Images use `unoptimized: true` and load correctly
- [ ] `basePath` is set correctly for the GitHub repo name
- [ ] No hydration errors in console
- [ ] Lighthouse: aim for 95+ on Performance, 100 Accessibility
- [ ] All links work (no 404s from basePath issues)
- [ ] `.nojekyll` file exists in `public/`
- [ ] `robots.txt` and basic `sitemap.xml` in `public/`

---

## Style Guidelines

- **No hero gradients that scream "SaaS landing page."** Subtle is fine — a faint radial gradient or mesh, muted.
- **No stock illustrations.** Use your own screenshots, diagrams, or nothing.
- **Typography does the heavy lifting.** Good type hierarchy > decorative elements.
- **Animations: only micro-interactions.** Hover lifts on cards, smooth theme transitions, scroll-linked TOC highlighting. Nothing that delays content visibility.
- **Color: restrained.** Primary blue for CTAs and links, badges get `secondary` variant. No rainbow tag system.
- **Code blocks are first-class citizens.** They should look as good as VS Code. Proper font, proper highlighting, proper spacing.

---

## Placeholder Content

For initial build, use these placeholders:

- **Name:** `R. Kavasseri`
- **Title:** `Associate Dean/Professor`
- **Institution:** `[Your University]`
- **Bio:** 2-3 lorem sentences about research interests
- **Guides:** Create 1 real guide file (`gpu-cluster-setup.mdx`) with ~200 words of placeholder content to test the full MDX pipeline. Add 2 more stub files with only frontmatter.
- **Projects:** 3 placeholder project cards with title, description, and dummy tech badges
- **Profile image:** Use a placeholder `div` with initials until a real photo is added

---

## What's Out of Scope for V1

- Blog / posts section (can add later with same MDX pipeline)
- Search functionality
- Comments or Giscus integration
- RSS feed
- i18n
- Analytics (add Plausible or Umami in v2 if wanted)
- CI checks beyond the deploy action

---

## Notes for Claude Code

- Prefer `pnpm` if available, fall back to `npm`
- Use TypeScript everywhere — no `.js` files in `src/`
- Every component gets its own file — no barrel exports until the project warrants it
- Use path aliases (`@/components/...`, `@/lib/...`) as shadcn sets up
- Keep `globals.css` lean — Tailwind utilities first, custom CSS only for prose overrides and shadcn variable definitions
- Test the MDX pipeline early — get one guide rendering before building out the rest of the UI
- Commit messages: conventional commits (`feat:`, `fix:`, `docs:`)