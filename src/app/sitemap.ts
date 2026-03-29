import type { MetadataRoute } from "next";
import { getPosts, getCategories, getPages } from "@/lib/wordpress";

const SITE_URL = "https://finchbuddy.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all content from WordPress
  const [posts, categories, pages] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getPages(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes, ...pageRoutes];
}

// Helper to fetch all posts (paginated)
async function getAllPosts() {
  const allPosts = [];
  let page = 1;
  while (true) {
    const posts = await getPosts({ perPage: 100, page });
    allPosts.push(...posts);
    if (posts.length < 100) break;
    page++;
  }
  return allPosts;
}
