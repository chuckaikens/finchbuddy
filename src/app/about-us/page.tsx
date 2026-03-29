import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about FinchBuddy — a passionate community of bird lovers helping finch owners build happy, healthy homes for their birds.",
  alternates: { canonical: "https://finchbuddy.com/about-us" },
};

export default async function AboutPage() {
  const categories = await getCategories();

  return (
    <>
      <Header categories={categories} />
      <main className="pt-[120px] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-24 mt-16">
          <h1 className="font-headline text-5xl font-black tracking-tighter leading-none text-on-surface mb-12">
            About Us
          </h1>
          <div className="prose prose-lg max-w-3xl text-on-surface/90 leading-relaxed font-body [&_h3]:font-headline [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-on-surface [&_h3]:mt-12 [&_h3]:mb-4 [&_p]:mb-6 [&_li]:mb-2">
            <p>
              Whether you&rsquo;re just starting out with your first zebra finch or you&rsquo;ve got a thriving aviary of colorfully chirping companions, you&rsquo;ve found your flock.
            </p>
            <p>
              We&rsquo;re a passionate community of bird lovers, finch keepers, and curious learners who believe that these tiny birds have a <em>big</em> impact on our lives. Their songs brighten our mornings, their personalities make us smile, and their delicate needs deserve respectful, informed care.
            </p>

            <h3>Our Mission</h3>
            <p>
              At FinchBuddy, our mission is simple: to help finch owners build happy, healthy, and thriving homes for their birds.<br />
              We don&rsquo;t just share information, we share connection. One bird lover to another.
            </p>

            <h3>What We Do</h3>
            <p>We bring you:</p>
            <ul>
              <li><strong>Expert Care Guides</strong> &ndash; from feeding and health to behavior and breeding</li>
              <li><strong>DIY Habitat Ideas</strong> &ndash; creative setups that enrich your finch&rsquo;s life</li>
              <li><strong>Species Profiles</strong> &ndash; to help you understand each kind of finch better</li>
              <li><strong>Community Support</strong> &ndash; because we&rsquo;re all learning and growing together</li>
            </ul>
            <p>
              Whether you&rsquo;re trying to figure out why your finch stopped singing, how to introduce new birds, or what food makes them happiest, we&rsquo;ve been there and we&rsquo;re here to help.
            </p>
          </div>
        </div>
      </main>
      <Footer categories={categories} />
    </>
  );
}
