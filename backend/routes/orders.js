import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { verifyToken, requireAdmin, requireOwnershipOrAdmin } from '../middleware/auth.js';
import { validateOrder, validatePagination, validateObjectId } from '../middleware/validation.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', verifyToken, validateOrder, asyncHandler(async (req, res) => {
  const { items, shipping_address, billing_address, payment_details, coupon_code } = req.body;

  // Validate and prepare order items
  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = await Product.findById(item.product_id);
    
    if (!product || !product.is_active) {
      return res.status(400).json({
        success: false,
        message: `Product ${item.product_id} not found or not available`
      });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
      });
    }

    const unitPrice = product.sale_price || product.price;
    const totalPrice = unitPrice * item.quantity;
    subtotal += totalPrice;

    orderItems.push({
      product_id: product._id,
      product_name: product.name,
      product_image: product.images[0],
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unit_price: unitPrice,
      total_price: totalPrice
    });
  }

  // Calculate shipping cost (free shipping over ₹1000)
  const shippingCost = subtotal >= 1000 ? 0 : 100;

  // Calculate tax (18% GST)
  const taxAmount = subtotal * 0.18;

  // Calculate discount (if coupon provided)
  let discountAmount = 0;
  if (coupon_code) {
    // TODO: Implement coupon validation and discount calculation
    // For now, we'll skip coupon logic
  }

  // Calculate total amount
  const totalAmount = subtotal + shippingCost + taxAmount - discountAmount;

  // Create order
  const order = await Order.create({
    user_id: req.user._id,
    items: orderItems,
    shipping_address,
    billing_address: billing_address || shipping_address,
    payment_details,
    pricing: {
      subtotal,
      shipping_cost: shippingCost,
      tax_amount: taxAmount,
      discount_amount: discountAmount,
      coupon_code,
      total_amount: totalAmount
    }
  });

  // Update product stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(
      item.product_id,
      { $inc: { stock: -item.quantity } }
    );
  }

  // Clear user's cart
  const cart = await Cart.findByUser(req.user._id);
  if (cart) {
    await cart.clearCart();
  }

  // Populate order with product details
  await order.populate('items.product_id', 'name images brand_id');
  await order.populate('items.product_id.brand_id', 'name');

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: {
      order
    }
  });
}));

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
router.get('/', verifyToken, validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const orders = await Order.findByUser(req.user._id, limit, skip);
  const total = await Order.countDocuments({ user_id: req.user._id });
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_orders: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', verifyToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user_id', 'full_name email phone')
    .populate('items.product_id', 'name images brand_id')
    .populate('items.product_id.brand_id', 'name');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if user owns this order or is admin
  if (req.user.role !== 'admin' && order.user_id._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  res.json({
    success: true,
    data: {
      order
    }
  });
}));

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { status, notes } = req.body;

  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    });
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  await order.updateStatus(status, notes);

  res.json({
    success: true,
    message: 'Order status updated successfully',
    data: {
      order
    }
  });
}));

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private
router.put('/:id/payment', verifyToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { status, transaction_id } = req.body;

  const validStatuses = ['pending', 'paid', 'failed', 'refunded'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment status'
    });
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if user owns this order or is admin
  if (req.user.role !== 'admin' && order.user_id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  await order.updatePaymentStatus(status, transaction_id);

  res.json({
    success: true,
    message: 'Payment status updated successfully',
    data: {
      order
    }
  });
}));

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
router.put('/:id/cancel', verifyToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if user owns this order
  if (order.user_id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  // Check if order can be cancelled
  if (['cancelled', 'delivered', 'shipped'].includes(order.status)) {
    return res.status(400).json({
      success: false,
      message: 'Order cannot be cancelled'
    });
  }

  // Restore product stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(
      item.product_id,
      { $inc: { stock: item.quantity } }
    );
  }

  await order.updateStatus('cancelled', 'Cancelled by customer');

  res.json({
    success: true,
    message: 'Order cancelled successfully',
    data: {
      order
    }
  });
}));

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
router.get('/admin/all', verifyToken, requireAdmin, validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Build filter
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.payment_status) {
    filter['payment_details.status'] = req.query.payment_status;
  }

  const orders = await Order.find(filter)
    .populate('user_id', 'full_name email phone')
    .populate('items.product_id', 'name images brand_id')
    .populate('items.product_id.brand_id', 'name')
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_orders: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Get order statistics (Admin only)
// @route   GET /api/orders/admin/stats
// @access  Private/Admin
router.get('/admin/stats', verifyToken, requireAdmin, asyncHandler(async (req, res) => {
  const stats = await Order.getStats();
  
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { 'payment_details.status': 'paid' } },
    { $group: { _id: null, total: { $sum: '$pricing.total_amount' } } }
  ]);

  res.json({
    success: true,
    data: {
      status_distribution: stats,
      total_orders: totalOrders,
      total_revenue: totalRevenue[0]?.total || 0
    }
  });
}));

export default router;
