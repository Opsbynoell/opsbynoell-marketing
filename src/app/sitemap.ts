import type { MetadataRoute } from "next";
import { SITE_META, PAGE_ORDER } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGE_ORDER.map((path) => ({
    url: SITE_META.url + path,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/systems" || path === "/verticals" ? 0.9 : 0.8,
  }));
}
