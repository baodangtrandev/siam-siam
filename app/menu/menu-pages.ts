// Dữ liệu cho cuốn menu tương tác: danh sách trang ảnh, chương, hotspot và câu chuyện món ăn.
// Ảnh trang được tách từ các file PDF (rộng 1600px):
//   menu-page-XX.webp  : "Menu Siam Full.pdf" (A4 đứng, 1600x2263)
//   drink-page-XX.webp : "Drink Menu 25x25.pdf" trang 3-8 (vuông, 1600x1600)
//   chay-page-XX.webp  : "menu chay.pdf" (đứng, 1600x2399)
// Số trang hiển thị (1..MENU_PAGE_COUNT) là thứ tự trong cuốn menu online, KHÁC số trong tên file.

import { menuPlaceholders } from "./menu-placeholders"

export interface MenuPageImage {
  /** Tên file không đuôi, dùng làm khoá cho hotspot / câu chuyện / placeholder. */
  id: string
  /** Tỉ lệ rộng / cao của ảnh. */
  ratio: number
}

/** Tỉ lệ trang A4 của menu chính, dùng làm chuẩn cho bố cục. */
export const MENU_PAGE_RATIO = 1600 / 2263
const SQUARE_RATIO = 1
const VEGETARIAN_RATIO = 1600 / 2399

const pad = (n: number) => String(n).padStart(2, "0")
const pagesOf = (prefix: string, numbers: number[], ratio: number): MenuPageImage[] =>
  numbers.map((n) => ({ id: `${prefix}-page-${pad(n)}`, ratio }))
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i)
const main = (from: number, to: number) => pagesOf("menu", range(from, to), MENU_PAGE_RATIO)

interface ChapterDefinition {
  id: string
  title: string
  subtitle: string
  pages: MenuPageImage[]
}

/** Thứ tự chương của cuốn menu online. Đổi thứ tự ở đây là đổi thứ tự trên web. */
const chapterDefinitions: ChapterDefinition[] = [
  { id: "mo-dau", title: "Lời Mở Đầu", subtitle: "Welcome", pages: main(1, 2) },
  { id: "goi", title: "Gỏi", subtitle: "Salad", pages: main(15, 18) },
  { id: "hai-san", title: "Hải Sản", subtitle: "Seafood", pages: main(19, 26) },
  { id: "thit", title: "Thịt", subtitle: "Meat", pages: main(27, 30) },
  { id: "sup-lau", title: "Súp & Lẩu", subtitle: "Soup & Hotpot", pages: main(31, 33) },
  { id: "rau", title: "Rau", subtitle: "Vegetables", pages: main(34, 34) },
  { id: "com-mi", title: "Cơm & Mì", subtitle: "Rice & Noodles", pages: main(35, 38) },
  { id: "hoang-gia", title: "Hương Vị Hoàng Gia", subtitle: "Royal Selection", pages: main(3, 14) },
  { id: "chay", title: "Món Chay", subtitle: "Vegetarian", pages: pagesOf("chay", [1], VEGETARIAN_RATIO) },
  { id: "trang-mieng", title: "Tráng Miệng", subtitle: "Desserts", pages: main(39, 40) },
  { id: "nuoc", title: "Nước", subtitle: "Drinks", pages: pagesOf("drink", range(1, 6), SQUARE_RATIO) },
  { id: "lien-he", title: "Liên Hệ", subtitle: "Contact", pages: main(41, 42) },
]

/** Toàn bộ ảnh trang theo thứ tự hiển thị (index 0 = trang 1). */
export const menuPages: MenuPageImage[] = chapterDefinitions.flatMap((chapter) => chapter.pages)
export const MENU_PAGE_COUNT = menuPages.length

const imageOf = (page: number) => menuPages[page - 1]
export const menuPageSrc = (page: number) => `/images/full-menu/${imageOf(page).id}.webp`
export const menuPageRatio = (page: number) => imageOf(page)?.ratio ?? MENU_PAGE_RATIO
export const menuPagePlaceholder = (page: number) => menuPlaceholders[imageOf(page).id]

export interface MenuChapter {
  id: string
  title: string
  subtitle: string
  startPage: number
}

export const menuChapters: MenuChapter[] = chapterDefinitions.map(({ id, title, subtitle }, index) => ({
  id,
  title,
  subtitle,
  startPage: 1 + chapterDefinitions.slice(0, index).reduce((sum, chapter) => sum + chapter.pages.length, 0),
}))

export const chapterOfPage = (page: number) =>
  menuChapters.reduce((current, chapter) => (page >= chapter.startPage ? chapter : current), menuChapters[0])

/**
 * Trang đôi khi xem trên desktop: bìa đứng riêng, các trang đứng (A4) ghép cặp trong cùng một chương,
 * trang vuông (menu nước) vốn đã rộng nên đứng riêng. Chương lẻ trang thì trang cuối đứng riêng.
 */
export const menuSpreads: number[][] = (() => {
  const spreads: number[][] = [[1]]
  chapterDefinitions.forEach((chapter, index) => {
    const start = menuChapters[index].startPage
    const end = start + chapter.pages.length
    let pending: number | null = null
    for (let page = Math.max(start, 2); page < end; page++) {
      if (menuPageRatio(page) > 0.9) {
        if (pending) spreads.push([pending])
        spreads.push([page])
        pending = null
      } else if (pending) {
        spreads.push([pending, page])
        pending = null
      } else {
        pending = page
      }
    }
    if (pending) spreads.push([pending])
  })
  return spreads
})()

export const spreadIndexOfPage = (page: number) => menuSpreads.findIndex((spread) => spread.includes(page))

/** Chuyển dữ liệu khai báo theo ảnh (id) sang theo số trang hiển thị. */
const byPage = <T>(byImage: Record<string, T>): Record<number, T> =>
  Object.fromEntries(
    menuPages.flatMap((image, index) => (byImage[image.id] ? [[index + 1, byImage[image.id]]] : [])),
  ) as Record<number, T>

export interface MenuHotspot {
  id: string
  /** Toạ độ theo % chiều rộng / chiều cao trang. */
  x: number
  y: number
  title: string
  description: string
}

/** Điểm tương tác trên ảnh, đánh dấu từng nguyên liệu của món (khai báo theo ảnh). */
const hotspotsByImage: Record<string, MenuHotspot[]> = {
  "menu-page-03": [
    {
      id: "sot-miang",
      x: 50,
      y: 49,
      title: "Sốt Miang sánh mật",
      description: "Đường thốt nốt, nước mắm, tôm khô, riềng và sả rim lửa nhỏ đến khi sánh như mật ong.",
    },
    {
      id: "tom",
      x: 41,
      y: 32,
      title: "Tôm tươi chần",
      description: "Tôm sú chần vừa tới, giữ độ ngọt giòn, đặt làm “trái tim” của mỗi cánh sen.",
    },
    {
      id: "dau-phong",
      x: 21,
      y: 41,
      title: "Đậu phộng rang",
      description: "Rang thủ công trên chảo gang, tạo vị bùi béo và độ giòn đối lập với tôm.",
    },
    {
      id: "ot-hiem",
      x: 61,
      y: 37,
      title: "Ớt hiểm Thái",
      description: "Một lát ớt nhỏ đủ đánh thức vị giác: cay nhanh, thơm và tắt dịu ngay sau đó.",
    },
    {
      id: "hanh-tim",
      x: 72,
      y: 46.5,
      title: "Hành tím & gừng non",
      description: "Thái hạt lựu để tạo vị hăng ấm và cân bằng độ ngọt của nước sốt.",
    },
    {
      id: "chanh",
      x: 29,
      y: 67,
      title: "Chanh không hạt",
      description: "Thái cả vỏ, ăn nguyên miếng. Vị chua thanh và tinh dầu ở vỏ chanh là linh hồn của Miang Kham.",
    },
    {
      id: "canh-sen",
      x: 83,
      y: 78,
      title: "Cánh sen hồng",
      description: "Siam Siam thay lá cha plu truyền thống bằng cánh sen tươi, vừa là “chén” vừa mang hương thơm thanh khiết.",
    },
  ],
}

export interface MenuStory {
  title: string
  englishTitle: string
  price: string
  paragraphs: string[]
}

/** Câu chuyện món ăn, hiển thị bằng nút “Khám phá câu chuyện món ăn” (khai báo theo ảnh). */
const storiesByImage: Record<string, MenuStory> = {
  "menu-page-03": {
    title: "Miang Kham Hoa Sen",
    englishTitle: "Lotus Petal Miang Kham",
    price: "385.000",
    paragraphs: [
      "Miang Kham, nghĩa là “một miếng gói nhiều vị”, từng là món ăn nhẹ được dâng lên trong cung điện Thái Lan. Mỗi miếng là sự cân bằng hoàn hảo của chua, cay, mặn, ngọt và bùi.",
      "Tại Siam Siam, Bếp trưởng thay lá cha plu bằng cánh sen hồng tươi, xếp quanh đĩa gốm men ngọc như một bông sen đang nở. Thực khách tự tay rưới sốt Miang rồi thưởng thức trọn trong một lần cắn.",
    ],
  },
}

/** Hotspot / câu chuyện theo số trang hiển thị. */
export const menuHotspots = byPage(hotspotsByImage)
export const menuStories = byPage(storiesByImage)
