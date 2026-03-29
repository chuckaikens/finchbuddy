import Link from "next/link";
import { Post, formatDate, estimateReadTime } from "@/lib/airtable";

export default function PostCard({ post }: { post: Post }) {
  const readTime = estimateReadTime(post.wordCount);

  return (
    <Link href={`/${post.slug}`} className="group cursor-pointer block">
      {post.image && (
        <div className="aspect-video bg-surface-container rounded-xl overflow-hidden mb-4 editorial-shadow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={post.title}
            src={post.image}
          />
        </div>
      )}
      <div className="flex gap-2 mb-2">
        <span className="text-xs font-bold font-label text-primary uppercase">
          {post.category}
        </span>
        <span className="text-xs font-label text-on-surface/50">{readTime} min read</span>
      </div>
      <h3 className="font-headline text-xl font-bold group-hover:text-primary transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-on-surface/70 text-sm leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>
      <span className="text-xs text-on-surface/50 font-label mt-2 block">{formatDate(post.date)}</span>
    </Link>
  );
}
