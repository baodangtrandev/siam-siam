"use client"

import { SITE } from "@/lib/site"
import type React from "react"
import { fineDiningSets, type FineDiningDish } from "./fine-dining-data"

// Update CourseTypeLabel component to handle different backgrounds
const CourseTypeLabel: React.FC<{ courseType: FineDiningDish["courseType"]; isGreenBg?: boolean }> = ({
  courseType,
  isGreenBg = false,
}) => {
  const labels = {
    "khai-vi": "KHAI VỊ",
    soup: "SOUP",
    "mon-chinh": "MÓN CHÍNH",
    "mon-phu": "MÓN PHỤ",
    "chef-selected": "CHEF-SELECTED",
    "hoang-gia": "HOÀNG GIA",
  }

  const getStyles = (type: string) => {
    const baseStyle = "uppercase tracking-wider font-medium"

    if (isGreenBg) {
      switch (type) {
        case "soup":
          return `${baseStyle} text-blue-300 font-bold`
        case "mon-chinh":
          return `${baseStyle} text-red-300 font-bold`
        case "chef-selected":
          return `${baseStyle} text-purple-300 font-bold`
        case "khai-vi":
          return `${baseStyle} text-brand-gold`
        case "mon-phu":
          return `${baseStyle} text-brand-cream/70`
        default:
          return `${baseStyle} text-brand-gold font-bold`
      }
    } else {
      switch (type) {
        case "soup":
          return `${baseStyle} text-blue-600 font-bold`
        case "mon-chinh":
          return `${baseStyle} text-red-600 font-bold`
        case "chef-selected":
          return `${baseStyle} text-purple-600 font-bold`
        case "khai-vi":
          return `${baseStyle} text-amber-600`
        case "mon-phu":
          return `${baseStyle} text-gray-600`
        default:
          return `${baseStyle} text-amber-600 font-bold`
      }
    }
  }

  return <span className={`${getStyles(courseType)} text-sm`}>{labels[courseType]}</span>
}

const SetMenuPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-brand-pattern text-brand-cream py-12 md:py-20">
        <div className="container text-center">
          <p className="text-sm font-light uppercase tracking-[0.2em] text-brand-gold mb-3">
            CHEF’S CURATED EXPERIENCE
          </p>
          <h1 className="font-sans text-4xl md:text-6xl font-light text-brand-gold mb-4 leading-tight">
            Set Menu Chọn Lọc
          </h1>
          <p className="text-base md:text-xl text-brand-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Hành trình ẩm thực được thiết kế tỉ mỉ bởi Bếp trưởng Putthasorn Loi
          </p>
        </div>
      </div>

      {/* Sets */}
      <div className="space-y-0">
        {fineDiningSets.map((set, setIndex) => {
          // Alternating backgrounds: green for even indices, light cream for odd
          const isGreenBackground = setIndex % 2 === 0
          const bgClass = isGreenBackground ? "bg-brand-green text-brand-cream" : "bg-amber-50 text-stone-800"

          return (
            <section key={set.id} className={`${bgClass} py-8 md:py-12 min-h-screen flex flex-col justify-center`}>
              <div className="container max-w-4xl">
                {/* Set Header */}
                <div className="text-center mb-6">
                  <h2
                    className={`font-sans text-3xl md:text-5xl font-light mb-2 ${isGreenBackground ? "text-brand-gold" : "text-stone-800"}`}
                  >
                    {set.title}
                  </h2>
                  <p
                    className={`text-base md:text-xl mb-2 font-light ${isGreenBackground ? "text-brand-cream/80" : "text-stone-600"}`}
                  >
                    {set.subtitle}
                  </p>
                  <p
                    className={`text-sm md:text-base italic font-light ${isGreenBackground ? "text-brand-gold/80" : "text-amber-600"}`}
                  >
                    {set.signature}
                  </p>
                </div>

                {/* Chef Note and Price */}
                <div className="mb-8 max-w-2xl mx-auto">
                  <div
                    className={`border-t border-b py-4 ${isGreenBackground ? "border-brand-gold/30" : "border-stone-200"}`}
                  >
                    <p
                      className={`text-sm uppercase tracking-[0.15em] mb-2 text-center ${isGreenBackground ? "text-brand-gold/60" : "text-stone-400"}`}
                    >
                      CHEF’S NOTE
                    </p>
                    <p
                      className={`text-sm md:text-base italic font-light leading-relaxed text-center ${isGreenBackground ? "text-brand-cream/90" : "text-stone-600"}`}
                    >
                      “{set.chefNote}”
                    </p>
                    <p
                      className={`text-sm mt-2 font-light text-center ${isGreenBackground ? "text-brand-gold/60" : "text-stone-400"}`}
                    >
                      — Chef Putthasorn Loi
                    </p>
                    {set.price && (
                      <p
                        className={`text-lg md:text-xl font-medium mt-4 text-center ${isGreenBackground ? "text-brand-gold" : "text-amber-600"}`}
                      >
                        {set.price.toLocaleString("vi-VN")} VNĐ/Set
                      </p>
                    )}
                  </div>
                </div>

                {/* Dishes - Compact Mobile Layout */}
                <div className="max-w-3xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {set.dishes.map((dish, index) => (
                      <div
                        key={index}
                        className="mb-4 pb-4 border-b border-opacity-20 last:border-b-0"
                        style={{ borderColor: isGreenBackground ? "#B08D57" : "#d6d3d1" }}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <span
                            className={`text-sm font-medium w-4 flex-shrink-0 ${isGreenBackground ? "text-brand-cream/60" : "text-stone-400"}`}
                          >
                            {index + 1}
                          </span>
                          <CourseTypeLabel courseType={dish.courseType} isGreenBg={isGreenBackground} />
                        </div>
                        <h3
                          className={`text-base md:text-lg font-medium mb-1 leading-tight ${isGreenBackground ? "text-brand-cream" : "text-stone-800"}`}
                        >
                          {dish.name}
                        </h3>
                        {dish.thaiName && (
                          <p
                            className={`text-sm italic mb-1 font-light ${isGreenBackground ? "text-brand-gold/80" : "text-amber-600"}`}
                          >
                            {dish.thaiName}
                          </p>
                        )}
                        <p
                          className={`text-sm font-light leading-relaxed ${isGreenBackground ? "text-brand-cream/80" : "text-stone-600"}`}
                        >
                          {dish.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Reservation CTA */}
      <div className="bg-stone-100 py-12">
        <div className="container text-center">
          <h3 className="font-sans text-3xl md:text-4xl font-light text-stone-800 mb-4">Đặt Bàn Trải Nghiệm</h3>
          <p className="text-base md:text-lg text-stone-600 mb-6 max-w-lg mx-auto font-light">
            Để thưởng thức set menu chọn lọc, vui lòng đặt bàn trước
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SITE.phoneHref}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-medium px-6 py-3 rounded-md transition-colors"
            >
              Đặt Bàn Ngay
            </a>
            <a
              href={SITE.phoneHref}
              className="border-2 border-stone-300 text-stone-700 hover:bg-stone-200 font-medium px-6 py-3 bg-transparent rounded-md transition-colors"
            >
              Gọi: {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetMenuPage
