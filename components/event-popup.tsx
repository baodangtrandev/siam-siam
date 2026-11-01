"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { SITE } from "@/lib/site"
import { trackContactClick } from "./contact-actions"

/**
 * Cấu hình sự kiện đang quảng bá. Đổi sự kiện: thay ảnh, `id` (để khách đã tắt popup cũ vẫn thấy
 * popup mới) và `endsAt` (popup tự ẩn sau thời điểm này).
 */
const EVENT = {
  id: "di-cang-dong-uu-dai-cang-hoi",
  title: "Đi càng đông - Ưu đãi càng hời",
  endsAt: "2026-11-15T23:59:59+07:00",
  mobile: {
    // Ảnh 9:16 cho điện thoại
    srcSet: "/images/event/event-mobile-720.webp 720w, /images/event/event-mobile-1080.webp 1080w",
    src: "/images/event/event-mobile-720.webp",
  },
  desktop: {
    // Ảnh 16:9 cho máy tính bảng, laptop, desktop
    srcSet: "/images/event/event-desktop-1280.webp 1280w, /images/event/event-desktop-1920.webp 1920w",
  },
}

const SHOW_AFTER_MS = 5000
const PRELOAD_AFTER_MS = 1500
const STORAGE_KEY = `siam-event-popup:${EVENT.id}`
const DESKTOP_QUERY = "(min-width: 768px)"
// Chiều rộng popup: vừa màn hình theo cả hai chiều, giữ đúng tỉ lệ ảnh.
const MOBILE_SIZES = "min(92vw, calc((100svh - 6rem) * 9 / 16))"
const DESKTOP_SIZES = "min(92vw, 1100px, calc((100svh - 6rem) * 16 / 9))"

/** Tải trước đúng ảnh của thiết bị để lúc popup hiện là ảnh đã sẵn sàng. */
function preloadImage() {
  const desktop = window.matchMedia(DESKTOP_QUERY).matches
  const img = new window.Image()
  img.sizes = desktop ? DESKTOP_SIZES : MOBILE_SIZES
  img.srcset = desktop ? EVENT.desktop.srcSet : EVENT.mobile.srcSet
}

const CTA_BASE =
  "group relative inline-flex items-center justify-center gap-[0.45em] overflow-hidden rounded-full font-bold uppercase tracking-wide shadow-[0_6px_18px_-4px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B3B24]"
// Vàng kem giống băng chữ "ƯU ĐÃI CÀNG HỜI" trên ảnh, chữ xanh rêu đậm.
const CTA_GOLD = "bg-gradient-to-b from-[#F1E4B8] to-[#CDB57A] text-[#0B3B24] ring-1 ring-[#FFF6D8]/70"
// Xanh rêu đậm của nền ảnh, viền và chữ vàng.
const CTA_GREEN = "bg-[#0B3B24]/90 text-[#F1E4B8] ring-[1.5px] ring-[#D8C48A] backdrop-blur-sm"

function Shimmer() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer motion-reduce:hidden"
    />
  )
}

/**
 * Popup quảng bá sự kiện: hiện sau 5 giây, 1 lần mỗi phiên truy cập, tự ẩn khi hết hạn chương trình.
 * Nút CTA đặt theo % ảnh, vào đúng vùng trống của từng ảnh (không đè nội dung):
 * - Ảnh 9:16: dải trống giữa 3 thẻ ưu đãi và nhóm khách (49.5% - 57.5% chiều cao).
 * - Ảnh 16:9: cột trái, giữa 3 thẻ ưu đãi và dòng ghi chú (71% - 88% chiều cao), căn theo trục 3 thẻ.
 */
export default function EventPopup() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (Date.now() > new Date(EVENT.endsAt).getTime()) return
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return
    } catch {
      // Trình duyệt chặn storage: vẫn hiện popup như bình thường.
    }
    const preload = window.setTimeout(preloadImage, PRELOAD_AFTER_MS)
    const show = window.setTimeout(() => {
      setOpen(true)
      try {
        sessionStorage.setItem(STORAGE_KEY, "1")
      } catch {}
      window.dataLayer?.push({ event: "event_popup_view", event_id: EVENT.id })
    }, SHOW_AFTER_MS)
    return () => {
      window.clearTimeout(preload)
      window.clearTimeout(show)
    }
  }, [])

  // Khoá cuộn nền, đóng bằng Esc, đưa focus vào popup (không vào nút × để không hiện viền focus) và trả lại khi tắt.
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialogRef.current?.focus({ preventScroll: true })
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      previousFocus?.focus()
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />

          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Ưu đãi: ${EVENT.title}`}
            // container-type để kích thước nút (đơn vị cqw) co giãn theo đúng bề rộng ảnh.
            className="relative aspect-[1381/2455] w-[min(92vw,calc((100svh-6rem)*9/16))] overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] outline-none ring-1 ring-[#D8C48A]/40 [container-type:inline-size] md:aspect-[2455/1381] md:w-[min(92vw,1100px,calc((100svh-6rem)*16/9))]"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <picture>
              <source media={DESKTOP_QUERY} srcSet={EVENT.desktop.srcSet} sizes={DESKTOP_SIZES} />
              {/* Dùng <picture> để trình duyệt chỉ tải ảnh 9:16 hoặc 16:9 phù hợp với thiết bị */}
              <img
                src={EVENT.mobile.src}
                srcSet={EVENT.mobile.srcSet}
                sizes={MOBILE_SIZES}
                alt={`${EVENT.title}: nhóm 4 khách tặng Bingsu, bill 3.5 triệu tặng Tháp sườn cay, bill 2.5 triệu tặng Bò nướng Siam. Áp dụng tới 15/11, không áp dụng tối thứ 6, 7, Chủ nhật và ngày lễ.`}
                className="size-full select-none object-cover"
                draggable={false}
              />
            </picture>

            <button
              type="button"
              onClick={close}
              aria-label="Đóng"
              className="absolute right-[3%] top-[1.8%] grid size-[max(34px,8cqw)] place-items-center rounded-full bg-black/45 text-white ring-1 ring-white/50 backdrop-blur-sm transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-[1.6%] md:top-[3%] md:size-[max(36px,3cqw)]"
            >
              <X className="size-[55%]" strokeWidth={2.4} />
            </button>

            {/* Điện thoại: 2 nút trong dải trống giữa ảnh */}
            <div className="absolute inset-x-[7%] top-[53.5%] flex -translate-y-1/2 gap-[3cqw] md:hidden">
              <a
                href={SITE.phoneHref}
                onClick={() => trackContactClick("hotline", "event-popup")}
                className={`${CTA_BASE} ${CTA_GOLD} h-[max(40px,10.5cqw)] flex-1 text-[max(13px,3.7cqw)]`}
              >
                <Shimmer />
                <span className="relative whitespace-nowrap">Đặt bàn ngay</span>
              </a>
              <a
                href={SITE.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("zalo", "event-popup")}
                className={`${CTA_GREEN} ${CTA_BASE} h-[max(40px,10.5cqw)] flex-1 text-[max(13px,3.7cqw)]`}
              >
                <Shimmer />
                <span className="relative">Tư vấn thêm</span>
              </a>
            </div>

            {/* Máy tính bảng / laptop / desktop: 1 nút, căn giữa theo trục 3 thẻ ưu đãi */}
            <div className="absolute left-[25.2%] top-[79.5%] hidden -translate-x-1/2 -translate-y-1/2 md:block">
              {/* Vòng sáng lan toả phía sau nút (nút có overflow-hidden cho hiệu ứng ánh kim) */}
              <span aria-hidden="true" className="absolute inset-0 animate-cta-pulse rounded-full bg-[#F1E4B8] motion-reduce:hidden" />
              <a
                href={SITE.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("zalo", "event-popup")}
                className={`${CTA_BASE} ${CTA_GOLD} h-[max(44px,4.6cqw)] whitespace-nowrap px-[max(22px,2.8cqw)] text-[max(14px,1.55cqw)]`}
              >
                <Shimmer />
                <span className="relative">Tư vấn thêm</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
