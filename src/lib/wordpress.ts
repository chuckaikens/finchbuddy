const WP_API = "https://finchbuddy.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  featured_media: number;
  _embedded?: {
    author?: Array<{ name: string; avatar_urls?: Record<string, string> }>;
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${WP_API}${endpoint}`, {
    next: { revalidate: 300 }, // revalidate every 5 minutes
  });
  if (!res.ok) throw new Error(`WP API error: ${res.status} ${endpoint}`);
  return res.json();
}

export async function getPosts(
  params: { perPage?: number; page?: number; categories?: number } = {}
): Promise<WPPost[]> {
  const { perPage = 10, page = 1, categories } = params;
  let url = `/posts?per_page=${perPage}&page=${page}&_embed`;
  if (categories) url += `&categories=${categories}`;
  return fetchAPI<WPPost[]>(url);
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>(`/posts?slug=${slug}&_embed`);
  return posts[0] ?? null;
}

export async function getCategories(): Promise<WPCategory[]> {
  const categories = await fetchAPI<WPCategory[]>("/categories?per_page=100");
  return categories.filter((c) => c.slug !== "uncategorized");
}

export async function getCategoryBySlug(
  slug: string
): Promise<WPCategory | null> {
  const categories = await fetchAPI<WPCategory[]>(`/categories?slug=${slug}`);
  return categories[0] ?? null;
}

export async function getPages(): Promise<WPPage[]> {
  return fetchAPI<WPPage[]>("/pages?per_page=100");
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchAPI<WPPage[]>(`/pages?slug=${slug}`);
  return pages[0] ?? null;
}

// Helpers to extract embedded data
export function getFeaturedImageUrl(post: WPPost): string | null {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

export function getFeaturedImageAlt(post: WPPost): string {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? post.title.rendered;
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? "FinchBuddy";
}

export function getAuthorAvatar(post: WPPost): string | null {
  const urls = post._embedded?.author?.[0]?.avatar_urls;
  return urls ? urls["96"] ?? urls["48"] ?? null : null;
}

export function getCategoryNames(post: WPPost): Array<{ name: string; slug: string }> {
  const terms = post._embedded?.["wp:term"]?.[0];
  return terms?.map((t) => ({ name: t.name, slug: t.slug })) ?? [];
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function estimateReadTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}
