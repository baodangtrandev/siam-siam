"use client"

import { motion } from "framer-motion"
import { Phone, X } from "lucide-react"
import { useEffect, useRef } from "react"
import { SITE } from "@/lib/site"
import type { MenuStory } from "../menu-pages"
import GoldButton from "./gold-button"
import { useMediaQuery } from "./use-parallax"

/** Câu chuyện món ăn: trượt từ phải trên desktop, từ dưới lên trên mobile. */
export default function MenuStorySheet({ story, onClose }: { story: MenuStory; onClose: () => void }) {
  const isWide = useMediaQuery("(min-width: 768px)")
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose()
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      previousFocus?.focus()
    }
  }, [onClose])

  const hidden = isWide ? { x: "100%" } : { y: "100%" }

  return (
    <motion.div className="fixed inset-0 z-[60]" initial="hidden" animate="shown" exit="hidden">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        onClick={onClose}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-story-title"
        className="absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto rounded-t-3xl border-t border-brand-gold/40 bg-brand-green bg-brand-pattern p-6 text-brand-cream shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[28rem] md:rounded-none md:border-l md:border-t-0 md:p-10"
        variants={{ hidden, shown: { x: 0, y: 0 } }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-brand-cream/30 md:hidden" aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-brand-gold/40 transition hover:bg-brand-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <X className="size-5" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Câu chuyện món ăn</p>
        <h2 id="menu-story-title" className="mt-3 text-3xl font-bold text-white">
          {story.title}
        </h2>
        <p className="mt-1 italic text-brand-cream/70">{story.englishTitle}</p>
        <p className="mt-4 text-2xl font-semibold text-brand-gold">{story.price} VNĐ</p>

        <div className="my-6 h-px bg-gradient-to-r from-brand-gold/60 via-brand-gold/20 to-transparent" />

        <div className="space-y-4 text-sm leading-relaxed text-brand-cream/85 md:text-base">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <GoldButton href={SITE.phoneHref} className="mt-8 w-full bg-brand-gold/90 text-brand-green hover:bg-brand-gold hover:text-brand-green">
          <Phone className="size-4" />
          Đặt bàn thưởng thức
        </GoldButton>
      </motion.aside>
    </motion.div>
  )
}
