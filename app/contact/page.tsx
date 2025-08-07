"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, CheckCircle } from "lucide-react"
import emailjs from '@emailjs/browser'
import { Turnstile } from '@marsidev/react-turnstile'
import { Header } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia'
]

interface FormData {
  name: string
  email: string
  state: string
  title: string
  purpose: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    state: '',
    title: '',
    purpose: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.purpose || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

      // Validate Turnstile
      if (!turnstileToken) {
        throw new Error('Please complete the security verification')
      }

      // Send email using EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        state: formData.state,
        title: formData.title,
        purpose: formData.purpose,
        message: formData.message,
        to_email: 'your-email@example.com' // You can set this in your EmailJS template
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        state: '',
        title: '',
        purpose: '',
        message: ''
      })
      setTurnstileToken(null)
    } catch (error) {
      console.error('Error sending email:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about the Justice and Responsibility Charter? Want to get involved? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                                          <Button onClick={() => {
                        setIsSubmitted(false)
                        setTurnstileToken(null)
                      }} variant="outline">
                        Send Another Message
                      </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="purpose">Purpose of Contact *</Label>
                      <Select value={formData.purpose} onValueChange={(value) => handleInputChange("purpose", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select the purpose of your message" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="general">General Enquiry</SelectItem>
                          <SelectItem value="congressional">Congressional Signup</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {/* Info panels based on selected purpose */}
                      {formData.purpose === 'feedback' && (
                        <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="text-sm text-blue-800">
                            <strong>Feedback:</strong> Use this option to provide feedback about the Justice and Responsibility Charter, suggest improvements, or share your thoughts on government transparency and accountability.
                          </p>
                        </div>
                      )}
                      
                      {formData.purpose === 'general' && (
                        <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-sm text-green-800">
                            <strong>General Enquiry:</strong> Use this option for general questions about the charter, how to get involved, media inquiries, partnership opportunities, or any other questions not covered by the other categories.
                          </p>
                        </div>
                      )}
                      
                      {formData.purpose === 'congressional' && (
                        <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-md">
                          <p className="text-sm text-purple-800">
                            <strong>Congressional Signup:</strong> This option is exclusively for current members of Congress (Representatives and Senators) who wish to sign the Justice and Responsibility Charter. We will verify your identity and official status before adding you to our congressional signatories list. Please include your full title, district/state, and any relevant contact information.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="title">Title/Organization</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Your title or organization (optional)"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please share your thoughts, questions, or how you'd like to get involved..."
                      />
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
                      <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                        onSuccess={(token) => {
                          setTurnstileToken(token)
                          if (error) setError(null)
                        }}
                        onExpire={() => setTurnstileToken(null)}
                        onError={() => setTurnstileToken(null)}
                        options={{
                          theme: "light",
                          size: "normal",
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !turnstileToken}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}