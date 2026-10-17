import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <body className={cn("min-h-screen bg-brand-cream font-sans antialiased", fontMontserrat.variable)}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main id="main" className="flex-grow bg-white">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
