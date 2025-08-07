"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getNavigationItems, getNavLinkClass } from "@/lib/navigation"

interface NavigationProps {
  className?: string
}

export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname()
  const navigationItems = getNavigationItems(pathname)

  return (
    <nav className={`hidden md:flex items-center space-x-6 ${className}`}>
      {navigationItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href} 
          className={`${getNavLinkClass(item.isActive || false)} px-3 py-2 rounded-md transition-colors`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

// Simple header logo component
export function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">J&R</span>
      </div>
      <span className="hidden md:block text-xl font-bold text-gray-900">Justice & Responsibility</span>
    </Link>
  )
}

// Complete header component
interface HeaderProps {
  className?: string
}

export function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <HeaderLogo />
          
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation Links */}
            <Navigation />
            
            {/* Sign Button (visible on all screen sizes) */}
            <Link href="/sign">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}