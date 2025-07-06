const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Get recipe by id
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  res.json(recipe);
});

// Create recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json(recipe);
});

// Update recipe
router.put('/:id', async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  res.json(recipe);
});

// Delete recipe
router.delete('/:id', async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  res.json({ message: 'Recipe deleted' });
});

module.exports = router; 