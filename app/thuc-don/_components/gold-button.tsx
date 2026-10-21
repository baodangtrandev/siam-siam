import Link from "next/link"
import type React from "react"
import { cn } from "@/lib/utils"

const BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-brand-gold/70 bg-white/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-brand-cream shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-colors duration-300 hover:border-brand-gold hover:bg-brand-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"

/** Tia sáng lướt qua nút khi hover. */
function Shimmer() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/45 to-transparent group-hover:animate-shimmer motion-reduce:hidden"
    />
  )
}

type GoldButtonProps = { children: React.ReactNode; className?: string } & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">)
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">)
)

/** Nút glassmorphism viền vàng kim; render thành Link khi có href. */
export default function GoldButton({ children, className = "", ...props }: GoldButtonProps) {
  const content = (
    <>
      <Shimmer />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  )

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props
    const isInternal = href.startsWith("/")
    return isInternal ? (
      <Link href={href} className={cn(BASE, className)} {...anchorProps}>
        {content}
      </Link>
    ) : (
      <a href={href} className={cn(BASE, className)} {...anchorProps}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={cn(BASE, className)} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
