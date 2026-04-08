// ─── Brand Colors ──────────────────────────────────────────────────────────────
export const COLORS = {
  // Primary accent — wine/oxblood, used site-wide for CTAs, highlights, links
  wine: "#6A2C3E",
  wineHover: "#5a2233",
  // Secondary accent — Nova sections ONLY
  purple: "#7C5CFC",
  // Backgrounds
  bg: "#FAF5F0",
  bgWarm: "#FFF7F4",
  blush: "#F0E4E8",
  palePink: "#E8D0D6",
  lilac: "#E0D4E8",
  silver: "#C8C4C0",
  dark: "#171415",
  // Text
  textPrimary: "#1F1A1A",
  textSecondary: "#3D3535",
  textMuted: "#6D6664",
  // Borders
  border: "#EDE3DE",
  borderLight: "#F5EFEB",
} as const;

// ─── Gradient Values ────────────────────────────────────────────────────────────
export const GRADIENTS = {
  // Hero section gradient — blush pink to soft lavender
  hero: "linear-gradient(135deg, #FFF0F5 0%, #EDE5FF 100%)",
  heroAlt: "linear-gradient(135deg, #FFF3F6 0%, #F3ECFF 100%)",
  // Dark CTA band
  darkCtaBand: "#171415",
  // Subtle section tint
  sectionTint: "linear-gradient(180deg, #FAF5F0 0%, #FFF7F4 100%)",
} as const;

// ─── Typography ─────────────────────────────────────────────────────────────────
export const TYPOGRAPHY = {
  fontSans: "Inter, system-ui, -apple-system, sans-serif",
  fontDisplay: "'Playfair Display', Georgia, serif",
  // Scale
  displayXl: "text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight",
  displayLg: "text-4xl md:text-5xl font-bold leading-tight tracking-tight",
  displayMd: "text-3xl md:text-4xl font-bold leading-snug",
  displaySm: "text-2xl md:text-3xl font-semibold leading-snug",
  headingLg: "text-xl md:text-2xl font-semibold leading-snug",
  headingMd: "text-lg md:text-xl font-semibold",
  bodyLg: "text-lg leading-relaxed",
  bodyMd: "text-base leading-relaxed",
  bodySm: "text-sm leading-relaxed",
  label: "text-xs font-semibold uppercase tracking-widest",
  eyebrow: "text-sm font-semibold uppercase tracking-widest",
} as const;

// ─── Route Map ──────────────────────────────────────────────────────────────────
export const ROUTES = {
  home: "/",
  systems: "/systems",
  verticals: "/verticals",
  services: "/services",   // kept for redirect
  pricing: "/pricing",
  nova: "/nova",
  about: "/about",
  book: "/book",
} as const;

export const ROUTE_REDIRECTS = {
  "/services": "/systems",
  "/solutions": "/systems",
  "/industries": "/verticals",
} as const;

// ─── Page Order ─────────────────────────────────────────────────────────────────
export const PAGE_ORDER = [
  ROUTES.home,
  ROUTES.systems,
  ROUTES.verticals,
  ROUTES.pricing,
  ROUTES.nova,
  ROUTES.about,
  ROUTES.book,
] as const;

// ─── Site Metadata ──────────────────────────────────────────────────────────────
export const SITE_META = {
  name: "Ops by Noell",
  tagline: "Done-for-You Front Desk + Follow-Up System",
  description:
    "We build, install, and manage the system that catches missed calls, follows up instantly, and keeps your calendar full — so you can stay focused on the client in front of you.",
  url: "https://opsbynoell.com",
  locale: "en_US",
  twitterHandle: "@opsbynoell",
  ogImage: "/og-default.jpg",
} as const;

// ─── CTA Labels ─────────────────────────────────────────────────────────────────
export const CTA = {
  primary: "Get Your Free Audit",
  secondary: "See What You're Missing",
  pricing: "Book Your Free Audit",
  nova: "See Nova in Action",
  caseStudy: "See How It Works",
  bookingReassurance:
    "This is a no-pitch conversation. You'll leave with clarity either way.",
  // Tier-specific
  entryTier: "Start With Entry",
  starterTier: "Start With Starter",
  growthTier: "Start With Growth",
  novaStandalone: "See Nova in Action",
  seePricing: "See Pricing",
} as const;
