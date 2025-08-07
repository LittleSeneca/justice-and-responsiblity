import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Signatory from '@/lib/models/Signatory'
import crypto from 'crypto'

// Helper function to get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  return 'unknown'
}

// Helper function to create a browser fingerprint
function createBrowserFingerprint(request: NextRequest): string {
  const userAgent = request.headers.get('user-agent') || ''
  const acceptLanguage = request.headers.get('accept-language') || ''
  const acceptEncoding = request.headers.get('accept-encoding') || ''
  
  const fingerprint = `${userAgent}-${acceptLanguage}-${acceptEncoding}`
  return crypto.createHash('sha256').update(fingerprint).digest('hex')
}

// Comprehensive duplicate detection
async function performDuplicateChecks(body: any, request: NextRequest) {
  const clientIP = getClientIP(request)
  const browserFingerprint = createBrowserFingerprint(request)
  const normalizedEmail = body.email.toLowerCase().trim()
  
  // 1. Enhanced email check (case-insensitive, trimmed)
  const existingEmail = await Signatory.findOne({ 
    email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') }
  })
  if (existingEmail) {
    throw new Error('This email address has already been used to sign the charter')
  }
  
  // 2. Check for recent signatures from the same IP (within last 24 hours)
  if (clientIP !== 'unknown') {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentIPSignatures = await Signatory.countDocuments({
      ipAddress: clientIP,
      signedAt: { $gte: twentyFourHoursAgo }
    })
    
    if (recentIPSignatures >= 3) {
      throw new Error('Too many signatures from this location recently. Please try again later or contact support if you believe this is an error.')
    }
  }
  
  // 3. Check for rapid successive attempts (within last hour)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const recentAttempts = await Signatory.countDocuments({
    $or: [
      { ipAddress: clientIP },
      { browserFingerprint: browserFingerprint }
    ],
    signedAt: { $gte: oneHourAgo }
  })
  
  if (recentAttempts >= 2) {
    throw new Error('Please wait before attempting to sign again. If you\'re having trouble, contact support.')
  }
  
  // 4. Check for similar email patterns (potential typos or variations)
  const emailLocal = normalizedEmail.split('@')[0]
  const emailDomain = normalizedEmail.split('@')[1]
  
  // Look for very similar email addresses
  if (emailLocal.length > 3) {
    const similarEmails = await Signatory.find({
      email: { 
        $regex: new RegExp(`^${emailLocal.slice(0, -1)}.*@${emailDomain}$`, 'i')
      }
    })
    
    if (similarEmails.length > 0) {
      // Check if it's just a single character difference
      for (const similar of similarEmails) {
        const distance = levenshteinDistance(normalizedEmail, similar.email.toLowerCase())
        if (distance <= 2) {
          throw new Error('A very similar email address has already been used. Please check your email spelling or contact support.')
        }
      }
    }
  }
}

// Helper function to calculate Levenshtein distance
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  
  return matrix[str2.length][str1.length]
}

// POST - Create new signatory
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'state', 'turnstileToken']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Validate isPublic field exists (default to true if not provided)
    if (typeof body.isPublic !== 'boolean') {
      body.isPublic = true
    }
    
    // Verify Turnstile token
    try {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY || '',
          response: body.turnstileToken,
        }).toString(),
      })

      const turnstileResult = await turnstileResponse.json()
      
      if (!turnstileResult.success) {
        console.error('Turnstile verification failed:', turnstileResult['error-codes'])
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 400 }
        )
      }
    } catch (error) {
      console.error('Turnstile verification error:', error)
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 500 }
      )
    }
    
    // Enhanced duplicate detection
    try {
      await performDuplicateChecks(body, request)
    } catch (duplicateError) {
      return NextResponse.json(
        { error: duplicateError instanceof Error ? duplicateError.message : 'Duplicate signature detected' },
        { status: 409 }
      )
    }
    
    // Create new signatory (exclude turnstileToken from being saved, add tracking fields)
    const { turnstileToken, ...signatoryData } = body
    const clientIP = getClientIP(request)
    const browserFingerprint = createBrowserFingerprint(request)
    
    const signatory = new Signatory({
      ...signatoryData,
      ipAddress: clientIP,
      browserFingerprint: browserFingerprint
    })
    await signatory.save()
    
    return NextResponse.json(
      { message: 'Successfully signed the charter', id: signatory._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating signatory:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET - Fetch signatories
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit
    
    // Get comprehensive stats
    const totalSignatories = await Signatory.countDocuments()
    const congressMembers = await Signatory.countDocuments({ isCongressMember: true })
    const constituents = await Signatory.countDocuments({ isCongressMember: false })
    
    // Get state breakdown
    const stateStats = await Signatory.aggregate([
      {
        $group: {
          _id: '$state',
          total: { $sum: 1 },
          congressMembers: {
            $sum: { $cond: ['$isCongressMember', 1, 0] }
          },
          constituents: {
            $sum: { $cond: ['$isCongressMember', 0, 1] }
          }
        }
      },
      { $sort: { total: -1 } }
    ])
    
    // Get recent signatories for display (last 100) - includes both public and private
    const recentSignatories = await Signatory.find()
      .select('firstName lastName state signedAt isCongressMember congressionalTitle district isPublic')
      .sort({ signedAt: -1 })
      .limit(100)
      .lean()
    
    return NextResponse.json({
      stats: {
        totalSignatories,
        congressMembers,
        constituents,
        stateStats
      },
      signatories: recentSignatories,
      pagination: {
        page: 1,
        limit: 100,
        totalPages: 1
      }
    })
  } catch (error) {
    console.error('Error fetching signatories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 