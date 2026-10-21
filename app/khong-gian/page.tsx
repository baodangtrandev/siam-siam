import Image from "next/image"

// Sử dụng hình ảnh thật của nhà hàng
const galleryImages = [
  {
    src: "/images/space/siam-siam-interior-1.jpg",
    alt: "Toàn cảnh không gian sang trọng với kiến trúc mái vòm tại Siam Siam",
  },
  {
    src: "/images/space/siam-siam-interior-2.jpg",
    alt: "Bàn ăn được bày trí tinh tế bên cạnh cửa sổ tròn và phù điêu Thái",
  },
  {
    src: "/images/space/siam-siam-dining-view.jpg",
    alt: "Thực khách dùng bữa bên cửa sổ tròn lớn nhìn ra phố phường Hà Nội",
  },
  {
    src: "/images/space/siam-siam-hospitality.jpg",
    alt: "Đội ngũ nhân viên trong trang phục truyền thống Thái Lan chào đón khách",
  },
  {
    src: "/images/space/siam-siam-interior-2.jpg", // Có thể lặp lại hoặc thêm ảnh mới
    alt: "Chi tiết bàn ăn với khăn trải bàn và bộ dụng cụ ăn màu vàng đồng",
    query: "detailed shot of a dining table setup at a luxury thai restaurant",
  },
  {
    src: "/images/space/siam-siam-interior-1.jpg", // Có thể lặp lại hoặc thêm ảnh mới
    alt: "Góc nhìn khác về kiến trúc độc đáo của nhà hàng Siam Siam",
    query: "another angle of the unique architecture of a thai restaurant",
  },
]

export default function SpacePage() {
  return (
    <div className="bg-brand-cream">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">Không Gian Siam Siam</p>
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-brand-green">
            Kiến Trúc Hoàng Gia Giữa Lòng Hà Nội
          </h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Mỗi chi tiết tại Siam Siam đều được chăm chút tỉ mỉ, mang đến một không gian ẩm thực sang trọng, ấm cúng và
            đậm đà bản sắc văn hóa Thái Lan.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-xl group">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end justify-center p-4">
                <p className="text-white text-center text-sm bg-black/50 rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
