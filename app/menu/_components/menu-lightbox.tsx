"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { menuImageLoader } from "../menu-image-loader"
import { MENU_PAGE_COUNT, MENU_PAGE_RATIO, menuPageSrc } from "../menu-pages"
import { menuPlaceholders } from "../menu-placeholders"

const ZOOM = 2.4
/** Chiều rộng trang khi vừa khung màn hình. */
const FIT_WIDTH = `min(calc(100vw - 2rem), calc((100svh - 8rem) * ${MENU_PAGE_RATIO}))`

interface MenuLightboxProps {
  page: number
  onClose: () => void
  onNavigate: (page: number) => void
}

export default function MenuLightbox({ page, onClose, onNavigate }: MenuLightboxProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [zoomed, setZoomed] = useState(false)
  // Điểm (tỉ lệ 0..1) người dùng chạm vào để phóng to đúng vị trí đó.
  const focusPoint = useRef({ x: 0.5, y: 0.5 })

  const go = (target: number) => {
    if (target < 1 || target > MENU_PAGE_COUNT) return
    setZoomed(false)
    onNavigate(target)
  }

  // Khoá cuộn trang nền, trả focus về phần tử cũ khi đóng.
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      else if (event.key === "ArrowRight") go(page + 1)
      else if (event.key === "ArrowLeft") go(page - 1)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  })

  // Sau khi phóng to, cuộn để điểm vừa chạm nằm giữa màn hình.
  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    if (!zoomed) {
      viewport.scrollTo({ left: 0, top: 0 })
      return
    }
    const content = contentRef.current
    if (!content) return
    viewport.scrollTo({
      left: focusPoint.current.x * content.offsetWidth - viewport.clientWidth / 2,
      top: focusPoint.current.y * content.offsetHeight - viewport.clientHeight / 2,
    })
  }, [zoomed])

  const toggleZoom = (point?: { clientX: number; clientY: number }) => {
    const rect = contentRef.current?.getBoundingClientRect()
    if (!zoomed) {
      focusPoint.current =
        point && rect
          ? { x: (point.clientX - rect.left) / rect.width, y: (point.clientY - rect.top) / rect.height }
          : { x: 0.5, y: 0.5 }
    }
    setZoomed((value) => !value)
  }

  const iconButton =
    "grid size-11 place-items-center rounded-full border border-brand-gold/50 bg-white/10 text-brand-cream backdrop-blur-md transition hover:bg-brand-gold/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:opacity-30"

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Xem trang ${page} của thực đơn`}
      className="fixed inset-0 z-[60] flex flex-col bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-brand-cream">
        <p className="text-sm tabular-nums tracking-widest">
          <span className="text-brand-gold">{String(page).padStart(2, "0")}</span> / {MENU_PAGE_COUNT}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" className={iconButton} onClick={() => toggleZoom()} aria-label={zoomed ? "Thu nhỏ" : "Phóng to"}>
            {zoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
          </button>
          <button ref={closeRef} type="button" className={iconButton} onClick={onClose} aria-label="Đóng">
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`relative flex-1 overflow-auto overscroll-contain ${zoomed ? "" : "flex items-center justify-center"}`}
      >
        <motion.div
          key={page}
          ref={contentRef}
          className={`relative mx-auto shrink-0 ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in touch-pan-y"}`}
          style={{ width: zoomed ? `calc(${FIT_WIDTH} * ${ZOOM})` : FIT_WIDTH, aspectRatio: `${MENU_PAGE_RATIO}` }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          // Vuốt ngang để chuyển trang khi chưa phóng to.
          drag={zoomed ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.35}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80 || info.velocity.x < -500) go(page + 1)
            else if (info.offset.x > 80 || info.velocity.x > 500) go(page - 1)
          }}
          onTap={(event) => toggleZoom("clientX" in event ? event : event.changedTouches[0])}
        >
          <Image
            src={menuPageSrc(page)}
            alt={`Thực đơn Siam Siam - trang ${page}`}
            fill
            // Khi phóng to cần ảnh lớn nhất; còn lại chỉ cần ảnh vừa màn hình.
            sizes={zoomed ? "240vw" : "(min-width: 1024px) 60vw, 100vw"}
            loader={menuImageLoader}
            placeholder="blur"
            blurDataURL={menuPlaceholders[page - 1]}
            draggable={false}
            className="select-none rounded-md object-contain shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 px-4 py-3">
        <button type="button" className={iconButton} onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Trang trước">
          <ChevronLeft className="size-5" />
        </button>
        <p className="hidden text-xs text-brand-cream/60 sm:block">Chạm vào trang để phóng to · Vuốt hoặc dùng phím ← → để lật</p>
        <button
          type="button"
          className={iconButton}
          onClick={() => go(page + 1)}
          disabled={page >= MENU_PAGE_COUNT}
          aria-label="Trang sau"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </motion.div>
  )
}
