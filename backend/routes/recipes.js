const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Search recipes by title or description and filter by tags
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const regex = new RegExp(query, 'i'); // case-insensitive
    const filter = {
      $and: [
        {
          $or: [
            { title: regex },
            { description: regex }
          ]
        }
      ]
    };
    if (tags.length > 0) {
      filter.$and.push({ tag: { $in: tags } });
    }
    const recipes = await Recipe.find(filter);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
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