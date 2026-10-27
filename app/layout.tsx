import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactFab from "@/components/contact-actions"
import EventPopup from "@/components/event-popup"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"

const fontMontserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
})

const TITLE = "Siam Siam - Tinh Hoa Ẩm Thực Hoàng Gia Thái"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE.name,
    title: TITLE,
    description: SITE.description,
    images: [{ url: "/images/siam-siam-official-logo.png", alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE.description },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A3A3A",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WPJDBQZD');`,
          }}
        />
        {/* Google tag (gtag.js) - Google Ads */}
        <Script
          id="google-ads-gtag-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18528543458"
        />
        <Script
          id="google-ads-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18528543458');`,
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-brand-cream font-sans antialiased", fontMontserrat.variable)}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPJDBQZD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main id="main" className="flex-grow bg-white">
            {children}
          </main>
          <Footer />
        </div>
        <ContactFab />
        <EventPopup />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
