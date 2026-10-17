"use client"

import { SITE } from "@/lib/site"
import Link from "next/link"
import { MenuIcon, ChefHat, Home, Utensils, ImageIcon, Phone, ListChecks } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const navLinks = [
    { href: "/", label: "Trang chủ", icon: <Home className="h-4 w-4" /> },
    { href: "/ve-chung-toi", label: "Về Siam Siam", icon: <ChefHat className="h-4 w-4" /> },
    { href: "/bep-truong", label: "Bếp Trưởng", icon: <ChefHat className="h-4 w-4" /> },
    { href: "/set-menu-chon-loc", label: "Set Menu Chọn Lọc", icon: <ListChecks className="h-4 w-4" /> },
    { href: "/khong-gian", label: "Không Gian", icon: <ImageIcon className="h-4 w-4" /> },
    { href: "/thuc-don", label: "Full-Menu", icon: <Utensils className="h-4 w-4" /> },
    { href: "/lien-he", label: "Liên Hệ", icon: <Phone className="h-4 w-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-gold/30 bg-brand-pattern text-brand-cream shadow-md">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/siam-siam-official-logo.png" alt="Siam Siam Logo" width={60} height={60} priority />
          <span className="font-sans text-2xl font-bold text-brand-gold uppercase tracking-wider">Siam Siam</span>
        </Link>
        <nav aria-label="Điều hướng chính" className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-cream transition-colors hover:text-brand-gold"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Đặt Bàn
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-brand-gold text-brand-green hover:bg-brand-gold/90 p-2 rounded-md transition-colors"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">{isOpen ? "Đóng menu" : "Mở menu"}</span>
        </button>

        {/* Mobile menu */}
        {isOpen && (
          <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-brand-green text-brand-cream border-t border-brand-gold/50 md:hidden">
            <div className="container py-6">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image src="/images/siam-siam-official-logo.png" alt="Siam Siam Logo" width={40} height={40} />
                <span className="font-sans text-xl font-bold text-brand-gold uppercase">Siam Siam</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-md p-2 text-brand-cream hover:bg-brand-gold/20 hover:text-brand-gold mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <a
                href={SITE.phoneHref}
                className="w-full mt-4 bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-semibold px-4 py-2 rounded-md transition-colors inline-block text-center"
              >
                Đặt Bàn
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
