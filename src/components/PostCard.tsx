import Link from "next/link";
import {
  WPPost,
  getFeaturedImageUrl,
  getCategoryNames,
  formatDate,
  estimateReadTime,
  stripHtml,
} from "@/lib/wordpress";

export default function PostCard({ post }: { post: WPPost }) {
  const image = getFeaturedImageUrl(post);
  const cats = getCategoryNames(post);
  const readTime = estimateReadTime(post.content.rendered);

  return (
    <Link href={`/${post.slug}`} className="group cursor-pointer block">
      {image && (
        <div className="aspect-video bg-surface-container rounded-xl overflow-hidden mb-4 editorial-shadow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={post.title.rendered}
            src={image}
          />
        </div>
      )}
      <div className="flex gap-2 mb-2">
        {cats.map((cat) => (
          <span key={cat.slug} className="text-xs font-bold font-label text-primary uppercase">
            {cat.name}
          </span>
        ))}
        <span className="text-xs font-label text-on-surface/50">{readTime} min read</span>
      </div>
      <h3
        className="font-headline text-xl font-bold group-hover:text-primary transition-colors mb-2"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <p className="text-on-surface/70 text-sm leading-relaxed line-clamp-3">
        {stripHtml(post.excerpt.rendered)}
      </p>
      <span className="text-xs text-on-surface/50 font-label mt-2 block">{formatDate(post.date)}</span>
    </Link>
  );
}
