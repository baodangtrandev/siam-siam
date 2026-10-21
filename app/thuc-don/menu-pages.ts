// Dữ liệu cho cuốn menu tương tác: danh sách trang ảnh, chương, hotspot và câu chuyện món ăn.
// Ảnh trang được tách từ "Menu Siam Full.pdf" (mỗi trang PDF = 1 ảnh webp 1600x2263).

export const MENU_PAGE_COUNT = 42
export const MENU_PAGE_WIDTH = 1600
export const MENU_PAGE_HEIGHT = 2263
export const MENU_PAGE_RATIO = MENU_PAGE_WIDTH / MENU_PAGE_HEIGHT

export const menuPageSrc = (page: number) => `/images/full-menu/menu-page-${String(page).padStart(2, "0")}.webp`

export interface MenuChapter {
  id: string
  title: string
  subtitle: string
  startPage: number
}

/** Các chương theo đúng thứ tự trong cuốn menu in. */
export const menuChapters: MenuChapter[] = [
  { id: "mo-dau", title: "Lời Mở Đầu", subtitle: "Welcome", startPage: 1 },
  { id: "hoang-gia", title: "Hương Vị Hoàng Gia", subtitle: "Royal Selection", startPage: 3 },
  { id: "goi", title: "Gỏi", subtitle: "Salad", startPage: 15 },
  { id: "hai-san", title: "Hải Sản", subtitle: "Seafood", startPage: 19 },
  { id: "thit", title: "Thịt", subtitle: "Meat", startPage: 27 },
  { id: "sup-lau", title: "Súp & Lẩu", subtitle: "Soup & Hotpot", startPage: 31 },
  { id: "rau", title: "Rau", subtitle: "Vegetables", startPage: 34 },
  { id: "com-mi", title: "Cơm & Mì", subtitle: "Rice & Noodles", startPage: 35 },
  { id: "trang-mieng", title: "Tráng Miệng", subtitle: "Desserts", startPage: 39 },
  { id: "lien-he", title: "Liên Hệ", subtitle: "Contact", startPage: 41 },
]

export const chapterOfPage = (page: number) =>
  menuChapters.reduce((current, chapter) => (page >= chapter.startPage ? chapter : current), menuChapters[0])

/**
 * Trang đôi khi xem trên desktop. Trong bản in, trang lẻ (từ trang 3) nằm bên trái,
 * nên bìa (1) và lời mở đầu (2) đứng riêng, sau đó ghép [3,4], [5,6], ... [41,42].
 */
export const menuSpreads: number[][] = [
  [1],
  [2],
  ...Array.from({ length: (MENU_PAGE_COUNT - 2) / 2 }, (_, i) => [3 + i * 2, 4 + i * 2]),
]

export const spreadIndexOfPage = (page: number) => menuSpreads.findIndex((spread) => spread.includes(page))

export interface MenuHotspot {
  id: string
  /** Toạ độ theo % chiều rộng / chiều cao trang. */
  x: number
  y: number
  title: string
  description: string
}

/** Điểm tương tác trên ảnh, đánh dấu từng nguyên liệu của món. */
export const menuHotspots: Record<number, MenuHotspot[]> = {
  3: [
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

/** Câu chuyện món ăn, hiển thị bằng nút “Khám phá câu chuyện món ăn”. */
export const menuStories: Record<number, MenuStory> = {
  3: {
    title: "Miang Kham Hoa Sen",
    englishTitle: "Lotus Petal Miang Kham",
    price: "385.000",
    paragraphs: [
      "Miang Kham, nghĩa là “một miếng gói nhiều vị”, từng là món ăn nhẹ được dâng lên trong cung điện Thái Lan. Mỗi miếng là sự cân bằng hoàn hảo của chua, cay, mặn, ngọt và bùi.",
      "Tại Siam Siam, Bếp trưởng thay lá cha plu bằng cánh sen hồng tươi, xếp quanh đĩa gốm men ngọc như một bông sen đang nở. Thực khách tự tay rưới sốt Miang rồi thưởng thức trọn trong một lần cắn.",
    ],
  },
}
