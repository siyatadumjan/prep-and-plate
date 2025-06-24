const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
