/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import {
  getPosts,
  getCategories,
} from "@/lib/wordpress";

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getPosts({ perPage: 10 }),
    getCategories(),
  ]);

  const gridPosts = posts.slice(0, 6);
  const recentSidebar = posts.slice(6, 9);

  return (
    <>
      <Header categories={categories} />

      <main className="pt-24 min-h-screen">
        {/* Static Hero */}
        <section className="relative w-full h-[716px] flex items-end px-8 md:px-24 pb-20 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover z-0 brightness-90"
            alt="A vibrant zebra finch perched on a branch"
            src="https://i.pinimg.com/1200x/87/28/ed/8728ed33fe57574969b8726fb1eb84e7.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-4xl">
            <span className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label mb-6 inline-block">
              Where Feathers and Friends Meet
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-[-0.02em] leading-none text-on-surface mb-6">
              Your Complete Guide to Finch Care
            </h1>
            <p className="text-on-surface/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              Species profiles, care guides, breeding tips, and habitat design from passionate finch keepers.
            </p>
          </div>
        </section>

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
            <h2 className="font-headline text-3xl font-extrabold tracking-[-0.02em] text-on-surface mb-12">Latest Articles</h2>
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
