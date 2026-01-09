import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { generateToken, verifyToken } from '../middleware/auth.js';
import { validateUserRegistration, validateUserLogin } from '../middleware/validation.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', validateUserRegistration, asyncHandler(async (req, res) => {
  const { email, password, full_name, phone } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Create user
  const user = await User.create({
    email,
    password,
    full_name,
    phone
  });

  // Generate token
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: user.profile,
      token
    }
  });
}));

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', validateUserLogin, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Check if user is active
  if (!user.is_active) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated'
    });
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Update last login
  await user.updateLastLogin();

  // Generate token
  const token = generateToken(user._id);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: user.profile,
      token
    }
  });
}));

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', verifyToken, asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user.profile
    }
  });
}));

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', verifyToken, asyncHandler(async (req, res) => {
  const { full_name, phone, avatar_url } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { full_name, phone, avatar_url },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: user.profile
    }
  });
}));

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put('/change-password', verifyToken, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required'
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'New password must be at least 6 characters long'
    });
  }

  // Get user with password
  const user = await User.findById(req.user._id).select('+password');
  
  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
}));

// @desc    Add shipping address
// @route   POST /api/auth/addresses
// @access  Private
router.post('/addresses', verifyToken, asyncHandler(async (req, res) => {
  const { full_name, phone, address_line1, address_line2, city, state, postal_code, country, is_default } = req.body;

  const address = {
    full_name,
    phone,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country: country || 'India',
    is_default: is_default || false
  };

  // If this is set as default, unset other defaults
  if (is_default) {
    await User.findByIdAndUpdate(req.user._id, {
      $set: { 'addresses.$[].is_default': false }
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { addresses: address } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: 'Address added successfully',
    data: {
      addresses: user.addresses
    }
  });
}));

// @desc    Update shipping address
// @route   PUT /api/auth/addresses/:addressId
// @access  Private
router.put('/addresses/:addressId', verifyToken, asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const { full_name, phone, address_line1, address_line2, city, state, postal_code, country, is_default } = req.body;

  const updateData = {
    'addresses.$.full_name': full_name,
    'addresses.$.phone': phone,
    'addresses.$.address_line1': address_line1,
    'addresses.$.address_line2': address_line2,
    'addresses.$.city': city,
    'addresses.$.state': state,
    'addresses.$.postal_code': postal_code,
    'addresses.$.country': country || 'India',
    'addresses.$.is_default': is_default || false
  };

  // If this is set as default, unset other defaults
  if (is_default) {
    await User.findByIdAndUpdate(req.user._id, {
      $set: { 'addresses.$[].is_default': false }
    });
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id, 'addresses._id': addressId },
    { $set: updateData },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Address not found'
    });
  }

  res.json({
    success: true,
    message: 'Address updated successfully',
    data: {
      addresses: user.addresses
    }
  });
}));

// @desc    Delete shipping address
// @route   DELETE /api/auth/addresses/:addressId
// @access  Private
router.delete('/addresses/:addressId', verifyToken, asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: addressId } } },
    { new: true }
  );

  res.json({
    success: true,
    message: 'Address deleted successfully',
    data: {
      addresses: user.addresses
    }
  });
}));

// @desc    Get user addresses
// @route   GET /api/auth/addresses
// @access  Private
router.get('/addresses', verifyToken, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  res.json({
    success: true,
    data: {
      addresses: user.addresses
    }
  });
}));

export default router;
