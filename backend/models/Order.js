const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  recipeId: String,
  title: String,
  img: String,
  servings: Number,
  price: Number,
  pricePerServing: Number,
});

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true }, // ✅ Required for eSewa
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  total: Number,
  address: String,
  paymentMethod: String,
  status: { type: String, default: 'pending' }, // ✅ Status tracking
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
