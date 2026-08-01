import type { MetadataRoute } from "next";
import { templates } from "@/lib/templates-data";

const baseUrl = "https://fintechservices.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/templates"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const templateRoutes = templates.map((t) => ({
    url: `${baseUrl}/templates/${t.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...templateRoutes];
}
