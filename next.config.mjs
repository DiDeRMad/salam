/** @type {import('next').NextConfig} */
const nextConfig = {
  // Явно фиксируем корень проекта, иначе Next выбирает родительскую папку
  // из-за лишних lock-файлов выше по дереву
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
