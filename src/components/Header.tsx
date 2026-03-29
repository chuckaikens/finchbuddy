"use client";

import { useState } from "react";
import Link from "next/link";
import { Category } from "@/lib/airtable";

export default function Header({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    ...categories.map((cat) => ({ href: `/${cat.slug}`, label: cat.name })),
    { href: "/about-us", label: "About" },
    { href: "/contact-us", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Logo Row — solid white */}
      <div className="bg-white flex justify-between items-center py-4 px-6 md:px-8 md:justify-center">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="FinchBuddy" className="h-10 md:h-14 w-auto" />
        </Link>
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden text-on-surface p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Desktop Nav — hidden on mobile */}
      <nav className="hidden md:block bg-finch-warm-black">
        <div className="flex justify-center items-center gap-10 max-w-screen-2xl mx-auto px-8 py-3 font-headline text-sm font-semibold tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-white/80 hover:text-primary transition-colors capitalize"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Nav — slides open */}
      {menuOpen && (
        <nav className="md:hidden bg-finch-warm-black">
          <div className="flex flex-col px-6 py-4 gap-1 font-headline text-sm font-semibold tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="text-white/80 hover:text-primary transition-colors capitalize py-3 border-b border-white/10 last:border-none"
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Vivid accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
    </header>
  );
}
