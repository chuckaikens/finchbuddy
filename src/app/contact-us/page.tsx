import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with FinchBuddy. We'd love to hear from you.",
  alternates: { canonical: "https://finchbuddy.com/contact-us" },
};

export default async function ContactPage() {
  const categories = await getCategories();

  return (
    <>
      <Header categories={categories} />
      <main className="pt-[70px] md:pt-[120px] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-24 mt-16">
          <h1 className="font-headline text-5xl font-black tracking-tighter leading-none text-on-surface mb-12">
            Contact Us
          </h1>
          <div className="max-w-xl">
            <p className="text-on-surface/70 leading-relaxed mb-10">
              Have a question about finch care? Want to share your story? We&rsquo;d love to hear from you.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block font-label font-semibold text-on-surface mb-2" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  className="w-full bg-surface-container-highest rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none border-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-label font-semibold text-on-surface mb-2" htmlFor="email">
                  Email <span className="text-tertiary">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full bg-surface-container-highest rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none border-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block font-label font-semibold text-on-surface mb-2" htmlFor="message">
                  Message <span className="text-tertiary">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full bg-surface-container-highest rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none border-none resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-on-primary font-bold py-3 px-8 rounded-full uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-transform"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer categories={categories} />
    </>
  );
}
