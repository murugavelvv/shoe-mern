import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_number: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  items: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    product_name: {
      type: String,
      required: true
    },
    product_image: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unit_price: {
      type: Number,
      required: true
    },
    total_price: {
      type: Number,
      required: true
    }
  }],
  shipping_address: {
    full_name: {
      type: String,
      required: [true, 'Full name is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    address_line1: {
      type: String,
      required: [true, 'Address line 1 is required']
    },
    address_line2: {
      type: String
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    postal_code: {
      type: String,
      required: [true, 'Postal code is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'India'
    }
  },
  billing_address: {
    full_name: {
      type: String,
      required: [true, 'Full name is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    address_line1: {
      type: String,
      required: [true, 'Address line 1 is required']
    },
    address_line2: {
      type: String
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    postal_code: {
      type: String,
      required: [true, 'Postal code is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'India'
    }
  },
  payment_details: {
    method: {
      type: String,
      enum: ['razorpay', 'cod', 'card', 'upi'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transaction_id: {
      type: String
    },
    razorpay_payment_id: {
      type: String
    },
    razorpay_order_id: {
      type: String
    },
    razorpay_signature: {
      type: String
    }
  },
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    shipping_cost: {
      type: Number,
      default: 0
    },
    tax_amount: {
      type: Number,
      default: 0
    },
    discount_amount: {
      type: Number,
      default: 0
    },
    coupon_code: {
      type: String
    },
    total_amount: {
      type: Number,
      required: true
    }
  },
  tracking: {
    tracking_number: {
      type: String
    },
    carrier: {
      type: String
    },
    estimated_delivery: {
      type: Date
    },
    shipped_at: {
      type: Date
    },
    delivered_at: {
      type: Date
    }
  },
  notes: {
    customer_notes: {
      type: String
    },
    admin_notes: {
      type: String
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
orderSchema.index({ order_number: 1 });
orderSchema.index({ user_id: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'payment_details.status': 1 });
orderSchema.index({ created_at: -1 });

// Virtual for order summary
orderSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    order_number: this.order_number,
    status: this.status,
    total_amount: this.pricing.total_amount,
    item_count: this.items.length,
    created_at: this.createdAt,
    updated_at: this.updatedAt
  };
});

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.order_number) {
    const count = await this.constructor.countDocuments();
    this.order_number = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

// Method to update order status
orderSchema.methods.updateStatus = function(status, notes = '') {
  this.status = status;
  
  if (notes) {
    this.notes.admin_notes = notes;
  }
  
  // Update tracking dates
  if (status === 'shipped') {
    this.tracking.shipped_at = new Date();
  } else if (status === 'delivered') {
    this.tracking.delivered_at = new Date();
  }
  
  return this.save();
};

// Method to update payment status
orderSchema.methods.updatePaymentStatus = function(status, transactionId = null) {
  this.payment_details.status = status;
  if (transactionId) {
    this.payment_details.transaction_id = transactionId;
  }
  return this.save();
};

// Static method to find user's orders
orderSchema.statics.findByUser = function(userId, limit = 10, skip = 0) {
  return this.find({ user_id: userId })
    .populate('items.product_id', 'name images brand_id')
    .populate('items.product_id.brand_id', 'name')
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to find orders by status
orderSchema.statics.findByStatus = function(status, limit = 50, skip = 0) {
  return this.find({ status })
    .populate('user_id', 'full_name email phone')
    .populate('items.product_id', 'name images brand_id')
    .populate('items.product_id.brand_id', 'name')
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to get order statistics
orderSchema.statics.getStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        total_amount: { $sum: '$pricing.total_amount' }
      }
    }
  ]);
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
