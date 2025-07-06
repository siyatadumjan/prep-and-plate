const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  recipeId: String,
  title: String,
  img: String,
  servings: Number,
  price: Number,
  pricePerServing: Number,
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', CartSchema);
