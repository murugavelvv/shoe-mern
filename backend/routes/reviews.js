import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { validateReview, validatePagination, validateObjectId } from '../middleware/validation.js';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

// @desc    Get product reviews
// @route   GET /api/reviews/product/:productId
// @access  Public
router.get('/product/:productId', validateObjectId('productId'), validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reviews = await Review.findByProduct(req.params.productId, limit, skip);
  const total = await Review.countDocuments({ 
    product_id: req.params.productId, 
    is_approved: true 
  });
  const totalPages = Math.ceil(total / limit);

  // Get review statistics
  const stats = await Review.getProductStats(req.params.productId);

  res.json({
    success: true,
    data: {
      reviews,
      stats: stats[0] || {
        total_reviews: 0,
        average_rating: 0,
        rating_distribution: []
      },
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_reviews: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Get user's reviews
// @route   GET /api/reviews/user
// @access  Private
router.get('/user', verifyToken, validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reviews = await Review.findByUser(req.user._id, limit, skip);
  const total = await Review.countDocuments({ user_id: req.user._id });
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      reviews,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_reviews: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
router.post('/', verifyToken, validateReview, asyncHandler(async (req, res) => {
  const { product_id, order_id, rating, title, comment, images } = req.body;

  // Check if product exists
  const product = await Product.findById(product_id);
  if (!product || !product.is_active) {
    return res.status(404).json({
      success: false,
      message: 'Product not found or not available'
    });
  }

  // Check if order exists and belongs to user
  const order = await Order.findById(order_id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  if (order.user_id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  // Check if order contains the product
  const orderItem = order.items.find(item => 
    item.product_id.toString() === product_id.toString()
  );
  if (!orderItem) {
    return res.status(400).json({
      success: false,
      message: 'Product not found in this order'
    });
  }

  // Check if order is delivered
  if (order.status !== 'delivered') {
    return res.status(400).json({
      success: false,
      message: 'Can only review products from delivered orders'
    });
  }

  // Check if review already exists
  const existingReview = await Review.findOne({
    product_id,
    user_id: req.user._id,
    order_id
  });

  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: 'Review already exists for this product from this order'
    });
  }

  // Create review
  const review = await Review.create({
    product_id,
    user_id: req.user._id,
    order_id,
    rating,
    title,
    comment,
    images: images || [],
    is_verified_purchase: true
  });

  // Populate review data
  await review.populate('user_id', 'full_name avatar_url');
  await review.populate('product_id', 'name images brand_id');
  await review.populate('product_id.brand_id', 'name');

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully. It will be published after approval.',
    data: {
      review
    }
  });
}));

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
router.put('/:id', verifyToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { rating, title, comment, images } = req.body;

  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found'
    });
  }

  // Check if user owns this review
  if (review.user_id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  // Check if review is approved (can't edit approved reviews)
  if (review.is_approved) {
    return res.status(400).json({
      success: false,
      message: 'Cannot edit approved reviews'
    });
  }

  // Update review
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    { rating, title, comment, images: images || [] },
    { new: true, runValidators: true }
  ).populate('user_id', 'full_name avatar_url')
   .populate('product_id', 'name images brand_id')
   .populate('product_id.brand_id', 'name');

  res.json({
    success: true,
    message: 'Review updated successfully',
    data: {
      review: updatedReview
    }
  });
}));

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
router.delete('/:id', verifyToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found'
    });
  }

  // Check if user owns this review or is admin
  if (review.user_id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  await Review.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Review deleted successfully'
  });
}));

// @desc    Mark review as helpful
// @route   POST /api/reviews/:id/helpful
// @access  Private
router.post('/:id/helpful', verifyToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found'
    });
  }

  await review.markHelpful();

  res.json({
    success: true,
    message: 'Review marked as helpful',
    data: {
      helpful_count: review.helpful_count
    }
  });
}));

// @desc    Report review
// @route   POST /api/reviews/:id/report
// @access  Private
router.post('/:id/report', verifyToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({
      success: false,
      message: 'Report reason is required'
    });
  }

  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found'
    });
  }

  await review.report();

  res.json({
    success: true,
    message: 'Review reported successfully'
  });
}));

// @desc    Get pending reviews (Admin only)
// @route   GET /api/reviews/admin/pending
// @access  Private/Admin
router.get('/admin/pending', verifyToken, requireAdmin, validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const reviews = await Review.findPending(limit, skip);
  const total = await Review.countDocuments({ is_approved: false });
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      reviews,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_reviews: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Approve review (Admin only)
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
router.put('/:id/approve', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found'
    });
  }

  review.is_approved = true;
  await review.save();

  // Update product rating
  await review.updateProductRating();

  res.json({
    success: true,
    message: 'Review approved successfully',
    data: {
      review
    }
  });
}));

// @desc    Reject review (Admin only)
// @route   PUT /api/reviews/:id/reject
// @access  Private/Admin
router.put('/:id/reject', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found'
    });
  }

  await Review.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Review rejected and deleted',
    data: {
      reason: reason || 'Review did not meet our guidelines'
    }
  });
}));

// @desc    Add admin response to review (Admin only)
// @route   POST /api/reviews/:id/response
// @access  Private/Admin
router.post('/:id/response', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({
      success: false,
      message: 'Response comment is required'
    });
  }

  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found'
    });
  }

  await review.addAdminResponse(comment, req.user._id);

  res.json({
    success: true,
    message: 'Admin response added successfully',
    data: {
      review
    }
  });
}));

export default router;
