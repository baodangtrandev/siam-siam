"use client"

import { motion } from "framer-motion"
import { LotusPetal } from "./ambient-backdrop"

interface GapPetalsProps {
  /** Góc đặt cụm cánh sen: phía trên hoặc dưới trang, bên trái hoặc phải. */
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /** Chỉ lơ lửng ở trang đang xem để tiết kiệm hiệu năng. */
  float: boolean
}

/**
 * Cụm 2 cánh sen rụng đặt trong khoảng trống phía trên / dưới trang menu (điện thoại màn dài).
 * Chiều cao lấy từ biến CSS `--gap-petal-h` (tính theo khoảng trống thực tế), chỉ ló vào mép
 * trang ~10px nên không che chữ.
 */
export default function GapPetals({ position, float }: GapPetalsProps) {
  const top = position.startsWith("top")
  const left = position.endsWith("left")

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 aspect-[2/1] ${top ? "bottom-full translate-y-[10px]" : "top-full -translate-y-[10px]"} ${
        left ? "left-2" : "right-2"
      }`}
      style={{ height: "var(--gap-petal-h)" }}
    >
      {/* Lật để cụm cánh luôn hướng từ góc trang vào trong */}
      <div className="relative h-full" style={{ transform: `scale(${left ? 1 : -1}, ${top ? 1 : -1})` }}>
        <motion.div
          className="absolute left-[6%] top-[4%] h-[92%] drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]"
          style={{ rotate: -64 }}
          animate={float ? { y: [0, -3, 0], rotate: [-64, -60, -64] } : { y: 0, rotate: -64 }}
          transition={float ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }}
        >
          <LotusPetal className="h-full w-auto" />
        </motion.div>
        <motion.div
          className="absolute left-[50%] top-[22%] h-[64%] opacity-90 drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)]"
          style={{ rotate: 22 }}
          animate={float ? { y: [0, 2, 0], rotate: [22, 28, 22] } : { y: 0, rotate: 22 }}
          transition={float ? { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 } : { duration: 0.6 }}
        >
          <LotusPetal className="h-full w-auto" />
        </motion.div>
      </div>
    </div>
  )
}
