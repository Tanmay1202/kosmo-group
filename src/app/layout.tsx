import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { KosmoGroupBar } from "@/components/common/KosmoGroupBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG, getTataUrl, getHeroUrl } from "@/config";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (SITE_CONFIG.domain && !SITE_CONFIG.domain.includes("<")
    ? `https://${SITE_CONFIG.domain}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: {
    default: "Kosmo Group | Punjab's Premier Automotive Dealership Network",
    template: "%s | Kosmo Group",
  },
  description:
    "Official corporate portal of Kosmo Group. Connecting customers across Punjab with authorized Tata Motors passenger cars, Hero MotoCorp two-wheelers, certified workshop service, and transparent financing.",
  keywords: [
    "Kosmo Group",
    "Kosmo Tata",
    "Kosmo Hero",
    "Punjab Dealerships",
    "Jalandhar cars",
    "Tata Motors Jalandhar",
    "Hero MotoCorp Jalandhar",
    "automotive network Punjab",
  ],
  metadataBase: new URL(siteBaseUrl),
  openGraph: {
    title: "Kosmo Group | Punjab's Premier Automotive Dealership Network",
    description:
      "Explore Punjab's leading dealership family: Kosmo Tata passenger cars and Kosmo Hero two-wheelers with certified multi-branch service facilities.",
    siteName: "Kosmo Group",
    locale: "en_IN",
    type: "website",
    url: siteBaseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kosmo Group | Punjab's Premier Automotive Dealership Network",
    description:
      "Explore Punjab's leading dealership family: Kosmo Tata passenger cars and Kosmo Hero two-wheelers with certified multi-branch service facilities.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0c10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <JsonLd />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[#0a0c10] text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
        {/* Skip to Main Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-neutral-950 focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Global Group Top Bar */}
        <KosmoGroupBar currentSite="hub" tataUrl={getTataUrl()} heroUrl={getHeroUrl()} />

        {/* Sticky Hub Header */}
        <Header />

        {/* Main Routed Content */}
        <main id="main-content" className="flex-grow">
          {children}
        </main>

        {/* Hub Footer */}
        <Footer />
      </body>
    </html>
  );
}
