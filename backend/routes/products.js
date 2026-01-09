import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateProduct, validatePagination, validateObjectId } from '../middleware/validation.js';
import Product from '../models/Product.js';
import Brand from '../models/Brand.js';

const router = express.Router();

// @desc    Get all products with filtering and pagination
// @route   GET /api/products
// @access  Public
router.get('/', validatePagination, optionalAuth, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = { is_active: true };

  // Brand filter
  if (req.query.brand) {
    const brand = await Brand.findOne({ slug: req.query.brand, is_active: true });
    if (brand) {
      filter.brand_id = brand._id;
    }
  }

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

  // Size filter
  if (req.query.size) {
    filter.sizes = req.query.size;
  }

  // Color filter
  if (req.query.color) {
    filter.colors = new RegExp(req.query.color, 'i');
  }

  // Category filter
  if (req.query.category) {
    filter.category = new RegExp(req.query.category, 'i');
  }

  // Search query
  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  // Featured products
  if (req.query.featured === 'true') {
    filter.is_featured = true;
  }

  // Trending products
  if (req.query.trending === 'true') {
    filter.is_trending = true;
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
      case 'newest':
        sort = { created_at: -1 };
        break;
      case 'oldest':
        sort = { created_at: 1 };
        break;
      case 'name_asc':
        sort = { name: 1 };
        break;
      case 'name_desc':
        sort = { name: -1 };
        break;
      default:
        if (req.query.search) {
          sort = { score: { $meta: 'textScore' } };
        }
    }
  }

  // Execute query
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

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
router.get('/:slug', optionalAuth, asyncHandler(async (req, res) => {
  const product = await Product.findBySlug(req.params.slug);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    data: {
      product
    }
  });
}));

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
router.get('/featured', asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const products = await Product.findFeatured(limit);

  res.json({
    success: true,
    data: {
      products
    }
  });
}));

// @desc    Get trending products
// @route   GET /api/products/trending
// @access  Public
router.get('/trending', asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const products = await Product.findTrending(limit);

  res.json({
    success: true,
    data: {
      products
    }
  });
}));

// @desc    Get related products
// @route   GET /api/products/:slug/related
// @access  Public
router.get('/:slug/related', asyncHandler(async (req, res) => {
  const product = await Product.findBySlug(req.params.slug);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  const limit = parseInt(req.query.limit) || 4;
  
  // Find related products by same brand and gender
  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    brand_id: product.brand_id,
    gender: product.gender,
    is_active: true
  })
    .populate('brand_id', 'name slug logo_url')
    .limit(limit);

  res.json({
    success: true,
    data: {
      products: relatedProducts
    }
  });
}));

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
router.get('/search', validatePagination, asyncHandler(async (req, res) => {
  const { q: query, page = 1, limit = 12 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }

  const products = await Product.searchProducts(query, { is_active: true })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Product.countDocuments({
    $text: { $search: query },
    is_active: true
  });

  res.json({
    success: true,
    data: {
      products,
      query,
      total_results: total
    }
  });
}));

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category', { is_active: true });
  
  res.json({
    success: true,
    data: {
      categories: categories.filter(cat => cat && cat.trim() !== '')
    }
  });
}));

// @desc    Get available sizes
// @route   GET /api/products/sizes
// @access  Public
router.get('/sizes', asyncHandler(async (req, res) => {
  const sizes = await Product.distinct('sizes', { is_active: true });
  
  res.json({
    success: true,
    data: {
      sizes: [...new Set(sizes.flat())].sort()
    }
  });
}));

// @desc    Get available colors
// @route   GET /api/products/colors
// @access  Public
router.get('/colors', asyncHandler(async (req, res) => {
  const colors = await Product.distinct('colors', { is_active: true });
  
  res.json({
    success: true,
    data: {
      colors: [...new Set(colors.flat())].sort()
    }
  });
}));

export default router;
