import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { AppProvider } from "@/contexts/AppContext";
import { RouteProvider } from "@/contexts/RouteProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import AOSProvider from "@/components/AOSProvider";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/Footer";
import LanguageInitializer from "@/components/LanguageInitializer";
import { BASE_URL } from "@/lib/constants";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeAwareToastContainer from "@/components/ThemeAwareToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Neom Holding | شركة نيوم القابضة - Investing in Syria's Future",
    template: "%s | Neom Holding",
  },
  description:
    "A world-class Saudi-Syrian holding company investing in Syria's future through agriculture, industry, infrastructure, tourism, contracting, and international trade with robust governance and ESG standards.",
  keywords: [
    "Neom Holding",
    "Saudi-Syrian investment",
    "Syria reconstruction",
    "holding company",
    "agriculture investment",
    "infrastructure development",
    "tourism investment",
    "ESG standards",
    "corporate governance",
    "sustainable investment",
  ],
  authors: [{ name: "Neom Holding" }],
  creator: "Neom Holding",
  publisher: "Neom Holding",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: BASE_URL,
    siteName: "Neom Holding",
    title: "Neom Holding | شركة نيوم القابضة - Investing in Syria's Future",
    description:
      "A world-class Saudi-Syrian holding company investing in Syria's future through agriculture, industry, infrastructure, tourism, contracting, and international trade.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Neom Holding - Investing in Syria's Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neom Holding | شركة نيوم القابضة",
    description:
      "A world-class Saudi-Syrian holding company investing in Syria's future.",
    images: ["/logo.png"],
    creator: "@neomholding",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": `${BASE_URL}`,
      "ar-SA": `${BASE_URL}`,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Business",
  classification: "Holding Company",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/svg+xml" />
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/aos@next/dist/aos.css"
          media="all"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <ThemeProvider>
            <AppProvider>
              <RouteProvider>
                <AOSProvider>
                  <PerformanceOptimizer />
                  <LanguageInitializer />
                  <ConditionalHeader />
                  {children}
                  <Footer />
                  {/* {process.env.NODE_ENV === "development" && <SEOAudit />} */}
                  <ThemeAwareToastContainer />
                  {/* Scroll to Top Button */}
                  <ScrollToTop />
                </AOSProvider>
              </RouteProvider>
            </AppProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
