import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

const ROUTES = ["", "/ve-chung-toi", "/bep-truong", "/set-menu-chon-loc", "/khong-gian", "/thuc-don", "/lien-he"]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
