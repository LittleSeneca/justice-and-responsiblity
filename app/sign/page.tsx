"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Turnstile } from "@marsidev/react-turnstile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"
import { Header } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

export default function SignPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Debug: Check if environment variables are loaded
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    console.log('🔧 Turnstile Debug Info:')
    console.log('- Site Key Status:', siteKey ? 'Loaded' : 'Missing')
    console.log('- Site Key Value:', siteKey || 'UNDEFINED')
    console.log('- Site Key Length:', siteKey?.length || 0)
    console.log('- Current Domain:', typeof window !== 'undefined' ? window.location.hostname : 'Server-side')
    console.log('- User Agent:', typeof window !== 'undefined' ? window.navigator.userAgent : 'Server-side')
    
    if (!siteKey || siteKey === '' || siteKey === 'placeholder') {
      console.error('❌ Turnstile Site Key is invalid or missing!')
    }
  }, [])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    comments: "",
    signingType: "public",
    subscribeToNewsletter: false,
  })
  
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  // Turnstile callback functions
  const onTurnstileSuccess = (token: string) => {
    console.log('✅ Turnstile verified successfully', { token: token.substring(0, 20) + '...' })
    setTurnstileToken(token)
  }

  const onTurnstileError = (error?: any) => {
    console.error('❌ Turnstile error occurred:', error)
    console.error('- Domain:', typeof window !== 'undefined' ? window.location.hostname : 'unknown')
    console.error('- Site Key:', process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || 'MISSING')
    setTurnstileToken(null)
  }

  const onTurnstileExpired = () => {
    console.log('⏰ Turnstile token expired')
    setTurnstileToken(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if Turnstile is verified
    if (!turnstileToken) {
      alert("Please complete the Turnstile verification.")
      return
    }
    
    try {
      const response = await fetch('/api/signatories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isPublic: formData.signingType === "public",
          turnstileToken
        }),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        // Handle error - you might want to show this in a toast or error state
        console.error('Error signing charter:', result.error)
        alert(result.error || 'Failed to sign charter. Please try again.')
        // Reset Turnstile token so user can try again
        setTurnstileToken(null)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to sign charter. Please check your connection and try again.')
      // Reset Turnstile token so user can try again
      setTurnstileToken(null)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your signature has been added to the Justice and Responsibility Charter. Together, we can restore
              accountability to our government.
            </p>
            <div className="space-y-3">
              <Link href="/signatories">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Signatories
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full">Return to Charter</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sign the Charter</h1>
            <p className="text-xl text-gray-600">
              Add your voice to the call for government transparency and accountability.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="AR">Arkansas</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="CT">Connecticut</SelectItem>
                      <SelectItem value="DE">Delaware</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="HI">Hawaii</SelectItem>
                      <SelectItem value="ID">Idaho</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="IN">Indiana</SelectItem>
                      <SelectItem value="IA">Iowa</SelectItem>
                      <SelectItem value="KS">Kansas</SelectItem>
                      <SelectItem value="KY">Kentucky</SelectItem>
                      <SelectItem value="LA">Louisiana</SelectItem>
                      <SelectItem value="ME">Maine</SelectItem>
                      <SelectItem value="MD">Maryland</SelectItem>
                      <SelectItem value="MA">Massachusetts</SelectItem>
                      <SelectItem value="MI">Michigan</SelectItem>
                      <SelectItem value="MN">Minnesota</SelectItem>
                      <SelectItem value="MS">Mississippi</SelectItem>
                      <SelectItem value="MO">Missouri</SelectItem>
                      <SelectItem value="MT">Montana</SelectItem>
                      <SelectItem value="NE">Nebraska</SelectItem>
                      <SelectItem value="NV">Nevada</SelectItem>
                      <SelectItem value="NH">New Hampshire</SelectItem>
                      <SelectItem value="NJ">New Jersey</SelectItem>
                      <SelectItem value="NM">New Mexico</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="ND">North Dakota</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="OK">Oklahoma</SelectItem>
                      <SelectItem value="OR">Oregon</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="RI">Rhode Island</SelectItem>
                      <SelectItem value="SC">South Carolina</SelectItem>
                      <SelectItem value="SD">South Dakota</SelectItem>
                      <SelectItem value="TN">Tennessee</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="UT">Utah</SelectItem>
                      <SelectItem value="VT">Vermont</SelectItem>
                      <SelectItem value="VA">Virginia</SelectItem>
                      <SelectItem value="WA">Washington</SelectItem>
                      <SelectItem value="WV">West Virginia</SelectItem>
                      <SelectItem value="WI">Wisconsin</SelectItem>
                      <SelectItem value="WY">Wyoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="comments">Comments (Optional)</Label>
                  <Textarea
                    id="comments"
                    placeholder="Share why you're signing the charter..."
                    value={formData.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                  />
                </div>

                {/* Newsletter Subscription */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribeToNewsletter"
                    checked={formData.subscribeToNewsletter}
                    onCheckedChange={(checked) => handleInputChange("subscribeToNewsletter", checked as boolean)}
                  />
                  <Label htmlFor="subscribeToNewsletter" className="text-sm">
                    Yes, I want to receive email updates about the Justice and Responsibility Charter movement
                  </Label>
                </div>

                {/* Data Privacy Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">🔒 Data Privacy & Security</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Your personal information is securely encrypted and stored using industry-standard security practices. 
                    We will never sell, share, or distribute your data to third parties. Your information is used solely 
                    for displaying your signature on our public charter list and, if selected, sending you occasional 
                    updates about the movement. You can request data removal at any time by contacting us.
                  </p>
                  <p className="text-xs text-blue-700 mt-2">
                    For complete details, please read our <Link href="/privacy" className="text-blue-800 hover:text-blue-900 underline font-medium">Privacy Policy</Link>.
                  </p>
                </div>

                {/* Turnstile Section */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <Label className="text-sm font-medium mb-2 block">Security Verification *</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Please verify that you are human by completing the verification below.
                  </p>
                  {turnstileToken && (
                    <p className="text-sm text-green-600 flex items-center gap-1 mb-3">
                      <CheckCircle className="w-4 h-4" />
                      Verification successful!
                    </p>
                  )}
                  {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      onSuccess={onTurnstileSuccess}
                      onError={onTurnstileError}
                      onExpire={onTurnstileExpired}
                      options={{
                        theme: "light",
                        size: "normal",
                      }}
                    />
                  ) : (
                    <div className="border border-red-200 bg-red-50 p-4 rounded">
                      <p className="text-red-600 text-sm">
                        ⚠️ Turnstile configuration error: Site key not found. 
                        Please check your environment variables.
                      </p>
                      <p className="text-red-500 text-xs mt-1">
                        Expected: NEXT_PUBLIC_TURNSTILE_SITE_KEY
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="signingType">How would you like to sign the charter? *</Label>
                  <Select onValueChange={(value) => handleInputChange("signingType", value)} defaultValue="public">
                    <SelectTrigger>
                      <SelectValue placeholder="Select signing preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public with name - Show my name on the public signatories list</SelectItem>
                      <SelectItem value="private">Private with name - Record my signature but don't show my name publicly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 mt-1">
                    Both options record your signature equally. Choosing "private" means your name won't appear on the public list, but your signature is still counted.
                  </p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  Sign the Charter
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
