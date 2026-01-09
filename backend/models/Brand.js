import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Brand name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Brand name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    required: [true, 'Brand slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  logo_url: {
    type: String,
    default: null
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid website URL']
  },
  is_active: {
    type: Boolean,
    default: true
  },
  sort_order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
brandSchema.index({ name: 1 });
brandSchema.index({ slug: 1 });
brandSchema.index({ is_active: 1, sort_order: 1 });

// Virtual for brand's public data
brandSchema.virtual('publicData').get(function() {
  return {
    id: this._id,
    name: this.name,
    slug: this.slug,
    logo_url: this.logo_url,
    description: this.description,
    website: this.website,
    is_active: this.is_active,
    created_at: this.createdAt,
    updated_at: this.updatedAt
  };
});

// Pre-save middleware to generate slug if not provided
brandSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Static method to find active brands
brandSchema.statics.findActive = function() {
  return this.find({ is_active: true }).sort({ sort_order: 1, name: 1 });
};

// Static method to find by slug
brandSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, is_active: true });
};

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
