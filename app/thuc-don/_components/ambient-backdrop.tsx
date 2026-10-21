"use client"

import { motion, useTransform, type MotionValue } from "framer-motion"
import type { Parallax } from "./use-parallax"

/** Hoa văn thổ cẩm Thái vẽ bằng SVG pattern (không cần ảnh ngoài). */
function ThaiSilkPattern({ id }: { id: string }) {
  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M22 2 42 22 22 42 2 22Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M22 11 33 22 22 33 11 22Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="22" cy="22" r="2.2" fill="currentColor" />
          <circle cx="0" cy="0" r="1.6" fill="currentColor" />
          <circle cx="44" cy="0" r="1.6" fill="currentColor" />
          <circle cx="0" cy="44" r="1.6" fill="currentColor" />
          <circle cx="44" cy="44" r="1.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Cánh sen: gradient hồng → kem, vẽ bằng SVG. */
function LotusPetal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lotus-petal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E35D9B" />
          <stop offset="55%" stopColor="#F6C9DC" />
          <stop offset="100%" stopColor="#FFF4EC" />
        </linearGradient>
      </defs>
      <path d="M30 2C48 22 58 48 52 72 47 90 38 98 30 98S13 90 8 72C2 48 12 22 30 2Z" fill="url(#lotus-petal)" />
      <path d="M30 10V90" stroke="#D9468A" strokeOpacity="0.25" strokeWidth="1" />
    </svg>
  )
}

interface PetalConfig {
  className: string
  /** Độ sâu parallax: càng lớn càng "gần" người xem. */
  depth: number
  rotate: number
  delay: number
}

const PETALS: PetalConfig[] = [
  { className: "left-[4%] top-[18%] w-10 md:w-14", depth: 34, rotate: -28, delay: 0.6 },
  { className: "right-[6%] top-[10%] w-8 md:w-11 opacity-80", depth: 18, rotate: 32, delay: 0.85 },
  { className: "right-[3%] bottom-[16%] w-12 md:w-16", depth: 46, rotate: 64, delay: 1.05 },
  { className: "left-[8%] bottom-[8%] w-7 md:w-9 opacity-70 blur-[1px]", depth: 12, rotate: -70, delay: 1.25 },
]

function FloatingPetal({ petal, parallax, animate }: { petal: PetalConfig; parallax: Parallax; animate: boolean }) {
  const x = useTransform(parallax.x, (v) => v * petal.depth)
  const y = useTransform(parallax.y, (v) => v * petal.depth)

  return (
    <motion.div className={`absolute will-change-transform ${petal.className}`} style={{ x, y }}>
      {/* Rơi vào khung hình, sau đó lơ lửng nhẹ */}
      <motion.div
        initial={animate ? { y: -260, opacity: 0, rotate: petal.rotate - 90 } : false}
        animate={{ y: 0, opacity: 1, rotate: petal.rotate }}
        transition={{ duration: 2.2, delay: petal.delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={animate ? { y: [0, -10, 0], rotate: [0, 6, 0] } : undefined}
          transition={{ duration: 6 + petal.depth / 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <LotusPetal className="w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function useLayer(value: MotionValue<number>, depth: number) {
  return useTransform(value, (v) => v * depth)
}

export default function AmbientBackdrop({ parallax, animate }: { parallax: Parallax; animate: boolean }) {
  const glowX = useLayer(parallax.x, -40)
  const glowY = useLayer(parallax.y, -30)
  const silkX = useLayer(parallax.x, 10)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ánh sáng ambient đất nung phía sau cuốn menu */}
      <motion.div
        className="absolute inset-x-[5%] inset-y-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(140,49,30,0.85),rgba(140,49,30,0.25)_55%,transparent)] blur-2xl will-change-transform"
        style={{ x: glowX, y: glowY }}
        initial={animate ? { opacity: 0, scale: 1.05 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      {/* Dải thổ cẩm vàng đồng hai bên */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[14%] max-w-48 text-brand-gold/25 [mask-image:linear-gradient(to_right,black,transparent)] will-change-transform"
        style={{ x: silkX }}
        initial={animate ? { opacity: 0, x: -40 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <ThaiSilkPattern id="silk-left" />
      </motion.div>
      <motion.div
        className="absolute inset-y-0 right-0 w-[14%] max-w-48 text-brand-gold/25 [mask-image:linear-gradient(to_left,black,transparent)] will-change-transform"
        style={{ x: silkX }}
        initial={animate ? { opacity: 0, x: 40 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <ThaiSilkPattern id="silk-right" />
      </motion.div>

      {PETALS.map((petal, index) => (
        <FloatingPetal key={index} petal={petal} parallax={parallax} animate={animate} />
      ))}
    </div>
  )
}
