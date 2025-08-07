"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
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

// Mobile navigation component
export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const navigationItems = getNavigationItems(pathname)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="p-2"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${getNavLinkClass(item.isActive || false)} px-3 py-2 rounded-md transition-colors block text-center`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/sign" onClick={closeMenu}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  Sign
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
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
            
            {/* Desktop Sign Button (hidden on mobile) */}
            <div className="hidden md:block">
              <Link href="/sign">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign
                </Button>
              </Link>
            </div>
            
            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>
        </nav>
      </div>
    </header>
  )
}