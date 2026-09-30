/**
 * Single source of truth for site metadata, nav, and social links.
 * Values marked TODO are placeholders — edit here, nowhere else.
 */

export const siteConfig = {
  name: "R. Kavasseri",
  title: "AI Researcher, Engineer, and Academic Leader",
  institution: "South Dakota State University",
  college: "Lohr College of Engineering",
  department: "Department of Electrical Engineering and Computer Science",
  office: "Crothers Hall, Room 201E",
  url: "https://rkavasseri.github.io",
  description:
    "Rajesh Kavasseri is an AI researcher, engineer, and academic leader working across the full AI stack: foundational models, AI for science, production systems, and research infrastructure.",
  tagline:
    "Foundational AI · AI for Science · Production Systems · Research Infrastructure",
  ogImage: "/images/og-image.png",
  email: "rajesh.kavasseri@sdstate.edu",
} as const;

export interface NavLink {
  title: string;
  href: string;
  /** Renders as an outbound link (new tab, external icon). */
  external?: boolean;
  /** When present, the item becomes a dropdown. */
  items?: NavLink[];
}

export const navLinks: NavLink[] = [
  { title: "Home", href: "/" },
  {
    title: "Writing",
    href: "/writing",
    items: [
      { title: "Guides", href: "/guides" },
      { title: "Current Research", href: "/writing#research" },
      { title: "Newsletters", href: "/writing#newsletters" },
      {
        title: "Publications",
        href: "https://scholar.google.com/citations?user=d4-J464AAAAJ",
        external: true,
      },
    ],
  },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const socialLinks = {
  github: "https://github.com/rkavasseri",
  linkedin: "https://www.linkedin.com/in/kavasseri/",
  scholar: "https://scholar.google.com/citations?user=d4-J464AAAAJ",
  orcid: "https://orcid.org/0000-0002-4444-8136",
} as const;

export interface Newsletter {
  name: string;
  /** Subscribe/follow URL. Empty string hides the publication entirely. */
  url: string;
  platform: "LinkedIn" | "Substack";
  /** Publication's own strapline, shown under the name. */
  tagline?: string;
  description: string;
}

export const newsletters: Newsletter[] = [
  {
    name: "The Learning Machine",
    url: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7293009829223112704",
    platform: "LinkedIn",
    description:
      "Notes on machine learning and the systems that run it — what works in production, what breaks, and why the gap between the two is where the engineering lives.",
  },
  {
    name: "The Super Stack",
    url: "https://thesuperstack.substack.com/",
    platform: "Substack",
    tagline: "Architecture Shapes Outcomes",
    description:
      "A systems-level examination of how architecture, constraint, and scale determine outcomes.",
  },
];

/** Publications with a live URL, in nav and page order. */
export const publishedNewsletters = newsletters.filter((n) => n.url !== "");

/** Primary newsletter for compact CTAs (hero, footer). */
export const newsletter = newsletters[0];

/**
 * True when a link still carries its placeholder value — those are filtered
 * out rather than rendered as dead links.
 */
export function isPlaceholderLink(href: string): boolean {
  return href.includes("PLACEHOLDER") || href.includes("0000-0000-0000-0000");
}

/** Path to the CV. Drop the real PDF at public/files/cv.pdf. */
export const cvPath = "/files/cv.pdf";

/**
 * Set to true once public/files/cv.pdf exists. While false, the "View CV" and
 * "Full CV" buttons are hidden rather than linking to a 404.
 */
export const hasCv = false;
