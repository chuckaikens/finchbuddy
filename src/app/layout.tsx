import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://finchbuddy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FinchBuddy — Where Feathers and Friends Meet",
    template: "%s | FinchBuddy",
  },
  description:
    "Your comprehensive guide to finch care, species profiles, breeding tips, and habitat design. Expert advice from passionate finch keepers.",
  openGraph: {
    type: "website",
    siteName: "FinchBuddy",
    locale: "en_US",
    url: SITE_URL,
    title: "FinchBuddy — Where Feathers and Friends Meet",
    description:
      "Your comprehensive guide to finch care, species profiles, breeding tips, and habitat design.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "FinchBuddy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinchBuddy — Where Feathers and Friends Meet",
    description:
      "Your comprehensive guide to finch care, species profiles, breeding tips, and habitat design.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FinchBuddy",
    url: SITE_URL,
    description:
      "Your comprehensive guide to finch care, species profiles, breeding tips, and habitat design.",
    publisher: {
      "@type": "Organization",
      name: "FinchBuddy",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <html lang="en" className={`light ${plusJakarta.variable} ${beVietnam.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
