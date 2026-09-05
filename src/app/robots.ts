import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/results/"],
      },
      {
        userAgent: "bingbot",
        allow: "/",
        disallow: ["/results/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
