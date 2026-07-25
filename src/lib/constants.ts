/**
 * Single source of truth for site metadata, nav, and social links.
 * Values marked TODO are placeholders — edit here, nowhere else.
 */

export const siteConfig = {
  name: "R. Kavasseri",
  title: "Associate Dean/Professor",
  // TODO: replace with real institution
  institution: "[Your University]",
  // TODO: replace with real department/office
  department: "[Department]",
  office: "[Building, Room 000]",
  url: "https://rkavasseri.github.io",
  description:
    "Associate Dean and Professor working at the intersection of power systems, high-performance computing, and applied machine learning.",
  tagline: "Associate Dean · Professor · Power Systems · Applied ML",
  ogImage: "/images/og-image.png",
  email: "rajesh.kavasseri@gmail.com",
} as const;

export const navLinks = [
  { title: "Home", href: "/" },
  { title: "Guides", href: "/guides" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const;

export const socialLinks = {
  // TODO: replace all with real profile URLs
  github: "https://github.com/rkavasseri",
  linkedin: "https://www.linkedin.com/in/rkavasseri",
  scholar: "https://scholar.google.com/citations?user=PLACEHOLDER",
  orcid: "https://orcid.org/0000-0000-0000-0000",
} as const;

/** Path to the CV. Drop the real PDF at public/files/cv.pdf. */
export const cvPath = "/files/cv.pdf";
