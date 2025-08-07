import Link from "next/link"
import { footerLinks, getFooterLinkClass } from "@/lib/navigation"

interface FooterProps {
  className?: string
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-white border-t border-gray-200 text-gray-600 py-8 mt-12 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getFooterLinkClass()}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm">
          © 2025 Justice and Responsibility Charter. A movement for government accountability.
        </p>
      </div>
    </footer>
  )
}