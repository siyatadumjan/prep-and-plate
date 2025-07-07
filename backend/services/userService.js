const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Register function
exports.register = async (fullName, email, phoneNumber, password) => {
  try {
    email = email.toLowerCase();
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { status: 400, message: 'Email already in use' };
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      throw { status: 400, message: 'Phone number already in use' };
    }

    // Create new user (let pre-save hook hash the password)
    const newUser = new User({ 
      fullName, 
      email, 
      phoneNumber, 
      password // plain password, will be hashed by pre-save hook
    });
    await newUser.save();

    return { message: 'User registered successfully' };
  } catch (err) {
    throw err;
  }
};

// Login function
exports.login = async (email, password) => {
  try {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    console.log('LOGIN DEBUG:', { email, password, user }); // Debug log
    if (!user) {
      throw { status: 400, message: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 400, message: 'Invalid email or password' };
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '1d' }
    );

    return { token };
  } catch (err) {
    throw err;
  }
};

// Get user profile function
exports.getProfile = async (email) => {
  try {
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }
    return user;
  } catch (err) {
    throw err;
  }
};

// Update user photo function
exports.updatePhoto = async (userId, photoUrl) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { photo: photoUrl },
      { new: true }
    ).select('-password');
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }
    return user;
  } catch (err) {
    throw err;
  }
};

// Forgot Password (send OTP)
exports.forgotPassword = async (email) => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) {
    // Do not reveal if user exists
    return;
  }
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.passwordResetOTP = otp;
  user.passwordResetOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  // Set up nodemailer (use your SMTP config)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
  };
  await transporter.sendMail(mailOptions);
};

// Verify OTP
exports.verifyOTP = async (email, otp) => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user || !user.passwordResetOTP || !user.passwordResetOTPExpires) {
    throw { status: 400, message: 'Invalid or expired OTP' };
  }
  if (user.passwordResetOTP !== otp || user.passwordResetOTPExpires < Date.now()) {
    throw { status: 400, message: 'Invalid or expired OTP' };
  }
  // OTP is valid
  return true;
};

// Reset Password with OTP
exports.resetPasswordWithOTP = async (email, otp, newPassword) => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user || !user.passwordResetOTP || !user.passwordResetOTPExpires) {
    throw { status: 400, message: 'Invalid or expired OTP' };
  }
  if (user.passwordResetOTP !== otp || user.passwordResetOTPExpires < Date.now()) {
    throw { status: 400, message: 'Invalid or expired OTP' };
  }
  user.password = newPassword;
  user.passwordResetOTP = null;
  user.passwordResetOTPExpires = null;
  await user.save();
};

// Change Password
exports.changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw { status: 400, message: 'Old password is incorrect' };
  }
  user.password = newPassword;
  await user.save();
};
