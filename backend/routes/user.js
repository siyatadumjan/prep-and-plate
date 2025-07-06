const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');
// TODO: Replace with your real auth middleware that sets req.userId
const fakeAuth = (req, res, next) => {
  const body = req.body || {};
  const query = req.query || {};
  req.userId = body.userId || query.userId;
  next();
};

// Register new user
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Profile photo upload
router.post('/upload-photo', fakeAuth, upload.single('photo'), userController.uploadPhoto);

module.exports = router;
