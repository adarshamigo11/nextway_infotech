import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "Nextway Infotech - Trusted Financial Technology Solutions",
    template: "%s | Nextway Infotech",
  },
  description:
    "Nextway Infotech provides cutting-edge financial technology solutions including algo trading, software development, HRM & payroll, school management, tour & travel, and law firm management systems.",
  keywords: [
    "fintech",
    "algo trading",
    "software development",
    "HRM",
    "payroll",
    "school management",
    "financial technology",
  ],
}

export const viewport: Viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
