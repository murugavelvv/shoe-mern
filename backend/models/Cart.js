import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  items: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required']
    },
    size: {
      type: String,
      required: [true, 'Size is required']
    },
    color: {
      type: String,
      required: [true, 'Color is required']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      max: [10, 'Quantity cannot exceed 10']
    },
    added_at: {
      type: Date,
      default: Date.now
    }
  }],
  total_items: {
    type: Number,
    default: 0
  },
  total_amount: {
    type: Number,
    default: 0
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
cartSchema.index({ user_id: 1 });
cartSchema.index({ 'items.product_id': 1 });

// Virtual for cart summary
cartSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    user_id: this.user_id,
    total_items: this.total_items,
    total_amount: this.total_amount,
    item_count: this.items.length,
    last_updated: this.last_updated,
    created_at: this.createdAt,
    updated_at: this.updatedAt
  };
});

// Pre-save middleware to calculate totals
cartSchema.pre('save', async function(next) {
  if (this.isModified('items')) {
    this.total_items = this.items.reduce((total, item) => total + item.quantity, 0);
    
    // Calculate total amount
    let totalAmount = 0;
    for (const item of this.items) {
      const Product = mongoose.model('Product');
      const product = await Product.findById(item.product_id);
      if (product) {
        const price = product.sale_price || product.price;
        totalAmount += price * item.quantity;
      }
    }
    this.total_amount = totalAmount;
    this.last_updated = new Date();
  }
  next();
});

// Method to add item to cart
cartSchema.methods.addItem = function(productId, size, color, quantity = 1) {
  const existingItemIndex = this.items.findIndex(
    item => item.product_id.toString() === productId.toString() && 
            item.size === size && 
            item.color === color
  );

  if (existingItemIndex > -1) {
    this.items[existingItemIndex].quantity += quantity;
  } else {
    this.items.push({
      product_id: productId,
      size,
      color,
      quantity
    });
  }
  
  return this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = function(productId, size, color) {
  this.items = this.items.filter(
    item => !(item.product_id.toString() === productId.toString() && 
              item.size === size && 
              item.color === color)
  );
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = function(productId, size, color, quantity) {
  const item = this.items.find(
    item => item.product_id.toString() === productId.toString() && 
            item.size === size && 
            item.color === color
  );
  
  if (item) {
    if (quantity <= 0) {
      return this.removeItem(productId, size, color);
    } else {
      item.quantity = quantity;
      return this.save();
    }
  }
  
  return Promise.resolve(this);
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.total_items = 0;
  this.total_amount = 0;
  this.last_updated = new Date();
  return this.save();
};

// Static method to find user's cart
cartSchema.statics.findByUser = function(userId) {
  return this.findOne({ user_id: userId })
    .populate('items.product_id', 'name price sale_price images brand_id')
    .populate('items.product_id.brand_id', 'name');
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
