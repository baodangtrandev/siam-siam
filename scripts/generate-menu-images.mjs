// Tạo sẵn các kích thước ảnh menu để trình duyệt tải file tĩnh (có cache) thay vì chờ
// next/image nén ảnh lúc chạy. Chạy lại mỗi khi thay ảnh trong public/images/full-menu:
//   pnpm menu:images
//
// Đầu vào : public/images/full-menu/menu-page-XX.webp (ảnh gốc 1600px)
// Đầu ra  : public/images/full-menu/<width>/menu-page-XX.webp  (các kích thước responsive)
//           public/images/full-menu/thumb/menu-page-XX.webp    (thumbnail)
//           app/thuc-don/menu-placeholders.ts                   (ảnh mờ base64 hiện ngay lập tức)

import { mkdir, readdir, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const ROOT = path.resolve(import.meta.dirname, "..")
const SOURCE_DIR = path.join(ROOT, "public/images/full-menu")
const PLACEHOLDER_FILE = path.join(ROOT, "app/thuc-don/menu-placeholders.ts")

// Phải khớp với MENU_IMAGE_WIDTHS trong app/thuc-don/menu-image-loader.ts
const WIDTHS = [480, 800, 1200]
const THUMB_WIDTH = 112

const files = (await readdir(SOURCE_DIR)).filter((name) => /^menu-page-\d+\.webp$/.test(name)).sort()
const placeholders = []

for (const name of files) {
  const input = path.join(SOURCE_DIR, name)

  for (const width of WIDTHS) {
    const dir = path.join(SOURCE_DIR, String(width))
    await mkdir(dir, { recursive: true })
    await sharp(input).resize({ width }).webp({ quality: 78, effort: 6 }).toFile(path.join(dir, name))
  }

  const thumbDir = path.join(SOURCE_DIR, "thumb")
  await mkdir(thumbDir, { recursive: true })
  await sharp(input).resize({ width: THUMB_WIDTH }).webp({ quality: 60 }).toFile(path.join(thumbDir, name))

  const blur = await sharp(input).resize({ width: 12 }).webp({ quality: 40 }).toBuffer()
  placeholders.push(`  "data:image/webp;base64,${blur.toString("base64")}",`)
}

await writeFile(
  PLACEHOLDER_FILE,
  `// File tự sinh bởi scripts/generate-menu-images.mjs, không sửa tay.
/** Ảnh mờ siêu nhỏ cho từng trang menu (index 0 = trang 1). */
export const menuPlaceholders: string[] = [
${placeholders.join("\n")}
]
`,
)

console.log(`Đã tạo ảnh cho ${files.length} trang: ${WIDTHS.join(", ")}px, thumbnail ${THUMB_WIDTH}px và placeholder.`)
