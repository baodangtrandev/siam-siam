"use client"

import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion"
import { BookOpen, ChevronLeft, ChevronRight, Expand, Phone, Sparkles } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { SITE } from "@/lib/site"
import {
  MENU_PAGE_COUNT,
  MENU_PAGE_RATIO,
  chapterOfPage,
  menuPageRatio,
  menuChapters,
  menuHotspots,
  menuPageSrc,
  menuSpreads,
  menuStories,
  spreadIndexOfPage,
} from "../menu-pages"
import { menuImageLoader, menuThumbSrc } from "../menu-image-loader"
import AmbientBackdrop from "./ambient-backdrop"
import GoldButton from "./gold-button"
import MenuLightbox from "./menu-lightbox"
import MenuPage from "./menu-page"
import MenuStorySheet from "./menu-story-sheet"
import { useMediaQuery, useParallax } from "./use-parallax"
import VerticalReader, { type ScrollToPage } from "./vertical-reader"

/**
 * Chiều cao trang đôi (desktop): bằng chiều cao thực của "sân khấu" (đo bằng ResizeObserver, phần còn
 * lại sau navbar, thanh chương, thanh điều khiển và thumbnail) nên cuốn menu luôn vừa khít màn hình,
 * đồng thời không vượt quá chiều rộng khả dụng.
 */
const spreadPageHeight = (stageHeight: number) =>
  `min(${stageHeight}px, calc((100vw - 12rem) / 2 / ${MENU_PAGE_RATIO}))`

const turnVariants: Variants = {
  enter: ({ direction, reduce }: TurnCustom) =>
    reduce ? { opacity: 0 } : { opacity: 0, x: `${direction * 14}%`, rotateY: direction * -22, scale: 0.96 },
  center: { opacity: 1, x: "0%", rotateY: 0, scale: 1 },
  exit: ({ direction, reduce }: TurnCustom) =>
    reduce ? { opacity: 0 } : { opacity: 0, x: `${direction * -14}%`, rotateY: direction * 22, scale: 0.96 },
}

interface TurnCustom {
  direction: number
  reduce: boolean
}

const pageFromHash = () => {
  // Chấp nhận cả #trang-N cũ để link đã chia sẻ trước đây vẫn mở đúng trang.
  const match = window.location.hash.match(/^#(?:page|trang)-(\d+)$/)
  const page = match ? Number(match[1]) : NaN
  return page >= 1 && page <= MENU_PAGE_COUNT ? page : null
}

export default function MenuBook() {
  const reduceMotion = useReducedMotion() ?? false
  const isSpread = useMediaQuery("(min-width: 1024px)")
  const [page, setPage] = useState(1)
  const [direction, setDirection] = useState(1)
  const [lightboxPage, setLightboxPage] = useState<number | null>(null)
  const [storyPage, setStoryPage] = useState<number | null>(null)
  const [stageHeight, setStageHeight] = useState(0)

  const stageRef = useRef<HTMLDivElement>(null)
  const chapterBarRef = useRef<HTMLDivElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const draggedRef = useRef(false)
  const scrollToPageRef = useRef<ScrollToPage | null>(null)
  // Trang hiện tại cho các callback ổn định (không phụ thuộc render).
  const pageRef = useRef(page)

  // ----- Tilt 3D & ánh phản chiếu theo con trỏ / con quay hồi chuyển -----
  const parallax = useParallax(stageRef, !reduceMotion)
  const rotateX = useTransform(parallax.y, (v) => v * -5)
  const rotateY = useTransform(parallax.x, (v) => v * 4)
  const glareX = useTransform(parallax.x, (v) => 50 + v * 45)
  const glareY = useTransform(parallax.y, (v) => 30 + v * 40)
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,240,220,0.22), transparent 55%)`

  // ----- Trang đang hiển thị -----
  const spreadIndex = spreadIndexOfPage(page)
  const visiblePages = isSpread ? menuSpreads[spreadIndex] : [page]
  const chapter = chapterOfPage(visiblePages[0])
  const storyOnView = visiblePages.find((p) => menuStories[p])
  const hasHotspots = visiblePages.some((p) => menuHotspots[p])
  const canPrev = isSpread ? spreadIndex > 0 : page > 1
  const canNext = isSpread ? spreadIndex < menuSpreads.length - 1 : page < MENU_PAGE_COUNT

  const goTo = useCallback(
    (target: number | undefined, behavior: ScrollBehavior = "smooth") => {
      if (!target || target < 1 || target > MENU_PAGE_COUNT) return
      setDirection(target >= pageRef.current ? 1 : -1)
      pageRef.current = target
      setPage(target)
      // Chế độ đọc dọc: cuộn tới đúng trang đích.
      if (!isSpread) scrollToPageRef.current?.(target, behavior)
    },
    [isSpread],
  )

  const handleVisiblePage = useCallback((visible: number) => {
    pageRef.current = visible
    setPage(visible)
  }, [])

  const goNext = useCallback(
    () => goTo(isSpread ? menuSpreads[spreadIndex + 1]?.[0] : page + 1),
    [goTo, isSpread, page, spreadIndex],
  )
  const goPrev = useCallback(
    () => goTo(isSpread ? menuSpreads[spreadIndex - 1]?.[0] : page - 1),
    [goTo, isSpread, page, spreadIndex],
  )

  // Mở đúng trang khi truy cập bằng link #page-N, và cập nhật hash để chia sẻ được.
  useEffect(() => {
    const onHashChange = () => goTo(pageFromHash() ?? undefined, "auto")
    onHashChange()
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [goTo])

  useEffect(() => {
    const hash = page === 1 ? "" : `#page-${page}`
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash || window.location.pathname)
  }, [page])

  // Điều hướng bằng bàn phím khi không mở lightbox / câu chuyện.
  useEffect(() => {
    if (!isSpread || lightboxPage !== null || storyPage !== null) return
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.closest("input, textarea, select, [contenteditable]")) return
      if (event.key === "ArrowRight") goNext()
      else if (event.key === "ArrowLeft") goPrev()
      else if (event.key === "Home") goTo(1)
      else if (event.key === "End") goTo(MENU_PAGE_COUNT)
      else return
      event.preventDefault()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [goNext, goPrev, goTo, isSpread, lightboxPage, storyPage])

  // Giữ chương và thumbnail đang chọn nằm giữa thanh cuộn ngang.
  useEffect(() => {
    const centerChild = (container: HTMLElement | null, selector: string) => {
      const child = container?.querySelector<HTMLElement>(selector)
      if (!container || !child) return
      container.scrollTo({
        left: child.offsetLeft - container.clientWidth / 2 + child.offsetWidth / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      })
    }
    centerChild(chapterBarRef.current, '[aria-current="true"]')
    centerChild(thumbnailsRef.current, '[aria-current="true"]')
  }, [page, isSpread, reduceMotion])

  // Đo chiều cao sân khấu để cuốn menu vừa khít phần màn hình còn lại (desktop).
  useEffect(() => {
    const stage = stageRef.current
    if (!isSpread || !stage) return
    const observer = new ResizeObserver(([entry]) => setStageHeight(Math.floor(entry.contentRect.height)))
    observer.observe(stage)
    return () => observer.disconnect()
  }, [isSpread])

  const openLightbox = (target: number) => {
    if (draggedRef.current) return
    setLightboxPage(target)
  }

  const neighbours = [...(menuSpreads[spreadIndex - 1] ?? []), ...(menuSpreads[spreadIndex + 1] ?? [])]
  const pageSizes = "(min-width: 1536px) 36vw, 44vw"

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Thực đơn Siam Siam"
      // overflow-x-clip (không phải hidden) để thanh chương và nền ambient vẫn sticky được.
      // Desktop: cao đúng bằng màn hình trừ navbar (5rem + 1px viền), cuốn menu vừa khít khung hình mà không cần cuộn.
      className="relative overflow-x-clip bg-brand-green bg-brand-pattern text-brand-cream lg:flex lg:h-[calc(100svh-5rem-1px)] lg:flex-col"
    >
      <h1 className="sr-only">Thực đơn Siam Siam - Ẩm thực Hoàng gia Thái</h1>

      {/* ----- Thanh chương (dính dưới navbar) ----- */}
      <nav aria-label="Các chương thực đơn" className="sticky top-20 z-30 shrink-0 border-y border-brand-gold/20 bg-brand-green/85 backdrop-blur-md">
        <div ref={chapterBarRef} className="scrollbar-none flex gap-2 overflow-x-auto px-4 py-1.5 md:justify-center lg:py-2.5">
          {menuChapters.map((item) => {
            const current = item.id === chapter.id
            return (
              <button
                key={item.id}
                type="button"
                aria-current={current}
                onClick={() => goTo(item.startPage)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors md:text-sm ${
                  current
                    ? "border-brand-gold bg-brand-gold text-brand-green"
                    : "border-brand-gold/30 text-brand-cream/80 hover:border-brand-gold/70 hover:text-brand-cream"
                }`}
              >
                {item.title}
              </button>
            )
          })}
        </div>
      </nav>

      {!isSpread && (
        <VerticalReader
          page={page}
          reduceMotion={reduceMotion}
          scrollToPageRef={scrollToPageRef}
          onVisiblePageChange={handleVisiblePage}
          onNavigate={goTo}
          onOpen={openLightbox}
          onOpenStory={setStoryPage}
        />
      )}

      {isSpread && (
        <>
          {/* ----- Sân khấu: cuốn menu (desktop) ----- */}
          <div
            ref={stageRef}
            className="relative flex min-h-0 flex-1 flex-col justify-center px-4 py-4 [perspective:1800px]"
            style={{ "--page-h": spreadPageHeight(stageHeight) } as CSSProperties}
          >
            <AmbientBackdrop parallax={parallax} animate={!reduceMotion} />

            <motion.div
              className="relative mx-auto h-[var(--page-h)] w-full will-change-transform [transform-style:preserve-3d]"
              style={{ rotateX, rotateY }}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.05, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence initial={false} custom={{ direction, reduce: reduceMotion }}>
                <motion.div
                  key={visiblePages.join("-")}
                  custom={{ direction, reduce: reduceMotion }}
                  variants={turnVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex touch-pan-y justify-center [transform-style:preserve-3d]"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  dragSnapToOrigin
                  onDragStart={() => (draggedRef.current = true)}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70 || info.velocity.x < -500) goNext()
                    else if (info.offset.x > 70 || info.velocity.x > 500) goPrev()
                    // Click phát sinh ngay sau khi thả tay, bỏ qua để không mở lightbox ngoài ý muốn.
                    setTimeout(() => (draggedRef.current = false), 0)
                  }}
                >
                  {visiblePages.map((p, index) => (
                    <MenuPage
                      key={p}
                      page={p}
                      sizes={pageSizes}
                      priority={p <= 2}
                      side={visiblePages.length === 1 ? "single" : index === 0 ? "left" : "right"}
                      onOpen={openLightbox}
                    />
                  ))}

                  {/* Ánh sáng phản chiếu trên mặt giấy */}
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-md mix-blend-soft-light"
                      style={{
                        backgroundImage: glare,
                        width: `calc(var(--page-h) * ${visiblePages.reduce((sum, p) => sum + menuPageRatio(p), 0)})`,
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Nút lật trang hai bên trên màn hình lớn */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-6 md:flex xl:px-12">
              <PageArrow direction="prev" disabled={!canPrev} onClick={goPrev} />
              <PageArrow direction="next" disabled={!canNext} onClick={goNext} />
            </div>

          </div>

          {/* ----- Thanh điều khiển ----- */}
          <div className="relative z-10 mx-auto flex w-full max-w-4xl shrink-0 items-center gap-3 px-4 pb-1">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Trang trước"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-brand-gold/50 bg-white/5 transition hover:bg-brand-gold/20 disabled:opacity-30 md:hidden"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <p className="flex min-w-0 items-baseline gap-2 truncate">
                  <span className="font-semibold text-brand-gold">{chapter.title}</span>
                  {/* Trang có hotspot: gợi ý thay cho tên tiếng Anh của chương */}
                  {hasHotspots ? (
                    <span className="inline-flex items-center gap-1.5 truncate text-xs text-brand-cream/75">
                      <Sparkles className="size-3.5 shrink-0 text-brand-gold" />
                      Di chuột vào điểm sáng để khám phá nguyên liệu
                    </span>
                  ) : (
                    <span className="text-brand-cream/60">{chapter.subtitle}</span>
                  )}
                </p>
                <p className="shrink-0 tabular-nums tracking-widest" aria-live="polite">
                  <span className="sr-only">Trang </span>
                  <span className="text-brand-gold">{visiblePages.map((p) => String(p).padStart(2, "0")).join("–")}</span>
                  <span className="text-brand-cream/60"> / {MENU_PAGE_COUNT}</span>
                </p>
              </div>
              <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-brand-cream/15">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-brand-gold to-brand-gold-light"
                  animate={{ scaleX: visiblePages[visiblePages.length - 1] / MENU_PAGE_COUNT }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {storyOnView && (
              <button
                type="button"
                onClick={() => setStoryPage(storyOnView)}
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-brand-gold bg-brand-gold px-4 text-sm font-semibold text-brand-green transition hover:bg-brand-gold-light"
              >
                <BookOpen className="size-4" />
                Câu chuyện món ăn
              </button>
            )}
            <button
              type="button"
              onClick={() => openLightbox(visiblePages[0])}
              aria-label="Phóng to trang"
              className="hidden size-11 shrink-0 place-items-center rounded-full border border-brand-gold/50 bg-white/5 transition hover:bg-brand-gold/20 sm:grid"
            >
              <Expand className="size-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Trang sau"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-brand-gold/50 bg-white/5 transition hover:bg-brand-gold/20 disabled:opacity-30 md:hidden"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* ----- Thumbnail toàn bộ trang ----- */}
          <div ref={thumbnailsRef} className="scrollbar-none relative z-10 mt-2 flex shrink-0 gap-2 overflow-x-auto px-4 pb-3 pt-1">
            {Array.from({ length: MENU_PAGE_COUNT }, (_, i) => i + 1).map((p) => {
              const current = visiblePages.includes(p)
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => goTo(p)}
                  aria-label={`Đến trang ${p}`}
                  aria-current={current && p === visiblePages[0]}
                  style={{ aspectRatio: `${menuPageRatio(p)}` }}
                  className={`relative h-14 shrink-0 overflow-hidden rounded transition ${
                    current ? "opacity-100 ring-2 ring-brand-gold" : "opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image src={menuThumbSrc(menuPageSrc(p))} alt="" fill unoptimized className="object-cover" />
                </button>
              )
            })}
          </div>

          {/* Tải trước các trang kế bên để lật trang tức thì */}
          <div className="sr-only" aria-hidden="true">
            {neighbours.map((p) => (
              <div key={p} className="relative size-px">
                <Image src={menuPageSrc(p)} alt="" fill sizes={pageSizes} loader={menuImageLoader} loading="eager" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ----- CTA cuối chế độ đọc dọc (desktop đã có nút nổi Zalo / Hotline và Set Menu trên navbar) ----- */}
      {!isSpread && (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 px-4 pb-12 pt-6">
          <GoldButton href={SITE.phoneHref} className="bg-brand-gold/90 text-brand-green hover:bg-brand-gold hover:text-brand-green">
            <Phone className="size-4" />
            Đặt bàn: {SITE.phoneDisplay}
          </GoldButton>
          <GoldButton href="/set-menu">Xem Set Menu Chọn Lọc</GoldButton>
        </div>
      )}

      <AnimatePresence>
        {lightboxPage !== null && (
          <MenuLightbox
            key="lightbox"
            page={lightboxPage}
            onClose={() => setLightboxPage(null)}
            onNavigate={(target) => {
              setLightboxPage(target)
              goTo(target, "auto")
            }}
          />
        )}
        {storyPage !== null && (
          <MenuStorySheet key="story" story={menuStories[storyPage]} onClose={() => setStoryPage(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function PageArrow({ direction, disabled, onClick }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Trang trước" : "Trang sau"}
      className="pointer-events-auto grid size-12 place-items-center rounded-full border border-brand-gold/60 bg-brand-green/60 text-brand-cream shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-brand-gold/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-0"
    >
      <Icon className="size-6" />
    </button>
  )
}
