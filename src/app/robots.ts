import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (SITE_CONFIG.domain && !SITE_CONFIG.domain.includes("<")
      ? `https://${SITE_CONFIG.domain}`
      : "https://kosmogroup.in");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
