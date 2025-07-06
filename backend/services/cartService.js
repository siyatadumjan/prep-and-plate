const mongoose = require('mongoose');
const Cart = require('../models/Cart');

exports.getCart = async (userId) => {
  return await Cart.findOne({ user: new mongoose.Types.ObjectId(userId) });
};

exports.addOrUpdateItem = async (userId, item) => {
  try {
    userId = new mongoose.Types.ObjectId(userId);
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [item] });
    } else {
      const existing = cart.items.find(i => i.recipeId.toString() === item.recipeId.toString());
      if (existing) {
        existing.servings += item.servings;
        existing.price += item.price;
      } else {
        cart.items.push(item);
      }
    }
    await cart.save();
    return cart;
  } catch (err) {
    console.error('CART SAVE ERROR:', err);
    throw err;
  }
};

exports.removeItem = async (userId, itemId) => {
  userId = new mongoose.Types.ObjectId(userId);
  let cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error('Cart not found');
  cart.items = cart.items.filter(i => i._id.toString() !== itemId);
  await cart.save();
  return cart;
};

exports.clearCart = async (userId) => {
  userId = new mongoose.Types.ObjectId(userId);
  let cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  return cart;
};
