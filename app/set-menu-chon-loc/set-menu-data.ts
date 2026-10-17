export interface Dish {
  name: string
  price: string
  quote?: string
}

export interface Course {
  title: string
  dishes: Dish[]
}

export interface SetMenuOption {
  id: string
  title: string
  optionPrice: string
  courses: Course[]
  totalCalculatedPrice: string
  totalNote?: string
  backgroundImage?: string
}

export interface ChefSelectedSet {
  id: string
  mainTitle: string
  priceBadge: string
  targetCustomer: string
  options: SetMenuOption[]
  chefQuote: string
  chefSignature: string
  backgroundImage: string
}

export const chefSelectedSets: ChefSelectedSet[] = [
  {
    id: "set1-couple",
    mainTitle: '👑 SET 1: CẶP ĐÔI HẸN HÒ "KING & QUEEN"',
    priceBadge: "1.8M - 2.5M (2 người)",
    targetCustomer: "🎯 Dành cho cặp đôi hẹn hò, kỷ niệm, cầu hôn",
    backgroundImage: "/images/set-menu/set-1-background.jpeg", // Updated image
    options: [
      {
        id: "set1-optionA",
        title: 'OPTION A: "ROMANTIC JOURNEY"',
        optionPrice: "~1.85M cho 2 người",
        courses: [
          {
            title: "🥗 Khai vị",
            dishes: [
              {
                name: "Gỏi Đu Đủ Tôm Khô",
                price: "115.000",
                quote: "Vị chua thanh mát của đu đủ xanh giòn tan, hòa quyện hương thơm đậm đà của tôm khô.",
              },
            ],
          },
          {
            title: "🍲 Soup",
            dishes: [
              {
                name: "Soup Gà Nước Dừa",
                price: "185.000",
                quote:
                  "Tom Kha Gai - món soup hoàng gia với nước dừa tươi, thịt gà mềm, vị ngọt dịu, thơm lừng mùi sả chanh.",
              },
            ],
          },
          {
            title: "🦐 Hải sản",
            dishes: [
              {
                name: "Tôm Xào Cà Ri",
                price: "215.000",
                quote:
                  "Tôm sú tươi trong lớp áo cà ri vàng rực. Vị cay nhẹ hòa quyện nước cốt dừa, tinh tế và sang trọng.",
              },
            ],
          },
          {
            title: "🥩 Thịt",
            dishes: [
              {
                name: "Thịt Heo Cà Ri Đỏ",
                price: "155.000",
                quote: "Thịt heo mềm, thấm đẫm trong cà ri đỏ truyền thống, vị đậm đà, cay nồng ấm áp.",
              },
            ],
          },
          {
            title: "🥬 Rau & Cơm",
            dishes: [
              { name: "Rau Muống Xào Tỏi", price: "65.000" },
              {
                name: "Cơm Chiên Trái Thơm",
                price: "215.000",
                quote: "Cơm chiên thơm lừng trong quả thơm tươi, vị ngọt tự nhiên hòa với cơm dẻo và hạt điều.",
              },
            ],
          },
          {
            title: "🍮 Tráng miệng",
            dishes: [
              { name: "Xôi Xoài", price: "95.000", quote: "Xôi nếp dẻo thơm, xoài ngọt lịm và nước cốt dừa béo ngậy." },
            ],
          },
          {
            title: "🥤 Đồ uống",
            dishes: [
              { name: "Signature Cocktails x2", price: "450.000" },
              { name: "Trà Thái Đỏ x2", price: "110.000" },
            ],
          },
        ],
        totalCalculatedPrice: "Tổng cộng: ~1.605.000 VND",
        totalNote: "Bao gồm service charge & atmosphere",
      },
      {
        id: "set1-optionB",
        title: 'OPTION B: "ROYAL ROMANCE"',
        optionPrice: "~2.35M cho 2 người",
        courses: [
          {
            title: "🥗 Khai vị",
            dishes: [
              {
                name: "Gỏi Xoài Cá Trên Chiên Giòn",
                price: "185.000",
                quote:
                  "Xoài xanh giòn tan, cá trên chiên vàng rụm. Sự tương phản kết cấu hoàn hảo, tạo ấn tượng mạnh mẽ.",
              },
            ],
          },
          {
            title: "🍲 Soup",
            dishes: [
              {
                name: "Soup Tomyum Sa Tế",
                price: "185.000",
                quote: "Tom Yum nâng tầm với sa tế cay nồng, thơm và đậm vị.",
              },
            ],
          },
          {
            title: "🦀 Hải sản (Menu Hoàng Gia)",
            dishes: [
              {
                name: "Mai Cua Siam Siam",
                price: "215.000",
                quote: "Signature dish độc quyền với thịt cua tươi ngọt.",
              },
              {
                name: "Cá Hồi Sốt Siam Siam",
                price: "255.000",
                quote: "Cá hồi cao cấp với sốt bí truyền của hoàng gia Thái.",
              },
            ],
          },
          {
            title: "🥩 Thịt đặc biệt",
            dishes: [
              {
                name: "Bò Nướng Siam Siam",
                price: "235.000",
                quote: "Thịt bò hảo hạng được ướp công thức bí truyền 24h.",
              },
            ],
          },
          {
            title: "🍜 Mì đặc biệt",
            dishes: [
              {
                name: "Pad Thái Bọc Trứng",
                price: "215.000",
                quote: "Pad Thái chuẩn vị được bao bọc trong lớp trứng vàng óng.",
              },
            ],
          },
          {
            title: "🍮 Tráng miệng cao cấp",
            dishes: [
              { name: "Kem Xôi Xoài", price: "115.000" },
              { name: "Xôi Sầu Riêng", price: "155.000" },
            ],
          },
          {
            title: "🍷 Đồ uống Premium",
            dishes: [{ name: "White Wine (Chile)", price: "855.000" }],
          },
        ],
        totalCalculatedPrice: "Tổng cộng: ~2.415.000 VND",
        totalNote: "Bao gồm service premium & romantic setup",
      },
    ],
    chefQuote:
      "Tôi thiết kế set này để tạo ra những khoảnh khắc thân mật. Mỗi món ăn khuyến khích sự chia sẻ và trò chuyện, tạo nên kỷ niệm đẹp cho cặp đôi.",
    chefSignature: "- Chef Thái, 16 năm kinh nghiệm ẩm thực Hoàng Gia",
  },
  {
    id: "set2-business",
    mainTitle: '🤝 SET 2: TIẾP KHÁCH 4 NGƯỜI "BUSINESS HARMONY"',
    priceBadge: "3M - 4M (4 người)",
    targetCustomer: "🎯 Dành cho bữa trưa/tối kinh doanh, gặp gỡ đối tác",
    backgroundImage: "/images/set-menu/set-2-background.jpeg", // Updated image
    options: [
      {
        id: "set2-optionA",
        title: 'OPTION A: "EXECUTIVE FEAST"',
        optionPrice: "~3.2M cho 4 người",
        courses: [
          {
            title: "🥗 Khai vị ấn tượng",
            dishes: [
              { name: "Gỏi Miến Hải Sản", price: "215.000", quote: "Món khai vị tinh tế với miến và hải sản cao cấp." },
              {
                name: "Gỏi Bắp Mỹ Trứng Muối",
                price: "135.000",
                quote: "Sự kết hợp độc đáo giữa bắp mỹ ngọt và trứng muối béo ngậy.",
              },
            ],
          },
          {
            title: "🍲 Soup đặc sắc",
            dishes: [
              {
                name: "Soup Tomyum Sườn Non",
                price: "185.000",
                quote: "Tom Yum cổ điển với sườn non mềm, tạo không khí thư giãn.",
              },
            ],
          },
          {
            title: "🦐 Hải sản cao cấp",
            dishes: [
              {
                name: "Thịt Cua Xào Cà Ri",
                price: "315.000",
                quote: "Cà ri cua hảo hạng thể hiện sự trân trọng dành cho khách quý.",
              },
              { name: "Mực Sa Tế", price: "225.000", quote: "Mực mềm với hỗn hợp gia vị sa tế thơm nồng." },
            ],
          },
          {
            title: "🥩 Thịt chính",
            dishes: [
              { name: "Thịt Bò Xào Lá Hương Nhu", price: "195.000" },
              { name: "Cánh Gà Sốt Rượu Vang", price: "155.000" },
            ],
          },
          {
            title: "🥬 Rau & Cơm",
            dishes: [
              { name: "Bông Cải Xào Heo Quay", price: "165.000" },
              { name: "Cơm Chiên Hải Sản", price: "195.000" },
            ],
          },
          { title: "🍮 Tráng miệng", dishes: [{ name: "Chè Thái x4", price: "220.000" }] },
          {
            title: "🍺 Đồ uống",
            dishes: [
              { name: "Tiger Crystal x8", price: "520.000" },
              { name: "Trà Chanh Thái x4", price: "220.000" },
            ],
          },
        ],
        totalCalculatedPrice: "Tổng cộng: ~2.905.000 VND",
        totalNote: "Phù hợp tiếp khách và tạo ấn tượng",
      },
      {
        id: "set2-optionB",
        title: 'OPTION B: "PREMIUM BUSINESS"',
        optionPrice: "~3.8M cho 4 người",
        courses: [
          {
            title: "🥗 Khai vị đặc biệt",
            dishes: [
              { name: "Gỏi Sò Huyết", price: "235.000" },
              { name: "Gỏi Đu Đủ Cá Hồi Mắm Nêm Thái", price: "215.000" },
            ],
          },
          { title: "🍲 Soup cao cấp", dishes: [{ name: "Soup Tomyum Gà Lá Me Non", price: "185.000" }] },
          {
            title: "🐟 Hải sản premium",
            dishes: [
              { name: "Cá Chẽm Fillet Hấp Xì Dầu", price: "385.000" },
              { name: "Sò Điệp Xốt X.O", price: "255.000" },
            ],
          },
          { title: "🥩 Thịt đặc sắc", dishes: [{ name: "Bò Nướng Siam Siam", price: "235.000" }] },
          {
            title: "🍜 Mì & Cơm",
            dishes: [
              { name: "Mì Chiên Giòn Hải Sản", price: "215.000" },
              { name: "Cơm Mắm Ruốc", price: "185.000" },
            ],
          },
          { title: "🥬 Rau cao cấp", dishes: [{ name: "Rau Thập Cẩm Sốt Đỏ", price: "85.000" }] },
          { title: "🍮 Tráng miệng", dishes: [{ name: "Bạch Quả Sữa Tươi x4", price: "220.000" }] },
          {
            title: "🍷 Đồ uống Premium",
            dishes: [
              { name: "Red Wine (Chile)", price: "855.000" },
              { name: "Chang Beer x4", price: "300.000" },
            ],
          },
        ],
        totalCalculatedPrice: "Tổng cộng: ~3.575.000 VND",
        totalNote: "Premium experience cho khách VIP",
      },
    ],
    chefQuote:
      "Set menu cho doanh nhân cần cân bằng giữa trình bày ấn tượng và sự tiện lợi. Tôi chọn các món dễ chia sẻ để cuộc trò chuyện diễn ra tự nhiên.",
    chefSignature: "- Chef Thái, chuyên gia ẩm thực business dining",
  },
  {
    id: "set3-family",
    mainTitle: '👨‍👩‍👧‍👦 SET 3: GIA ĐÌNH 6 NGƯỜI "MULTI-GENERATION FEAST"',
    priceBadge: "5M - 6M (6 người)",
    targetCustomer: "🎯 Dành cho gia đình đa thế hệ, thân thiện với trẻ em và người lớn tuổi",
    backgroundImage: "/images/set-menu/set-3-background.jpeg", // Updated image
    options: [
      {
        id: "set3-optionA",
        title: 'OPTION A: "FAMILY BANQUET"',
        optionPrice: "~5.2M cho 6 người",
        courses: [
          {
            title: "🥗 Khai vị đa dạng",
            dishes: [
              { name: "Gỏi Đu Đủ Ba Khía", price: "135.000", quote: "Gỏi đu đủ ít cay, phù hợp với mọi lứa tuổi." },
              {
                name: "Gỏi Bắp Mỹ Trứng Muối",
                price: "135.000",
                quote: "Món ăn sáng tạo với bắp ngọt và trứng muối béo ngậy.",
              },
            ],
          },
          {
            title: "🍲 Soup cho cả nhà",
            dishes: [
              { name: "Soup Tomyum", price: "185.000", quote: "Tom Yum cổ điển với vị cay cân bằng." },
              {
                name: "Soup Gà Nước Dừa",
                price: "185.000",
                quote: "Soup gà dừa dịu nhẹ, được người lớn tuổi và trẻ em yêu thích.",
              },
            ],
          },
          {
            title: "🦐 Hải sản gia đình",
            dishes: [
              { name: "Tôm Sống Nước Mắm", price: "215.000" },
              { name: "Hàu Chiên Trứng", price: "165.000", quote: "Món ăn quen thuộc, trứng chiên giòn với hàu tươi." },
            ],
          },
          {
            title: "🥩 Thịt đa dạng",
            dishes: [
              { name: "Thịt Heo Sốt Chanh", price: "155.000" },
              { name: "Cánh Gà Lá Dứa", price: "115.000" },
              { name: "Larb Heo Bằm", price: "135.000" },
              { name: "Trứng Chiên Heo Bằm", price: "95.000" },
            ],
          },
          {
            title: "🥬 Rau & Cơm",
            dishes: [
              { name: "Rau Muống Xào Tỏi x2", price: "130.000" },
              { name: "Rau Nhút Xào Tỏi", price: "65.000" },
              { name: "Cơm Chiên Xe Lửa", price: "165.000" },
              { name: "Pad Thái Tôm", price: "195.000" },
              { name: "Cơm Trắng x6", price: "150.000" },
            ],
          },
          {
            title: "🍮 Tráng miệng",
            dishes: [
              { name: "Xôi Xoài x3", price: "285.000" },
              { name: "Xôi Mít x3", price: "285.000" },
            ],
          },
          {
            title: "🥤 Đồ uống",
            dishes: [
              { name: "Nước Ép Cam x3", price: "195.000" },
              { name: "Trà Thái Đỏ x3", price: "165.000" },
              { name: "Sài Gòn Beer x6", price: "390.000" },
            ],
          },
        ],
        totalCalculatedPrice: "Tổng cộng: ~3.435.000 VND",
        totalNote: "Đa dạng món cho mọi lứa tuổi",
      },
      {
        id: "set3-optionB",
        title: 'OPTION B: "FAMILY HOT POT STYLE"',
        optionPrice: "~5.8M cho 6 người",
        courses: [
          { title: "🍲 Lẩu chính", dishes: [{ name: "Lẩu Tomyum x2", price: "1.390.000" }] },
          {
            title: "🥩 Đồ nhúng lẩu",
            dishes: [
              { name: "Ba Chỉ Bò Mỹ x2", price: "270.000" },
              { name: "Bắp Bò Mỹ x2", price: "390.000" },
              { name: "Mực x2", price: "350.000" },
              { name: "Tôm Sú x2", price: "270.000" },
            ],
          },
          {
            title: "🥬 Rau nhúng lẩu",
            dishes: [
              { name: "Rau Muống x3", price: "75.000" },
              { name: "Cải Thảo x3", price: "75.000" },
              { name: "Nấm Kim Châm x3", price: "75.000" },
              { name: "Đậu Hũ x3", price: "75.000" },
              { name: "Miến Thái x3", price: "135.000" },
            ],
          },
          { title: "🥗 Khai vị", dishes: [{ name: "Gỏi Đu Đủ Tôm Khô", price: "115.000" }] },
          {
            title: "🥩 Món nướng thêm",
            dishes: [
              { name: "Bò Nướng Siam Siam", price: "235.000" },
              { name: "Cổ Heo Nướng", price: "155.000" },
            ],
          },
          { title: "🍮 Tráng miệng", dishes: [{ name: "Chè Thái x6", price: "330.000" }] },
          {
            title: "🥤 Đồ uống gia đình",
            dishes: [
              { name: "Nước Ép Dưa Hấu x3", price: "195.000" },
              { name: "Tiger Crystal x6", price: "390.000" },
              { name: "Lavie x6", price: "180.000" },
            ],
          },
        ],
        totalCalculatedPrice: "Tổng cộng: ~4.755.000 VND",
        totalNote: "Hot pot experience tương tác cho cả gia đình",
      },
    ],
    chefQuote:
      "Bữa ăn gia đình là để tạo kỷ niệm. Tôi thiết kế thực đơn đa dạng để mọi người, từ trẻ em đến người lớn tuổi, đều tìm thấy món ăn yêu thích.",
    chefSignature: "- Chef Thái, chuyên gia ẩm thực gia đình",
  },
]
