"use client"

import { AnimatePresence, motion, useTransform } from "framer-motion"
import { BookOpen, ChevronDown, ChevronsDown, ChevronUp, Expand, Sparkles } from "lucide-react"
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
} from "react"
import {
  MENU_PAGE_COUNT,
  MENU_PAGE_RATIO,
  chapterOfPage,
  menuChapters,
  menuHotspots,
  menuPageRatio,
  menuStories,
  type MenuChapter,
} from "../menu-pages"
import AmbientBackdrop, { EdgePetals } from "./ambient-backdrop"
import GapPetals from "./gap-petals"
import MenuPage from "./menu-page"
import { useMediaQuery, useParallax } from "./use-parallax"

/** Khoảng bị che phía trên (navbar 5rem + thanh chương 2.75rem) và phía dưới (thanh điều khiển). */
const TOP_OFFSET = "7.75rem"
const BOTTOM_BAR = "3.375rem"
const AVAILABLE_HEIGHT = `calc(100svh - ${TOP_OFFSET} - ${BOTTOM_BAR})`
/**
 * Điện thoại: trang rộng ~95% màn hình (lề 0.625rem mỗi bên). Trên màn quá thấp thì co lại vừa đủ
 * để trang nằm trọn giữa thanh chương và thanh điều khiển, không bị che chữ / giá / số trang.
 */
const phonePageWidth = (ratio: number) =>
  `min(calc(100vw - 1.25rem), calc((${AVAILABLE_HEIGHT} - 0.25rem) * ${ratio}))`
/** Khoảng trống trên (hoặc dưới) trang trên điện thoại = (chiều cao slide - chiều cao trang) / 2. */
const phoneGap = (ratio: number) => `((${AVAILABLE_HEIGHT} - ${phonePageWidth(ratio)} / ${ratio}) / 2)`
/** Tablet: trang vừa khít chiều cao màn hình, không vượt quá chiều rộng. */
const tabletPageHeight = (ratio: number) =>
  `min(calc(${AVAILABLE_HEIGHT} - 1.5rem), calc((100vw - 2rem) / ${ratio}))`
const SNAP_TYPE = "y proximity"

/** Kích thước theo tỉ lệ riêng của từng trang (A4, vuông của menu nước...), khai báo trên từng slide. */
const slideVars = (ratio: number) =>
  ({
    "--page-w": phonePageWidth(ratio),
    // Điện thoại: slide cao bằng trang (+ khoảng thở), tối thiểu bằng phần màn hình còn lại.
    "--slide-h": `max(${AVAILABLE_HEIGHT}, calc(${phonePageWidth(ratio)} / ${ratio} + 0.25rem))`,
    "--page-h-sm": tabletPageHeight(ratio),
    // Cánh sen: cao bằng khoảng trống trên/dưới trang (+10px ló vào mép trang), tối đa 96px.
    // Khoảng trống < 30px thì ẩn hẳn (nhân 1000 tạo "bước nhảy" 0 / đủ cao), tránh mẩu cánh lấp ló.
    "--gap-petal-h": `min(96px, calc(${phoneGap(ratio)} + 10px), max(0px, calc((${phoneGap(ratio)} - 30px) * 1000)))`,
  }) as CSSProperties

/** Biến dùng chung: "sợi chỉ vàng" tính theo khổ A4 để giữ thẳng hàng suốt cuốn menu. */
const sharedVars = {
  "--slide-h-sm": AVAILABLE_HEIGHT,
  "--rail-x": `calc((100vw - ${phonePageWidth(MENU_PAGE_RATIO)}) / 4)`,
  "--rail-x-sm": `calc((100vw - ${tabletPageHeight(MENU_PAGE_RATIO)} * ${MENU_PAGE_RATIO}) / 4)`,
} as CSSProperties
const PAGE_SIZES = "(min-width: 640px) 80vw, 100vw"

export const pageSlideId = (page: number) => `menu-page-${page}`

export type ScrollToPage = (page: number, behavior: ScrollBehavior) => void

interface VerticalReaderProps {
  page: number
  reduceMotion: boolean
  /** Gán hàm cuộn tới trang để MenuBook điều hướng (thanh chương, lightbox, link #page-N). */
  scrollToPageRef: MutableRefObject<ScrollToPage | null>
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
  scrollToPageRef,
  onVisiblePageChange,
  onNavigate,
  onOpen,
  onOpenStory,
}: VerticalReaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  // Đang cuộn bằng code: bỏ qua IntersectionObserver để không ghi đè trang đích.
  const navigatingRef = useRef(false)
  const pageRef = useRef(page)

  useEffect(() => {
    pageRef.current = page
  }, [page])

  // Nghiêng nhẹ trang đang xem theo con quay hồi chuyển (Android).
  const parallax = useParallax(rootRef, !reduceMotion)
  const rotateX = useTransform(parallax.y, (v) => v * -4)
  const rotateY = useTransform(parallax.x, (v) => v * 6)
  // Chỉ tải sớm ảnh khi chế độ đọc dọc thực sự hiển thị (dưới 1024px, sau khi chạy trên trình duyệt).
  // Trên desktop khối này bị ẩn bằng CSS, nếu tải sớm thì vừa tốn băng thông vừa bị Next cảnh báo ảnh cao 0px.
  const visible = useMediaQuery("(max-width: 1023px)")

  // Bật scroll-snap cho cả trang chỉ khi chế độ đọc dọc đang hiển thị.
  useEffect(() => {
    const html = document.documentElement
    const previous = html.style.scrollSnapType
    html.style.scrollSnapType = SNAP_TYPE
    return () => {
      html.style.scrollSnapType = previous
    }
  }, [])

  /**
   * Cuộn tới đúng trang. Tắt scroll-snap trong lúc cuộn vì Safari / WebView (Zalo, Facebook)
   * hay dừng sai trang khi smooth scroll đi qua nhiều điểm snap. Nhảy xa thì đi thẳng tới đích
   * để không tải ảnh của các trang ở giữa.
   */
  const scrollToPage = useCallback<ScrollToPage>(
    (target, behavior) => {
      const slide = document.getElementById(pageSlideId(target))
      if (!slide) return
      const html = document.documentElement
      const marginTop = parseFloat(getComputedStyle(slide).scrollMarginTop) || 0
      const top = slide.getBoundingClientRect().top + window.scrollY - marginTop
      const smooth = behavior === "smooth" && !reduceMotion && Math.abs(target - pageRef.current) <= 2

      navigatingRef.current = true
      html.style.scrollSnapType = "none"
      window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" })

      // Chờ cuộn dừng hẳn (Safari chưa có sự kiện scrollend) rồi bật lại snap.
      let lastY = -1
      let stableFrames = 0
      const startedAt = performance.now()
      const check = () => {
        stableFrames = Math.abs(window.scrollY - lastY) < 1 ? stableFrames + 1 : 0
        lastY = window.scrollY
        if (stableFrames >= 6 || performance.now() - startedAt > 1500) {
          html.style.scrollSnapType = SNAP_TYPE
          navigatingRef.current = false
          return
        }
        requestAnimationFrame(check)
      }
      requestAnimationFrame(check)
    },
    [reduceMotion],
  )

  useEffect(() => {
    scrollToPageRef.current = scrollToPage
    return () => {
      scrollToPageRef.current = null
    }
  }, [scrollToPage, scrollToPageRef])

  // Xác định trang đang nằm giữa màn hình.
  useEffect(() => {
    const slides = listRef.current?.querySelectorAll<HTMLElement>("[data-page]")
    if (!slides) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (navigatingRef.current) return
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
    <div ref={rootRef} className="relative lg:hidden" style={sharedVars}>
      {/* Lớp sau: ánh sáng ambient + thổ cẩm, bám theo màn hình trong suốt quá trình cuộn */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="sticky top-20 h-[calc(100svh-5rem)]">
          <AmbientBackdrop parallax={parallax} animate={!reduceMotion} showPetals={false} />
        </div>
      </div>

      <div ref={listRef} className="relative">
        {/* Sợi chỉ vàng dọc hai bên, chạy suốt cuốn menu */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 right-0">
          {(["left", "right"] as const).map((side) => (
            <div
              key={side}
              className={`absolute inset-y-0 w-px bg-brand-gold/20 ${
                side === "left" ? "left-[var(--rail-x)] sm:left-[var(--rail-x-sm)]" : "right-[var(--rail-x)] sm:right-[var(--rail-x-sm)]"
              }`}
            >
              {/* Đoạn chỉ sáng chạy dài tới giữa trang đang xem, nối liền các trang đã đọc */}
              <motion.div
                className="h-full w-full origin-top bg-gradient-to-b from-brand-gold-light via-brand-gold to-brand-gold/40 shadow-[0_0_8px_rgba(176,141,87,0.8)]"
                initial={false}
                animate={{ scaleY: reduceMotion ? 1 : (page - 0.5) / MENU_PAGE_COUNT }}
                transition={{ type: "spring", stiffness: 70, damping: 20 }}
              />
            </div>
          ))}
        </div>

        {Array.from({ length: MENU_PAGE_COUNT }, (_, i) => i + 1).map((p) => {
          const current = p === page
          return (
            <Fragment key={p}>
              {p > 1 && <PageConnector page={p} reached={p <= page} />}
              <section
                id={pageSlideId(p)}
                data-page={p}
                aria-label={`Trang ${p}`}
                className="relative flex h-[var(--slide-h)] snap-start snap-always items-center justify-center px-[0.625rem] [perspective:1400px] sm:h-[var(--slide-h-sm)] sm:px-4"
                style={{ scrollMarginTop: TOP_OFFSET, ...slideVars(menuPageRatio(p)) }}
              >
                <motion.div
                  className="relative w-[var(--page-w)] will-change-transform [transform-style:preserve-3d] sm:h-[var(--page-h-sm)] sm:w-auto"
                  style={current ? { rotateX, rotateY } : undefined}
                  initial={reduceMotion ? false : { opacity: 0.35, scale: 0.94, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ amount: 0.35 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MenuPage
                    page={p}
                    sizes={PAGE_SIZES}
                    highPriority={p === 1}
                    eager={visible && Math.abs(p - page) <= 2}
                    side="single"
                    onOpen={onOpen}
                  />

                  {/* Điện thoại màn dài: cánh sen lấp khoảng trống trên / dưới, đổi bên xen kẽ giữa các trang */}
                  <div className="sm:hidden">
                    <GapPetals position={p % 2 ? "top-right" : "top-left"} float={current && !reduceMotion} />
                    <GapPetals position={p % 2 ? "bottom-left" : "bottom-right"} float={current && !reduceMotion} />
                  </div>
                </motion.div>

                {p === 1 && current && !reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-6 left-1/2 -ml-5 grid size-10 place-items-center rounded-full border border-brand-gold/60 bg-brand-green/70 text-brand-gold backdrop-blur"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronsDown className="size-5" />
                  </motion.div>
                )}
              </section>
            </Fragment>
          )
        })}
      </div>

      {/* Tablet: "thẻ" tên chương treo trên sợi chỉ ở hai bên trang, kiểu gáy sách */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block" aria-hidden="true">
        <div className="sticky" style={{ top: TOP_OFFSET, height: AVAILABLE_HEIGHT }}>
          <ChapterFolio chapter={chapter} page={page} reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* Lớp trước: cánh sen ở mép màn hình, nằm trên trang menu nhưng không che chữ */}
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
        <div className="sticky top-20 h-[calc(100svh-5rem)]">
          <EdgePetals parallax={parallax} animate={!reduceMotion} />
        </div>
      </div>

      {/* ----- Thanh điều khiển cố định phía dưới ----- */}
      <AnimatePresence>
        {inView && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-gold/25 bg-brand-green/90 px-3 pb-[max(0.375rem,env(safe-area-inset-bottom))] pt-1.5 text-brand-cream backdrop-blur-md"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="mx-auto flex max-w-2xl items-center gap-2.5">
              <ControlButton label="Trang trước" disabled={page <= 1} onClick={() => onNavigate(page - 1)}>
                <ChevronUp className="size-5" />
              </ControlButton>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  {/* Trang có hotspot: thay tên chương bằng gợi ý, không đè lên nội dung menu */}
                  {menuHotspots[page] ? (
                    <p className="flex min-w-0 items-center gap-1 text-xs text-brand-cream/85">
                      <Sparkles className="size-3.5 shrink-0 text-brand-gold" />
                      <span className="truncate">Chạm điểm sáng</span>
                    </p>
                  ) : (
                    <p className="truncate font-semibold text-brand-gold">{chapter.title}</p>
                  )}
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

/**
 * Nút nối giữa hai trang: đường chỉ ngang nối hai sợi chỉ dọc, hạt kim cương ở hai đầu
 * (tô vàng khi đã đọc tới) và số trang kế tiếp, hoặc tên chương mới khi sang chương.
 * Khi đứng yên ở một trang, nút nối nằm khuất sau thanh chương / thanh điều khiển nên không
 * chiếm chỗ của trang; nó hiện ra trong lúc vuốt, đúng lúc chuyển từ trang này sang trang kia.
 */
function PageConnector({ page, reached }: { page: number; reached: boolean }) {
  const chapter = menuChapters.find((item) => item.startPage === page)
  const bead = `absolute top-1/2 size-2 -translate-y-1/2 rotate-45 border border-brand-gold transition-colors duration-500 ${
    reached ? "bg-brand-gold shadow-[0_0_10px_rgba(200,164,108,0.9)]" : "bg-brand-green"
  }`

  return (
    <div aria-hidden="true" className="relative h-8 sm:h-14">
      <div className="absolute inset-x-[var(--rail-x)] top-1/2 flex -translate-y-1/2 items-center gap-2 sm:inset-x-[var(--rail-x-sm)] sm:gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-brand-gold/60 to-brand-gold/20" />
        {chapter ? (
          <span className="shrink-0 rounded-full border border-brand-gold/60 bg-brand-green/80 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold backdrop-blur sm:px-4 sm:py-1 sm:text-xs">
            {chapter.title} · {chapter.subtitle}
          </span>
        ) : (
          <span className="shrink-0 text-[10px] tabular-nums tracking-[0.3em] text-brand-cream/55 sm:text-xs">
            ◆ {String(page).padStart(2, "0")} ◆
          </span>
        )}
        <span className="h-px flex-1 bg-gradient-to-l from-brand-gold/60 to-brand-gold/20" />
      </div>
      <span className={`${bead} left-[var(--rail-x)] -ml-1 sm:left-[var(--rail-x-sm)]`} />
      <span className={`${bead} right-[var(--rail-x)] -mr-1 sm:right-[var(--rail-x-sm)]`} />
    </div>
  )
}

/** Gáy sách cho tablet: tên chương (trái) và tên tiếng Anh + số trang (phải), viết dọc trên sợi chỉ. */
function ChapterFolio({ chapter, page, reduceMotion }: { chapter: MenuChapter; page: number; reduceMotion: boolean }) {
  const tag =
    "rounded-full border border-brand-gold/50 bg-brand-green/85 px-1.5 py-4 text-xs uppercase tracking-[0.35em] backdrop-blur [writing-mode:vertical-rl]"
  const fade = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.4 },
  } as const

  return (
    <>
      {/* Lớp ngoài định vị (translate/rotate), lớp motion bên trong chỉ lo hiệu ứng */}
      <div className="absolute left-[var(--rail-x-sm)] top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180">
        <AnimatePresence mode="wait">
          <motion.p key={chapter.id} className={`${tag} font-semibold text-brand-gold`} {...fade}>
            {chapter.title}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="absolute right-[var(--rail-x-sm)] top-1/2 -translate-y-1/2 translate-x-1/2">
        <AnimatePresence mode="wait">
          <motion.p key={chapter.id} className={`${tag} text-brand-cream/75`} {...fade}>
            {chapter.subtitle} · <span className="text-brand-gold">{String(page).padStart(2, "0")}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </>
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
      className={`grid size-10 shrink-0 place-items-center rounded-full border transition disabled:opacity-30 ${
        highlight
          ? "border-brand-gold bg-brand-gold text-brand-green"
          : "border-brand-gold/50 bg-white/5 hover:bg-brand-gold/20"
      }`}
    >
      {children}
    </button>
  )
}
