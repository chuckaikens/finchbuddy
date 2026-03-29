/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import {
  getCategories,
  getCategoryBySlug,
  getPosts,
  getPostBySlug,
  getPageBySlug,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  getAuthorName,
  getAuthorAvatar,
  getCategoryNames,
  formatDate,
  estimateReadTime,
} from "@/lib/wordpress";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories();

  // 1. Check if this slug is a category
  const category = await getCategoryBySlug(slug);
  if (category) {
    const posts = await getPosts({ perPage: 20, categories: category.id });
    const recentPosts = await getPosts({ perPage: 3 });

    return (
      <>
        <Header categories={categories} />
        <main className="pt-[120px] min-h-screen">
          {/* Category Hero */}
          <section className="max-w-screen-2xl mx-auto px-8 md:px-24 pt-16 pb-8">
            <span className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label">
              Category
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none text-on-surface mt-6 mb-4">
              {category.name}
            </h1>
            <p className="text-on-surface/60 text-lg">
              {category.count} articles
            </p>
          </section>

          {/* Posts Grid */}
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

  // 2. Check if this slug is a blog post
  const post = await getPostBySlug(slug);
  if (post) {
    const featuredImage = getFeaturedImageUrl(post);
    const authorName = getAuthorName(post);
    const authorAvatar = getAuthorAvatar(post);
    const postCats = getCategoryNames(post);
    const readTime = estimateReadTime(post.content.rendered);
    const recentPosts = await getPosts({ perPage: 3 });

    return (
      <>
        <Header categories={categories} />
        <main className="pt-[120px] min-h-screen">
          {/* Post Hero */}
          <section className="relative w-full h-[600px] flex items-end px-8 md:px-24 pb-20 overflow-hidden">
            {featuredImage && (
              <img
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[20%] brightness-90"
                alt={getFeaturedImageAlt(post)}
                src={featuredImage}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"></div>
            <div className="relative z-20 max-w-4xl">
              <div className="flex gap-2 mb-6">
                {postCats.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label hover:scale-105 transition-transform"
                  >
                    {cat.name}
                  </Link>
                ))}
                <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label">
                  {readTime} min read
                </span>
              </div>
              <h1
                className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none text-on-surface mb-8"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div className="flex items-center gap-4">
                {authorAvatar && (
                  <img
                    className="w-14 h-14 rounded-full border-2 border-primary-container object-cover"
                    alt={authorName}
                    src={authorAvatar}
                  />
                )}
                <div className="font-label">
                  <p className="font-bold text-on-surface">{authorName}</p>
                  <p className="text-sm opacity-70">{formatDate(post.date)}</p>
                </div>
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
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </article>
            <Sidebar categories={categories} recentPosts={recentPosts} />
          </div>
        </main>
        <Footer categories={categories} />
      </>
    );
  }

  // 3. Check if this slug is a static page
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
