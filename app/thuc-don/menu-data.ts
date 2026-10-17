// This is a simplified representation. In a real app, this could come from a CMS or a more detailed database.
export interface MenuItem {
  name: string
  price: string
  description?: string
  image?: string // Optional image for featured items
}

export interface MenuCategory {
  id: string
  title: string
  items: MenuItem[]
}

const dishImagesPath = "/images/dishes"

export const menuData: MenuCategory[] = [
  {
    id: "goi-salad",
    title: "CÁC MÓN GỎI - SALAD",
    items: [
      { name: "Gỏi Xoài Cá Trên Chiên Giòn", price: "185.000" },
      { name: "Gỏi Bắp Mỹ Trứng Muối", price: "135.000" },
      { name: "Gỏi Đu Đủ Ba Khía", price: "135.000" },
      { name: "Gỏi Đu Đủ Tôm Khô", price: "115.000" },
      { name: "Gỏi Hàu Sữa", price: "155.000" },
      { name: "Gỏi Sò Huyết", price: "235.000" },
      { name: "Gỏi Đu Đủ Cá Hồi Mắm Nêm Thái", price: "215.000" },
      {
        name: "Gỏi Miến Hải Sản",
        price: "215.000",
        image: `${dishImagesPath}/yum-woon-sen-seafood-salad.jpg`,
      }, // Food 5
    ],
  },
  {
    id: "hai-san",
    title: "HẢI SẢN",
    items: [
      { name: "Tôm Sống Nước Mắm", price: "215.000" },
      { name: "Tôm Xào Cà Ri", price: "215.000" },
      { name: "Tôm Chiên Muối Ớt", price: "215.000" },
      { name: "Mực Hấp Chanh", price: "225.000" },
      { name: "Mực Sa Tế", price: "225.000" },
      { name: "Mực Xào Lá Hương Nhu", price: "225.000" },
      { name: "Larb Mực", price: "185.000" },
      { name: "Sò Điệp Xốt X.O", price: "255.000" },
      { name: "Hàu Sữa Sống Sốt Thái", price: "155.000/con" },
      { name: "Hàu Chiên Trứng", price: "165.000" },
      { name: "Cá Tuyết Hấp Xì Dầu", price: "455.000" },
      { name: "Cá Chẽm Fillet Chiên Tỏi", price: "385.000" },
      { name: "Cá Chẽm Fillet Hấp Chanh", price: "385.000" },
      { name: "Cá Chẽm Fillet Hấp Xì Dầu", price: "385.000" },
      { name: "Thịt Cua Xào Cà Ri", price: "315.000", image: `${dishImagesPath}/crab-curry.jpg` }, // Food 8
      { name: "Mai Cua Siam Siam", price: "215.000" },
      { name: "Cua Lột Sốt Trứng Muối", price: "455.000" },
      { name: "Cua Lột Chiên Tỏi", price: "455.000" },
      { name: "Cua Xào Cà Ri", price: "Theo thời giá", image: `${dishImagesPath}/crab-curry.jpg` }, // Food 8
      { name: "Cua Rang Me", price: "Theo thời giá" },
      { name: "Cua Sốt Trứng Muối", price: "Theo thời giá" },
      {
        name: 'Tháp Sườn Núi "Ko Tapu" Chua Cay',
        price: "To: 435.000<br>Nhỏ: 355.000",
        image: `${dishImagesPath}/thai-spicy-meat-skewers.jpg`,
      }, // Image "Food 1" has this
    ],
  },
  {
    id: "thit",
    title: "THỊT",
    items: [
      { name: "Thịt Bò Xào Lá Hương Nhu", price: "195.000" },
      { name: "Thịt Heo Sốt Chanh", price: "155.000" },
      { name: "Thịt Heo (Bò) Cà Ri Đỏ", price: "155.000/195.000" },
      { name: "Bò Nướng Siam Siam", price: "235.000" },
      { name: "Cổ Heo Nướng", price: "155.000" },
      { name: "Larb Heo Bằm", price: "135.000" },
      { name: "Trứng Chiên Heo Bằm", price: "95.000" },
      { name: "Cánh Gà Lá Dứa", price: "115.000" },
      { name: "Cánh Gà Muối Ớt", price: "155.000" },
      { name: "Cánh Gà Sốt Rượu Vang", price: "155.000" },
      { name: "Larb Trứng Lòng Đào", price: "95.000" },
    ],
  },
  {
    id: "sup",
    title: "SÚP",
    items: [
      { name: "Soup Tomyum", price: "185.000" },
      { name: "Soup Tomyum Sa Tế", price: "185.000" },
      { name: "Soup Tomyum Sườn Non", price: "185.000", image: `${dishImagesPath}/thai-green-curry-noodles.jpg` }, // Image "Food 1" has this
      { name: "Soup Tomyum Nước Trong", price: "185.000" },
      { name: "Soup Gà Nước Dừa", price: "185.000" },
      { name: "Soup Tomyum Gà Lá Me Non", price: "185.000" },
    ],
  },
  {
    id: "lau",
    title: "LẨU",
    items: [
      { name: "Lẩu Tomyum", price: "695.000" },
      { name: "Lẩu Hầm Xương", price: "695.000" },
      { name: "Lẩm Siam Siam", price: "695.000" },
    ],
  },
  {
    id: "do-nhung-lau",
    title: "ĐỒ NHÚNG LẨU",
    items: [
      { name: "Ba Chỉ Bò Mỹ", price: "135.000" },
      { name: "Bắp Bò Mỹ", price: "195.000" },
      { name: "Mực", price: "175.000" },
      { name: "Tôm Sú", price: "135.000" },
      { name: "Rau Muống", price: "25.000" },
      { name: "Cải Thảo", price: "25.000" },
      { name: "Nấm Kim Châm", price: "25.000" },
      { name: "Cải Chíp", price: "25.000" },
      { name: "Đậu Hũ", price: "25.000" },
      { name: "Mì Gói", price: "15.000" },
      { name: "Miến Thái", price: "45.000" },
    ],
  },
  {
    id: "rau",
    title: "RAU",
    items: [
      { name: "Rau Muống Xào Tỏi", price: "65.000" },
      { name: "Rau Nhút Xào Tỏi", price: "65.000" },
      { name: "Đậu Bắp Xào Tỏi", price: "65.000" },
      { name: "Bông Cải Xào Heo Quay", price: "165.000" },
      { name: "Ngọn Su Su Xào Đậu Tương", price: "85.000" },
      { name: "Rau Thập Cẩm Sốt Đỏ", price: "85.000" },
      { name: "Rau Xào Thập Cẩm Tôm", price: "65.000" },
      { name: "Rau Xào Thập Cẩm", price: "85.000" },
    ],
  },
  {
    id: "com-mi",
    title: "CƠM & MÌ",
    items: [
      { name: "Cơm Chiên Trái Thơm", price: "215.000", image: `${dishImagesPath}/thai-green-curry-noodles.jpg` }, // Image "Food 1" has this
      { name: "Xôi Nếp", price: "25.000" },
      { name: "Cơm Trắng", price: "25.000" },
      { name: "Cơm Chiên Xe Lửa", price: "165.000" },
      { name: "Cơm Chiên Hải Sản", price: "195.000" },
      { name: "Cơm Cháy Sốt Thịt", price: "155.000" },
      { name: "Cơm Mắm Ruốc", price: "185.000" },
      { name: "Pad Thái Tôm", price: "195.000", image: `${dishImagesPath}/pad-thai-shrimp.jpg` }, // Food 6
      { name: "Pad Thái Bọc Trứng", price: "215.000" },
      { name: "Ma Ma Tomyum", price: "195.000", image: `${dishImagesPath}/tom-yum-mama-noodles.jpg` }, // Food 7
      { name: "Mì Chiên Giòn Hải Sản", price: "215.000" },
      { name: "Hủ Tiếu Xào Hắc Xì Dầu Hải Sản", price: "215.000" },
    ],
  },
  {
    id: "menu-hoang-gia",
    title: "MENU HOÀNG GIA",
    items: [
      {
        name: "Miang Kham Hoa Sen",
        price: "385.000",
        image: `${dishImagesPath}/miang-kham-lotus-petals.jpg`,
      }, // Food 4
      { name: "Rau Củ Chấm Mắm Thái", price: "175.000" },
      { name: "Rau Củ Chấm Đậu Tương Ba Khía", price: "155.000" },
      { name: "Bò Wagyu Kiểu Thái (Tái/Chín)", price: "395.000" },
      { name: "Hải Sâm Xào Lá Hương Nhu", price: "455.000" },
      { name: "Cua Hoàng Đế Xào Cà Ri", price: "Theo Thời Giá" },
      { name: "Cua Hoàng Đế Chiên Tỏi", price: "Theo Thời Giá" },
      { name: "Cua Hoàng Đế Sốt Trứng Muối", price: "Theo Thời Giá" },
      { name: "Cua Hoàng Đế Sốt Tiêu Đen", price: "Theo Thời Giá" },
      {
        name: "Gỏi Tôm Càng Với Trứng Lòng Đào",
        price: "495.000",
        image: `${dishImagesPath}/grilled-river-prawn-with-eggs.jpg`,
      }, // Food 3
      {
        name: "Tôm Càng Nướng Chấm Sốt Hải Sản Xanh",
        price: "495.000",
        image: `${dishImagesPath}/grilled-river-prawn-with-eggs.jpg`,
      }, // Food 3
      { name: "Tôm Càng Sốt Cà Ri Xanh", price: "495.000" },
      { name: "Spaghetti Sốt Tomyum", price: "475.000" },
      { name: "Miến Hấp Bào Ngư, Hải Sâm", price: "955.000" },
      { name: "Bào Ngư Sốt Nấm Trffle", price: "695.000" },
      { name: "Cà Ri Xanh Bào Ngư", price: "635.000" },
      { name: 'Thịt Cua "Chung Cư" Sốt Cà Ri Xanh', price: "315.000" },
      { name: "Vẹm Xanh Newzealand Sốt Cà Ri Đỏ", price: "215.000" },
      { name: "Vịt Cà Ri Xanh", price: "185.000" },
      { name: "Cá Hồi Sốt Siam Siam", price: "255.000", image: `${dishImagesPath}/salmon-skewers.jpg` }, // Food 2
      { name: "Cua Gạch Cà Mau Sốt Cari Đỏ", price: "945.000" },
      { name: "Hải Sản Lạnh Sốt Siam Siam", price: "615.000" },
      { name: "Chả Cua", price: "299.000" },
      { name: "Salad Cá Hồi Thảo Mộc", price: "245.000" },
      { name: "Gỏi Tôm Bưởi", price: "220.000" },
      { name: "Soup Bào Ngư Hải Sâm", price: "499.000" },
    ],
  },
  {
    id: "xoi-che",
    title: "XÔI/CHÈ",
    items: [
      { name: "Xôi Xoài", price: "95.000" },
      { name: "Kem Xôi Xoài", price: "115.000" },
      { name: "Xôi Mít", price: "95.000" },
      { name: "Kem Xôi Mít", price: "115.000" },
      { name: "Xôi Sầu Riêng", price: "155.000" },
      { name: "Chè Thái", price: "55.000" },
      { name: "Bạch Quả Sữa Tươi", price: "55.000" },
      { name: "Bạch Quả Nóng", price: "55.000" },
    ],
  },
  {
    id: "signature-cocktails",
    title: "SIGNATURE COCKTAILS",
    items: [
      { name: "Amber Kiss", price: "225.000<br>1.000.000/bottle (4-6 pax)" },
      { name: "Tropical Jade", price: "225.000<br>1.000.000/bottle (4-6 pax)" },
      { name: "Siam Ganesha", price: "225.000" },
      { name: "Siam Makabucha", price: "225.000" },
      { name: "Siam Songkran", price: "225.000" },
    ],
  },
  {
    id: "siam-siam-mocktails",
    title: "SIAM SIAM MOCKTAILS",
    items: [
      { name: "Sunset In Siam", price: "95.000" },
      { name: "Coconut Cloud", price: "95.000" },
      { name: "Blooming Siam", price: "95.000" },
      { name: "Jungle Cooler", price: "95.000" },
      { name: "Temple Garden", price: "95.000" },
      { name: "Yogurt Sparkle", price: "95.000" },
      { name: "Sawasdee Summer", price: "95.000" },
      { name: "Tamarind Dream", price: "95.000" },
    ],
  },
  {
    id: "tra",
    title: "TRÀ",
    items: [
      { name: "Trà Thái Đỏ", price: "55.000" },
      { name: "Trà Thái Xanh", price: "55.000" },
      { name: "Trà Chanh Thái", price: "55.000" },
    ],
  },
  {
    id: "nuoc-ep",
    title: "NƯỚC ÉP",
    items: [
      { name: "Nước Ép Cam", price: "65.000" },
      { name: "Nước Ép Dưa Hấu", price: "65.000" },
      { name: "Nước Ép Chanh Dây", price: "65.000" },
    ],
  },
  {
    id: "soft-drink",
    title: "SOFT DRINK",
    items: [
      { name: "Coca - Cola", price: "30.000" },
      { name: "7UP", price: "30.000" },
      { name: "Soda Schweppe", price: "30.000" },
      { name: "Trà Sâm Dứa", price: "30.000" },
      { name: "Lavie", price: "30.000" },
      { name: "Sparling Lavie", price: "75.000" },
      { name: "Dừa Xiêm Siam Siam", price: "60.000" },
    ],
  },
  {
    id: "beer",
    title: "BEER",
    items: [
      { name: "Sài Gòn", price: "65.000" },
      { name: "Tiger Crystal", price: "65.000" },
      { name: "Chang", price: "75.000" },
    ],
  },
  {
    id: "white-wines",
    title: "WHITE WINES",
    items: [
      { name: "Moye Sauvignon Blanc (Chile)", price: "855.000" },
      { name: "Châuteau L'Hermitage (Pháp)", price: "1.550.000" },
      { name: "Pasione Sentimento Bianco Veneto IGT (Ý)", price: "1.650.000" },
    ],
  },
  {
    id: "red-wines",
    title: "RED WINES",
    items: [
      { name: "6 Paths (Chile)", price: "855.000" },
      { name: "Vin de Bordeaux Portes Gironde (Pháp)", price: "1.550.000" },
      { name: "Pasione Sentimento Bianco Veneto IGT (Ý)", price: "1.650.000" }, // Note: Same name as a white wine in the doc, assuming it's distinct or a typo in source.
    ],
  },
  {
    id: "whisky-thai",
    title: "WHISKY THAI",
    items: [
      { name: "Mekhong Bangykhan Thái Lan", price: "1.100.000" },
      { name: "Blend 285 Thái Lan 700ml", price: "750.000" },
      { name: "Blend 285 Blended Thái Lan 700ml", price: "750.000" },
    ],
  },
]
