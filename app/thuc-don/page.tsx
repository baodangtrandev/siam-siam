import type { Metadata } from "next"
import MenuBook from "./_components/menu-book"

export const metadata: Metadata = {
  title: "Thực Đơn",
  description:
    "Lật xem toàn bộ thực đơn Siam Siam: các món Hoàng gia Thái, gỏi, hải sản, thịt, súp lẩu, cơm mì và tráng miệng cùng giá chi tiết.",
  alternates: { canonical: "/thuc-don" },
}

export default function FullMenuPage() {
  return <MenuBook />
}
