/** Single source of truth for business info used across the site. */
export const SITE = {
  name: "Siam Siam",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://siamsiam.vn",
  description:
    "Khám phá hương vị ẩm thực Hoàng Gia Thái đích thực tại Siam Siam, 42H Yên Phụ, Ba Đình, Hà Nội. Bếp trưởng 16 năm kinh nghiệm.",
  phoneHref: "tel:0812353588",
  phoneDisplay: "0812 353 588",
  email: "info@siamsiam.vn",
  address: "42H Đường Yên Phụ, Trúc Bạch, Ba Đình, Hà Nội",
  mapUrl: "https://g.co/kgs/yyVa7s2",
  openingHours: "Thứ 2 - Chủ Nhật: 10:00 - 22:00",
  social: {
    facebook: "https://www.facebook.com/SiamSiam.42yenphu",
    instagram: "https://www.instagram.com/siamsiam.thaicuisine/",
  },
} as const
