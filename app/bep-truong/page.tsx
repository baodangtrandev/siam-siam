import { SITE } from "@/lib/site"
import Image from "next/image"
import Link from "next/link"

const chefPortrait = "/images/chef/chef-putthasorn-loi-portrait.jpg"
const chefAction1 = "/images/chef/chef-putthasorn-loi-action-1.png"
const chefAction2 = "/images/chef/chef-putthasorn-loi-action-2.png" // Updated second action shot

export default function ChefPage() {
  return (
    <div className="bg-brand-cream">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">
            Người Thổi Hồn Cho Món Ăn
          </p>
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-brand-green">Bếp Trưởng Putthasorn Loi</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
            16 năm kinh nghiệm và niềm đam mê bất tận với ẩm thực Hoàng Gia Thái.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="md:col-span-2 relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={chefPortrait}
              alt="Bếp trưởng Putthasorn Loi của nhà hàng Siam Siam"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-3">
            <h2 className="font-sans text-3xl font-semibold text-brand-green mb-4">Hành Trình Và Triết Lý</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Với hơn một thập kỷ rưỡ gắn bó sâu sắc với nền ẩm thực phong phú của Thái Lan, Bếp trưởng Putthasorn Loi
              đã không ngừng học hỏi, trau dồi và tìm tòi để nắm bắt trọn vẹn tinh túy của các món ăn cung đình Thái
              xưa. Kinh nghiệm làm việc tại các nhà hàng danh tiếng đã giúp ông hoàn thiện kỹ năng và định hình một
              phong cách ẩm thực độc đáo, kết hợp hài hòa giữa truyền thống và hiện đại.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Triết lý của Bếp trưởng Putthasorn Loi là “Tôn vinh nguyên liệu – Gìn giữ hương vị”. Ông tin rằng mỗi
              nguyên liệu đều có câu chuyện riêng và nhiệm vụ của người đầu bếp là làm nổi bật vẻ đẹp tự nhiên đó. Sự tỉ
              mỉ trong khâu lựa chọn nguyên liệu tươi ngon nhất, kết hợp với kỹ thuật chế biến điêu luyện và sự am hiểu
              sâu sắc về gia vị Thái, đã tạo nên những món ăn không chỉ ngon miệng mà còn đẹp mắt, đánh thức mọi giác
              quan.
            </p>
            <blockquote className="border-l-4 border-brand-gold pl-6 py-3 my-6 bg-brand-gold/10 rounded-r-md">
              <p className="text-brand-green italic leading-relaxed">
                “Đối với tôi, nấu ăn không chỉ là một nghề, đó là niềm đam mê, là cách tôi chia sẻ tình yêu của mình với
                văn hóa và ẩm thực Thái Lan. Tôi mong muốn mỗi thực khách đến với Siam Siam đều cảm nhận được sự trân
                trọng và tâm huyết trong từng món ăn.”
              </p>
              <cite className="block text-sm text-brand-gold font-semibold mt-2">- Bếp Trưởng Putthasorn Loi</cite>
            </blockquote>
            <h3 className="font-sans text-2xl font-semibold text-brand-green mt-8 mb-4">Dấu Ấn Tại Siam Siam</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Tại Siam Siam, Bếp trưởng Putthasorn Loi trực tiếp chỉ đạo và truyền lửa cho đội ngũ bếp, đảm bảo mỗi món
              ăn phục vụ thực khách đều đạt tiêu chuẩn cao nhất của ẩm thực Hoàng Gia. Ông cũng là người tiên phong
              trong việc sáng tạo và làm mới thực đơn, mang đến những trải nghiệm ẩm thực độc đáo và đáng nhớ.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                <Image
                  src={chefAction1}
                  alt="Bếp trưởng Putthasorn Loi đang tập trung chế biến món ăn"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                <Image
                  src={chefAction2}
                  alt="Chân dung Bếp trưởng Putthasorn Loi tại Siam Siam"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/thuc-don"
                className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-6 py-3 text-base rounded-md transition-colors text-center"
              >
                Khám Phá Thực Đơn Sáng Tạo Bởi Bếp Trưởng
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-6 py-3 text-base rounded-md transition-colors text-center"
              >
                Đặt Bàn Trải Nghiệm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
