import { SITE } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-2">Liên Hệ</p>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Kết Nối Với Siam Siam</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Đừng ngần ngại liên hệ để đặt bàn hoặc giải đáp thắc mắc.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-stone-700 mb-6">Thông Tin Liên Hệ</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-8 w-8 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-stone-800">Địa Chỉ</h3>
                <p className="text-muted-foreground">{SITE.address}</p>
                <a
                  href={SITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-600 hover:underline"
                >
                  Xem bản đồ
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-8 w-8 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-stone-800">Điện Thoại</h3>
                <a href={SITE.phoneHref} className="text-muted-foreground hover:text-amber-600">
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-8 w-8 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-stone-800">Email</h3>
                <a href={`mailto:${SITE.email}`} className="text-muted-foreground hover:text-amber-600">
                  {SITE.email}
                </a>{" "}
                {/* Placeholder */}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-8 w-8 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-stone-800">Giờ Mở Cửa</h3>
                <p className="text-muted-foreground">{SITE.openingHours}</p>
              </div>
            </div>
          </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-700">Gửi Lời Nhắn Cho Chúng Tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                  Họ và Tên
                </label>
                <Input type="text" id="name" name="name" required className="mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                  Email
                </label>
                <Input type="email" id="email" name="email" required className="mt-1" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
                  Số Điện Thoại
                </label>
                <Input type="tel" id="phone" name="phone" className="mt-1" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700">
                  Lời Nhắn
                </label>
                <Textarea id="message" name="message" rows={4} required className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                Gửi Lời Nhắn
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* Embedded Google Map */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-stone-700 mb-6 text-center">Tìm Chúng Tôi Trên Bản Đồ</h2>
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.529060935844!2d105.8407693153909!3d21.04980089240091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb058693791%3A0x8124f66961aa827!2sSiam%20Siam%20%E0%B8%AA%E0%B8%A2%E0%B8%B2%E0%B8%A1%20%E0%B8%AA%E0%B8%A2%E0%B8%B2%E0%B8%A1!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Siam Siam Restaurant Location"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
