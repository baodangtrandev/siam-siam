/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // URL tiếng Việt cũ chuyển vĩnh viễn (301) sang URL tiếng Anh, giữ link đã chia sẻ và thứ hạng SEO.
  async redirects() {
    return [
      { source: "/thuc-don", destination: "/menu", permanent: true },
      { source: "/ve-chung-toi", destination: "/about", permanent: true },
      { source: "/bep-truong", destination: "/chef", permanent: true },
      { source: "/set-menu-chon-loc", destination: "/set-menu", permanent: true },
      { source: "/khong-gian", destination: "/space", permanent: true },
      { source: "/lien-he", destination: "/contact", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Ảnh menu tạo sẵn: cache 30 ngày, sau đó vẫn dùng bản cũ trong lúc tải lại ngầm.
        source: "/images/full-menu/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" }],
      },
    ]
  },
}

export default nextConfig
