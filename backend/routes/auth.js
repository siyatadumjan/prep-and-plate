const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', authController.register);

// @route   POST /api/auth/login
// @desc    Login user and return token
// @access  Public
router.post('/login', authController.login);

// Forgot password (send OTP)
router.post('/forgot-password', authController.forgotPassword);
// Verify OTP
router.post('/verify-otp', authController.verifyOTP);
// Reset password with OTP
router.post('/reset-password', authController.resetPassword);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Public
router.get('/profile', authController.getProfile);

module.exports = router;
