"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck } from "lucide-react"
import { Header } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

interface Signatory {
  _id: string
  firstName: string
  lastName: string
  state: string
  signedAt: string
  isCongressMember: boolean
  congressionalTitle: string
  district: string
  isPublic: boolean
}

interface StateStats {
  _id: string
  total: number
  congressMembers: number
  constituents: number
}

interface SignatoryData {
  stats: {
    totalSignatories: number
    congressMembers: number
    constituents: number
    stateStats: StateStats[]
  }
  signatories: Signatory[]
  pagination: {
    page: number
    limit: number
    totalPages: number
  }
}

export default function SignatoriesPage() {
  const [data, setData] = useState<SignatoryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSignatories = async () => {
      try {
        const response = await fetch('/api/signatories')
        if (response.ok) {
          const result = await response.json()
          setData(result)
        } else {
          console.error('Failed to fetch signatories')
        }
      } catch (error) {
        console.error('Error fetching signatories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSignatories()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Charter Signatories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Citizens and representatives who have pledged their support for government transparency and accountability. Private signatories are shown as "Anonymous" to protect their privacy.
          </p>
          {loading && <p className="text-gray-500 mt-4">Loading signatories...</p>}
        </div>

        {!loading && data && (
          <div className="max-w-7xl mx-auto">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Signatories */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {data.stats.totalSignatories.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total Signatories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Congress Members */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <UserCheck className="w-8 h-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {data.stats.congressMembers.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Members of Congress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Constituents */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {data.stats.constituents.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Constituents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Signatories Feed */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Recent Signatories (Last 100)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {data.signatories && data.signatories.length > 0 ? (
                        data.signatories.map((signatory) => (
                          <div key={signatory._id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                            <div className="flex-1">
                              {signatory.isPublic ? (
                                // Show real name for public signatories
                                <>
                                  {signatory.isCongressMember ? (
                                    <span className="font-medium text-gray-900">
                                      {signatory.congressionalTitle === 'representative' ? 'Rep.' : 'Sen.'} {signatory.firstName} {signatory.lastName}
                                    </span>
                                  ) : (
                                    <span className="font-medium text-gray-900">
                                      {signatory.firstName} {signatory.lastName}
                                    </span>
                                  )}
                                </>
                              ) : (
                                // Show "Anonymous" for private signatories
                                <span className="font-medium text-gray-600 italic">
                                  Anonymous {signatory.isCongressMember ? 
                                    (signatory.congressionalTitle === 'representative' ? 'Representative' : 'Senator') : 
                                    'Citizen'
                                  }
                                </span>
                              )}
                              <span className="text-sm text-gray-600 ml-2">
                                ({signatory.district || signatory.state})
                              </span>
                              {signatory.isCongressMember && (
                                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                  Congress
                                </span>
                              )}
                              {!signatory.isPublic && (
                                <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  Private
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(signatory.signedAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No signatories yet.</p>
                          <p className="text-sm mt-2">Be the first to add your voice!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* State Breakdown */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Signatories by State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {data.stats.stateStats && data.stats.stateStats.length > 0 ? (
                        data.stats.stateStats.map((state) => (
                          <div key={state._id} className="border-b border-gray-100 pb-2 last:border-b-0">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-900">{state._id}</span>
                              <span className="text-sm font-semibold text-gray-700">
                                {state.total.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>{state.constituents.toLocaleString()} constituents</span>
                              {state.congressMembers > 0 && (
                                <span className="text-green-600">
                                  {state.congressMembers.toLocaleString()} Congress
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No state data available.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Your Voice</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of Americans calling for transparency and accountability in government.
              </p>
              <Link href="/sign">
                <Button size="lg" className="text-lg px-8 py-3">
                  Sign the Charter
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

