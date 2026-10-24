"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { menuImageLoader } from "../menu-image-loader"
import {
  MENU_PAGE_RATIO,
  menuHotspots,
  menuPagePlaceholder,
  menuPageRatio,
  menuPageSrc,
  type MenuHotspot,
} from "../menu-pages"

/** Bán kính thấu kính phóng to, tính theo % của clip-path circle(). */
const LENS_RADIUS = 12
const LENS_SCALE = 1.55
// clip-path circle(r%) dựa trên sqrt((w² + h²) / 2), quy đổi ra % chiều rộng trang để vẽ viền vàng khớp.
// Hotspot hiện chỉ có trên trang A4 nên tính theo tỉ lệ A4.
const LENS_RING_WIDTH = 2 * LENS_RADIUS * Math.sqrt((1 + 1 / MENU_PAGE_RATIO ** 2) / 2)

interface MenuPageProps {
  page: number
  sizes: string
  priority?: boolean
  /** Tải ngay thay vì lazy (dùng cho các trang sắp được xem). */
  eager?: boolean
  /**
   * Ưu tiên mạng cao nhưng vẫn lazy: tải ngay nếu trang đang hiển thị, bỏ qua nếu đang bị ẩn
   * (khác `priority` luôn tải kể cả khi bị ẩn bằng CSS).
   */
  highPriority?: boolean
  /** Vị trí trong trang đôi, quyết định bo góc và bóng gáy sách. */
  side: "left" | "right" | "single"
  onOpen: (page: number) => void
}

export default function MenuPage({ page, sizes, priority, eager, highPriority, side, onOpen }: MenuPageProps) {
  const hotspots = menuHotspots[page] ?? []
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = hotspots.find((hotspot) => hotspot.id === activeId)
  const src = menuPageSrc(page)

  const radius = side === "left" ? "rounded-l-md" : side === "right" ? "rounded-r-md" : "rounded-md"

  // Chạm vào trang: nếu đang mở tooltip thì đóng, ngược lại mở chế độ phóng to.
  const handlePageClick = () => (activeId ? setActiveId(null) : onOpen(page))

  return (
    <div
      className="relative h-full [transform-style:preserve-3d]"
      style={{ aspectRatio: `${menuPageRatio(page)}` }}
      onPointerLeave={(event) => event.pointerType === "mouse" && setActiveId(null)}
    >
      <button
        type="button"
        onClick={handlePageClick}
        aria-label={`Phóng to trang ${page}`}
        className={`group absolute inset-0 overflow-hidden bg-brand-green-dark shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${radius} cursor-zoom-in`}
      >
        <Image
          src={src}
          alt={`Thực đơn Siam Siam - trang ${page}`}
          fill
          sizes={sizes}
          loader={menuImageLoader}
          priority={priority}
          loading={priority ? undefined : eager ? "eager" : "lazy"}
          fetchPriority={highPriority ? "high" : undefined}
          placeholder="blur"
          blurDataURL={menuPagePlaceholder(page)}
          draggable={false}
          className="select-none object-cover"
        />

        {/* Bóng gáy sách cho trang đôi */}
        {side !== "single" && (
          <span
            className={`pointer-events-none absolute inset-y-0 w-[12%] ${
              side === "left"
                ? "right-0 bg-gradient-to-l from-black/35 to-transparent"
                : "left-0 bg-gradient-to-r from-black/35 to-transparent"
            }`}
          />
        )}

        {/* Thấu kính: bản sao trang được phóng to và cắt tròn quanh hotspot */}
        <AnimatePresence>
          {active && (
            <motion.span
              key={active.id}
              className="pointer-events-none absolute inset-0 will-change-transform"
              style={{ transformOrigin: `${active.x}% ${active.y}%` }}
              initial={{ scale: 1, clipPath: `circle(0% at ${active.x}% ${active.y}%)` }}
              animate={{ scale: LENS_SCALE, clipPath: `circle(${LENS_RADIUS / LENS_SCALE}% at ${active.x}% ${active.y}%)` }}
              exit={{ scale: 1, clipPath: `circle(0% at ${active.x}% ${active.y}%)` }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <Image src={src} alt="" fill sizes={sizes} loader={menuImageLoader} draggable={false} className="object-cover" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Lớp hotspot nằm "nổi" phía trên trang trong không gian 3D */}
      {hotspots.length > 0 && (
        <div className="pointer-events-none absolute inset-0 [transform:translateZ(40px)]">
          <AnimatePresence>
            {active && (
              <span
                key={`ring-${active.id}`}
                className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${active.x}%`, top: `${active.y}%`, width: `${LENS_RING_WIDTH}%` }}
              >
                <motion.span
                  className="block size-full rounded-full border-2 border-brand-gold/90 shadow-[0_0_30px_rgba(176,141,87,0.6)]"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              </span>
            )}
          </AnimatePresence>

          {hotspots.map((hotspot, index) => (
            <HotspotButton
              key={hotspot.id}
              hotspot={hotspot}
              index={index}
              active={hotspot.id === activeId}
              onActivate={() => setActiveId(hotspot.id)}
              onToggle={() => setActiveId((current) => (current === hotspot.id ? null : hotspot.id))}
            />
          ))}

          <AnimatePresence>{active && <HotspotTooltip key={active.id} hotspot={active} />}</AnimatePresence>
        </div>
      )}
    </div>
  )
}

interface HotspotButtonProps {
  hotspot: MenuHotspot
  index: number
  active: boolean
  onActivate: () => void
  onToggle: () => void
}

function HotspotButton({ hotspot, index, active, onActivate, onToggle }: HotspotButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={`Thành phần: ${hotspot.title}`}
      aria-expanded={active}
      className="pointer-events-auto absolute -ml-4 -mt-4 grid size-8 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: active ? 0 : 1, scale: 1 }}
      transition={{ delay: active ? 0 : 0.8 + index * 0.08, type: "spring", stiffness: 300, damping: 18 }}
      onPointerEnter={(event) => event.pointerType === "mouse" && onActivate()}
      // Chỉ mở khi focus bằng bàn phím; chạm/click đã được xử lý bởi onClick.
      onFocus={(event) => event.currentTarget.matches(":focus-visible") && onActivate()}
      onClick={(event) => {
        event.stopPropagation()
        onToggle()
      }}
    >
      <span className="absolute inset-0 animate-hotspot-pulse rounded-full bg-brand-gold/60" />
      <span className="relative size-3 rounded-full border-2 border-white bg-brand-gold shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
    </motion.button>
  )
}

function HotspotTooltip({ hotspot }: { hotspot: MenuHotspot }) {
  // Đặt thẻ về phía còn trống của trang để không che món ăn đang phóng to.
  const placeRight = hotspot.x < 50
  const placeAbove = hotspot.y > 62

  return (
    <motion.div
      role="tooltip"
      className="absolute w-[min(15rem,62%)] rounded-xl border border-brand-gold/50 bg-brand-green/75 p-3 text-left text-brand-cream shadow-2xl backdrop-blur-md sm:p-4"
      style={{
        top: placeAbove ? undefined : `calc(${hotspot.y}% + ${LENS_RING_WIDTH / 2.6}%)`,
        bottom: placeAbove ? `calc(${100 - hotspot.y}% + ${LENS_RING_WIDTH / 2.6}%)` : undefined,
        left: placeRight ? `${Math.max(hotspot.x - 8, 3)}%` : undefined,
        right: placeRight ? undefined : `${Math.max(100 - hotspot.x - 8, 3)}%`,
      }}
      initial={{ opacity: 0, y: placeAbove ? 10 : -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: placeAbove ? 10 : -10, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Nguyên liệu</p>
      <p className="mt-1 text-sm font-semibold leading-snug sm:text-base">{hotspot.title}</p>
      <p className="mt-1 text-xs leading-relaxed text-brand-cream/85 sm:text-sm">{hotspot.description}</p>
    </motion.div>
  )
}
