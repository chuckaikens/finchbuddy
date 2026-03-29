/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import {
  getCategories,
  getPosts,
  getPostBySlug,
  getPostsByCategory,
  formatDate,
  estimateReadTime,
} from "@/lib/airtable";
import { getPageBySlug } from "@/lib/wordpress";

const SITE_URL = "https://finchbuddy.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const categoryMatch = categories.find((c) => c.slug === slug);

  if (categoryMatch) {
    const title = `${categoryMatch.name} — Finch ${categoryMatch.name} Articles`;
    const description = `Browse ${categoryMatch.count} articles about finch ${categoryMatch.name.toLowerCase()}.`;
    return {
      title,
      description,
      openGraph: { title, description, url: `${SITE_URL}/${slug}`, type: "website" },
      alternates: { canonical: `${SITE_URL}/${slug}` },
    };
  }

  const post = await getPostBySlug(slug);
  if (post) {
    return {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt.slice(0, 160),
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.metaDescription || post.excerpt.slice(0, 160),
        url: `${SITE_URL}/${slug}`,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        ...(post.image ? { images: [{ url: post.image, alt: post.title }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: post.seoTitle || post.title,
        ...(post.image ? { images: [post.image] } : {}),
      },
      alternates: { canonical: `${SITE_URL}/${slug}` },
    };
  }

  return {};
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories();

  // 1. Check if this slug is a category
  const categoryMatch = categories.find((c) => c.slug === slug);
  if (categoryMatch) {
    const posts = await getPostsByCategory(categoryMatch.name, 20);
    const recentPosts = await getPosts(3);

    return (
      <>
        <Header categories={categories} />
        <main className="pt-[120px] min-h-screen">
          <section className="max-w-screen-2xl mx-auto px-8 md:px-24 pt-16 pb-8">
            <span className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label">
              Category
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none text-on-surface mt-6 mb-4">
              {categoryMatch.name}
            </h1>
            <p className="text-on-surface/60 text-lg">
              {categoryMatch.count} articles
            </p>
          </section>
          <div className="max-w-screen-2xl mx-auto px-8 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-24">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
            <Sidebar categories={categories} recentPosts={recentPosts} />
          </div>
        </main>
        <Footer categories={categories} />
      </>
    );
  }

  // 2. Check if this slug is a blog post (from Airtable)
  const post = await getPostBySlug(slug);
  if (post) {
    const readTime = estimateReadTime(post.wordCount);
    const recentPosts = await getPosts(3);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription || post.excerpt.slice(0, 160),
      image: post.image ?? undefined,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
      publisher: {
        "@type": "Organization",
        name: "FinchBuddy",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${slug}` },
    };

    // If we have content in Airtable, use it. Otherwise fall back to WP.
    let content = post.content;
    if (!content) {
      // Fallback: fetch from WordPress API
      const wpRes = await fetch(
        `https://finchbuddy.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
        { next: { revalidate: 300 } }
      );
      if (wpRes.ok) {
        const wpPosts = await wpRes.json();
        if (wpPosts.length > 0) {
          content = wpPosts[0].content.rendered;
        }
      }
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header categories={categories} />
        <main className="pt-[120px] min-h-screen">
          {/* Post Hero */}
          <section className="relative w-full h-[600px] flex items-end px-8 md:px-24 pb-20 overflow-hidden">
            {post.image && (
              <img
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[20%] brightness-90"
                alt={post.title}
                src={post.image}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"></div>
            <div className="relative z-20 max-w-4xl">
              <div className="flex gap-2 mb-6">
                <Link
                  href={`/${post.category.toLowerCase()}`}
                  className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label hover:scale-105 transition-transform"
                >
                  {post.category}
                </Link>
                <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label">
                  {readTime} min read
                </span>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none text-on-surface mb-8">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 font-label">
                <p className="font-bold text-on-surface">{post.author}</p>
                <p className="text-sm opacity-70">{formatDate(post.date)}</p>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <div className="max-w-screen-2xl mx-auto px-8 md:px-12 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-24">
            <article className="lg:col-span-8">
              <div
                className="prose prose-lg max-w-none text-on-surface/90 leading-relaxed font-body
                  [&_h2]:font-headline [&_h2]:text-4xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-on-surface [&_h2]:mt-16 [&_h2]:mb-8
                  [&_h3]:font-headline [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-on-surface [&_h3]:mb-6
                  [&_p]:mb-8
                  [&_img]:rounded-xl [&_img]:editorial-shadow
                  [&_blockquote]:p-12 [&_blockquote]:bg-surface-container-low [&_blockquote]:rounded-xl [&_blockquote]:border-l-8 [&_blockquote]:border-primary-container [&_blockquote]:text-2xl [&_blockquote]:font-headline [&_blockquote]:font-bold [&_blockquote]:italic
                  [&_a]:text-primary [&_a]:font-bold [&_a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </article>
            <Sidebar categories={categories} recentPosts={recentPosts} />
          </div>
        </main>
        <Footer categories={categories} />
      </>
    );
  }

  // 3. Check if this slug is a static page (still from WordPress)
  const page = await getPageBySlug(slug);
  if (page) {
    return (
      <>
        <Header categories={categories} />
        <main className="pt-[120px] min-h-screen">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-24 mt-16">
            <h1
              className="font-headline text-5xl font-black tracking-tighter leading-none text-on-surface mb-12"
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            />
            <div
              className="prose prose-lg max-w-3xl text-on-surface/90 leading-relaxed font-body
                [&_h2]:font-headline [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-on-surface [&_h2]:mt-12 [&_h2]:mb-6
                [&_p]:mb-6
                [&_a]:text-primary [&_a]:font-bold [&_a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          </div>
        </main>
        <Footer categories={categories} />
      </>
    );
  }

  notFound();
}
