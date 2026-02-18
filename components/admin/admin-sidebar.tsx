"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" })
    router.push("/admin")
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2ECC71]">
          <span className="text-sm font-bold text-[#0A1F44] font-sans">N</span>
        </div>
        <span className="font-semibold text-foreground font-sans">
          Admin Panel
        </span>
      </div>
      <nav className="flex-1 px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors font-sans ${
                active
                  ? "bg-[#2ECC71]/10 text-[#2ECC71]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive font-sans"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
