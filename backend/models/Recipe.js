const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientSchema = new Schema({
  name: String,
  qty: Number,
  unit: String,
  price: Number,
});

const NutritionSchema = new Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
});

const RecipeSchema = new Schema({
  title: String,
  desc: String,
  img: String,
  time: String,
  servings: Number,
  difficulty: String,
  ingredients: [IngredientSchema],
  nutrition: NutritionSchema,
  featured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
