import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { verifyToken } from '../middleware/auth.js';
import { validateCartItem } from '../middleware/validation.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = express.Router();

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router.get('/', verifyToken, asyncHandler(async (req, res) => {
  let cart = await Cart.findByUser(req.user._id);

  if (!cart) {
    // Create empty cart if doesn't exist
    cart = await Cart.create({
      user_id: req.user._id,
      items: []
    });
  }

  res.json({
    success: true,
    data: {
      cart: cart.summary,
      items: cart.items
    }
  });
}));

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
router.post('/items', verifyToken, validateCartItem, asyncHandler(async (req, res) => {
  const { product_id, size, color, quantity } = req.body;

  // Check if product exists and is active
  const product = await Product.findById(product_id);
  if (!product || !product.is_active) {
    return res.status(404).json({
      success: false,
      message: 'Product not found or not available'
    });
  }

  // Check if size and color are available
  if (!product.sizes.includes(size)) {
    return res.status(400).json({
      success: false,
      message: 'Selected size is not available for this product'
    });
  }

  if (!product.colors.includes(color)) {
    return res.status(400).json({
      success: false,
      message: 'Selected color is not available for this product'
    });
  }

  // Check stock availability
  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} items available in stock`
    });
  }

  // Get or create cart
  let cart = await Cart.findByUser(req.user._id);
  if (!cart) {
    cart = await Cart.create({
      user_id: req.user._id,
      items: []
    });
  }

  // Add item to cart
  await cart.addItem(product_id, size, color, quantity);

  // Refresh cart data
  cart = await Cart.findByUser(req.user._id);

  res.status(201).json({
    success: true,
    message: 'Item added to cart successfully',
    data: {
      cart: cart.summary,
      items: cart.items
    }
  });
}));

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:productId
// @access  Private
router.put('/items/:productId', verifyToken, asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { size, color, quantity } = req.body;

  if (!size || !color || !quantity) {
    return res.status(400).json({
      success: false,
      message: 'Size, color, and quantity are required'
    });
  }

  if (quantity < 1 || quantity > 10) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be between 1 and 10'
    });
  }

  // Check product availability
  const product = await Product.findById(productId);
  if (!product || !product.is_active) {
    return res.status(404).json({
      success: false,
      message: 'Product not found or not available'
    });
  }

  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} items available in stock`
    });
  }

  // Get cart
  const cart = await Cart.findByUser(req.user._id);
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }

  // Update item quantity
  await cart.updateItemQuantity(productId, size, color, quantity);

  // Refresh cart data
  const updatedCart = await Cart.findByUser(req.user._id);

  res.json({
    success: true,
    message: 'Cart item updated successfully',
    data: {
      cart: updatedCart.summary,
      items: updatedCart.items
    }
  });
}));

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:productId
// @access  Private
router.delete('/items/:productId', verifyToken, asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { size, color } = req.body;

  if (!size || !color) {
    return res.status(400).json({
      success: false,
      message: 'Size and color are required'
    });
  }

  // Get cart
  const cart = await Cart.findByUser(req.user._id);
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }

  // Remove item from cart
  await cart.removeItem(productId, size, color);

  // Refresh cart data
  const updatedCart = await Cart.findByUser(req.user._id);

  res.json({
    success: true,
    message: 'Item removed from cart successfully',
    data: {
      cart: updatedCart.summary,
      items: updatedCart.items
    }
  });
}));

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
router.delete('/', verifyToken, asyncHandler(async (req, res) => {
  const cart = await Cart.findByUser(req.user._id);
  
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }

  await cart.clearCart();

  res.json({
    success: true,
    message: 'Cart cleared successfully',
    data: {
      cart: {
        total_items: 0,
        total_amount: 0,
        item_count: 0
      },
      items: []
    }
  });
}));

// @desc    Get cart count
// @route   GET /api/cart/count
// @access  Private
router.get('/count', verifyToken, asyncHandler(async (req, res) => {
  const cart = await Cart.findByUser(req.user._id);
  
  const count = cart ? cart.total_items : 0;

  res.json({
    success: true,
    data: {
      count
    }
  });
}));

// @desc    Validate cart items
// @route   POST /api/cart/validate
// @access  Private
router.post('/validate', verifyToken, asyncHandler(async (req, res) => {
  const cart = await Cart.findByUser(req.user._id);
  
  if (!cart || cart.items.length === 0) {
    return res.json({
      success: true,
      data: {
        is_valid: true,
        items: []
      }
    });
  }

  const validationResults = [];
  let hasErrors = false;

  for (const item of cart.items) {
    const product = await Product.findById(item.product_id);
    
    if (!product || !product.is_active) {
      validationResults.push({
        item_id: item._id,
        product_id: item.product_id,
        error: 'Product not available',
        action: 'remove'
      });
      hasErrors = true;
    } else if (product.stock < item.quantity) {
      validationResults.push({
        item_id: item._id,
        product_id: item.product_id,
        error: `Only ${product.stock} items available`,
        action: 'update_quantity',
        max_quantity: product.stock
      });
      hasErrors = true;
    } else if (!product.sizes.includes(item.size)) {
      validationResults.push({
        item_id: item._id,
        product_id: item.product_id,
        error: 'Size not available',
        action: 'remove'
      });
      hasErrors = true;
    } else if (!product.colors.includes(item.color)) {
      validationResults.push({
        item_id: item._id,
        product_id: item.product_id,
        error: 'Color not available',
        action: 'remove'
      });
      hasErrors = true;
    }
  }

  res.json({
    success: true,
    data: {
      is_valid: !hasErrors,
      items: validationResults
    }
  });
}));

export default router;
