/**
 * Single source of truth for site metadata, nav, and social links.
 * Values marked TODO are placeholders — edit here, nowhere else.
 */

export const siteConfig = {
  name: "R. Kavasseri",
  title: "Associate Dean/Professor",
  institution: "South Dakota State University",
  college: "Lohr College of Engineering",
  department: "Department of Electrical Engineering and Computer Science",
  office: "Crothers Hall, Room 201E",
  url: "https://rkavasseri.github.io",
  description:
    "Associate Dean and Professor working at the intersection of systems theory, networks, signal processing, and machine learning — and shipping the results as production software.",
  tagline: "Systems Theory · Networks · Signal Processing · Machine Learning",
  ogImage: "/images/og-image.png",
  email: "rajesh.kavasseri@sdstate.edu",
} as const;

export const navLinks = [
  { title: "Home", href: "/" },
  { title: "Guides", href: "/guides" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const;

export const socialLinks = {
  github: "https://github.com/rkavasseri",
  linkedin: "https://www.linkedin.com/in/kavasseri/",
  scholar: "https://scholar.google.com/citations?user=d4-J464AAAAJ",
  orcid: "https://orcid.org/0000-0002-4444-8136",
} as const;

/** "The Learning Machine" — LinkedIn newsletter. */
export const newsletter = {
  name: "The Learning Machine",
  url: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7293009829223112704",
  platform: "LinkedIn",
} as const;

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
