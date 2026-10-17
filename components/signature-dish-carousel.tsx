"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselImages = [
  {
    src: "/images/signature-dish/cua-ca-ri-do-1.jpg",
    alt: "Cua Gạch Cà Mau sốt cà ri đỏ - Phía trên",
  },
  {
    src: "/images/signature-dish/cua-ca-ri-do-2.jpg",
    alt: "Cua Gạch Cà Mau sốt cà ri đỏ - Góc nhìn khác",
  },
  {
    src: "/images/signature-dish/cua-ca-ri-do-poster.png",
    alt: "Cua Gạch Cà Mau - Poster quảng cáo",
  },
]

export default function SignatureDishCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    setIsAutoPlay(false)
  }

  return (
    <div className="relative w-full">
      {/* Main Carousel */}
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl bg-gray-200">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-brand-green" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-brand-green" />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4 bg-brand-green/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {currentSlide + 1} / {carouselImages.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-3 mt-4">
        {carouselImages.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors ${
              index === currentSlide ? "border-brand-gold" : "border-gray-300 hover:border-brand-gold/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
