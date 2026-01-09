import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [/^[A-Z0-9-]+$/, 'Coupon code can only contain uppercase letters, numbers, and hyphens']
  },
  name: {
    type: String,
    required: [true, 'Coupon name is required'],
    trim: true,
    maxlength: [100, 'Coupon name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  discount_type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: [true, 'Discount type is required']
  },
  discount_value: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: [0, 'Discount value cannot be negative']
  },
  min_purchase: {
    type: Number,
    required: [true, 'Minimum purchase amount is required'],
    min: [0, 'Minimum purchase cannot be negative']
  },
  max_discount: {
    type: Number,
    min: [0, 'Maximum discount cannot be negative']
  },
  usage_limit: {
    type: Number,
    min: [1, 'Usage limit must be at least 1']
  },
  usage_count: {
    type: Number,
    default: 0,
    min: [0, 'Usage count cannot be negative']
  },
  user_limit: {
    type: Number,
    min: [1, 'User limit must be at least 1']
  },
  valid_from: {
    type: Date,
    required: [true, 'Valid from date is required']
  },
  valid_until: {
    type: Date,
    required: [true, 'Valid until date is required']
  },
  is_active: {
    type: Boolean,
    default: true
  },
  applicable_products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  applicable_brands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  }],
  applicable_categories: [{
    type: String
  }],
  excluded_products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  user_restrictions: {
    new_users_only: {
      type: Boolean,
      default: false
    },
    min_orders: {
      type: Number,
      default: 0
    },
    specific_users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  conditions: {
    free_shipping: {
      type: Boolean,
      default: false
    },
    first_order_only: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
couponSchema.index({ code: 1 });
couponSchema.index({ is_active: 1 });
couponSchema.index({ valid_from: 1, valid_until: 1 });
couponSchema.index({ usage_count: 1, usage_limit: 1 });

// Virtual for coupon summary
couponSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    code: this.code,
    name: this.name,
    description: this.description,
    discount_type: this.discount_type,
    discount_value: this.discount_value,
    min_purchase: this.min_purchase,
    max_discount: this.max_discount,
    usage_limit: this.usage_limit,
    usage_count: this.usage_count,
    valid_from: this.valid_from,
    valid_until: this.valid_until,
    is_active: this.is_active,
    created_at: this.createdAt,
    updated_at: this.updatedAt
  };
});

// Virtual to check if coupon is valid
couponSchema.virtual('is_valid').get(function() {
  const now = new Date();
  return this.is_active && 
         this.valid_from <= now && 
         this.valid_until >= now && 
         (!this.usage_limit || this.usage_count < this.usage_limit);
});

// Virtual to check if coupon is expired
couponSchema.virtual('is_expired').get(function() {
  return new Date() > this.valid_until;
});

// Pre-save middleware to validate dates
couponSchema.pre('save', function(next) {
  if (this.valid_until <= this.valid_from) {
    next(new Error('Valid until date must be after valid from date'));
  }
  
  if (this.discount_type === 'percentage' && this.discount_value > 100) {
    next(new Error('Percentage discount cannot exceed 100%'));
  }
  
  next();
});

// Method to validate coupon for user and order
couponSchema.methods.validateForOrder = function(userId, orderAmount, orderItems = []) {
  const now = new Date();
  const errors = [];
  
  // Check if coupon is active and valid
  if (!this.is_active) {
    errors.push('Coupon is not active');
  }
  
  if (now < this.valid_from) {
    errors.push('Coupon is not yet valid');
  }
  
  if (now > this.valid_until) {
    errors.push('Coupon has expired');
  }
  
  // Check usage limit
  if (this.usage_limit && this.usage_count >= this.usage_limit) {
    errors.push('Coupon usage limit exceeded');
  }
  
  // Check minimum purchase
  if (orderAmount < this.min_purchase) {
    errors.push(`Minimum purchase amount of ₹${this.min_purchase} required`);
  }
  
  // Check product restrictions
  if (this.applicable_products.length > 0) {
    const orderProductIds = orderItems.map(item => item.product_id.toString());
    const hasApplicableProduct = this.applicable_products.some(productId => 
      orderProductIds.includes(productId.toString())
    );
    if (!hasApplicableProduct) {
      errors.push('Coupon not applicable to any product in your order');
    }
  }
  
  // Check excluded products
  if (this.excluded_products.length > 0) {
    const orderProductIds = orderItems.map(item => item.product_id.toString());
    const hasExcludedProduct = this.excluded_products.some(productId => 
      orderProductIds.includes(productId.toString())
    );
    if (hasExcludedProduct) {
      errors.push('Coupon cannot be used with some products in your order');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Method to calculate discount amount
couponSchema.methods.calculateDiscount = function(orderAmount) {
  let discountAmount = 0;
  
  if (this.discount_type === 'percentage') {
    discountAmount = (orderAmount * this.discount_value) / 100;
  } else {
    discountAmount = this.discount_value;
  }
  
  // Apply maximum discount limit
  if (this.max_discount && discountAmount > this.max_discount) {
    discountAmount = this.max_discount;
  }
  
  // Ensure discount doesn't exceed order amount
  if (discountAmount > orderAmount) {
    discountAmount = orderAmount;
  }
  
  return Math.round(discountAmount * 100) / 100; // Round to 2 decimal places
};

// Method to increment usage count
couponSchema.methods.incrementUsage = function() {
  this.usage_count += 1;
  return this.save();
};

// Static method to find valid coupons
couponSchema.statics.findValid = function() {
  const now = new Date();
  return this.find({
    is_active: true,
    valid_from: { $lte: now },
    valid_until: { $gte: now },
    $or: [
      { usage_limit: { $exists: false } },
      { usage_limit: null },
      { $expr: { $lt: ['$usage_count', '$usage_limit'] } }
    ]
  });
};

// Static method to find by code
couponSchema.statics.findByCode = function(code) {
  return this.findOne({ code: code.toUpperCase() });
};

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
