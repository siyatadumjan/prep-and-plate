const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({ 
        message: 'All fields are required: fullName, email, phoneNumber, password' 
      });
    }

    await userService.register(fullName, email, phoneNumber, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await userService.login(req.body.email, req.body.password);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
}; 

exports.getProfile = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required' 
      });
    }

    const user = await userService.getProfile(email);
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
}; 

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Assuming userId is available from auth middleware (e.g., req.userId)
    const userId = req.userId || req.body.userId || req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    // Build the photo URL (assuming server serves /uploads statically)
    const photoUrl = `/uploads/${req.file.filename}`;
    const user = await userService.updatePhoto(userId, photoUrl);
    res.json({ message: 'Photo uploaded successfully', user });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
}; 

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    await userService.forgotPassword(email);
    res.json({ message: 'If that email is registered, an OTP has been sent.' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
    await userService.verifyOTP(email, otp);
    res.json({ message: 'OTP verified. You may now reset your password.' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }
    await userService.resetPasswordWithOTP(email, otp, password);
    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
}; 

exports.changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'User ID, old password, and new password are required' });
    }
    await userService.changePassword(userId, oldPassword, newPassword);
    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
}; 