"use client"

import { AnimatePresence, motion, useTransform } from "framer-motion"
import { BookOpen, ChevronDown, ChevronsDown, ChevronUp, Expand } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { MENU_PAGE_COUNT, MENU_PAGE_RATIO, chapterOfPage, menuHotspots, menuStories } from "../menu-pages"
import AmbientBackdrop from "./ambient-backdrop"
import MenuPage from "./menu-page"
import { useParallax } from "./use-parallax"

/** Khoảng bị che phía trên (navbar 5rem + thanh chương) và phía dưới (thanh điều khiển). */
const TOP_OFFSET = "8.25rem"
const BOTTOM_BAR = "4.75rem"
/** Mỗi trang chiếm đúng phần màn hình còn lại để một lần vuốt = một trang. */
const SLIDE_HEIGHT = `calc(100svh - ${TOP_OFFSET} - ${BOTTOM_BAR})`
const PAGE_HEIGHT = `min(calc(100% - 1.5rem), calc((100vw - 2rem) / ${MENU_PAGE_RATIO}))`
const PAGE_SIZES = "(min-width: 640px) 80vw, 94vw"

export const pageSlideId = (page: number) => `menu-page-${page}`

interface VerticalReaderProps {
  page: number
  reduceMotion: boolean
  /** Gọi khi người dùng cuộn tới một trang khác. */
  onVisiblePageChange: (page: number) => void
  onNavigate: (page: number) => void
  onOpen: (page: number) => void
  onOpenStory: (page: number) => void
}

/**
 * Chế độ đọc dọc cho mobile / tablet: các trang xếp chồng theo chiều dọc với scroll-snap
 * của trình duyệt, vuốt lên / xuống để chuyển trang với quán tính tự nhiên.
 */
export default function VerticalReader({
  page,
  reduceMotion,
  onVisiblePageChange,
  onNavigate,
  onOpen,
  onOpenStory,
}: VerticalReaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  // Nghiêng nhẹ trang đang xem theo con quay hồi chuyển (Android).
  const parallax = useParallax(rootRef, !reduceMotion)
  const rotateX = useTransform(parallax.y, (v) => v * -4)
  const rotateY = useTransform(parallax.x, (v) => v * 6)

  // Bật scroll-snap cho cả trang chỉ khi chế độ đọc dọc đang hiển thị.
  useEffect(() => {
    const html = document.documentElement
    const previous = html.style.scrollSnapType
    html.style.scrollSnapType = "y proximity"
    return () => {
      html.style.scrollSnapType = previous
    }
  }, [])

  // Xác định trang đang nằm giữa màn hình.
  useEffect(() => {
    const slides = listRef.current?.querySelectorAll<HTMLElement>("[data-page]")
    if (!slides) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onVisiblePageChange(Number((entry.target as HTMLElement).dataset.page))
        }
      },
      { threshold: 0.6 },
    )
    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [onVisiblePageChange])

  // Chỉ hiện thanh điều khiển dưới cùng khi danh sách trang đang trong màn hình.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "-30% 0px -30% 0px",
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  const chapter = chapterOfPage(page)
  const story = menuStories[page]

  return (
    <div ref={rootRef} className="relative lg:hidden">
      {/* Nền ambient + cánh sen bám theo màn hình trong suốt quá trình cuộn */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="sticky top-20 h-[calc(100svh-5rem)]">
          <AmbientBackdrop parallax={parallax} animate={!reduceMotion} />
        </div>
      </div>

      <p className="relative px-4 pt-4 text-center text-xs text-brand-cream/70">
        Vuốt lên / xuống để lật trang · Chạm vào trang để phóng to
      </p>

      <div ref={listRef} className="relative">
        {Array.from({ length: MENU_PAGE_COUNT }, (_, i) => i + 1).map((p) => {
          const current = p === page
          return (
            <section
              key={p}
              id={pageSlideId(p)}
              data-page={p}
              aria-label={`Trang ${p}`}
              className="relative flex snap-start snap-always items-center justify-center px-4 [perspective:1400px]"
              style={{ height: SLIDE_HEIGHT, scrollMarginTop: TOP_OFFSET }}
            >
              <motion.div
                className="relative will-change-transform [transform-style:preserve-3d]"
                style={{ height: PAGE_HEIGHT, ...(current ? { rotateX, rotateY } : {}) }}
                initial={reduceMotion ? false : { opacity: 0.35, scale: 0.94, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ amount: 0.35 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <MenuPage
                  page={p}
                  sizes={PAGE_SIZES}
                  priority={p === 1}
                  eager={Math.abs(p - page) <= 2}
                  side="single"
                  onOpen={onOpen}
                />
              </motion.div>

              {menuHotspots[p] && current && (
                <p className="pointer-events-none absolute inset-x-0 bottom-1 text-center text-[11px] text-brand-cream/75">
                  Chạm vào các điểm sáng để khám phá nguyên liệu
                </p>
              )}

              {p === 1 && current && !reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 left-1/2 -ml-5 grid size-10 place-items-center rounded-full border border-brand-gold/60 bg-brand-green/70 text-brand-gold backdrop-blur"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronsDown className="size-5" />
                </motion.div>
              )}
            </section>
          )
        })}
      </div>

      {/* ----- Thanh điều khiển cố định phía dưới ----- */}
      <AnimatePresence>
        {inView && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-gold/25 bg-brand-green/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-brand-cream backdrop-blur-md"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="mx-auto flex max-w-2xl items-center gap-3">
              <ControlButton label="Trang trước" disabled={page <= 1} onClick={() => onNavigate(page - 1)}>
                <ChevronUp className="size-5" />
              </ControlButton>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <p className="truncate font-semibold text-brand-gold">{chapter.title}</p>
                  <p className="shrink-0 tabular-nums tracking-widest" aria-live="polite">
                    <span className="sr-only">Trang </span>
                    <span className="text-brand-gold">{String(page).padStart(2, "0")}</span>
                    <span className="text-brand-cream/60"> / {MENU_PAGE_COUNT}</span>
                  </p>
                </div>
                <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-brand-cream/15">
                  <motion.div
                    className="h-full origin-left bg-gradient-to-r from-brand-gold to-brand-gold-light"
                    animate={{ scaleX: page / MENU_PAGE_COUNT }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              {story ? (
                <ControlButton label="Khám phá câu chuyện món ăn" onClick={() => onOpenStory(page)} highlight>
                  <BookOpen className="size-4" />
                </ControlButton>
              ) : (
                <ControlButton label="Phóng to trang" onClick={() => onOpen(page)}>
                  <Expand className="size-4" />
                </ControlButton>
              )}
              <ControlButton label="Trang sau" disabled={page >= MENU_PAGE_COUNT} onClick={() => onNavigate(page + 1)}>
                <ChevronDown className="size-5" />
              </ControlButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface ControlButtonProps {
  label: string
  disabled?: boolean
  highlight?: boolean
  onClick: () => void
  children: ReactNode
}

function ControlButton({ label, disabled, highlight, onClick, children }: ControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid size-11 shrink-0 place-items-center rounded-full border transition disabled:opacity-30 ${
        highlight
          ? "border-brand-gold bg-brand-gold text-brand-green"
          : "border-brand-gold/50 bg-white/5 hover:bg-brand-gold/20"
      }`}
    >
      {children}
    </button>
  )
}
