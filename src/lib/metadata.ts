import type { Metadata } from "next";
import { SITE_META, ROUTES } from "@/lib/constants";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({ title, description, path = "" }: PageMetaInput): Metadata {
  const url = SITE_META.url + path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_META.name,
      images: [{ url: SITE_META.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Pre-built metadata per route — import directly in page files
export const pageMetadata = {
  home: buildMetadata({
    title: SITE_META.name + " — " + SITE_META.tagline,
    description: SITE_META.description,
    path: ROUTES.home,
  }),
  systems: buildMetadata({
    title: "Systems — " + SITE_META.name,
    description:
      "The eight operational systems that keep leads from slipping, calendars full, and follow-up consistent. Built, installed, and managed for service businesses.",
    path: ROUTES.systems,
  }),
  verticals: buildMetadata({
    title: "Who We Work With — " + SITE_META.name,
    description:
      "Ops by Noell works with med spas, salons, massage therapists, dental offices, HVAC, home services, and pool services. See if your industry is a fit.",
    path: ROUTES.verticals,
  }),
  pricing: buildMetadata({
    title: "Pricing — " + SITE_META.name,
    description:
      "Simple pricing for fixing the leaks that cost you clients. Entry at $197/mo, Starter at $797/mo, Growth at $1,497/mo.",
    path: ROUTES.pricing,
  }),
  nova: buildMetadata({
    title: "Nova AI — " + SITE_META.name,
    description:
      "Nova responds instantly, qualifies leads, handles common questions, and keeps the conversation moving while you're busy doing the actual work.",
    path: ROUTES.nova,
  }),
  about: buildMetadata({
    title: "About — " + SITE_META.name,
    description:
      "Ops by Noell was built for service businesses that are strong at the craft but stretched thin in the operational layers that quietly affect revenue every day.",
    path: ROUTES.about,
  }),
  book: buildMetadata({
    title: "Book a Free Audit — " + SITE_META.name,
    description:
      "A focused look at where leads, appointments, and follow-up are slipping. Not a pitch — a no-obligation conversation where you leave with clarity either way.",
    path: ROUTES.book,
  }),
};
