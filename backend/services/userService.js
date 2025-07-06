const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
