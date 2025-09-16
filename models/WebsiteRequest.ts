import mongoose from 'mongoose';

const websiteRequestSchema = new mongoose.Schema({
  // Contact Information
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },

  // Website Details
  domainName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    enum: [
      'restaurant',
      'retail',
      'services',
      'healthcare',
      'real-estate',
      'technology',
      'nonprofit',
      'personal',
      'blog',
      'other'
    ]
  },
  siteDescription: {
    type: String,
    required: true
  },
  targetAudience: {
    type: String,
    required: true
  },

  // Logo Preference
  logoOption: {
    type: String,
    required: true,
    enum: ['existing', 'create-new', 'text-only']
  },

  // Additional Information
  additionalNotes: {
    type: String
  },

  // Request Status
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },

  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  },

  // Future fields for website generation
  generatedWebsiteUrl: {
    type: String
  },
  buildingAgent: {
    type: String
  },
  estimatedCost: {
    type: Number
  }
}, {
  timestamps: true
});

// Indexes for better query performance
websiteRequestSchema.index({ contactEmail: 1 });
websiteRequestSchema.index({ domainName: 1 });
websiteRequestSchema.index({ status: 1 });
websiteRequestSchema.index({ submittedAt: -1 });

const WebsiteRequest = mongoose.models.WebsiteRequest || mongoose.model('WebsiteRequest', websiteRequestSchema);

export default WebsiteRequest;