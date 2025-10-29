import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // allow: "/onboarding",
        disallow: [
          "/adding-goal/",
          "/details/",
          "/feed/",
          "/group/",
          "/mypage/",
          "/notification/",
          "/api/",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ?? "http://localhost:3000"}/sitemap.xml`,
  };
}
