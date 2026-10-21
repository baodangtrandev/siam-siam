import type { ImageLoaderProps } from "next/image"

/** Các kích thước đã tạo sẵn bởi scripts/generate-menu-images.mjs (ảnh gốc là 1600px). */
export const MENU_IMAGE_WIDTHS = [480, 800, 1200]

/**
 * Trỏ next/image tới ảnh tĩnh đã tạo sẵn thay vì /_next/image, nên không tốn thời gian
 * nén ảnh lúc chạy và file được CDN/trình duyệt cache lâu dài.
 */
export function menuImageLoader({ src, width }: ImageLoaderProps) {
  const size = MENU_IMAGE_WIDTHS.find((w) => w >= width)
  return size ? src.replace("/full-menu/", `/full-menu/${size}/`) : src
}

export const menuThumbSrc = (src: string) => src.replace("/full-menu/", "/full-menu/thumb/")
