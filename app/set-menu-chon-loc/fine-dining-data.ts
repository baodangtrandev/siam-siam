export interface FineDiningDish {
  name: string
  thaiName?: string
  description: string
  courseType: "khai-vi" | "soup" | "mon-chinh" | "mon-phu" | "chef-selected" | "hoang-gia"
}

export interface FineDiningSet {
  id: string
  title: string
  subtitle: string
  signature: string
  chefNote: string
  dishes: FineDiningDish[]
  backgroundImage: string
  price?: number
}

export const fineDiningSets: FineDiningSet[] = [
  {
    id: "set-hoang-gia",
    title: "SET HOÀNG GIA",
    subtitle: "Bữa tiệc sắc vị đặc biệt - Tinh hoa ẩm thực hoàng gia Thái Lan",
    signature: "Hương vị quý phái, giá trị vượt trội",
    backgroundImage: "/images/set-menu/set-3-background.jpeg",
    price: 2399000,
    chefNote:
      "Set menu Hoàng Gia là biểu tượng của sự tinh tế và đẳng cấp. Cua gạch Cà Mau nâng tầm với cà ri đỏ truyền thống, Hải sản lạnh sốt Siam Siam thể hiện bí quyết hoàng gia. Chả cua, Salad cá hồi thảo mộc, và Gỏi tôm bưởi khép lại với sự cân bằng hoàn hảo giữa các vị - một trải nghiệm ẩm thực không thể quên.",
    dishes: [
      {
        name: "Cua Gạch Cà Mau Sốt Cari Đỏ",
        thaiName: "ปูแดง แกงแดง",
        description:
          "Cua gạch Cà Mau tươi ngọt được nấu trong cà ri đỏ đậm đà với nước cốt dừa, tạo nên hương vị quyến rũ đầy sức lôi cuốn. Giá: 945.000 VNĐ",
        courseType: "chef-selected",
      },
      {
        name: "Hải Sản Lạnh Sốt Siam Siam",
        thaiName: "ซีฟู้ดเย็น ซอสสยาม",
        description:
          "Hỗn hợp hải sản cao cấp được chế biến lạnh với sốt bí truyền Siam Siam, vị chua cay tinh tế hòa quyện với hương thơm đặc trưng. Giá: 615.000 VNĐ",
        courseType: "mon-chinh",
      },
      {
        name: "Chả Cua",
        thaiName: "ขาหมูยัดไส้",
        description:
          "Chả cua truyền thống với thịt cua tươi ngọt, mềm mại và đậm đà, mang hương vị nguyên bản của ẩm thực Thái. Giá: 299.000 VNĐ",
        courseType: "mon-phu",
      },
      {
        name: "Salad Cá Hồi Thảo Mộc",
        thaiName: "ตำเซลมอนสมุนไพร",
        description:
          "Cá hồi tươi ngọt kết hợp cùng các loại thảo mộc Thái tươi mát, tạo nên sự cân bằng hoàn hảo giữa vị chua cay và mùi thơm tự nhiên. Giá: 245.000 VNĐ",
        courseType: "khai-vi",
      },
      {
        name: "Gỏi Tôm Bưởi",
        thaiName: "ส้มตำกุ้ง",
        description:
          "Gỏi tôm bưởi đậm chất Isan với tôm sú tươi, bưởi ngọt chua, rau thơm tươi mát, tạo nên vị chua cay nồng nàn đặc trưng. Giá: 220.000 VNĐ",
        courseType: "khai-vi",
      },
    ],
  },
  {
    id: "set-2a",
    title: "SET 2A",
    subtitle: "Hành trình vị giác chua cay đặc trưng",
    signature: "Vị Thái Signature: Chua cay",
    backgroundImage: "/images/set-menu/set-1-background.jpeg",
    chefNote:
      "Som Tam khai vị từ Isan hòa quyện với Tom Kha Gai dịu nhẹ miền Trung, dẫn lối đến Tom Saeng Saeb chua cay bùng nổ. Pad Thai cân bằng vị giác trước khi Cá Hồi Sốt Siam khép lại bằng tinh túy hoàng gia - một hành trình từ dân gian đến cung đình.",
    dishes: [
      {
        name: "Gỏi Đu Đủ Tôm Khô",
        thaiName: "ส้มตำ กุ้งแห้ง",
        description:
          "Đu đủ xanh giòn tan hòa quyện cùng tôm khô thơm đậm đà, tạo nên sự cân bằng hoàn hảo giữa vị chua thanh và mặn ngọt",
        courseType: "khai-vi",
      },
      {
        name: "Soup Gà Nước Dừa",
        thaiName: "ต้มข่าไก่",
        description:
          "Tom Kha Gai cổ điển với nước dừa tươi béo ngậy, thịt gà mềm mại, thơm lừng hương sả chanh và lá chanh makrut",
        courseType: "soup",
      },
      {
        name: "Sườn Núi Chua Cay",
        thaiName: "ต้มเส้งเซ่บ",
        description:
          "Món súp chua cay đậm chất Isan với sườn heo mềm, rau thơm tươi mát, vị chua cay nồng nàn đánh thức mọi giác quan",
        courseType: "mon-chinh",
      },
      {
        name: "Pad Thai Tôm",
        thaiName: "ผัดไทยกุ้งสด",
        description:
          "Bánh phở xào chuẩn vị với tôm sú tươi ngọt, đậu phụ, giá đỗ, chấm điểm bằng đậu phộng rang và chanh tươi",
        courseType: "mon-phu",
      },
      {
        name: "Cá Hồi Sốt Siam",
        thaiName: "ปลาแซลมอนซอสสยาม",
        description:
          "Cá hồi cao cấp được nướng hoàn hảo, phủ lớp sốt bí truyền của hoàng gia Thái, tinh tế và sang trọng",
        courseType: "chef-selected",
      },
    ],
  },
  {
    id: "set-2b",
    title: "SET 2B",
    subtitle: "Sự giao thoa tinh tế giữa truyền thống và hiện đại",
    signature: "Vị Thái Fusion, hương vị trung hoà",
    backgroundImage: "/images/set-menu/set-2-background.jpeg",
    chefNote:
      "Bào Ngư Truffle thể hiện đỉnh cao kỹ thuật, kết hợp cùng Cà Ri Cua truyền thống tạo nên sự cân bằng giữa Đông Tây. Som Tam Ba Khía mở màn, Cơm Chiên Thơm thanh thoát, Tom Yum cổ điển khép lại - tinh hoa fusion trong từng chi tiết.",
    dishes: [
      {
        name: "Gỏi Đu Đủ Ba Khía",
        thaiName: "ส้มตำปูเค็ม",
        description:
          "Đu đủ xanh tươi mát kết hợp cùng ba khía mặn mà, tạo nên hương vị đậm đà và độc đáo của miền Nam Thái",
        courseType: "khai-vi",
      },
      {
        name: "Bào Ngư Nấm Truffle",
        thaiName: "เป่าฮื้อ น้ำแดง",
        description:
          "Bào ngư tươi ngọt hòa quyện cùng nấm truffle quý hiếm, thể hiện đẳng cấp ẩm thực hoàng gia đương đại",
        courseType: "chef-selected",
      },
      {
        name: "Thịt Xào Cua Cà Ri",
        thaiName: "เนื้อผัดผงกะหรี่",
        description: "Thịt cua tươi ngọt được xào cùng cà ri thơm nồng, tạo nên món ăn đậm đà hương vị biển cả",
        courseType: "mon-chinh",
      },
      {
        name: "Cơm Chiên Thơm",
        thaiName: "ข้าวสับปะรด",
        description:
          "Cơm chiên trong quả thơm tươi với hạt điều, nho khô, tạo nên sự cân bằng giữa ngọt tự nhiên và đậm đà",
        courseType: "mon-phu",
      },
      {
        name: "Soup Tomyum",
        thaiName: "ต้มยำกุ้ง",
        description: "Tom Yum cổ điển với tôm sú tươi, nấm rơm, cà chua, thơm lừng hương sả chanh và ớt hiểm",
        courseType: "soup",
      },
    ],
  },
  {
    id: "set-4a",
    title: "SET 4A",
    subtitle: "Bữa tiệc đa tầng hương vị cho nhóm bạn",
    signature: "Trải nghiệm ẩm thực toàn diện",
    backgroundImage: "/images/set-menu/set-3-background.jpeg",
    chefNote:
      "Tom Yum kinh điển khởi đầu, Tháp Sườn Chua Cay Isan làm trung tâm, Thịt Cua Chung Cư sáng tạo tạo điểm nhấn. Bò Nướng Siam và Cơm Chiên Xe Lửa hoàn thiện bức tranh ẩm thực đa tầng - từ truyền thống đến hiện đại.",
    dishes: [
      {
        name: "Gỏi Đu Đủ Tôm Khô",
        thaiName: "ส้มตำ กุ้งแห้ง",
        description: "Món khai vị kinh điển với đu đủ xanh giòn và tôm khô thơm đậm, đánh thức vị giác",
        courseType: "khai-vi",
      },
      {
        name: "Soup Tomyum",
        thaiName: "ต้มยำกุ้ง",
        description: "Soup chua cay truyền thống với hương thơm đặc trưng của sả, chanh và ớt hiểm",
        courseType: "soup",
      },
      {
        name: "Đậu Bắp Xào Tỏi",
        thaiName: "กระเจี๊ยบผัดกระเทียม",
        description: "Đậu bắp tươi giòn xào với tỏi thơm, đơn giản nhưng tinh tế",
        courseType: "mon-phu",
      },
      {
        name: "Tháp Sườn Chua Cay Lớn",
        thaiName: "ต้มเส้งเซ่บ",
        description: "Món chính ấn tượng với sườn heo mềm trong nước dùng chua cay đậm đà, rau thơm tươi mát",
        courseType: "mon-chinh",
      },
      {
        name: "Thịt Cua Chung Cư",
        thaiName: "เนื้อปูคอนโดผงกะหรี่",
        description: "Sáng tạo độc đáo của bếp trưởng với thịt cua tươi ngọt, chế biến theo phong cách hiện đại",
        courseType: "chef-selected",
      },
      {
        name: "Bò Nướng Siam",
        thaiName: "เนื้อย่าง",
        description: "Thịt bò hảo hạng được ướp gia vị bí truyền, nướng trên than hồng thơm lừng",
        courseType: "mon-phu",
      },
      {
        name: "Cơm Chiên Xe Lửa",
        thaiName: "ข้าวผัดรถไฟ",
        description: "Cơm chiên đậm đà với hương vị đặc trưng, tạo nên kỷ niệm khó quên",
        courseType: "mon-phu",
      },
    ],
  },
  {
    id: "set-4b",
    title: "SET 4B",
    subtitle: "Tinh hoa hải sản và thịt nướng cao cấp",
    signature: "Sự kết hợp hoàn hảo giữa đất và biển",
    backgroundImage: "/images/set-menu/set-1-background.jpeg",
    chefNote:
      "Cá Hồi Mắm Nêm khai phá vị giác, Cua Lột Sốt Trứng Muối thể hiện kỹ thuật hoàng gia, Sò Điệp X.O mang đẳng cấp quốc tế. Lẩu Tom Yum trung tâm, Cá Chém Hấp khép lại - tinh hoa hải sản từ vùng biển Thái Lan.",
    dishes: [
      {
        name: "Gỏi Cá Hồi Mắm Nêm Thái",
        thaiName: "ตำเซลมอนน้ำปลาร้า",
        description: "Cá hồi tươi ngọt kết hợp cùng mắm nêm Thái đậm đà, tạo nên hương vị độc đáo và ấn tượng",
        courseType: "khai-vi",
      },
      {
        name: "Cổ Heo Nướng",
        thaiName: "คอหมูย่าง",
        description: "Cổ heo mềm mại được ướp gia vị truyền thống, nướng đến độ chín hoàn hảo",
        courseType: "mon-phu",
      },
      {
        name: "Sò Điệp Sốt X.O",
        thaiName: "หอยเชลล์ซอส XO",
        description: "Sò điệp tươi ngọt với sốt X.O đậm đà, thể hiện đẳng cấp ẩm thực cao cấp",
        courseType: "mon-phu",
      },
      {
        name: "Cua Lột Sốt Trứng Muối",
        thaiName: "ปูนิ่มราดซอสไข่เค็ม",
        description: "Cua lột tươi ngọt phủ lớp sốt trứng muối béo ngậy, món ăn đặc sắc của hoàng gia",
        courseType: "chef-selected",
      },
      {
        name: "Lẩu Siam/Lẩu Tomyum",
        thaiName: "หม่อไฟรวม",
        description: "Lẩu đặc trưng với nước dùng đậm đà, tạo không khí ấm cúng cho bữa ăn",
        courseType: "mon-chinh",
      },
      {
        name: "Bông Cải Baby Sốt Siam",
        thaiName: "กะหล่ำดอกน้อยซอสสยาม",
        description: "Bông cải baby tươi giòn với sốt Siam bí truyền, cân bằng dinh dưỡng cho bữa ăn",
        courseType: "mon-phu",
      },
      {
        name: "Cá Chém Hấp Xì Dầu/Chanh",
        thaiName: "ปลากะพงนึ่งซีอิ๊ว/มะนาว",
        description: "Cá chém tươi ngọt hấp với xì dầu hoặc chanh, giữ nguyên hương vị tự nhiên của biển cả",
        courseType: "mon-chinh",
      },
    ],
  },
  {
    id: "set-6b",
    title: "SET COMBO B",
    subtitle: "Dành cho 6 người - Tiệc gia đình hoàn hảo",
    signature: "Sự hòa quyện của truyền thống và hiện đại",
    backgroundImage: "/images/set-menu/set-2-background.jpeg",
    chefNote:
      "Lẩu Tom Yum trung tâm theo truyền thống gia đình Thái, Cua Lột và Cá Hồi nâng tầm đẳng cấp. Cánh Gà đa phong cách, Pad Thai quen thuộc - sự hòa quyện giữa tinh hoa hoàng gia và không khí gia đình ấm cúng.",
    dishes: [
      {
        name: "Gỏi Đu Đủ Ba Khía",
        description: "Món khai vị tươi mát với đu đủ xanh giòn và ba khía mặn mà, đánh thức vị giác cho cả gia đình",
        courseType: "khai-vi",
      },
      {
        name: "Cá Hồi Sốt Thái",
        description: "Cá hồi cao cấp với sốt Thái đặc trưng, thể hiện sự tinh tế trong chế biến",
        courseType: "chef-selected",
      },
      {
        name: "Cánh Gà Sốt Rượu Vang/Muối Ớt",
        description: "Cánh gà được chế biến theo hai phong cách: sốt rượu vang sang trọng hoặc muối ớt truyền thống",
        courseType: "mon-chinh",
      },
      {
        name: "Cua Lột Sốt Trứng Muối/Chiên Tỏi",
        description: "Cua lột tươi ngọt với hai lựa chọn: sốt trứng muối béo ngậy hoặc chiên tỏi thơm lừng",
        courseType: "chef-selected",
      },
      {
        name: "Cá Chém Hấp Xì Dầu/Chanh",
        description: "Cá chém tươi ngọt hấp theo phong cách truyền thống, giữ nguyên vị ngọt tự nhiên",
        courseType: "mon-chinh",
      },
      {
        name: "Pad Thai Tôm",
        description: "Món Pad Thai kinh điển với tôm sú tươi ngọt, phục vụ 2 phần cho cả gia đình",
        courseType: "mon-phu",
      },
      {
        name: "Lẩu Tomyum",
        description: "Lẩu Tom Yum chua cay đặc trưng, tạo không khí ấm cúng và gắn kết gia đình",
        courseType: "soup",
      },
    ],
  },
]
