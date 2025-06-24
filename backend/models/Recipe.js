const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  servings: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    trim: true
  },
  ingredientIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: true
  }]
});

module.exports = mongoose.model('Recipe', recipeSchema);
