import Link from "next/link"

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JR</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Justice and Responsibility Charter</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
              <Link href="/sign" className="text-gray-600 hover:text-blue-600">Sign Charter</Link>
              <Link href="/signatories" className="text-gray-600 hover:text-blue-600">Signatories</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Site Map</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 leading-relaxed mb-8">
              Navigate our website easily with this comprehensive site map. Find all pages, sections, and important links organized by category.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Main Pages */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Main Pages</h2>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-blue-600 hover:text-blue-700 underline text-lg">
                      🏠 Home
                    </Link>
                    <p className="text-sm text-gray-600 ml-6">
                      Charter text, articles of grievance, and platform sections
                    </p>
                    <ul className="ml-8 mt-2 space-y-1 text-sm">
                      <li><span className="text-gray-600">• Hero Section</span></li>
                      <li><span className="text-gray-600">• Articles of Grievance (I-V)</span></li>
                      <li><span className="text-gray-600">• Charter Platform (Sections 1-6)</span></li>
                      <li><span className="text-gray-600">• References & Appendices (1-12)</span></li>
                    </ul>
                  </li>
                  
                  <li>
                    <Link href="/about" className="text-blue-600 hover:text-blue-700 underline text-lg">
                      ℹ️ About
                    </Link>
                    <p className="text-sm text-gray-600 ml-6">
                      Mission, impact, and author information
                    </p>
                    <ul className="ml-8 mt-2 space-y-1 text-sm">
                      <li><span className="text-gray-600">• Our Mission</span></li>
                      <li><span className="text-gray-600">• Our Impact</span></li>
                      <li><span className="text-gray-600">• About the Charter's Author</span></li>
                    </ul>
                  </li>
                  
                  <li>
                    <Link href="/sign" className="text-blue-600 hover:text-blue-700 underline text-lg">
                      ✍️ Sign Charter
                    </Link>
                    <p className="text-sm text-gray-600 ml-6">
                      Add your signature to support the charter
                    </p>
                    <ul className="ml-8 mt-2 space-y-1 text-sm">
                      <li><span className="text-gray-600">• Signature Form</span></li>
                      <li><span className="text-gray-600">• Newsletter Subscription</span></li>
                      <li><span className="text-gray-600">• Data Privacy Notice</span></li>
                      <li><span className="text-gray-600">• Security Verification</span></li>
                    </ul>
                  </li>
                  
                  <li>
                    <Link href="/signatories" className="text-blue-600 hover:text-blue-700 underline text-lg">
                      👥 Signatories
                    </Link>
                    <p className="text-sm text-gray-600 ml-6">
                      View all charter supporters and statistics
                    </p>
                    <ul className="ml-8 mt-2 space-y-1 text-sm">
                      <li><span className="text-gray-600">• Signature Statistics</span></li>
                      <li><span className="text-gray-600">• State Breakdown</span></li>
                      <li><span className="text-gray-600">• Recent Signatories List</span></li>
                      <li><span className="text-gray-600">• Congress Members vs. Constituents</span></li>
                    </ul>
                  </li>
                </ul>
              </section>

              {/* Support & Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Support & Information</h2>
                <ul className="space-y-3">
                  <li>
                    <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline text-lg">
                      📧 Contact
                    </Link>
                    <p className="text-sm text-gray-600 ml-6">
                      Get in touch with questions or support
                    </p>
                    <ul className="ml-8 mt-2 space-y-1 text-sm">
                      <li><span className="text-gray-600">• Contact Form</span></li>
                      <li><span className="text-gray-600">• Direct Email Links</span></li>
                      <li><span className="text-gray-600">• Response Time Information</span></li>
                    </ul>
                  </li>
                  
                  <li>
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline text-lg">
                      🔒 Privacy Policy
                    </Link>
                    <p className="text-sm text-gray-600 ml-6">
                      Complete data privacy and security information
                    </p>
                    <ul className="ml-8 mt-2 space-y-1 text-sm">
                      <li><span className="text-gray-600">• Information Collection</span></li>
                      <li><span className="text-gray-600">• Data Usage & Security</span></li>
                      <li><span className="text-gray-600">• User Rights & Choices</span></li>
                      <li><span className="text-gray-600">• Contact Information</span></li>
                    </ul>
                  </li>
                  
                  <li>
                    <Link href="/sitemap" className="text-blue-600 hover:text-blue-700 underline text-lg">
                      🗺️ Site Map
                    </Link>
                    <p className="text-sm text-gray-600 ml-6">
                      This page - comprehensive site navigation
                    </p>
                  </li>
                </ul>
              </section>
            </div>

            {/* Charter Sections Reference */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Charter Content Reference</h2>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Articles of Grievance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Articles of Grievance</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="font-medium text-gray-700">Article I:</span>
                      <span className="text-gray-600"> On the Abdication of Fiscal Responsibility</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Article II:</span>
                      <span className="text-gray-600"> On the Denial of Transparency</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Article III:</span>
                      <span className="text-gray-600"> On the Subversion of Representative Democracy</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Article IV:</span>
                      <span className="text-gray-600"> On the Entrenchment of an Unrepresentative Political Class</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Article V:</span>
                      <span className="text-gray-600"> On Obfuscation in the Legislative Process</span>
                    </li>
                  </ul>
                </div>

                {/* Charter Platform */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Charter Platform</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="font-medium text-gray-700">Section 1:</span>
                      <span className="text-gray-600"> Fiscal Responsibility Amendment</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Section 2:</span>
                      <span className="text-gray-600"> Special Commission on Full Disclosure</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Section 3:</span>
                      <span className="text-gray-600"> Electoral Integrity and Fair Representation</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Section 4:</span>
                      <span className="text-gray-600"> Congressional Term Limits</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Section 5:</span>
                      <span className="text-gray-600"> Campaign Finance and Ethics Reform</span>
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Section 6:</span>
                      <span className="text-gray-600"> Legislative Transparency and Readability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* External References */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research & References</h2>
              <p className="text-gray-700 mb-4">
                Our charter is backed by extensive research. All references are linked throughout the main charter page:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Financial Data</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• National Debt Sources</li>
                    <li>• Per-Person Debt Calculations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Government Transparency</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Jeffrey Epstein Files Research</li>
                    <li>• Government Secrecy Studies</li>
                    <li>• Independent Commission Benefits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Electoral & Congressional</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Gerrymandering Documentation</li>
                    <li>• Term Limits Research</li>
                    <li>• Campaign Finance Studies</li>
                    <li>• Legislative Obfuscation Analysis</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mt-12 bg-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/sign" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Sign the Charter
                </Link>
                <Link 
                  href="/signatories" 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  View Signatories
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-600 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Justice and Responsibility Charter. A movement for government accountability.</p>
          <div className="mt-4 space-x-4">
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>
            <Link href="/sitemap" className="text-blue-600 hover:text-blue-700 underline">Site Map</Link>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}