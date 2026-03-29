import Link from "next/link";
import { WPCategory } from "@/lib/wordpress";

export default function Header({ categories }: { categories: WPCategory[] }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <nav className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto font-headline tracking-tight text-on-surface">
        <Link href="/" className="text-2xl font-extrabold text-on-surface tracking-[-0.02em]">
          FinchBuddy
        </Link>
        <div className="hidden md:flex items-center gap-12">
          <Link className="text-on-surface opacity-80 hover:opacity-100 hover:text-primary transition-opacity" href="/">
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              className="text-on-surface opacity-80 hover:opacity-100 hover:text-primary transition-opacity capitalize"
              href={`/${cat.slug}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-primary p-2">search</button>
          <button className="material-symbols-outlined text-primary p-2">account_circle</button>
        </div>
      </nav>
      {/* No-Line Rule: tonal shift instead of 1px border */}
      <div className="bg-surface-container-low h-[2px] w-full"></div>
    </header>
  );
}
