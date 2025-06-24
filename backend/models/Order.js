const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
