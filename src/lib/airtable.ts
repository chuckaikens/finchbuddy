const BASE_ID = "appFiQzplRHEKV7FW";
const TABLE_ID = "tbl2VTTcY9eJuqGhQ";
const AIRTABLE_API = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;

function getToken(): string {
  const token = process.env.AIRTABLE_PAT;
  if (!token) throw new Error("AIRTABLE_PAT environment variable is not set");
  return token;
}

interface AirtableRecord {
  id: string;
  fields: {
    Title?: string;
    Slug?: string;
    "Content (HTML)"?: string;
    Excerpt?: string;
    Category?: string;
    "Published Date"?: string;
    "Featured Image URL"?: string;
    Author?: string;
    "SEO Title"?: string;
    "Meta Description"?: string;
    "Primary Keyword"?: string;
    "Word Count"?: number;
    Status?: string;
  };
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  image: string | null;
  author: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  wordCount: number;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

async function fetchRecords(formula?: string, sort?: string, maxRecords?: number): Promise<AirtableRecord[]> {
  const allRecords: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    if (formula) params.set("filterByFormula", formula);
    if (sort) params.set("sort[0][field]", sort);
    params.set("sort[0][direction]", "desc");
    if (maxRecords && !offset) params.set("maxRecords", String(maxRecords));
    if (offset) params.set("offset", offset);

    const url = `${AIRTABLE_API}?${params.toString()}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Airtable API error ${res.status}: ${body}`);
    }

    const data: AirtableResponse = await res.json();
    allRecords.push(...data.records);
    offset = data.offset;

    if (maxRecords && allRecords.length >= maxRecords) break;
  } while (offset);

  return maxRecords ? allRecords.slice(0, maxRecords) : allRecords;
}

function recordToPost(record: AirtableRecord): Post {
  const f = record.fields;
  return {
    id: record.id,
    title: f.Title ?? "",
    slug: f.Slug ?? "",
    content: f["Content (HTML)"] ?? "",
    excerpt: f.Excerpt ?? "",
    category: f.Category ?? "",
    date: f["Published Date"] ?? "",
    image: f["Featured Image URL"] ?? null,
    author: f.Author ?? "FinchBuddy",
    seoTitle: f["SEO Title"] ?? f.Title ?? "",
    metaDescription: f["Meta Description"] ?? "",
    primaryKeyword: f["Primary Keyword"] ?? "",
    wordCount: f["Word Count"] ?? 0,
  };
}

// --- Public API ---

export async function getPosts(limit?: number): Promise<Post[]> {
  const formula = '{Status} = "Published"';
  const records = await fetchRecords(formula, "Published Date", limit);
  return records.map(recordToPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const formula = `AND({Slug} = "${slug}", {Status} = "Published")`;
  const records = await fetchRecords(formula, undefined, 1);
  return records.length > 0 ? recordToPost(records[0]) : null;
}

export async function getPostsByCategory(category: string, limit?: number): Promise<Post[]> {
  const formula = `AND({Category} = "${category}", {Status} = "Published")`;
  const records = await fetchRecords(formula, "Published Date", limit);
  return records.map(recordToPost);
}

export async function getCategories(): Promise<Category[]> {
  const posts = await getPosts();
  const counts: Record<string, number> = {};
  for (const post of posts) {
    if (post.category) {
      counts[post.category] = (counts[post.category] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase(),
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 250));
}
