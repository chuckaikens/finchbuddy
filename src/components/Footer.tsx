import Link from "next/link";
import { Category } from "@/lib/airtable";

export default function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer>
      {/* Accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-secondary via-tertiary to-primary"></div>

      {/* Main footer — dark color block */}
      <div className="bg-finch-warm-black text-white">
        <div className="max-w-screen-2xl mx-auto px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="FinchBuddy" className="h-12 w-auto brightness-200 mb-6" />
              <p className="text-white/60 leading-relaxed max-w-md">
                Your comprehensive guide to finch care, species, breeding, and habitat design. Where Feathers and Friends Meet.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-headline font-bold text-primary uppercase tracking-widest text-sm mb-6">Explore</h4>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="text-white/60 hover:text-primary transition-colors capitalize"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-headline font-bold text-primary uppercase tracking-widest text-sm mb-6">Info</h4>
              <div className="flex flex-col gap-3">
                <Link className="text-white/60 hover:text-primary transition-colors" href="/about-us">About Us</Link>
                <Link className="text-white/60 hover:text-primary transition-colors" href="/contact-us">Contact</Link>
                <Link className="text-white/60 hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-finch-dark py-4 px-12">
        <p className="text-white/40 text-center text-sm">
          &copy; {new Date().getFullYear()} FinchBuddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
