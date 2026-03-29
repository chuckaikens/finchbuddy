/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import {
  getPosts,
  getCategories,
} from "@/lib/airtable";

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getPosts(12),
    getCategories(),
  ]);

  const topPosts = posts.slice(0, 6);
  const bottomPosts = posts.slice(6, 12);

  return (
    <>
      <Header categories={categories} />

      <main className="pt-[70px] md:pt-[120px] min-h-screen">
        {/* Static Hero */}
        <section className="relative w-full h-[750px] flex items-end overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover z-0"
            alt="A vibrant zebra finch perched on a branch"
            src="https://i.pinimg.com/1200x/87/28/ed/8728ed33fe57574969b8726fb1eb84e7.jpg"
          />
          {/* Gradient only in bottom 30% so image dominates */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-finch-warm-black via-finch-warm-black/80 to-transparent z-10"></div>
          <div className="relative z-20 w-full max-w-screen-2xl mx-auto px-8 md:px-24 pb-16">
            <span className="bg-primary text-on-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-label mb-6 inline-block">
              Where Feathers and Friends Meet
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-[-0.02em] leading-none text-white mb-4">
              Your Complete Guide<br />to Finch Care
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              Species profiles, care guides, breeding tips, and habitat design from passionate finch keepers.
            </p>
          </div>
        </section>

        {/* Category Bar — color blocked */}
        <div className="bg-finch-warm-black">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-12 py-6 flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="px-6 py-2 bg-white/10 text-white rounded-full text-sm font-bold font-label hover:bg-primary hover:text-on-primary transition-colors uppercase tracking-wider"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* First 6 Posts — 3x2 grid */}
        <section className="bg-surface">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-12 py-20">
            <h2 className="font-headline text-3xl font-extrabold tracking-[-0.02em] text-on-surface mb-12">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {topPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Banner — full width color block */}
        <section className="bg-gradient-to-r from-primary to-tertiary">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-12 py-20 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="material-symbols-outlined text-5xl text-white/80 mb-4">mail</span>
              <h2 className="font-headline text-4xl font-extrabold text-white tracking-[-0.02em] mb-4">
                The Avian Dispatch
              </h2>
              <p className="text-white/80 text-lg max-w-lg leading-relaxed">
                Weekly field notes, care tips, species spotlights, and community stories delivered to your inbox.
              </p>
            </div>
            <form className="flex-1 w-full max-w-lg flex flex-col sm:flex-row gap-4">
              <input
                className="flex-1 bg-white/20 border-none placeholder:text-white/50 text-white rounded-lg px-6 py-4 focus:ring-2 focus:ring-white transition-all text-lg"
                placeholder="Your email address"
                type="email"
              />
              <button className="bg-finch-warm-black text-white font-bold py-4 px-8 rounded-lg uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-transform whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Second 6 Posts — 3x2 grid on warm surface */}
        <section className="bg-surface-container-low">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-12 py-20">
            <h2 className="font-headline text-3xl font-extrabold tracking-[-0.02em] text-on-surface mb-12">More to Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {bottomPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer categories={categories} />
    </>
  );
}
