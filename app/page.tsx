"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, Scale, Eye, Map, Clock, Ban, FileX } from "lucide-react"
import { useEffect, useState } from "react"
import { Header } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

// Smooth scroll function for reference links
const scrollToRef = (refId: string) => {
  const element = document.getElementById(refId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Live debt counter component
function LiveDebtCounter() {
  const [currentDebt, setCurrentDebt] = useState(36100000000000)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDebt = async () => {
      try {
        const response = await fetch('/api/debt')
        if (response.ok) {
          const data = await response.json()
          if (data.debt && !isNaN(data.debt)) {
            setCurrentDebt(data.debt)
          }
        }
      } catch (error) {
        console.warn('Unable to fetch live debt data:', error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch immediately
    fetchDebt()

    // Fetch every 30 seconds for live updates
    const interval = setInterval(fetchDebt, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatDebt = (debt: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(debt)
  }

  return (
    <span className={`font-bold text-red-600 transition-all duration-500 ${isLoading ? 'animate-pulse' : ''}`}>
      {formatDebt(currentDebt)}
    </span>
  )
}

// Live debt per person counter component
function LiveDebtPerPerson() {
  const [currentDebt, setCurrentDebt] = useState(36100000000000)
  const [currentPopulation, setCurrentPopulation] = useState(336000000)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/debt')
        if (response.ok) {
          const data = await response.json()
          if (data.debt && !isNaN(data.debt)) {
            setCurrentDebt(data.debt)
          }
          if (data.population && !isNaN(data.population)) {
            setCurrentPopulation(data.population)
          }
        }
      } catch (error) {
        console.warn('Unable to fetch live data:', error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch immediately
    fetchData()

    // Fetch every 30 seconds for live updates
    const interval = setInterval(fetchData, 30000)

    return () => clearInterval(interval)
  }, [])

  const debtPerPerson = currentDebt / currentPopulation

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <span className={`font-bold text-red-600 transition-all duration-500 ${isLoading ? 'animate-pulse' : ''}`}>
      {formatCurrency(debtPerPerson)}
    </span>
  )
}

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
    <div className="min-h-screen bg-gray-50">
      <Header className="bg-white/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <section className="py-12 text-white relative bg-blue-600">
        {/* Background Lady Liberty Image */}
        <div 
          className="absolute right-0 bottom-0 w-1/3 h-96 bg-no-repeat bg-right bg-contain pointer-events-none"
        style={{
            backgroundImage: 'url(/images/lady-liberty.png)',
            backgroundPosition: 'right bottom'
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Call to Action Box */}
          <div className="mb-8 max-w-5xl mx-auto">
            <Card className="bg-white/95 border-white/50 text-gray-900">
              <CardContent className="p-8 text-center">
                                  <p className="text-lg md:text-xl leading-relaxed mb-6">
                    The foundational principle of the United States government is that it derives its just powers from the consent of the governed. But, that consent has been violated. We can fix this through non-partisan structural reforms. That is what the Justice and Responsibility Charter aims to provide - A platform for Americans to hold their representatives accountable. <br />
                    <br />
                  </p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                      onClick={() => scrollToRef('charter-text')}
                    >
                      Read the Charter
                    </Button>
                    <Link href="/sign">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                        Add Your Signature
                      </Button>
                    </Link>
                  </div>
              </CardContent>
            </Card>
          </div>

          {/* Counters */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <Card className="bg-white/90 border-white/50 text-gray-900">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold">{(stats.totalSignatories || 0).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Signatories</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 border-white/50 text-gray-900">
              <CardContent className="p-6 text-center">
                <UserCheck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold">{(stats.congressMembers || 0).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Members of Congress</div>
              </CardContent>
            </Card>
          </div>


        </div>
      </section>

      {/* Key Reforms Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Five Essential Reforms
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            These structural solutions address the root causes of dysfunction in American government
          </p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {/* Box 1 - Balanced Budget */}
            <Card className="bg-white border-2 border-blue-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Scale className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  Balanced the Budget
                </h3>
              </CardContent>
            </Card>



            {/* Box 3 - No Gerrymandering */}
            <Card className="bg-white border-2 border-blue-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Map className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  No More Gerrymandering
                </h3>
              </CardContent>
            </Card>

            {/* Box 4 - Term Limits */}
            <Card className="bg-white border-2 border-blue-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  Enact Term Limits
                </h3>
              </CardContent>
            </Card>

            {/* Box 5 - No More Super PACs */}
            <Card className="bg-white border-2 border-blue-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Ban className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  No More Super PACs
                </h3>
              </CardContent>
            </Card>

            {/* Box 6 - No Omnibus Bills */}
            <Card className="bg-white border-2 border-blue-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <FileX className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  No 2000+ Page Omnibus Bills
                </h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-blue-500 border-blue-600">
            <CardContent className="p-8">
                              <p className="text-lg text-white leading-relaxed text-center">
                These five reforms are designed to work in synergy. First, banning Super PACs, ending gerrymandering, and enacting term limits aim to make politicians accountable to voters, not special interests. This new accountability is then enforced through transparent governing rules like a balanced budget and a ban on secretive omnibus bills that prevent proper democratic oversight.
                </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Main Content Container */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              {/* FAQ Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Question 1 */}
                <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    "What difference will this make?"
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    The difference is what effort you put in. This charter and your signature creates undeniable proof of bipartisan support for structural reforms, forcing politicians to take clear stances on transparency and accountability.
                  </p>
                </div>

                {/* Question 2 */}
                <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    "Is this a political party?"
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    No. This charter is for all Americans who want transparent, just, and responsible government regardless of party affiliation. These are structural solutions, not partisan politics. We are not a political party. We are a movement.
                  </p>
                </div>

                {/* Question 3 */}
                <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    "Why should I care?"
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    I'm personally tired of inaction. How about you? The corruption and dysfunction affecting every citizen can be fixed, but only if we demand better together. Politicians on both sides of the aisle are ignoring the will of the people. We can change that.
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Charter Text Section */}
      <section id="charter-text" className="pt-6 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-6xl font-bold text-blue-600 mb-4">
          The Justice and Responsibility Charter
          </h2>
        </div>
      </section>

      {/* Charter Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="prose prose-lg max-w-none border-2 border-blue-500 rounded-lg p-8 bg-white">
          {/* Preamble */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Preamble</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong>Whereas,</strong> the foundational principle of the United States government is that it derives
                its just powers from the consent of the governed;
              </p>
              <p>
                <strong>Whereas,</strong> the three branches of the federal government - Legislative, Executive, and
                Judicial - have collectively failed to uphold their constitutional and fiduciary duties to the American
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
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Articles of Grievance</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">Article I: On Fiscal Malfeasance</h3>
                <p className="text-gray-700 leading-relaxed">
                  The federal government has engaged in decades of reckless fiscal policy, culminating in a national
                  debt currently totaling <LiveDebtCounter /><button onClick={() => scrollToRef('ref1')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">1</button>. This represents approximately <LiveDebtPerPerson /><button onClick={() => scrollToRef('ref2')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">2</button> for every person in America. This sum represents a catastrophic
                  failure of stewardship, imposes an unsustainable burden upon current and future generations, and
                  jeopardizes the economic sovereignty of the Nation.
                </p>
              </div>



              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  Article II: On the Subversion of the Democratic Process
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The United States Congress has systematically engaged in the practice of partisan gerrymandering<button onClick={() => scrollToRef('ref3')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">3</button>,
                  creating unrepresentative electoral districts designed to entrench incumbent power and suppress the
                  will of the electorate<button onClick={() => scrollToRef('ref4')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">4</button>. This practice effectively disenfranchises citizens and transforms the
                  democratic process into a non-participatory exercise.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  Article III: On the Entrenchment of an Unrepresentative Political Class
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The chambers of Congress have become dominated by a gerontocracy of wealthy and powerful individuals
                  who are disconnected from the realities of the citizenry they purport to represent<button onClick={() => scrollToRef('ref6')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">6</button>. This entrenched
                  class has prioritized the perpetuation of its own influence over the necessary transfer of leadership
                  to a new generation. They have systematically enriched themselves through insider trading<button onClick={() => scrollToRef('ref7')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">7</button> while
                  opening the floodgates to unlimited dark money and super PAC corruption<button onClick={() => scrollToRef('ref8')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">8</button>.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  Article IV: On Obfuscation in the Legislative Process
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The legislative process has been deliberately corrupted through the routine passage of omnibus bills
                  of unmanageable length and complexity<button onClick={() => scrollToRef('ref9')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">9</button>. This practice ensures that legislation is neither fully read
                  nor understood by many who vote upon it, and serves to conceal provisions that would not withstand
                  public scrutiny if presented transparently. This method is a primary instrument through which the
                  aforementioned grievances are enacted into law.
                </p>
              </div>
            </div>
          </section>

          {/* Declaration and Platform */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Declaration and Platform</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Therefore, in response to these grievances and to restore integrity, accountability, and justice to the
              governance of the United States, we, the people, do hereby establish the Justice and Responsibility Charter
              and proclaim the following statements as its foundational tenets:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
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
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  Section 2: Fair and Independent Congressional Districting
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  All congressional districts shall be drawn by independent, non-partisan commissions in each state<button onClick={() => scrollToRef('ref4')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">4</button>. The
                  boundaries of said districts shall be determined primarily by census data and must adhere to strict
                  geometric and geographic simplicity, containing no more than ten (10) corners, with exceptions made
                  only for significant and clearly defined natural landmarks<button onClick={() => scrollToRef('ref5')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">5</button>.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">Section 3: Congressional Term Limits</h3>
                <p className="text-gray-700 leading-relaxed">
                  No person shall serve as a member of Congress for more than 6 (6) total terms in the House of
                  Representatives, and no more than four (4) total terms in the Senate<button onClick={() => scrollToRef('ref6')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">6</button>.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  Section 4: Campaign Finance and Ethics Reform
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
                    Citizens United v. FEC shall be overturned by constitutional amendment or superseding legislation<button onClick={() => scrollToRef('ref8')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">8</button>.
                    All Political Action Committee (PAC) structures shall be abolished as legal mechanisms for campaign
                    donations. Equivalent loopholes will be targeted for removal as they arise.
                  </li>
                  <li>
                    <strong>5.3. Prohibition on Securities Trading:</strong> Sitting members of Congress shall be
                    prohibited from trading in individual stocks or other individual securities<button onClick={() => scrollToRef('ref7')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">7</button> and may only participate
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
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  Section 5: Legislative Transparency and Readability
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
                    <strong>6.2. Public Review and Bill Length:</strong> To ensure sufficient time for public review<button onClick={() => scrollToRef('ref9')} className="text-red-600 hover:text-red-700 text-sm align-super no-underline bg-transparent border-none p-0 cursor-pointer">9</button>,
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

        </div>
          {/* Mission Statement Section */}
          <section className="py-12 bg-gray-50 rounded-lg my-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Mission</h3>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  <p>
                    <strong>We reject the defeatist narrative</strong> that corruption, dysfunction, and systematic failures are simply "the way things work." The Justice and Responsibility Charter provides proof that Americans across the political spectrum agree on how our government should function.
                  </p>
                  <p>
                    <strong>This is not a partisan issue. It's an American issue.</strong> Most crises facing our nation are symptoms of broken systems that prioritize special interests over the public good. By addressing these foundational problems through constitutional reforms, we can restore trust to American governance.
                  </p>
                  <p className="text-center font-semibold text-blue-800">
                    As this movement grows, the most common question Americans will ask their representatives is: <br />
                    <em>"Did you sign the Justice and Responsibility Charter?"</em>
                  </p>
                </div>
              </div>

              {/* Enhanced Call to Action */}
              <div className="text-center mt-12">
                <p className="text-lg text-gray-600 mb-6">
                  Real change begins when we stop treating symptoms and start curing the disease itself.
            </p>
            <Link href="/sign">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
                    Add Your Voice to the Movement
              </Button>
            </Link>
                <p className="text-sm text-gray-500 mt-4">
                  Join thousands of Americans demanding transparent, accountable governance
                </p>
              </div>
            </div>
          </section>

          {/* References/Appendix */}
          <section className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">References</h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div id="ref1" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">1.</span>
                <div>
                  <strong>National Debt Data:</strong> Real-time national debt figures are sourced from the U.S. Treasury's Fiscal Data API, specifically the "Debt to the Penny" dataset. This data is updated daily and represents the total public debt outstanding of the United States government.
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny" target="_blank" rel="noopener noreferrer" className="underline">
                      U.S. Treasury Fiscal Data API - Debt to the Penny
                    </a>
                  </span>
                </div>
              </div>
              <div id="ref2" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">2.</span>
                <div>
                  <strong>Per-Person Debt Calculation:</strong> The debt per person figure is calculated by dividing the current national debt by the most recent U.S. population estimate from the Census Bureau's Population Estimates Program (PEP). Population data is sourced from the U.S. Census Bureau API.
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://api.census.gov/data/2023/pep/charv?get=POP&for=us:*&YEAR=2023" target="_blank" rel="noopener noreferrer" className="underline">
                      U.S. Census Bureau Population Estimates API
                    </a>
                  </span>
                </div>
              </div>
              <div id="ref3" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">3.</span>
                <div>
                  <strong>Gerrymandering Harms and Reform Solutions:</strong> Extensive academic research demonstrates that gerrymandering fundamentally undermines democratic principles by allowing politicians to choose their voters rather than voters choosing their representatives, creating unrepresentative districts that disenfranchise citizens and transform the democratic process into what scholars describe as "a non-participatory exercise."
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://en.wikipedia.org/wiki/Gerrymandering_in_the_United_States#Examples_of_gerrymandered_U.S._districts" target="_blank" rel="noopener noreferrer" className="underline">
                      Wikipedia: Gerrymandering in the United States - Examples of Gerrymandered Districts
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.cambridge.org/core/books/abs/gerrymandering-the-states/democratic-harms-of-gerrymandering/2EE9869D28633F8BC15E05262AB83254" target="_blank" rel="noopener noreferrer" className="underline">
                      Cambridge University Press: The Democratic Harms of Gerrymandering
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.ejournalofpublicaffairs.org/effects-of-gerrymandering-on-state-and-social-policy/" target="_blank" rel="noopener noreferrer" className="underline">
                      eJournal of Public Affairs: Effects of Gerrymandering on State Social Policy
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.motherjones.com/politics/2023/06/blame-the-supreme-court-for-americas-decade-of-voter-disenfranchisement/" target="_blank" rel="noopener noreferrer" className="underline">
                      Mother Jones: Supreme Court's Role in America's Decade of Voter Disenfranchisement
                    </a>
                  </span>
                </div>
              </div>
              <div id="ref4" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">4.</span>
                <div>
                  <strong>Independent Redistricting Commission Benefits:</strong> Research demonstrates that independent redistricting commissions produce significantly fairer district maps than politician-drawn districts. Studies show these commissions create more compact, contiguous districts that better respect communities of interest and geographic boundaries, while reducing partisan bias and increasing electoral competitiveness.
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.commoncause.org/resources/unlocking-fair-maps/" target="_blank" rel="noopener noreferrer" className="underline">
                      Common Cause: Unlocking Fair Maps - The Keys to Independent Redistricting
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.brennancenter.org/our-work/policy-solutions/better-way-draw-districts" target="_blank" rel="noopener noreferrer" className="underline">
                      Brennan Center for Justice: A Better Way to Draw Districts
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.wedrawthelinesca.org/faq" target="_blank" rel="noopener noreferrer" className="underline">
                      California Citizens Redistricting Commission: How Independent Commissions Work
                    </a>
                  </span>
                </div>
              </div>
              <div id="ref5" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">5.</span>
                <div>
                  <strong>Geography-Based District Benefits:</strong> Academic research shows that districts drawn with geographic compactness and contiguity as primary criteria better represent natural communities of interest, reduce voter confusion, improve representative-constituent communication, and create more stable, predictable electoral boundaries that serve democratic governance rather than political manipulation.
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://arxiv.org/pdf/1710.03358.pdf" target="_blank" rel="noopener noreferrer" className="underline">
                      Cornell University: Balanced Power Diagrams for Fair Redistricting
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.cambridge.org/core/journals/political-analysis/article/abs/reviving-legislative-avenues-for-gerrymandering-reform-with-a-flexible-automated-tool/017DE06B8F8F45DA18FAEF9BAE567E70" target="_blank" rel="noopener noreferrer" className="underline">
                      Cambridge University Press: Automated Tools for Geographic Redistricting Reform
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://gking.harvard.edu/files/gking/files/compact.pdf" target="_blank" rel="noopener noreferrer" className="underline">
                      Harvard University: How to Measure Legislative District Compactness
                    </a>
                  </span>
                </div>
              </div>

              <div id="ref6" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">6.</span>
                <div>
                  <strong>Congressional Aging and Deaths in Office:</strong> Comprehensive data shows Congress has become significantly older, with representatives dying in office at alarming rates. The average age of Congress has increased by 12 years in the Senate and 9 years in the House since 1980, while the 118th Congress is the third oldest since 1789. Since 2000, at least 33 House members and multiple senators have died while serving, demonstrating the urgent need for term limits to ensure responsive representation.
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://rollcall.com/2025/07/29/democrats-have-long-outpaced-republicans-in-deaths-in-office/" target="_blank" rel="noopener noreferrer" className="underline">
                      Roll Call: Members of Congress Dying in Office Statistics and Analysis
                    </a>
                    {" | "}
                    <a href="https://www.nbcnews.com/data-graphics/118th-congress-age-third-oldest-1789-rcna64117" target="_blank" rel="noopener noreferrer" className="underline">
                      NBC News: The 118th Congress is the Third Oldest Since 1789
                    </a>
                    {" | "}
                    <a href="https://en.wikipedia.org/wiki/List_of_United_States_Congress_members_who_died_in_office_(2000%E2%80%93present)" target="_blank" rel="noopener noreferrer" className="underline">
                      Wikipedia: Complete List of Congress Members Who Died in Office Since 2000
                    </a>
                    {" | "}
                    <a href="https://www.everycrsreport.com/files/2025-05-13_R48535_1b4748fc9983701cc100286b65172504c14a7534.html" target="_blank" rel="noopener noreferrer" className="underline">
                      Congressional Research Service: Average Age and Demographics of the 119th Congress
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://publicconsultation.org/united-states/congressional-term-limits/" target="_blank" rel="noopener noreferrer" className="underline">
                      University of Maryland Poll: 83% of Americans Support Constitutional Amendment for Congressional Term Limits
                    </a>
                    {" | "}
                    <a href="https://www.termlimits.com/polls/" target="_blank" rel="noopener noreferrer" className="underline">
                      U.S. Term Limits: National Polling Shows 80% Support for Congressional Term Limits
                    </a>
                    {" | "}
                    <a href="https://stockton.edu/news/2023/hughes-center-term-limits-poll.html" target="_blank" rel="noopener noreferrer" className="underline">
                      Stockton University Poll: Bipartisan Support for Age and Term Limits for Elected Officials
                    </a>
                  </span>
                </div>
              </div>
              <div id="ref7" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">7.</span>
                <div>
                  <strong>Congressional Insider Trading and Securities Violations:</strong> Extensive evidence demonstrates widespread violations of the STOCK Act by members of Congress, who systematically outperform the market through access to non-public information. In the 117th Congress alone, 78 members violated federal disclosure laws, while studies show senators earn abnormal returns of 4.9% over 3 months. This insider trading undermines market integrity and democratic trust.
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.businessinsider.com/congress-stocks-stock-act-violations-lawmakers-finances-disclosure-2022-12" target="_blank" rel="noopener noreferrer" className="underline">
                      Business Insider: 78 Members of Congress Violated Federal Ethics Law
                    </a>
                    {" | "}
                    <a href="https://www.rawstory.com/congress-stock/" target="_blank" rel="noopener noreferrer" className="underline">
                      Raw Story: 62 Members of Congress Caught Breaking STOCK Act Law
                    </a>
                    {" | "}
                    <a href="https://www.insiderfinance.io/congress-trades" target="_blank" rel="noopener noreferrer" className="underline">
                      InsiderFinance: Real-Time Congress Stock Trading Tracker and Analysis
                    </a>
                    {" | "}
                    <a href="https://link.springer.com/content/pdf/10.1007/s10551-022-05265-0.pdf" target="_blank" rel="noopener noreferrer" className="underline">
                      Journal of Business Ethics: Political Insider Trading Study - 4.9% Abnormal Returns
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://unusualwhales.substack.com/p/politicians-beat-the-market-in-2022-23-01-05" target="_blank" rel="noopener noreferrer" className="underline">
                      Unusual Whales: Politicians Beat the Market in 2022 - Performance Analysis
                    </a>
                    {" | "}
                    <a href="https://www.alphaai.capital/blog/politician-stock-tracker-insights-the-allure-of-congress-stock-trades-and-nancy-pelosis-portfolio" target="_blank" rel="noopener noreferrer" className="underline">
                      AlphaAI Capital: Analysis of Congressional Trading Patterns and Market Outperformance
                    </a>
                  </span>
                </div>
              </div>
              <div id="ref8" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">8.</span>
                <div>
                  <strong>Citizens United and Super PAC Corruption:</strong> The Citizens United decision has fundamentally corrupted American democracy by allowing unlimited dark money to flow through super PACs, creating a system where billionaires and corporations buy political influence. Research shows this has led to increased political polarization, reduced democratic responsiveness, and the disenfranchisement of ordinary voters. Over $3 billion has been spent by super PACs in federal elections, with 68% coming from donors contributing over $1 million.
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://link.springer.com/article/10.1007/s11127-019-00721-4" target="_blank" rel="noopener noreferrer" className="underline">
                      Public Choice Journal: Citizens United Led to Greater Conservative Bias and Polarization
                    </a>
                    {" | "}
                    <a href="https://nyuappr.pubpub.org/pub/4b0ankbe/release/1" target="_blank" rel="noopener noreferrer" className="underline">
                      NYU American Public Policy Review: The Fight Against Super PACs and Dark Money
                    </a>
                    {" | "}
                    <a href="https://conference.nber.org/conf_papers/f172564/f172564.pdf" target="_blank" rel="noopener noreferrer" className="underline">
                      NBER Conference: Disclosure in Democracy - Dark Money Research
                    </a>
                  </span>
                </div>
              </div>
              <div id="ref9" className="flex items-start gap-2">
                <span className="text-red-600 font-medium min-w-[20px]">9.</span>
                <div>
                  <strong>Omnibus Bills and Legislative Obfuscation:</strong> Modern Congress routinely passes massive, unreadable omnibus bills that lawmakers admit they haven't read. The Affordable Care Act ran 2,700 pages, Dodd-Frank exceeded 2,300 pages, and recent spending bills have reached over 5,593 pages. Even Supreme Court justices have called reading such legislation "cruel and unusual punishment." Academic research shows this creates "comprehension asymmetries" where bills pass precisely because they're incomprehensible, enabling hidden provisions and undermining democratic accountability.
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.cambridge.org/core/books/abs/incomprehensible/comprehension-asymmetries-in-legislative-process/8A9D35911DF94CA980EAAA8F9A6D517D" target="_blank" rel="noopener noreferrer" className="underline">
                      Cambridge University Press: Comprehension Asymmetries in Legislative Process
                    </a>
                    {" | "}
                    <a href="https://www.economist.com/graphic-detail/2020/12/29/americas-elephantine-spending-bills-are-becoming-increasingly-unreadable" target="_blank" rel="noopener noreferrer" className="underline">
                      The Economist: America's Elephantine Spending Bills Are Becoming Increasingly Unreadable
                    </a>
                    {" | "}
                    <a href="https://constitutingamerica.org/length-legislation-why-bills-grown-significantly-longer-over-history-us-congress-guest-essayist-marc-clauson/" target="_blank" rel="noopener noreferrer" className="underline">
                      Constituting America: Why Bills Have Grown Significantly Longer Over US History
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://townhall.com/columnists/byronyork/2012/04/03/obamacares-2700-pages-prove-too-much-for-justices-n1225709" target="_blank" rel="noopener noreferrer" className="underline">
                      Townhall: Obamacare's 2,700 Pages Prove Too Much For Supreme Court Justices
                    </a>
                    {" | "}
                    <a href="https://www.washingtonexaminer.com/news/1495617/obamacares-2700-pages-are-too-much-for-justices/" target="_blank" rel="noopener noreferrer" className="underline">
                      Washington Examiner: Supreme Court Justices Can't Read 2,700-Page Bills Either
                    </a>
                    {" | "}
                    <a href="https://www.marketoracle.co.uk/Article21413.html" target="_blank" rel="noopener noreferrer" className="underline">
                      Market Oracle: Dodd-Frank Financial Reform Bill is 2,300 Pages of Gobbledygook
                    </a>
                  </span>
                  <br />
                  <span className="text-blue-600 hover:text-blue-700">
                    <a href="https://www.degruyter.com/document/doi/10.2202/1539-8323.1020/html" target="_blank" rel="noopener noreferrer" className="underline">
                      Issues in Legal Scholarship: Omnibus Legislation and Statutory Interpretation Challenges
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </section>
      </main>

      <Footer />
    </div>
  )
}
