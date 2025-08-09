"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header className="bg-white/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About This Movement</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Beyond partisan politics toward structural solutions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          
          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>
                For too long, Americans have been told that the corruption, dysfunction, and systematic failures plaguing our federal government are simply "the way things work" - that nothing can be done, that nothing can change, and that we must accept the status quo. We reject this defeatist narrative. The Justice and Responsibility Charter exists to provide third-party proof that there is a mutually agreed-upon bedrock philosophy on how the United States should be governed, transcending the artificial divisions of partisan politics that have paralyzed meaningful reform for decades.
              </p>
              <p>
                This is not a partisan issue - it is an American issue. The structural problems outlined in our charter affect every citizen regardless of their political affiliation, and the solutions we propose benefit all Americans who believe in transparent, accountable governance. Most of the crises facing our nation today are merely symptoms of an underlying illness: broken systems that prioritize special interests over the public good, opacity over transparency, and political theater over genuine problem-solving. By addressing these foundational structural defects through constitutional reforms and accountability mechanisms, we can restore order, equity, and trust to American governance. Real change begins when we stop treating symptoms and start curing the disease itself.
              </p>
            </div>
          </section>

          {/* Our Impact Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>
                The Justice and Responsibility Charter represents more than just a document. It is the foundation of a grassroots movement that fundamentally changes how Americans engage with their elected representatives. By gathering signatories from across the political spectrum, we create undeniable proof that there is broad, bipartisan support for the structural reforms outlined in our charter.
              </p>
              <p>
                As this platform grows, we hope it will become the central nexus of a coordinated effort to pressure our elected officials to either embrace these essential reforms or face primary challenges from candidates who do. We envision a future where the most common and universal question Americans ask of their representatives is: <strong>"Did you sign the Justice and Responsibility Charter?"</strong> This simple question cuts through partisan rhetoric and forces politicians to take a clear stance on transparency, accountability, and genuine reform.
              </p>
              <p>
                As the charter gains traction and recognition, we will implement comprehensive tracking systems to monitor our elected officials' positions and actions related to our platform. This will include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>The Praise Board:</strong> Recognition and celebration of elected officials who actively support the charter's goals and demonstrate genuine commitment to its principles through their voting records and policy positions.
                </li>
                <li>
                  <strong>The Name and Shame Board:</strong> Transparent documentation of representatives who oppose charter principles, block meaningful reforms, or continue to engage in the exact behaviors our movement seeks to eliminate.
                </li>
              </ul>
              <p>
                This accountability framework will provide voters with clear, factual information about where their representatives stand on the issues that matter most to good governance. By shining a light on both positive and negative actions, we will create powerful incentives for elected officials to align with the public interest rather than special interests.
              </p>
              <p>
                The ultimate goal is not to punish or reward politicians, but to create a political environment where supporting transparency, fiscal responsibility, and ethical governance becomes the clear path to electoral success. When enough Americans unite behind these principles, even the most entrenched politicians have no choice but to listen or be replaced by those who do.
              </p>
            </div>
          </section>

          {/* About the Author Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Charter's Author</h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <img 
                    src="/images/graham.jpeg" 
                    alt="Graham Brooks" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4 flex-1">
                  <p>
                    The Justice and Responsibility Charter was created by <strong>Graham Brooks</strong>, a husband, father, and <a href="https://www.linkedin.com/in/grahamwbrooks/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">Software Engineer</a> based in Northern Idaho. Graham created this charter not as a political campaign or partisan document, but as a practical roadmap for Americans who are ready to move beyond the failed left-versus-right paradigm toward structural solutions that can restore order and create a more equitable system for everyone.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Be Part of the Solution?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Join thousands of Americans who believe that our government can and should work better. This isn't about political parties - it's about common-sense reforms that benefit everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign the Charter
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Read the Full Charter
                </Button>
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}