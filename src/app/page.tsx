/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import {
  getPosts,
  getCategories,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  getAuthorName,
  getCategoryNames,
  formatDate,
  estimateReadTime,
  stripHtml,
} from "@/lib/wordpress";

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getPosts({ perPage: 13 }),
    getCategories(),
  ]);

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1, 7);
  const recentSidebar = posts.slice(7, 10);

  const featuredImage = getFeaturedImageUrl(featuredPost);
  const featuredCats = getCategoryNames(featuredPost);
  const featuredReadTime = estimateReadTime(featuredPost.content.rendered);

  return (
    <>
      <Header categories={categories} />

      <main className="pt-24 min-h-screen">
        {/* Hero — Featured Post */}
        <Link href={`/${featuredPost.slug}`} className="block">
          <section className="relative w-full h-[716px] flex items-end px-8 md:px-24 pb-20 overflow-hidden group">
            {featuredImage && (
              <img
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[20%] brightness-90 group-hover:scale-[1.02] transition-transform duration-700"
                alt={getFeaturedImageAlt(featuredPost)}
                src={featuredImage}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"></div>
            <div className="relative z-20 max-w-4xl">
              <div className="flex gap-2 mb-6">
                {featuredCats.map((cat) => (
                  <span key={cat.slug} className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label">
                    {cat.name}
                  </span>
                ))}
                <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label">
                  {featuredReadTime} min read
                </span>
              </div>
              <h1
                className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none text-on-surface mb-6"
                dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
              />
              <p className="text-on-surface/80 text-lg max-w-2xl mb-6 leading-relaxed">
                {stripHtml(featuredPost.excerpt.rendered)}
              </p>
              <div className="flex items-center gap-4 font-label">
                <p className="font-bold text-on-surface">{getAuthorName(featuredPost)}</p>
                <p className="text-sm opacity-70">{formatDate(featuredPost.date)}</p>
              </div>
            </div>
          </section>
        </Link>

        {/* Category Pills */}
        <div className="max-w-screen-2xl mx-auto px-8 md:px-12 mt-16">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="px-6 py-3 bg-surface-container text-on-surface rounded-full text-sm font-bold font-label hover:bg-primary-container hover:text-on-primary-container transition-colors"
              >
                {cat.name}
                <span className="ml-2 opacity-50">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-screen-2xl mx-auto px-8 md:px-12 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Main — Post Grid */}
          <div className="lg:col-span-8">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-12">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {gridPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar categories={categories} recentPosts={recentSidebar} />
        </div>
      </main>

      <Footer />
    </>
  );
}
