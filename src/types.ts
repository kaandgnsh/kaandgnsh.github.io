export type Lang = "en" | "tr";
/** A value that exists in both languages. */
export type L<T = string> = Record<Lang, T>;

export interface SocialLink {
  id: "github" | "linkedin" | "instagram" | "email";
  label: string;
  handle: string;
  href: string;
}

export interface CvConfig {
  label: L;
  url: string;
}

export interface Photo {
  /** Path inside /public, e.g. "kaan.jpg". */
  src: string;
  alt: L;
  /** Optional small square crop (≈112px) for the hero card. Falls back to `src`. */
  avatar?: string;
}

export interface SiteConfig {
  /** Long-term career goal, shown in About. */
  goal: L;
  name: string;
  brand: string;
  initials: string;
  title: L;
  description: L;
  headline: L;
  statement: L;
  email: string;
  location: string;
  /** Shows the location once, in the About facts. Set false to hide it everywhere. */
  showLocation: boolean;
  education: { university: L; program: L; year: L };
  /**
   * `null` = no CV exists. While null, no CV button or link is rendered anywhere.
   * Later: { label: { en: "Résumé", tr: "Özgeçmiş" }, url: "kaan-dogan-cv.pdf" }
   */
  cv: CvConfig | null;
  /** Optional portrait shown in About. `null` = nothing rendered. */
  photo: Photo | null;
  /** Shows the "Open to internships" line in the hero and contact sections. */
  /** Show a GitHub repository link on projects (false = projects live on this site only). */
  showRepoLinks: boolean;
  /** Show the GitHub profile section (live repo count and languages). */
  showGithubSection: boolean;
  openToInternship: boolean;
  github: { username: string; url: string };
  linkedin: { url: string };
  instagram: { url: string };
  focus: L<string[]>;
  currentlyLearning: L<string[]>;
  about: L<string[]>;
}

export interface ProjectImage {
  /** Path inside /public, e.g. "projects/m-info-get/cover.png". */
  src: string;
  alt: L;
  caption?: L;
}

export interface Project {
  slug: string;
  name: string;
  repo: string;
  tagline: L;
  /** Purpose. Must come from the repository. */
  purpose: L;
  category: L;
  languages: string[];
  tech: string[];
  /** One real command from the README, shown as a terminal line. */
  cmd?: string;
  /** Capabilities listed in the repository README. */
  capabilities: L<string[]>;
  usage: L<string[]>;
  /** Responsible-use notes grounded in the README. */
  responsible: L<string[]>;
  /** Top-level entries visible in the repository. */
  structure: string[];
  facts: { label: L; value: L }[];
  /** Real screenshots only. Rendered as a "Screenshots" block when present. */
  images?: ProjectImage[];
  /** Only set when a real, working demo exists. */
  demo?: string;
  /** Optional first-person sections. Only filled in by the author. */
  why?: L;
  challenges?: L;
  learned?: L<string[]>;
  /** `true` = gets its own case-study page. */
  caseStudy: boolean;
  hidden?: boolean;
}

/** A language or tool, linked to the work that uses it. */
export interface Skill {
  name: L;
  /** One factual line on how it is used. */
  detail?: L;
  /** Project or note slugs that show it in use. */
  evidence?: string[];
}

export interface FocusArea {
  name: L;
  note: L;
  evidence: string[];
}

export type CredentialCategory =
  | "Cybersecurity"
  | "Networking / Security"
  | "Pentesting"
  | "SIEM"
  | "Software"
  | "Other";

export interface Credential {
  title: string;
  issuer: string;
  date: string;
  category: CredentialCategory;
  credentialId?: string;
  url?: string;
}

export type Block =
  | { t: "p"; x: string }
  | { t: "h"; x: string }
  | { t: "code"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "note"; x: string };

export interface Post {
  slug: string;
  /** ISO date, e.g. "2026-10-06". */
  date: string;
  title: L;
  summary: L;
  tags: string[];
  body: L<Block[]>;
  /** `true` hides the post everywhere. */
  draft?: boolean;
}
