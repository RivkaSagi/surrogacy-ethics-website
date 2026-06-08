import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.surrogacyethicsil.org";

  return [
    {
      url: `${baseUrl}/signatories`,
      lastModified: new Date("2026-05-30"),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: baseUrl,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sign`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date("2026-04-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: new Date("2026-04-29"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
