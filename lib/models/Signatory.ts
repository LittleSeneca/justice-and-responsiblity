import mongoose from 'mongoose'

const SignatorySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  comments: {
    type: String,
    default: '',
    trim: true
  },
  agreeToTerms: {
    type: Boolean,
    required: true
  },
  subscribeToNewsletter: {
    type: Boolean,
    default: false
  },
  signedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    default: 'unknown',
    trim: true
  },
  browserFingerprint: {
    type: String,
    default: '',
    trim: true
  },
  isCongressMember: {
    type: Boolean,
    default: false
  },
  congressionalTitle: {
    type: String,
    enum: ['representative', 'senator', ''],
    default: ''
  },
  district: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
})

// Create indexes for duplicate detection and performance
SignatorySchema.index({ email: 1 }, { unique: true })
SignatorySchema.index({ ipAddress: 1, signedAt: -1 })
SignatorySchema.index({ browserFingerprint: 1, signedAt: -1 })
SignatorySchema.index({ firstName: 'text', lastName: 'text', state: 1 })

export default mongoose.models.Signatory || mongoose.model('Signatory', SignatorySchema) 