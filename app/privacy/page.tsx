import Link from "next/link"

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <div className="text-sm text-gray-500 mb-6">
              <strong>Last Updated:</strong> January 2025
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                The Justice and Responsibility Charter ("we," "our," or "us") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, protect, and handle your personal data when you visit our website and sign our charter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Information You Provide</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you sign the Justice and Responsibility Charter, we collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Personal Information:</strong> First name, last name, email address, and state of residence</li>
                <li><strong>Optional Information:</strong> Comments about why you're signing the charter</li>
                <li><strong>Newsletter Preference:</strong> Whether you wish to receive email updates about our movement</li>
                <li><strong>Agreement:</strong> Your consent to have your name publicly listed as a signatory</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To prevent fraud and ensure security, we automatically collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>IP Address:</strong> Your internet connection's IP address</li>
                <li><strong>Browser Information:</strong> Technical details about your browser and device (anonymized)</li>
                <li><strong>Timestamp:</strong> Date and time when you signed the charter</li>
                <li><strong>Security Verification:</strong> Cloudflare Turnstile verification to prevent automated submissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Charter Display:</strong> Your name and state are displayed publicly on our signatories list to demonstrate support for the charter</li>
                <li><strong>Communication:</strong> If you opt in, we send occasional email updates about the movement's progress and related civic issues</li>
                <li><strong>Security:</strong> Technical information helps us prevent duplicate signatures and fraudulent activity</li>
                <li><strong>Analytics:</strong> We analyze aggregate data (without personal identifiers) to understand geographic support and movement growth</li>
                <li><strong>Legal Compliance:</strong> We may use information as required by applicable laws or legal processes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security and Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Encryption:</strong> All data is encrypted both in transit (HTTPS/SSL) and at rest in our secure MongoDB database</li>
                <li><strong>Access Control:</strong> Only authorized personnel have access to personal data, and access is logged and monitored</li>
                <li><strong>Secure Infrastructure:</strong> Our systems are hosted on secure, professionally managed cloud infrastructure</li>
                <li><strong>Regular Security Updates:</strong> We maintain up-to-date security patches and monitoring systems</li>
                <li><strong>Data Minimization:</strong> We collect only the information necessary for our stated purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>We do not sell, rent, or trade your personal information to third parties.</strong> We may share information only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Public Display:</strong> Your name and state are publicly displayed on our signatories list as agreed when signing</li>
                <li><strong>Legal Requirements:</strong> If required by law, court order, or other legal process</li>
                <li><strong>Service Providers:</strong> With trusted service providers who help us operate our website and send emails (all bound by strict confidentiality agreements)</li>
                <li><strong>Safety:</strong> To protect the rights, property, or safety of our organization, users, or others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access:</strong> Request a copy of the personal information we have about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (note: this will remove you from the public signatories list)</li>
                <li><strong>Opt-out:</strong> Unsubscribe from email communications at any time using the unsubscribe link in emails</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a commonly used format</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise any of these rights, please contact us at the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website uses minimal tracking technologies. We use session cookies for basic website functionality and Cloudflare Turnstile for security verification. We do not use advertising cookies or third-party tracking for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us to request deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-700 leading-relaxed">
                If you are accessing our website from outside the United States, please note that your information may be transferred to, stored, and processed in the United States where our servers are located. By using our services, you consent to this transfer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify users of any material changes by posting the updated policy on our website with a new "Last Updated" date. Your continued use of our services after any changes indicates your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Justice and Responsibility Charter</strong><br />
                  Contact Form: <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact Us</Link>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  We will respond to your inquiry within 30 days of receipt.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Effective Date</h2>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy is effective as of January 2025 and applies to all information collected by the Justice and Responsibility Charter from that date forward.
              </p>
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
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}