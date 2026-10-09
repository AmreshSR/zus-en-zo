import type { Metadata, Viewport } from "next";
import { Poppins, Rubik } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { buildJsonLd } from "@/lib/jsonld";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // The `{Paginanaam} - Zus & Zo` pattern from the live site, enforced by
    // the template for child routes (room/tour detail pages) once they exist.
    // `default` keeps the homepage title intact — templates never apply to
    // the segment that defines them.
    default: "Zus & Zo Suriname - eten, tours en kamers in hartje Paramaribo",
    template: "%s - Zus & Zo",
  },
  description:
    "Grand café, guesthouse en reisbureau in één historisch pand in hartje Paramaribo. Surinaamse, Europese en Caribische keuken, vijf kamers vanaf €15 en ruim 25 tours door heel Suriname.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    siteName: "Zus & Zo Suriname",
    title: "Zus & Zo Suriname",
    description:
      "Eten, tours en kamers onder één dak in hartje Paramaribo. Grand café, guesthouse en reisbureau.",
    type: "website",
    locale: "nl_NL",
    images: [
      {
        url: "/images/building.jpg",
        width: 1800,
        height: 1196,
        alt: "Het historische groene houten huis van Zus & Zo op neuten, met een overdekt terras en gasten aan tafel eronder.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zus & Zo Suriname",
    description:
      "Eten, tours en kamers onder één dak in hartje Paramaribo. Grand café, guesthouse en reisbureau.",
    images: ["/images/building.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf7ef",
};

const jsonLd = buildJsonLd();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${poppins.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:inline-flex focus:h-11 focus:items-center focus:rounded-full focus:bg-orange focus:px-6 focus:text-[0.95rem] focus:font-medium focus:tracking-tight focus:text-orange-ink"
        >
          Naar hoofdinhoud
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
