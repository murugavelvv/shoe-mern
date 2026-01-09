import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { validatePagination, validateObjectId } from '../middleware/validation.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', verifyToken, requireAdmin, validatePagination, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Build filter
  const filter = {};
  if (req.query.role) {
    filter.role = req.query.role;
  }
  if (req.query.is_active !== undefined) {
    filter.is_active = req.query.is_active === 'true';
  }
  if (req.query.search) {
    filter.$or = [
      { full_name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const users = await User.find(filter)
    .select('-password')
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_users: total,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}));

// @desc    Get single user (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/:id', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: {
      user
    }
  });
}));

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put('/:id', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { full_name, phone, role, is_active, email_verified } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { full_name, phone, role, is_active, email_verified },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    message: 'User updated successfully',
    data: {
      user
    }
  });
}));

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'Cannot delete your own account'
    });
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
}));

// @desc    Toggle user status (Admin only)
// @route   PATCH /api/users/:id/toggle-status
// @access  Private/Admin
router.patch('/:id/toggle-status', verifyToken, requireAdmin, validateObjectId('id'), asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Prevent admin from deactivating themselves
  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'Cannot deactivate your own account'
    });
  }

  user.is_active = !user.is_active;
  await user.save();

  res.json({
    success: true,
    message: `User ${user.is_active ? 'activated' : 'deactivated'} successfully`,
    data: {
      user: user.profile
    }
  });
}));

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/admin/stats
// @access  Private/Admin
router.get('/admin/stats', verifyToken, requireAdmin, asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ is_active: true });
  const adminUsers = await User.countDocuments({ role: 'admin' });
  const verifiedUsers = await User.countDocuments({ email_verified: true });

  // Get user registration stats for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentUsers = await User.countDocuments({
    created_at: { $gte: thirtyDaysAgo }
  });

  res.json({
    success: true,
    data: {
      total_users: totalUsers,
      active_users: activeUsers,
      admin_users: adminUsers,
      verified_users: verifiedUsers,
      recent_users: recentUsers
    }
  });
}));

export default router;
