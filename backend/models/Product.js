import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: [true, 'Brand is required']
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  sale_price: {
    type: Number,
    min: [0, 'Sale price cannot be negative'],
    validate: {
      validator: function(value) {
        return !value || value < this.price;
      },
      message: 'Sale price must be less than regular price'
    }
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['men', 'women', 'unisex', 'kids'],
    default: 'unisex'
  },
  images: [{
    type: String,
    required: true
  }],
  sizes: [{
    type: String,
    required: true
  }],
  colors: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  review_count: {
    type: Number,
    min: [0, 'Review count cannot be negative'],
    default: 0
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  is_trending: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  },
  tags: [{
    type: String,
    trim: true
  }],
  specifications: {
    material: { type: String },
    sole_material: { type: String },
    closure: { type: String },
    weight: { type: String },
    care_instructions: { type: String }
  },
  meta_title: {
    type: String,
    trim: true,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  meta_description: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
productSchema.index({ brand_id: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ gender: 1, is_active: 1 });
productSchema.index({ is_featured: 1, is_active: 1 });
productSchema.index({ is_trending: 1, is_active: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ created_at: -1 });

// Virtual for product's public data
productSchema.virtual('publicData').get(function() {
  return {
    id: this._id,
    brand_id: this.brand_id,
    name: this.name,
    slug: this.slug,
    description: this.description,
    price: this.price,
    sale_price: this.sale_price,
    gender: this.gender,
    images: this.images,
    sizes: this.sizes,
    colors: this.colors,
    stock: this.stock,
    rating: this.rating,
    review_count: this.review_count,
    is_featured: this.is_featured,
    is_trending: this.is_trending,
    is_active: this.is_active,
    category: this.category,
    tags: this.tags,
    created_at: this.createdAt,
    updated_at: this.updatedAt
  };
});

// Virtual for discounted price
productSchema.virtual('discounted_price').get(function() {
  return this.sale_price || this.price;
});

// Virtual for discount percentage
productSchema.virtual('discount_percentage').get(function() {
  if (this.sale_price && this.sale_price < this.price) {
    return Math.round(((this.price - this.sale_price) / this.price) * 100);
  }
  return 0;
});

// Pre-save middleware to generate slug if not provided
productSchema.pre('save', function(next) {
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

// Static method to find active products
productSchema.statics.findActive = function() {
  return this.find({ is_active: true }).populate('brand_id', 'name slug logo_url');
};

// Static method to find by slug
productSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, is_active: true }).populate('brand_id', 'name slug logo_url');
};

// Static method to find featured products
productSchema.statics.findFeatured = function(limit = 10) {
  return this.find({ is_featured: true, is_active: true })
    .populate('brand_id', 'name slug logo_url')
    .sort({ created_at: -1 })
    .limit(limit);
};

// Static method to find trending products
productSchema.statics.findTrending = function(limit = 10) {
  return this.find({ is_trending: true, is_active: true })
    .populate('brand_id', 'name slug logo_url')
    .sort({ rating: -1, review_count: -1 })
    .limit(limit);
};

// Static method to search products
productSchema.statics.searchProducts = function(query, filters = {}) {
  const searchQuery = {
    is_active: true,
    ...filters
  };

  if (query) {
    searchQuery.$text = { $search: query };
  }

  return this.find(searchQuery)
    .populate('brand_id', 'name slug logo_url')
    .sort(query ? { score: { $meta: 'textScore' } } : { created_at: -1 });
};

const Product = mongoose.model('Product', productSchema);

export default Product;
