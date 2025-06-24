const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // one cart per user
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema);
