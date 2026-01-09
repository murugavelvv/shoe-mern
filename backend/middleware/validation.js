import { body, param, query, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
export const validateUserRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('full_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  handleValidationErrors
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Product validation rules
export const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('sale_price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Sale price must be a positive number'),
  body('gender')
    .isIn(['men', 'women', 'unisex', 'kids'])
    .withMessage('Gender must be one of: men, women, unisex, kids'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  body('sizes')
    .isArray({ min: 1 })
    .withMessage('At least one size is required'),
  body('colors')
    .isArray({ min: 1 })
    .withMessage('At least one color is required'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  handleValidationErrors
];

// Brand validation rules
export const validateBrand = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Brand name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  handleValidationErrors
];

// Cart validation rules
export const validateCartItem = [
  body('product_id')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('size')
    .trim()
    .notEmpty()
    .withMessage('Size is required'),
  body('color')
    .trim()
    .notEmpty()
    .withMessage('Color is required'),
  body('quantity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10'),
  handleValidationErrors
];

// Order validation rules
export const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.product_id')
    .isMongoId()
    .withMessage('Valid product ID is required for each item'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1 for each item'),
  body('shipping_address.full_name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  body('shipping_address.phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('shipping_address.address_line1')
    .trim()
    .notEmpty()
    .withMessage('Address line 1 is required'),
  body('shipping_address.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shipping_address.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shipping_address.postal_code')
    .trim()
    .notEmpty()
    .withMessage('Postal code is required'),
  handleValidationErrors
];

// Review validation rules
export const validateReview = [
  body('product_id')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('order_id')
    .isMongoId()
    .withMessage('Valid order ID is required'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters'),
  handleValidationErrors
];

// Coupon validation rules
export const validateCoupon = [
  body('code')
    .trim()
    .isLength({ min: 3, max: 20 })
    .matches(/^[A-Z0-9-]+$/)
    .withMessage('Coupon code must be 3-20 characters and contain only uppercase letters, numbers, and hyphens'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Coupon name must be between 2 and 100 characters'),
  body('discount_type')
    .isIn(['percentage', 'fixed'])
    .withMessage('Discount type must be either percentage or fixed'),
  body('discount_value')
    .isFloat({ min: 0 })
    .withMessage('Discount value must be a positive number'),
  body('min_purchase')
    .isFloat({ min: 0 })
    .withMessage('Minimum purchase must be a positive number'),
  body('valid_from')
    .isISO8601()
    .withMessage('Valid from date must be a valid date'),
  body('valid_until')
    .isISO8601()
    .withMessage('Valid until date must be a valid date'),
  handleValidationErrors
];

// Query parameter validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

// MongoDB ObjectId validation
export const validateObjectId = (paramName) => [
  param(paramName)
    .isMongoId()
    .withMessage(`Valid ${paramName} is required`),
  handleValidationErrors
];
