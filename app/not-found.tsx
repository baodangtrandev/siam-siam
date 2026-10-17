import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 bg-brand-cream text-brand-green">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-gold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Không tìm thấy trang</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại. Có thể trang đã bị xóa hoặc địa chỉ không đúng.
        </p>
        <Link
          href="/"
          className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-6 py-3 rounded-md transition-colors"
        >
          Quay về Trang chủ
        </Link>
      </div>
    </div>
  )
}
