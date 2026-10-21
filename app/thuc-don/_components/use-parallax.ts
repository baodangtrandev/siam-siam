"use client"

import { useEffect, useState, type RefObject } from "react"
import { useMotionValue, useSpring, type MotionValue } from "framer-motion"

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 }

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [query])

  return matches
}

export interface Parallax {
  /** Vị trí con trỏ / độ nghiêng đã chuẩn hoá về khoảng -1..1, đã qua spring. */
  x: MotionValue<number>
  y: MotionValue<number>
}

/**
 * Theo dõi chuột (desktop) hoặc con quay hồi chuyển (mobile) để điều khiển parallax đa tầng.
 * Giá trị được ghi thẳng vào MotionValue nên không gây re-render React, framer-motion
 * gom cập nhật theo requestAnimationFrame và chỉ biến đổi transform (GPU).
 */
export function useParallax(ref: RefObject<HTMLElement | null>, enabled: boolean): Parallax {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  useEffect(() => {
    const element = ref.current
    if (!enabled || !element) {
      rawX.set(0)
      rawY.set(0)
      return
    }

    let frame = 0
    const schedule = (nextX: number, nextY: number) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        rawX.set(Math.max(-1, Math.min(1, nextX)))
        rawY.set(Math.max(-1, Math.min(1, nextY)))
      })
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      const rect = element.getBoundingClientRect()
      schedule(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1)
    }
    const onPointerLeave = () => schedule(0, 0)

    // Android và trình duyệt cho phép sẵn; iOS cần xin quyền nên chỉ dùng chuột/chạm.
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return
      schedule(event.gamma / 30, (event.beta - 45) / 30)
    }
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches

    element.addEventListener("pointermove", onPointerMove)
    element.addEventListener("pointerleave", onPointerLeave)
    if (hasCoarsePointer) window.addEventListener("deviceorientation", onOrientation)

    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener("pointermove", onPointerMove)
      element.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("deviceorientation", onOrientation)
    }
  }, [ref, enabled, rawX, rawY])

  return { x, y }
}
