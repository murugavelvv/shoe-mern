import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  images: [{
    type: String
  }],
  is_verified_purchase: {
    type: Boolean,
    default: true
  },
  is_approved: {
    type: Boolean,
    default: false
  },
  helpful_count: {
    type: Number,
    default: 0
  },
  reported_count: {
    type: Number,
    default: 0
  },
  admin_response: {
    comment: {
      type: String,
      trim: true
    },
    responded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    responded_at: {
      type: Date
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
reviewSchema.index({ product_id: 1 });
reviewSchema.index({ user_id: 1 });
reviewSchema.index({ order_id: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ is_approved: 1 });
reviewSchema.index({ created_at: -1 });

// Compound index to prevent duplicate reviews
reviewSchema.index({ product_id: 1, user_id: 1, order_id: 1 }, { unique: true });

// Virtual for review summary
reviewSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    product_id: this.product_id,
    user_id: this.user_id,
    rating: this.rating,
    title: this.title,
    comment: this.comment,
    is_verified_purchase: this.is_verified_purchase,
    is_approved: this.is_approved,
    helpful_count: this.helpful_count,
    created_at: this.createdAt,
    updated_at: this.updatedAt
  };
});

// Pre-save middleware to update product rating
reviewSchema.post('save', async function() {
  if (this.is_approved) {
    await this.updateProductRating();
  }
});

// Method to update product rating
reviewSchema.methods.updateProductRating = async function() {
  const Review = mongoose.model('Review');
  const Product = mongoose.model('Product');
  
  const reviews = await Review.find({ 
    product_id: this.product_id, 
    is_approved: true 
  });
  
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    await Product.findByIdAndUpdate(this.product_id, {
      rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      review_count: reviews.length
    });
  }
};

// Method to mark as helpful
reviewSchema.methods.markHelpful = function() {
  this.helpful_count += 1;
  return this.save();
};

// Method to report review
reviewSchema.methods.report = function() {
  this.reported_count += 1;
  return this.save();
};

// Method to add admin response
reviewSchema.methods.addAdminResponse = function(comment, adminId) {
  this.admin_response = {
    comment,
    responded_by: adminId,
    responded_at: new Date()
  };
  return this.save();
};

// Static method to find product reviews
reviewSchema.statics.findByProduct = function(productId, limit = 10, skip = 0) {
  return this.find({ product_id: productId, is_approved: true })
    .populate('user_id', 'full_name avatar_url')
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to find user reviews
reviewSchema.statics.findByUser = function(userId, limit = 10, skip = 0) {
  return this.find({ user_id: userId })
    .populate('product_id', 'name images brand_id')
    .populate('product_id.brand_id', 'name')
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to get review statistics for a product
reviewSchema.statics.getProductStats = function(productId) {
  return this.aggregate([
    { $match: { product_id: mongoose.Types.ObjectId(productId), is_approved: true } },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        total_reviews: { $sum: '$count' },
        average_rating: { $avg: { $multiply: ['$_id', '$count'] } },
        rating_distribution: {
          $push: {
            rating: '$_id',
            count: '$count'
          }
        }
      }
    }
  ]);
};

// Static method to find pending reviews
reviewSchema.statics.findPending = function(limit = 50, skip = 0) {
  return this.find({ is_approved: false })
    .populate('user_id', 'full_name email')
    .populate('product_id', 'name images brand_id')
    .populate('product_id.brand_id', 'name')
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
