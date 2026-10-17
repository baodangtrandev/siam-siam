import { SITE } from "@/lib/site"
import Image from "next/image"

// Sử dụng hình ảnh không gian thật của nhà hàng
const storyImage1 = "/images/space/siam-siam-interior-1.jpg"
const storyImage2 = "/images/space/siam-siam-dining-view.jpg"

export default function AboutUsPage() {
  return (
    <div className="bg-brand-cream">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">Về Chúng Tôi</p>
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-brand-green">
            Siam Siam - Nơi Kể Chuyện Ẩm Thực Hoàng Gia
          </h1>
        </div>
        <div className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6">
          <p>
            Chào mừng đến với Siam Siam, điểm hẹn của những tâm hồn yêu mến ẩm thực Thái Lan đích thực tại Hà Nội. Tên
            gọi “Siam Siam” gợi nhớ về vương quốc Xiêm xưa, một thời kỳ vàng son của văn hóa và ẩm thực cung đình Thái.
            Với niềm đam mê và sự trân trọng dành cho di sản ấy, chúng tôi đã kiến tạo nên một không gian sang trọng, ấm
            cúng, nơi mỗi món ăn là một tác phẩm nghệ thuật, mỗi trải nghiệm là một hành trình khám phá đầy thú vị.
          </p>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
              <Image
                src={storyImage1 || "/placeholder.svg"}
                alt="Kiến trúc mái vòm độc đáo và không gian sang trọng tại Siam Siam"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
              <Image
                src={storyImage2 || "/placeholder.svg"}
                alt="Thực khách thưởng thức ẩm thực bên cửa sổ lớn nhìn ra phố phường"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p>
            Sứ mệnh của Siam Siam không chỉ dừng lại ở việc phục vụ những món ăn ngon, mà còn là cầu nối văn hóa, mang
            đến cho thực khách những hiểu biết sâu sắc hơn về sự tinh tế và phong phú của ẩm thực Hoàng Gia Thái. Từ
            việc lựa chọn những nguyên liệu tươi ngon nhất theo mùa, tuân thủ nghiêm ngặt công thức truyền thống, đến sự
            tài hoa và sáng tạo của Bếp trưởng 16 năm kinh nghiệm, tất cả đều nhằm mang đến một trải nghiệm ẩm thực hoàn
            hảo.
          </p>
          <p>
            Chúng tôi tự hào về không gian được thiết kế tỉ mỉ, lấy cảm hứng từ kiến trúc cung điện Thái Lan, kết hợp
            hài hòa giữa nét cổ điển và hiện đại. Mỗi góc nhỏ tại Siam Siam đều ẩn chứa một câu chuyện, một nét đẹp văn
            hóa chờ bạn khám phá.
          </p>
          <p>
            Hãy đến với Siam Siam để cảm nhận sự khác biệt, để được đắm mình trong không gian Hoàng Gia và thưởng thức
            những hương vị Thái Lan tinh túy nhất.
          </p>
          <div className="text-center pt-8">
            <a
              href={SITE.phoneHref}
              className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-6 py-3 text-base rounded-md transition-colors"
            >
              Đặt Bàn Trải Nghiệm
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
