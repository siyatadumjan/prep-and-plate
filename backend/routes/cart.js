const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart for user
router.get('/', cartController.getCart);

// Add/update item in cart
router.post('/', cartController.addOrUpdateItem);

// Remove item from cart
router.delete('/:itemId', cartController.removeItem);

module.exports = router; 