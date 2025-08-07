"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [stats, setStats] = useState({ totalSignatories: 0, congressMembers: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/signatories')
        if (response.ok) {
          const result = await response.json()
          setStats({
            totalSignatories: result.stats?.totalSignatories || 0,
            congressMembers: 0 // TODO: Implement congress member tracking
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Fallback to display zeros or default values
        setStats({ totalSignatories: 0, congressMembers: 0 })
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">J&R</span>
              </div>
              <span className="font-bold text-xl">Justice & Responsibility</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Charter
              </Link>
              <Link href="/signatories" className="text-gray-700 hover:text-blue-600 font-medium">
                Signatories
              </Link>
              <Link href="/sign">
                <Button>Sign the Charter</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">The Justice and Responsibility Charter</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            A call for transparency, accountability, and reform in American governance
          </p>

          {/* Counters */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{(stats.totalSignatories || 0).toLocaleString()}</div>
                <div className="text-sm opacity-80">Total Signatories</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <UserCheck className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{(stats.congressMembers || 0).toLocaleString()}</div>
                <div className="text-sm opacity-80">Members of Congress</div>
              </CardContent>
            </Card>
          </div>

          <Link href="/sign">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Add Your Signature
            </Button>
          </Link>
        </div>
      </section>

      {/* Charter Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          {/* Preamble */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preamble</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong>Whereas,</strong> the foundational principle of the United States government is that it derives
                its just powers from the consent of the governed;
              </p>
              <p>
                <strong>Whereas,</strong> the three branches of the federal government—Legislative, Executive, and
                Judicial—have collectively failed to uphold their constitutional and fiduciary duties to the American
                people, leading to a crisis of confidence and a systemic erosion of public trust;
              </p>
              <p>
                <strong>Whereas,</strong> this failure is not the result of isolated incidents but of pervasive and
                deeply entrenched corruption by special interests, which has subverted the proper functions of
                governance;
              </p>
              <p>
                <strong>Now, Therefore,</strong> for the historical record and as the basis for the reforms herein
                proposed, the following Articles of Grievance are presented against the existing political
                establishment:
              </p>
            </div>
          </section>

          {/* Articles of Grievance */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Articles of Grievance</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Article I: On Fiscal Malfeasance</h3>
                <p className="text-gray-700 leading-relaxed">
                  The federal government has engaged in decades of reckless fiscal policy, culminating in a national
                  debt exceeding thirty-nine trillion dollars ($39,000,000,000,000). This sum represents a catastrophic
                  failure of stewardship, imposes an unsustainable burden upon current and future generations, and
                  jeopardizes the economic sovereignty of the Nation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Article II: On the Withholding of Information of Public Interest
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The federal government has failed to provide transparency regarding matters of profound public
                  concern, most notably by refusing to authorize the complete and unredacted release of all documents
                  pertaining to the Jeffrey Epstein conspiracy. The continued sequestration of these files obstructs
                  justice and fosters the perception that a separate standard of law exists for the powerful and elite,
                  thereby undermining the principle of equal justice for all.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Article III: On the Subversion of the Democratic Process
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The United States Congress has systematically engaged in the practice of partisan gerrymandering,
                  creating unrepresentative electoral districts designed to entrench incumbent power and suppress the
                  will of the electorate. This practice effectively disenfranchises citizens and transforms the
                  democratic process into a non-participatory exercise.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Article IV: On the Entrenchment of an Unrepresentative Political Class
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The chambers of Congress have become dominated by a gerontocracy of wealthy and powerful individuals
                  who are disconnected from the realities of the citizenry they purport to represent. This entrenched
                  class has prioritized the perpetuation of its own influence over the necessary transfer of leadership
                  to a new generation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Article V: On Obfuscation in the Legislative Process
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The legislative process has been deliberately corrupted through the routine passage of omnibus bills
                  of unmanageable length and complexity. This practice ensures that legislation is neither fully read
                  nor understood by many who vote upon it, and serves to conceal provisions that would not withstand
                  public scrutiny if presented transparently. This method is a primary instrument through which the
                  aforementioned grievances are enacted into law.
                </p>
              </div>
            </div>
          </section>

          {/* Declaration and Platform */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Declaration and Platform</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Therefore, in response to these grievances and to restore integrity, accountability, and justice to the
              governance of the United States, we, the people, do hereby establish the Justice and Responsibility Party
              and proclaim the following platform as its foundational tenets:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Section 1: Fiscal Responsibility and Balanced Governance
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The federal budget shall be balanced over the course of the business cycle, with the goal of
                  preventing any net increase to the national debt outside of periods of declared national emergency or
                  significant economic recession. A clear and public glide path shall be established to achieve this
                  balance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Section 2: The Special Commission on Full Disclosure
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Special Commission shall be established by an act of Congress for the sole purpose of compelling the
                  Department of Justice and all other government agencies to release the complete, unredacted, and
                  uncensored files related to the Jeffrey Epstein conspiracy.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>2.1. Mandate:</strong> The Commission's mandate is to deliver these materials to a
                    third-party trust, established on behalf of the American people, for secure and lawful review.
                  </li>
                  <li>
                    <strong>2.2. Composition and Selection:</strong> The Commission shall be a congressionally
                    chartered, bipartisan body modeled on previous independent commissions.
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        a. The Commission shall be composed of ten (10) commissioners. No more than five (5)
                        commissioners shall be members of the same political party.
                      </li>
                      <li>
                        b. Commissioners shall be appointed by a consensus agreement between the majority and minority
                        leadership of both chambers of Congress.
                      </li>
                      <li>
                        c. To ensure independence, nominees for the Commission shall not have held federal elected
                        office, served as a federally registered lobbyist, or worked as a senior executive at a federal
                        agency for a period of no less than ten (10) years prior to their appointment.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>2.3. Authority:</strong> The Commission shall be granted full subpoena power to compel
                    testimony and the production of evidence. All commissioners and designated staff shall be granted
                    security clearance sufficient to review all relevant documents without redaction or censorship. The
                    principle guiding this section is that the government is of the people and does not possess the
                    right to withhold information from its citizens.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Section 3: Fair and Independent Congressional Districting
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  All congressional districts shall be drawn by independent, non-partisan commissions in each state. The
                  boundaries of said districts shall be determined primarily by census data and must adhere to strict
                  geometric and geographic simplicity, containing no more than ten (10) corners, with exceptions made
                  only for significant and clearly defined natural landmarks.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 4: Congressional Term Limits</h3>
                <p className="text-gray-700 leading-relaxed">
                  No person shall serve as a member of Congress for more than 6 (6) total terms in the House of
                  Representatives, and no more than four (4) total terms in the Senate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Section 5: Campaign Finance and Ethics Reform
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To sever the link between wealth and political influence, the following shall be enacted:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>5.1. Contribution Limits:</strong> No member of Congress, nor any candidate for Congress,
                    may accept more than six thousand dollars ($6,000) from any single individual donor per election
                    cycle.
                  </li>
                  <li>
                    <strong>5.2. Abolition of Special Interest Vehicles:</strong> The legal precedents established by
                    Citizens United v. FEC shall be overturned by constitutional amendment or superseding legislation.
                    All Political Action Committee (PAC) structures shall be abolished as legal mechanisms for campaign
                    donations. Equivalent loopholes will be targeted for removal as they arise.
                  </li>
                  <li>
                    <strong>5.3. Prohibition on Securities Trading:</strong> Sitting members of Congress shall be
                    prohibited from trading in individual stocks or other individual securities and may only participate
                    in well-defined mutual funds or other stock allocations. An independent non-congressional committee
                    will be established to define appropriate stock allocations, as well as provide oversite and audit
                    controls.
                  </li>
                  <li>
                    <strong>5.4. Prohibition on Lobbying:</strong> No person who has served as a member of Congress
                    shall be eligible to work as a lobbyist at any time, before or after their term of office.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Section 6: Legislative Transparency and Readability
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To ensure due diligence and public oversight in the legislative process, the following rules shall
                  apply to all bills before Congress:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>6.1. Bill Integrity:</strong> All legislation must adhere to a strict "single subject" rule,
                    prohibiting the inclusion of provisions unrelated to the central purpose of the bill.
                  </li>
                  <li>
                    <strong>6.2. Public Review and Bill Length:</strong> To ensure sufficient time for public review,
                    the following shall apply:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        a. <strong>Standard Review:</strong> For any bill whose full text is one hundred (100) pages or
                        fewer, no vote shall be held until a period of at least one full week (168 hours) has passed
                        since the text was published.
                      </li>
                      <li>
                        b. <strong>Extended Review for Complex Legislation:</strong> For any bill exceeding one hundred
                        (100) pages, no vote shall be held until a period of at least thirty (30) days has passed since
                        the text was published. Such bills must also be accompanied by an official, plain-language
                        summary of no more than ten (10) pages.
                      </li>
                      <li>
                        c. <strong>Formatting Standard:</strong> For the purposes of this section, a "page" is defined
                        as a standard 8.5x11 inch page with one-inch margins, double-spaced, using a 12-point Times New
                        Roman font or its equivalent.
                      </li>
                      <li>
                        d. <strong>Emergency Waiver:</strong> The applicable review period may only be waived in the
                        case of a formally declared national emergency and upon a two-thirds supermajority vote in both
                        chambers of Congress.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Movement</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Add your voice to the growing call for transparency, accountability, and reform in American governance.
            </p>
            <Link href="/sign">
              <Button size="lg" className="text-lg px-8 py-3">
                Sign the Charter Now
              </Button>
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Justice and Responsibility Charter. A movement for government accountability.</p>
        </div>
      </footer>
    </div>
  )
}
