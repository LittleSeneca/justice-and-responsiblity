export interface NavigationItem {
  href: string
  label: string
  isActive?: boolean
}

export interface FooterLink {
  href: string
  label: string
}

// Main navigation items
export const navigationItems: NavigationItem[] = [
  {
    href: "/",
    label: "Charter"
  },
  {
    href: "/signatories", 
    label: "Signatories"
  },
  {
    href: "/about",
    label: "About"
  },
  {
    href: "/contact",
    label: "Contact"
  }
]

// Footer links
export const footerLinks: FooterLink[] = [
  {
    href: "/privacy",
    label: "Privacy Policy"
  },
  {
    href: "/sitemap", 
    label: "Site Map"
  },
  {
    href: "/contact",
    label: "Contact"
  }
]

// Helper function to get navigation items with active state
export function getNavigationItems(currentPath: string): NavigationItem[] {
  return navigationItems.map(item => ({
    ...item,
    isActive: currentPath === item.href
  }))
}

// Helper function to get the correct styling for navigation links
export function getNavLinkClass(isActive: boolean): string {
  return isActive 
    ? "text-blue-600 font-medium"
    : "text-gray-700 hover:text-blue-600 font-medium"
}

// Helper function to get footer link class
export function getFooterLinkClass(): string {
  return "text-blue-600 hover:text-blue-700 underline"
}