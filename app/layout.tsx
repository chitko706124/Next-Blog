import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Script from "next/script";
import GoogleAds from "@/components/ui/GoogleAds";
import AdBanner from "@/components/ui/AdBanner";

const SupabaseProvider = dynamic(() => import("./supabase-provider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knowledge Sharing",
  description: "We share knowledge and information to people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          onLoad={() => {
            try {
              //@ts-ignore
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
              console.error("AdSense failed to load", e);
            }
          }}
          data-ad-client="ca-pub-5952419186869307"
        />
      </head> */}
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-5952419186869307"
        ></meta>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5952419186869307"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SupabaseProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-background">{children}</main>
            {/* <GoogleAds /> */}
            <AdBanner
              data-ad-slot="4396157574"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <Footer />
          </div>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
