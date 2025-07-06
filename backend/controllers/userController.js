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