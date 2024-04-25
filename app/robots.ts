import { MetadataRoute } from "next";

const WEBSITE_URL = "https://nova-blog-tech.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${WEBSITE_URL}/sitemap.xml`,
  };
}
