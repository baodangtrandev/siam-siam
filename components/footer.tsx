import { SITE } from "@/lib/site"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brand-pattern text-brand-cream py-12">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image
              src="/images/siam-siam-official-logo.png" // Using the official logo
              alt="Siam Siam Logo"
              width={70} // Adjusted size
              height={70}
            />
            <span className="font-sans text-2xl font-bold text-brand-gold uppercase tracking-wider">Siam Siam</span>
          </Link>
          <p className="text-sm text-brand-cream/80">
            Tinh hoa ẩm thực Hoàng Gia Thái giữa lòng Hà Nội. Trải nghiệm hương vị đích thực và không gian sang trọng.
          </p>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-xl mb-4 text-brand-gold">Liên Kết Nhanh</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-brand-gold/80">
                Về Siam Siam
              </Link>
            </li>
            <li>
              <Link href="/chef" className="hover:text-brand-gold/80">
                Bếp Trưởng
              </Link>
            </li>
            <li>
              <Link href="/set-menu" className="hover:text-brand-gold/80">
                Set Menu Chọn Lọc
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-brand-gold/80">
                Thực Đơn
              </Link>
            </li>
            <li>
              <a href={SITE.phoneHref} className="hover:text-brand-gold/80">
                Đặt Bàn
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-gold/80">
                Liên Hệ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-xl mb-4 text-brand-gold">Liên Hệ Với Chúng Tôi</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-0.5 text-brand-gold flex-shrink-0" />
              <span className="text-brand-cream/90">{SITE.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-brand-gold" />
              <a href={SITE.phoneHref} className="hover:text-brand-gold/80 text-brand-cream/90">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-brand-gold" />
              <a href={`mailto:${SITE.email}`} className="hover:text-brand-gold/80 text-brand-cream/90">
                {SITE.email}
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <Link
              href={SITE.social.facebook}
              aria-label="Facebook"
              className="text-brand-cream/70 hover:text-brand-gold"
            >
              <Facebook />
            </Link>
            <Link
              href={SITE.social.instagram}
              aria-label="Instagram"
              className="text-brand-cream/70 hover:text-brand-gold"
            >
              <Instagram />
            </Link>
          </div>
        </div>
      </div>
      <div className="container text-center mt-8 pt-8 border-t border-brand-gold/30">
        <p className="text-xs text-brand-cream/70">
          &copy; {new Date().getFullYear()} Siam Siam Nhà Hàng. Bảo lưu mọi quyền.
        </p>
      </div>
    </footer>
  )
}
