"use client"

import { Phone } from "lucide-react"
import { usePathname } from "next/navigation"
import { SITE } from "@/lib/site"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export type ContactChannel = "zalo" | "hotline"

/** Đẩy sự kiện vào dataLayer để GTM / Google Ads đo được lượt bấm CTA. */
export function trackContactClick(channel: ContactChannel, placement: string) {
  window.dataLayer?.push({ event: "contact_cta_click", contact_channel: channel, cta_placement: placement })
}

/** Biểu tượng Zalo: bong bóng chat trắng với chữ "Zalo". */
export function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M24 6C13 6 4.5 13.4 4.5 22.6c0 5.2 2.7 9.8 7 12.9-.3 2.4-1.4 4.6-3.2 6.3 3.6.2 6.9-1 9.4-3 2 .5 4.1.8 6.3.8 11 0 19.5-7.4 19.5-17S35 6 24 6Z"
        fill="#fff"
      />
      <text
        x="24"
        y="27.5"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="11.5"
        fontWeight="700"
        fill="#0068FF"
      >
        Zalo
      </text>
    </svg>
  )
}

const LABEL =
  "pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-brand-gold/50 bg-brand-green/90 px-4 py-2 text-sm font-semibold text-brand-cream opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 lg:block lg:translate-x-2 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-x-0 lg:group-focus-visible:opacity-100"

/**
 * Nút liên hệ nổi xếp dọc ở góc phải dưới (Zalo OA + Hotline) trên mọi trang.
 * Trang /menu dưới 1024px có thanh điều khiển cố định ở đáy (cao 3.375rem), nên cụm nút được
 * nâng lên nằm ngay phía trên thanh đó.
 */
export default function ContactFab() {
  const pathname = usePathname()
  const aboveMenuBar = pathname === "/menu"

  return (
    <div
      className={`fixed right-4 z-40 flex flex-col items-end gap-3 md:right-6 md:gap-4 lg:bottom-8 lg:right-8 ${
        aboveMenuBar
          ? "bottom-[calc(3.375rem+max(0.375rem,env(safe-area-inset-bottom))+0.75rem)]"
          : "bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))]"
      } animate-in fade-in slide-in-from-bottom-4 duration-700`}
    >
      <a
        href={SITE.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat với Siam Siam qua Zalo OA"
        onClick={() => trackContactClick("zalo", "floating")}
        className="group relative grid size-[3.25rem] place-items-center rounded-full bg-[#0068FF] shadow-[0_8px_24px_-6px_rgba(0,104,255,0.6)] ring-2 ring-brand-gold/70 ring-offset-2 ring-offset-brand-green/40 transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 md:size-14"
      >
        {/* Cùng hiệu ứng với Hotline, lệch nhịp 2s để hai nút thay phiên nhau thu hút chú ý */}
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-cta-pulse rounded-full bg-[#0068FF] [animation-delay:1s] motion-reduce:hidden"
        />
        <ZaloIcon className="relative size-9 animate-phone-wiggle [animation-delay:2s] motion-reduce:animate-none md:size-10" />
        <span className={LABEL}>Chat Zalo OA</span>
      </a>

      <a
        href={SITE.phoneHref}
        aria-label={`Gọi hotline đặt bàn ${SITE.phoneDisplay}`}
        onClick={() => trackContactClick("hotline", "floating")}
        className="group relative grid size-[3.25rem] place-items-center rounded-full bg-brand-gold text-brand-green shadow-[0_8px_24px_-6px_rgba(176,141,87,0.75)] ring-2 ring-brand-cream/70 ring-offset-2 ring-offset-brand-green/40 transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 md:size-14"
      >
        {/* Vòng sáng lan toả thu hút sự chú ý */}
        <span aria-hidden="true" className="absolute inset-0 animate-cta-pulse rounded-full bg-brand-gold motion-reduce:hidden" />
        <Phone className="relative size-6 animate-phone-wiggle fill-brand-green/20 motion-reduce:animate-none" strokeWidth={2.2} />
        <span className={LABEL}>
          Đặt bàn: <span className="text-brand-gold">{SITE.phoneDisplay}</span>
        </span>
      </a>
    </div>
  )
}
