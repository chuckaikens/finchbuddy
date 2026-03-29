import Link from "next/link";
import { Category } from "@/lib/airtable";

export default function Header({ categories }: { categories: Category[] }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Logo Row — solid white */}
      <div className="bg-white flex justify-center py-4 max-w-screen-2xl mx-auto px-8 w-full">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="FinchBuddy" className="h-14 w-auto" />
        </Link>
      </div>
      {/* Nav Row — color blocked */}
      <nav className="bg-finch-warm-black">
        <div className="flex justify-center items-center gap-10 max-w-screen-2xl mx-auto px-8 py-3 font-headline text-sm font-semibold tracking-wide uppercase">
          <Link className="text-white/80 hover:text-primary transition-colors" href="/">
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              className="text-white/80 hover:text-primary transition-colors capitalize"
              href={`/${cat.slug}`}
            >
              {cat.name}
            </Link>
          ))}
          <Link className="text-white/80 hover:text-primary transition-colors" href="/about-us">
            About
          </Link>
          <Link className="text-white/80 hover:text-primary transition-colors" href="/contact-us">
            Contact
          </Link>
        </div>
      </nav>
      {/* Vivid accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
    </header>
  );
}
