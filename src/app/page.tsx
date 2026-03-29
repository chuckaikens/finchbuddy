/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <>
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <nav className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto font-headline tracking-tight text-on-surface">
          <div className="text-2xl font-black text-[#1a1c1c] tracking-tighter">FinchBuddy</div>
          <div className="hidden md:flex items-center gap-12">
            <a className="text-[#1a1c1c] opacity-80 hover:opacity-100 hover:text-[#745b00] transition-opacity" href="#">Explore</a>
            <a className="text-[#745b00] font-bold border-b-2 border-[#ffcc00] pb-1" href="#">Species</a>
            <a className="text-[#1a1c1c] opacity-80 hover:opacity-100 hover:text-[#745b00] transition-opacity" href="#">Conservation</a>
            <a className="text-[#1a1c1c] opacity-80 hover:opacity-100 hover:text-[#745b00] transition-opacity" href="#">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-primary p-2">search</button>
            <button className="material-symbols-outlined text-primary p-2">account_circle</button>
          </div>
        </nav>
        <div className="bg-[#eeeeed] h-[1px] w-full"></div>
      </header>

      <main className="pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[716px] flex items-end px-8 md:px-24 pb-20 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[20%] brightness-90"
            alt="close-up portrait of a vibrant zebra finch with orange cheeks and detailed plumage against a soft bokeh forest background"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNrbIfZHYV3zK8t65si16EmPFVmpDA_pka7rNGXIG5s2bw0Y-HgEMqHCZLFSRJSVDHFGmdm_fskS3YN98jQfo_0ehZXD6YCIfeAJ6vOMFYoO9QGk3LJubzphH8oURLOF1UMAKP7DeGq_HjQz3ZdEkW6DbLdtKHvmNBX7c_4lkmGPrHQeEbQZS4Lg_eU9p4eXjpGb905RdI3sr4NWc_vz41YY28zTXeZizhbSucaRLTFBnHG3Ne8nAl3M5-KGPkOaol7fbx3ETtp2E"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"></div>
          <div className="relative z-20 max-w-4xl">
            <div className="flex gap-2 mb-6">
              <span className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label">Species Spotlight</span>
              <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-label">5 min read</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none text-on-surface mb-8">The Radiant Soul of the Zebra Finch</h1>
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-full border-2 border-primary-container object-cover"
                alt="professional headshot of a woman ornithologist with a warm smile in natural outdoor lighting"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOimdoLBAIqXq8KjpUFkKPBGpnM9pWGO1WK3wAmd4AxVa_kpvuSGarjsE8iFlAIbP3C11QtQEOqQBPfZb8wrFxslSoxEFeXREA3tEtNLvG3EDbFv4ykRFk7MN4tlChLp9mmacmmoJZr8SZdcBdzSaN-K1tdHONtYi24SzjiAgsaXOGC9h-E6x290oU-6J5HWBxC4bMonrqaYzXbzqzhEZz5K1fxwxCAQLUM9NZrrZ9Q8m03Ho8-Y8hH3K33j6biSBrSz-o4BHJwao"
              />
              <div className="font-label">
                <p className="font-bold text-on-surface">Dr. Elena Thorne</p>
                <p className="text-sm opacity-70 italic">November 14, 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="max-w-screen-2xl mx-auto px-8 md:px-12 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Main Content */}
          <article className="lg:col-span-8 space-y-12">
            <div className="prose prose-lg max-w-none text-on-surface/90 leading-relaxed font-body">
              <p className="text-2xl font-medium leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:mr-4 first-letter:float-left mb-12">
                Beyond the dense canopies and hidden thickets of the Australian outback lies a small, energetic spirit that has captivated ornithologists for centuries. The Zebra Finch (Taeniopygia guttata) is more than just a common cage bird; it is a masterclass in adaptation and vocal complexity.
              </p>

              <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mt-16 mb-8">The Chromatic Language</h2>
              <p className="mb-8">
                The plumage of the Zebra Finch is a biological tapestry. From the stark black-and-white striping on the tail to the vibrant, solar-orange cheek patches of the males, every mark serves a purpose. These aren&apos;t just aesthetic flourishes; they are visual signals tuned to the high-contrast light of their native scrublands.
              </p>

              <div className="my-16 p-12 bg-surface-container-low rounded-xl relative border-l-8 border-primary-container">
                <span className="material-symbols-outlined absolute top-4 left-4 text-primary-container text-5xl opacity-40">format_quote</span>
                <blockquote className="text-3xl font-headline font-bold text-on-surface italic leading-snug">
                  &ldquo;The finch doesn&apos;t just sing to the dawn; it paints the silence with a complexity that rivals the most sophisticated human compositions.&rdquo;
                </blockquote>
                <cite className="block mt-6 font-label font-bold text-primary">— Field Journal, 2023</cite>
              </div>

              <h3 className="font-headline text-2xl font-bold text-on-surface mb-6">Social Architecture</h3>
              <p className="mb-8">
                Observation shows that finches thrive in a &ldquo;collective intelligence&rdquo; model. Their nesting habits reveal an intricate understanding of thermal regulation and predator evasion. They utilize organic precision to construct spherical nests using dry grasses and feathers, often nesting in tight-knit colonies that function as a single defensive organism.
              </p>

              <div className="grid grid-cols-2 gap-8 my-16">
                <div className="aspect-[4/5] bg-surface-container rounded-xl overflow-hidden editorial-shadow">
                  <img
                    className="w-full h-full object-cover"
                    alt="close up of a bird nest woven with golden straw and soft white feathers in a desert bush"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4HBNH3MjgCIE87V0SlVTmoF8ugPl0m5D00SHVObsBfonx0hAFKMC2rCdfG2ZzT_wDHiNO02Z_OmfGLEPzDUERrCkWRZ7cYEGCguqPorzokU5y3iQfLK3aptguV4i79TEC_-BAAgoHMaTcL9aJvUx_HiMlqjGBpMPf8M0kf7eveEQO4nBeYtt7BJAYeGwMcPJ4VX5QoUCojdp5kEw6VDAjpTsQcmo1VcblnrKMqEgAU8LZt8cxpRO0-D051Eod9vMeUqaWJWhUqow"
                  />
                </div>
                <div className="aspect-[4/5] bg-surface-container rounded-xl overflow-hidden editorial-shadow translate-y-12">
                  <img
                    className="w-full h-full object-cover"
                    alt="a pair of finches perched on a weathered wooden branch against a blue sky"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWEUyIFYhD0zTHDMA3rijBCbPvCzgCtq1RWrd-frNIH5YnpBEMAoStrlTydqK9bH96W5Bd_DNh-SW5jq5MPkeu96DWR_2riVKRKqXg0s0bIZwlYUa3s-AqT8a5z_knAuML_e3he8tBUzGuLQh0cicGCA6SAdkEfnwEEBXTVLL87HPtAVa7EedIkroDwgVfjRNqfQLcEAZId6YLsfOd5_vxvOEJKdMB9mUlCHSlKmota313MpZL9xW5lfkeMFZaKRzsb86Vp05EQz4"
                  />
                </div>
              </div>

              <p className="mt-20">
                As we move into an era where biodiversity is increasingly fragile, understanding the resilient nature of species like the Zebra Finch becomes paramount. Their ability to adapt to changing temperatures and urban encroachment provides a blueprint for conservation efforts globally.
              </p>
            </div>

            {/* Author Bio Section */}
            <section className="mt-24 p-12 bg-surface-container-lowest rounded-xl editorial-shadow flex flex-col md:flex-row gap-10 items-center">
              <img
                className="w-32 h-32 rounded-full object-cover ring-4 ring-primary-container/20"
                alt="professional portrait of Elena Thorne"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5DW0OuflupfU_vMfMzhVsG-sErfInqKP7jerA8cZ06o1X5B5oNFR2fUwCd9tgBLUfYXfwxFZQ1p7CL9ZNmZZDH1olXtRkmXjEH5xSpaRF1DfaoHyqEPa_sg4f22MlUumDvIECGd9W3G9CByS9U_HkAnEREfIOyyoEWu2j4H2m4qR8r1MwJtC2IHoJImTI9cQO2jQQcT9teYmo_ORb8sC3uYBwqU4oOxYF_E3etLm__3kwAOYS1niiuGidXwHFNhLmFXNPtKDD22M"
              />
              <div>
                <h4 className="font-headline text-xl font-bold mb-2">About Dr. Elena Thorne</h4>
                <p className="text-on-surface/70 leading-relaxed mb-6">
                  Elena is a senior researcher at the FinchBuddy Institute, specializing in the bio-acoustics of Australian passerines. She has spent over a decade documenting the migratory patterns and vocal evolution of wild finch populations.
                </p>
                <div className="flex gap-4">
                  <button className="text-primary font-bold font-label hover:underline">Follow Elena</button>
                  <button className="text-primary font-bold font-label hover:underline">View Publications</button>
                </div>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-16">
            {/* Newsletter */}
            <div className="p-8 bg-primary-container rounded-xl text-on-primary-container editorial-shadow">
              <span className="material-symbols-outlined text-4xl mb-4">mail</span>
              <h3 className="font-headline text-2xl font-extrabold leading-tight mb-4">The Avian Dispatch</h3>
              <p className="font-body text-sm mb-8 opacity-90">Get weekly field notes, conservation tips, and high-res photography delivered straight to your inbox.</p>
              <form className="space-y-4">
                <input
                  className="w-full bg-white/20 border-none placeholder:text-on-primary-container/50 rounded-lg p-4 focus:ring-2 focus:ring-on-primary-container transition-all"
                  placeholder="Your email address"
                  type="email"
                />
                <button className="w-full bg-inverse-surface text-inverse-on-surface font-bold py-4 rounded-lg uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-transform">
                  Subscribe Now
                </button>
              </form>
            </div>

            {/* Related Posts */}
            <div className="space-y-8">
              <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-primary">Related Reading</h3>
              <div className="group cursor-pointer">
                <div className="aspect-video bg-surface-container rounded-xl overflow-hidden mb-4">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="a small colorful bird perched on a branch during golden hour"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhKio3f56sR4a6CHwVaTs60KRb3706HKtXHJI83775dkfsGIee_eP0j--MELEz9quLf5dWcygJTimH7Gj094mCctdrWF9aHIMrhMXgm1nvwWP4Gh1FL30vazHf_tuX60LXpebD1EGmeUTuZfMNgnyUoKE3FuWNz4QhXD1wWIqErT7RpqhjXD79Tsv-IQFyOPZJz15mnynAwMIKAvVT86LZ8X2s1Pdtbn3izgPp34I5n9zuXSs37DAaqJ7KUwL6uq2n5EQplEbx5J4"
                  />
                </div>
                <span className="text-xs font-bold font-label text-primary uppercase">Conservation</span>
                <h4 className="font-headline text-lg font-bold mt-2 group-hover:text-primary transition-colors">Vanishing Scrublands: The Habitat Crisis</h4>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-video bg-surface-container rounded-xl overflow-hidden mb-4">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="a person holding binoculars looking out over a misty valley"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATx_WpOsNUDNX7hqk79sSKvBTp2A1jrVNA6fOMtn9bymjeWiCL9EC-rYfAuGUFD47f85S_D7RnRvpNA1EZ9XGNdXDa7J_iRM6PJBlx3aULA22jMK7q7UP2QVStaWos8bE84YCOAV4FcoW1Ize_Kp6wcRDYY8096sBbm9XdEl4BBzzr4zGr8l8BC4Nx3j3s3gaFf_zLSDpcHq8tKSETdSglVymFULvCujjiYU8ped8nz4rvo4GGAxHG8QLpZdNRR6j2m3qVVGslQKE"
                  />
                </div>
                <span className="text-xs font-bold font-label text-primary uppercase">Field Guides</span>
                <h4 className="font-headline text-lg font-bold mt-2 group-hover:text-primary transition-colors">Binoculars vs. Camera: A Birder&apos;s Dilemma</h4>
              </div>
            </div>

            {/* Topics */}
            <div className="space-y-6">
              <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-primary">Topics</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-inverse-surface text-inverse-on-surface rounded-full text-xs font-bold">Ornithology</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-xs font-bold hover:bg-surface-container-highest transition-colors">Evolution</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-xs font-bold hover:bg-surface-container-highest transition-colors">Australia</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-xs font-bold hover:bg-surface-container-highest transition-colors">Behavior</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-xs font-bold hover:bg-surface-container-highest transition-colors">Acoustics</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#eeeeed] mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-16 max-w-screen-2xl mx-auto gap-8 font-body text-sm uppercase tracking-widest">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-headline font-bold text-lg text-[#1a1c1c] uppercase">FinchBuddy</div>
            <p className="text-stone-500 normal-case tracking-normal">&copy; 2024 FinchBuddy. Organic Precision in Ornithology.</p>
          </div>
          <div className="flex gap-12 text-[#1a1c1c]">
            <a className="text-stone-500 hover:text-[#1a1c1c] transition-colors focus:underline decoration-[#ffcc00] decoration-2" href="#">Newsletter</a>
            <a className="text-stone-500 hover:text-[#1a1c1c] transition-colors focus:underline decoration-[#ffcc00] decoration-2" href="#">Instagram</a>
            <a className="text-stone-500 hover:text-[#1a1c1c] transition-colors focus:underline decoration-[#ffcc00] decoration-2" href="#">YouTube</a>
            <a className="text-stone-500 hover:text-[#1a1c1c] transition-colors focus:underline decoration-[#ffcc00] decoration-2" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
