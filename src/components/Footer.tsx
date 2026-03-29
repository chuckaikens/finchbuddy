import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-16 max-w-screen-2xl mx-auto gap-8 font-body text-sm uppercase tracking-widest">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="font-headline font-extrabold text-lg text-on-surface uppercase tracking-[-0.02em]">
            FinchBuddy
          </Link>
          <p className="text-on-surface-variant normal-case tracking-normal">
            &copy; {new Date().getFullYear()} FinchBuddy. Where Feathers and Friends Meet.
          </p>
        </div>
        <div className="flex gap-12">
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/about-us">About</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/contact-us">Contact</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/privacy-policy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
