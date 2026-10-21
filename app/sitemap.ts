import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

const ROUTES = ["", "/about", "/chef", "/set-menu", "/space", "/menu", "/contact"]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
