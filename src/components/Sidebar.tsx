import Link from "next/link";
import { WPCategory, WPPost, getFeaturedImageUrl, formatDate } from "@/lib/wordpress";

export default function Sidebar({
  categories,
  recentPosts,
}: {
  categories: WPCategory[];
  recentPosts: WPPost[];
}) {
  return (
    <aside className="lg:col-span-4 space-y-16">
      {/* Newsletter */}
      <div className="p-8 bg-primary-container rounded-xl text-on-primary-container editorial-shadow">
        <span className="material-symbols-outlined text-4xl mb-4">mail</span>
        <h3 className="font-headline text-2xl font-extrabold leading-tight mb-4">The Avian Dispatch</h3>
        <p className="font-body text-sm mb-8 opacity-90">
          Get weekly field notes, care tips, and species spotlights delivered straight to your inbox.
        </p>
        <form className="space-y-4">
          <input
            className="w-full bg-white/20 border-none placeholder:text-on-primary-container/50 rounded-lg p-4 focus:ring-2 focus:ring-on-primary-container transition-all"
            placeholder="Your email address"
            type="email"
          />
          <button className="w-full bg-inverse-surface text-inverse-on-surface font-bold py-4 rounded-lg uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-transform">
            Subscribe Now
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-primary">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-xs font-bold hover:bg-surface-container-highest transition-colors"
            >
              {cat.name} ({cat.count})
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="space-y-8">
        <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-primary">Recent Posts</h3>
        {recentPosts.map((post) => {
          const image = getFeaturedImageUrl(post);
          return (
            <Link key={post.id} href={`/${post.slug}`} className="group cursor-pointer block">
              {image && (
                <div className="aspect-video bg-surface-container rounded-xl overflow-hidden mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={post.title.rendered}
                    src={image}
                  />
                </div>
              )}
              <span className="text-xs text-on-surface/50 font-label">{formatDate(post.date)}</span>
              <h4
                className="font-headline text-lg font-bold mt-1 group-hover:text-primary transition-colors"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
