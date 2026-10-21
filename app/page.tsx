import { SITE } from "@/lib/site"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import SignatureDishCarousel from "@/components/signature-dish-carousel"

// Updated dish images for homepage preview
const heroImage1 = "/images/space/siam-siam-interior-1.jpg"
const heroImage2 = "/images/space/siam-siam-interior-2.jpg"
const chefImage = "/images/chef/chef-putthasorn-loi-portrait.jpg" // Updated chef image
const spaceImage1 = "/images/space/siam-siam-interior-2.jpg"
const spaceImage2 = "/images/space/siam-siam-dining-view.jpg"

// Select 3 representative dish images for the homepage
const dishImagePreview1 = "/images/signature-items/cua-ca-ri-do.jpg" // Cua Gạch Cà Mau
const dishImagePreview2 = "/images/signature-items/sup-bao-ngu-hai-sam.jpg" // Súp Bào Ngư
const dishImagePreview3 = "/images/signature-items/hai-san-lanh-sot-siam.jpg" // Hải Sản Lạnh

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] w-full">
        <Image
          src={heroImage1}
          alt="Không gian sang trọng tại Siam Siam"
          fill
          className="object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-brand-cream p-4">
          <h1 className="font-sans text-5xl md:text-7xl font-bold mb-4 leading-tight text-brand-gold">SIAM SIAM</h1>
          <p className="font-sans text-2xl md:text-4xl text-white mb-8 max-w-3xl">Tinh Hoa Ẩm Thực Hoàng Gia Thái</p>
          <p className="text-lg md:text-xl mb-10 max-w-2xl text-brand-cream/90">
            Trải nghiệm hương vị hoàng gia Thái đích thực, được chế biến bởi bếp trưởng 16 năm kinh nghiệm, trong không
            gian sang trọng và ấm cúng.
          </p>
          <div className="flex gap-4">
            <Link
              href="/set-menu"
              className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-8 py-6 text-lg rounded-md transition-colors"
            >
              Khám Phá Set Menu
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-block text-brand-gold border-2 border-brand-gold hover:bg-brand-gold hover:text-brand-green font-semibold bg-transparent px-8 py-6 text-lg rounded-md transition-colors"
            >
              Đặt Bàn Ngay
            </a>
          </div>
        </div>
      </section>

      {/* Signature Dish Section - Cua Gạch Cà Mau */}
      <section id="signature-dish" className="py-16 lg:py-24 bg-brand-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">Biểu Tượng Ẩm Thực</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-brand-green font-sans">
              Cua Gạch Cà Mau Sốt Cà Ri Đỏ
            </h2>
            <p className="text-lg text-brand-gold font-semibold">
              Lấy cảm hứng từ Michelin 4 năm liên tiếp tại Thái Lan
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Carousel */}
            <SignatureDishCarousel />

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-brand-green mb-4">Kiệt Tác Ẩm Thực Hoàng Gia</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lấy cảm hứng từ những con sóng ấm của vịnh Thái Lan và tinh thần giao thoa Hoa – Xiêm cổ điển, “Cua Gạch Sốt Cà Ri” là kiệt tác được tôn vinh trong danh sách 10 Món Ăn Yêu Thích của Thẩm Định Viên MICHELIN Guide Thailand 2026.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cua Xào Cà Ri Đỏ Siam là viên ngọc quý được Bếp trưởng với 16 năm kinh nghiệm dày công kiến tạo - bản tuyên ngôn cho triết lý <span className="font-semibold">“truyền thống tinh khiết, đẳng cấp đương đại”</span>.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-brand-gold/30">
                <h4 className="text-xl font-bold text-brand-green mb-3">Cách Thưởng Thức</h4>
                <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                  <li>Bắt đầu bằng phần thịt cua mai</li>
                  <li>Chấm nhẹ qua sốt xanh chua cay Nam Jim</li>
                  <li>Chuyển sang sốt cam dịu ngọt để nâng tầng vị béo</li>
                  <li>Dùng cùng bánh bao chiên hoặc cơm trắng</li>
                </ol>
              </div>

              <p className="text-gray-700 italic leading-relaxed text-sm">
                Dự vị mặn-ngọt-cay-béo đưa thực khách bước vào một Bangkok của riêng mình, ngay giữa lòng Hà Nội.
              </p>

              <Link
                href="/menu"
                className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Xem Món Này Trong Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Section - Highlighted */}
      <section id="chef" className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={chefImage}
                alt="Bếp trưởng Putthasorn Loi của nhà hàng Siam Siam"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">
                Nghệ Thuật Từ Bếp Trưởng
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-brand-green font-sans">Đầu bếp Putthasorn Loi</h2>
              <p className="text-xl text-stone-700 mb-6">
                Với <span className="font-bold text-brand-gold">16 năm cống hiến</span> cho ẩm thực Thái Lan, Bếp trưởng
                của chúng tôi mang đến những món ăn không chỉ chuẩn vị mà còn chứa đựng cả tâm huyết và sự sáng tạo.
              </p>
              <p className="text-gray-600 mb-6">
                “Mỗi món ăn là một câu chuyện, một hành trình khám phá văn hóa Thái. Tôi luôn cố gắng gìn giữ hương vị
                truyền thống hoàng gia, đồng thời thổi vào đó những nét chấm phá hiện đại để mang đến trải nghiệm ẩm
                thực độc đáo nhất cho thực khách.”
              </p>
              <Link
                href="/chef"
                className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Tìm Hiểu Thêm Về Bếp Trưởng
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-16 lg:py-24 bg-brand-cream">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">Câu Chuyện Siam Siam</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-brand-green font-sans">
            Hành Trình Gìn Giữ Di Sản Ẩm Thực Hoàng Gia
          </h2>
          <p className="text-gray-700 mb-8">
            Siam Siam ra đời với sứ mệnh mang đến cho thực khách Hà Thành những trải nghiệm ẩm thực Thái Lan hoàng gia
            đích thực. Chúng tôi tỉ mỉ trong từng khâu chọn lựa nguyên liệu tươi ngon, kết hợp với công thức bí truyền
            và sự tài hoa của đội ngũ đầu bếp để tạo nên những tuyệt tác lay động mọi giác quan.
          </p>
          <Link
            href="/about"
            className="inline-block border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-green font-semibold bg-transparent px-6 py-3 rounded-md transition-colors"
          >
            Khám Phá Câu Chuyện
          </Link>
        </div>
      </section>

      {/* Space Section */}
      <section id="space" className="py-16 lg:py-24 bg-brand-pattern text-brand-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">Không Gian Siam Siam</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-sans">Nơi Văn Hóa Thái Hội Tụ</h2>
            <p className="text-brand-cream/80 max-w-2xl mx-auto">
              Bước vào Siam Siam, bạn như lạc vào một cung điện Thái thu nhỏ, với kiến trúc tinh xảo, nội thất sang
              trọng và những chi tiết trang trí đậm đà bản sắc văn hóa.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src={spaceImage1}
                alt="Không gian nhà hàng Siam Siam 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src={spaceImage2}
                alt="Không gian nhà hàng Siam Siam 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/space"
              className="inline-block border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-green font-semibold bg-transparent px-6 py-3 rounded-md transition-colors"
            >
              Xem Thêm Hình Ảnh
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section id="menu-preview" className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">Thực Đơn Tinh Tuyển</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-brand-green font-sans">
              Khám Phá Hương Vị Hoàng Gia
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Cua Gạch Cà Mau Sốt Cà Ri Đỏ",
                image: dishImagePreview1,
                description: "Kiệt tác Michelin, cà ri đỏ nồng nàn với cua tươi ngon.",
              },
              {
                title: "Súp Bào Ngư Hải Sâm",
                image: dishImagePreview2,
                description: "Canh dinh dưỡng sang trọng, tinh tế cho bữa tiệc.",
              },
              {
                title: "Hải Sản Lạnh Sốt Siam Siam",
                image: dishImagePreview3,
                description: "Hải sản tươi sống trên giường đá, sốt Siam Siam đặc trưng.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-brand-gold/30 rounded-lg bg-white"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-sans text-2xl mb-2 text-brand-gold font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Xem Toàn Bộ Thực Đơn
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials / Google Rating */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="container text-center">
          <Star className="h-12 w-12 text-brand-gold mx-auto mb-4" fill="currentColor" />
          <h2 className="font-sans text-3xl font-bold mb-2 text-brand-green">Đánh Giá 5.0/5.0 Trên Google</h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            “Không gian tuyệt đẹp, đồ ăn chuẩn vị Thái hoàng gia, phục vụ chuyên nghiệp. Chắc chắn sẽ quay lại!” - Một
            thực khách chia sẻ.
          </p>
          <a
            href={SITE.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:text-brand-gold/80 font-semibold underline"
          >
            Xem Thêm Đánh Giá
          </a>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-16 lg:py-24 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${heroImage2})` }}>
        <div className="container text-center bg-brand-green/80 backdrop-blur-sm p-12 rounded-lg">
          <h2 className="font-sans text-4xl lg:text-5xl font-bold mb-6 text-brand-gold">Đặt Bàn Ngay Hôm Nay</h2>
          <p className="text-brand-cream/90 mb-8 max-w-xl mx-auto">
            Để có những trải nghiệm ẩm thực Thái Lan hoàng gia trọn vẹn nhất, vui lòng đặt bàn trước.
          </p>
          <a
            href={SITE.phoneHref}
            className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-8 py-6 text-lg rounded-md transition-colors"
          >
            Gọi Đặt Bàn Ngay: {SITE.phoneDisplay}
          </a>
        </div>
      </section>
    </div>
  )
}
