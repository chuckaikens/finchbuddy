import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#eeeeed] mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-16 max-w-screen-2xl mx-auto gap-8 font-body text-sm uppercase tracking-widest">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="font-headline font-bold text-lg text-[#1a1c1c] uppercase">
            FinchBuddy
          </Link>
          <p className="text-stone-500 normal-case tracking-normal">
            &copy; {new Date().getFullYear()} FinchBuddy. Where Feathers and Friends Meet.
          </p>
        </div>
        <div className="flex gap-12 text-[#1a1c1c]">
          <Link className="text-stone-500 hover:text-[#1a1c1c] transition-colors" href="/about-us">About</Link>
          <Link className="text-stone-500 hover:text-[#1a1c1c] transition-colors" href="/contact-us">Contact</Link>
          <Link className="text-stone-500 hover:text-[#1a1c1c] transition-colors" href="/privacy-policy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
