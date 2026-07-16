import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://floorifycanada.ca";
  const paths = ["", "/about", "/flooring", "/services", "/projects", "/showroom", "/flooring/luxury-vinyl", "/flooring/laminate", "/flooring/hardwood", "/flooring/carpet", "/flooring/tile", "/service-areas/calgary", "/service-areas/chestermere", "/service-areas/airdrie", "/service-areas/cochrane", "/service-areas/okotoks", "/service-areas/strathmore"];
  return paths.map((path, index) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: index === 0 ? "weekly" : "monthly", priority: index === 0 ? 1 : .7 }));
}
