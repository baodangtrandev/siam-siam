"use client"

import { menuData } from "./menu-data"
// Removed Card components as they are not used in the new layout for individual items.

export default function FullMenuPage() {
  return (
    <div className="bg-brand-cream">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-2">Siam Siam Full Menu</p>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Khám Phá Toàn Bộ Thực Đơn Hoàng Gia Thái</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Mỗi món ăn là một tác phẩm nghệ thuật, được chế biến từ nguyên liệu tươi ngon nhất bởi bếp trưởng 16 năm
            kinh nghiệm. Dưới đây là toàn bộ các lựa chọn ẩm thực đặc sắc tại Siam Siam.
          </p>
        </div>

        <div className="space-y-16">
          {menuData.map((category) => (
            <section key={category.id} id={category.id} aria-labelledby={`category-title-${category.id}`}>
              <h2
                id={`category-title-${category.id}`}
                className="text-3xl md:text-4xl font-semibold text-amber-700 mb-8 pb-3 border-b-2 border-amber-300"
              >
                {category.title}
              </h2>
              {/* Multi-column layout for items within this category */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-x-8">
                {category.items.map((item, index) => (
                  <div key={`${category.id}-${index}`} className="mb-7 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-semibold text-stone-800 leading-tight">{item.name}</h3>
                      <p className="text-md font-bold text-amber-600 pl-4 flex-shrink-0">
                        <span dangerouslySetInnerHTML={{ __html: item.price }} /> VNĐ
                      </p>
                    </div>
                    {item.description && <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
