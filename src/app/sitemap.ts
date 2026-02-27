import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((project) => ({
    url: `https://owoigbe-timilehin.vercel.app/projects/${project.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://owoigbe-timilehin.vercel.app",
      lastModified: new Date(),
    },
    ...projectEntries,
  ];
}
