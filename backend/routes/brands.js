import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { validateBrand, validatePagination, validateObjectId } from '../middleware/validation.js';
import Brand from '../models/Brand.js';
import Product from '../models/Product.js';

const router = express.Router();

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
router.get('/', validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Build filter
  const filter = { is_active: true };

  // Search query
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  // Sort options
  let sort = { sort_order: 1, name: 1 };
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'name_asc':
        sort = { name: 1 };
        break;
      case 'name_desc':
        sort = { name: -1 };
        break;
      case 'newest':
        sort = { created_at: -1 };
        break;
      case 'oldest':
        sort = { created_at: 1 };
        break;
    }
  }

  const brands = await Brand.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Brand.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      brands,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_brands: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Get single brand by slug
// @route   GET /api/brands/:slug
// @access  Public
router.get('/:slug', asyncHandler(async (req, res) => {
  const brand = await Brand.findBySlug(req.params.slug);
  
  if (!brand) {
    return res.status(404).json({
      success: false,
      message: 'Brand not found'
    });
  }

  res.json({
    success: true,
    data: {
      brand
    }
  });
}));

// @desc    Get brand products
// @route   GET /api/brands/:slug/products
// @access  Public
router.get('/:slug/products', validatePagination, asyncHandler(async (req, res) => {
  const brand = await Brand.findBySlug(req.params.slug);
  
  if (!brand) {
    return res.status(404).json({
      success: false,
      message: 'Brand not found'
    });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build filter
  const filter = { 
    brand_id: brand._id, 
    is_active: true 
  };

  // Gender filter
  if (req.query.gender) {
    filter.gender = req.query.gender;
  }

  // Price range filter
  if (req.query.min_price || req.query.max_price) {
    filter.price = {};
    if (req.query.min_price) {
      filter.price.$gte = parseFloat(req.query.min_price);
    }
    if (req.query.max_price) {
      filter.price.$lte = parseFloat(req.query.max_price);
    }
  }

  // Sort options
  let sort = { created_at: -1 };
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'name_asc':
        sort = { name: 1 };
        break;
      case 'name_desc':
        sort = { name: -1 };
        break;
    }
  }

  const products = await Product.find(filter)
    .populate('brand_id', 'name slug logo_url')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      brand,
      products,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_products: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Create new brand (Admin only)
// @route   POST /api/brands
// @access  Private/Admin
router.post('/', verifyToken, requireAdmin, validateBrand, asyncHandler(async (req, res) => {
  const brand = await Brand.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Brand created successfully',
    data: {
      brand
    }
  });
}));

// @desc    Update brand (Admin only)
// @route   PUT /api/brands/:id
// @access  Private/Admin
router.put('/:id', verifyToken, requireAdmin, validateObjectId('id'), validateBrand, asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: 'Brand not found'
    });
  }

  res.json({
    success: true,
    message: 'Brand updated successfully',
    data: {
      brand
    }
  });
}));

// @desc    Delete brand (Admin only)
// @route   DELETE /api/brands/:id
// @access  Private/Admin
router.delete('/:id', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: 'Brand not found'
    });
  }

  // Check if brand has products
  const productCount = await Product.countDocuments({ brand_id: brand._id });
  if (productCount > 0) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete brand. It has ${productCount} products associated with it.`
    });
  }

  await Brand.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Brand deleted successfully'
  });
}));

// @desc    Toggle brand status (Admin only)
// @route   PATCH /api/brands/:id/toggle-status
// @access  Private/Admin
router.patch('/:id/toggle-status', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: 'Brand not found'
    });
  }

  brand.is_active = !brand.is_active;
  await brand.save();

  res.json({
    success: true,
    message: `Brand ${brand.is_active ? 'activated' : 'deactivated'} successfully`,
    data: {
      brand
    }
  });
}));

export default router;
