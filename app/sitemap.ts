import type { MetadataRoute } from "next";
import blogPosts from "./blog-posts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://floorifycanada.ca";
  const paths = ["", "/about", "/flooring", "/services", "/projects", "/blogs", "/showroom", "/flooring/luxury-vinyl", "/flooring/laminate", "/flooring/hardwood", "/flooring/carpet", "/flooring/tile", "/flooring/blinds", "/services/design-consultation", "/services/in-home-measurement", "/services/professional-installation", "/services/commercial-flooring", "/service-areas/calgary", "/service-areas/chestermere", "/service-areas/airdrie", "/service-areas/cochrane", "/service-areas/okotoks", "/service-areas/strathmore", ...blogPosts.map(post=>`/blogs/${post.slug}`)];
  return paths.map((path, index) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: index === 0 ? "weekly" : "monthly", priority: index === 0 ? 1 : .7 }));
}
