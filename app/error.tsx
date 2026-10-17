"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center text-brand-green">
      <h1 className="text-3xl font-semibold">Đã có lỗi xảy ra</h1>
      <p className="max-w-md text-gray-700">Rất tiếc, trang không thể hiển thị. Vui lòng thử lại.</p>
      <button
        onClick={reset}
        className="rounded-md bg-brand-gold px-6 py-3 font-semibold text-brand-green transition-colors hover:bg-brand-gold/90"
      >
        Thử lại
      </button>
    </div>
  )
}
