const cartService = require('../services/cartService');

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('GET CART DEBUG:', { userId }); // Debug log
    const cart = await cartService.getCart(userId);
    console.log('GET CART RESULT:', cart); // Debug log
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.addOrUpdateItem = async (req, res) => {
  try {
    const { userId, item } = req.body;
    console.log('ADD/UPDATE CART DEBUG:', { userId, item }); // Debug log
    const cart = await cartService.addOrUpdateItem(userId, item);
    console.log('ADD/UPDATE CART RESULT:', cart); // Debug log
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId } = req.query;
    const { itemId } = req.params;
    const cart = await cartService.removeItem(userId, itemId);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};
