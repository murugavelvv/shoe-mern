import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { validateCoupon, validatePagination, validateObjectId } from '../middleware/validation.js';
import Coupon from '../models/Coupon.js';

const router = express.Router();

// @desc    Get all active coupons
// @route   GET /api/coupons
// @access  Public
router.get('/', validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const coupons = await Coupon.findValid()
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Coupon.countDocuments({ is_active: true });
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      coupons,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_coupons: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Validate coupon code
// @route   POST /api/coupons/validate
// @access  Private
router.post('/validate', verifyToken, asyncHandler(async (req, res) => {
  const { code, order_amount, order_items } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Coupon code is required'
    });
  }

  const coupon = await Coupon.findByCode(code);
  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Invalid coupon code'
    });
  }

  // Validate coupon for the order
  const validation = coupon.validateForOrder(req.user._id, order_amount || 0, order_items || []);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: validation.errors[0],
      errors: validation.errors
    });
  }

  // Calculate discount amount
  const discountAmount = coupon.calculateDiscount(order_amount || 0);

  res.json({
    success: true,
    message: 'Coupon is valid',
    data: {
      coupon: coupon.summary,
      discount_amount: discountAmount,
      final_amount: (order_amount || 0) - discountAmount
    }
  });
}));

// @desc    Get coupon by code
// @route   GET /api/coupons/:code
// @access  Public
router.get('/:code', asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByCode(req.params.code);
  
  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Coupon not found'
    });
  }

  res.json({
    success: true,
    data: {
      coupon: coupon.summary
    }
  });
}));

// @desc    Create new coupon (Admin only)
// @route   POST /api/coupons
// @access  Private/Admin
router.post('/', verifyToken, requireAdmin, validateCoupon, asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Coupon created successfully',
    data: {
      coupon
    }
  });
}));

// @desc    Update coupon (Admin only)
// @route   PUT /api/coupons/:id
// @access  Private/Admin
router.put('/:id', verifyToken, requireAdmin, validateObjectId('id'), validateCoupon, asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Coupon not found'
    });
  }

  res.json({
    success: true,
    message: 'Coupon updated successfully',
    data: {
      coupon
    }
  });
}));

// @desc    Delete coupon (Admin only)
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
router.delete('/:id', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Coupon not found'
    });
  }

  await Coupon.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Coupon deleted successfully'
  });
}));

// @desc    Toggle coupon status (Admin only)
// @route   PATCH /api/coupons/:id/toggle-status
// @access  Private/Admin
router.patch('/:id/toggle-status', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Coupon not found'
    });
  }

  coupon.is_active = !coupon.is_active;
  await coupon.save();

  res.json({
    success: true,
    message: `Coupon ${coupon.is_active ? 'activated' : 'deactivated'} successfully`,
    data: {
      coupon
    }
  });
}));

// @desc    Get all coupons (Admin only)
// @route   GET /api/coupons/admin/all
// @access  Private/Admin
router.get('/admin/all', verifyToken, requireAdmin, validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Build filter
  const filter = {};
  if (req.query.is_active !== undefined) {
    filter.is_active = req.query.is_active === 'true';
  }

  const coupons = await Coupon.find(filter)
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Coupon.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      coupons,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_coupons: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Get coupon statistics (Admin only)
// @route   GET /api/coupons/admin/stats
// @access  Private/Admin
router.get('/admin/stats', verifyToken, requireAdmin, asyncHandler(async (req, res) => {
  const totalCoupons = await Coupon.countDocuments();
  const activeCoupons = await Coupon.countDocuments({ is_active: true });
  const expiredCoupons = await Coupon.countDocuments({ 
    valid_until: { $lt: new Date() } 
  });

  const usageStats = await Coupon.aggregate([
    {
      $group: {
        _id: null,
        total_usage: { $sum: '$usage_count' },
        avg_usage: { $avg: '$usage_count' }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      total_coupons: totalCoupons,
      active_coupons: activeCoupons,
      expired_coupons: expiredCoupons,
      total_usage: usageStats[0]?.total_usage || 0,
      average_usage: Math.round(usageStats[0]?.avg_usage || 0)
    }
  });
}));

export default router;
