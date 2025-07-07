const mongoose = require('mongoose');
require('dotenv').config();

const Recipe = require('./models/Recipe');

const sampleRecipes = [
  {
    title: "Beef Stir Fry",
    description: "A quick and flavorful dish featuring tender strips of beef stir-fried with colorful bell peppers, onions, and a savory soy-based sauce. Perfect for a weeknight dinner.",
    img: "/beef-stir-fry.jpg",
    time: "25 min",
    servings: 2,
    tag: "Non Vegetarian",
    difficulty: "Medium",
    featured: true,
    ingredients: [
      { name: "Beef sirloin", qty: 200, unit: "g", price: 200 },
      { name: "Bell pepper", qty: 1, unit: "piece", price: 30 },
      { name: "Onion", qty: 1, unit: "piece", price: 20 },
      { name: "Soy sauce", qty: 2, unit: "tbsp", price: 10 },
      { name: "Garlic", qty: 2, unit: "cloves", price: 5 },
      { name: "Vegetable oil", qty: 1, unit: "tbsp", price: 5 }
    ],
    nutrition: { calories: 320, protein: 28, carbs: 12, fat: 18 }
  },
  {
    title: "Beef Tacos",
    description: "Crispy taco shells filled with seasoned ground beef, fresh lettuce, juicy tomatoes, shredded cheese, and a dollop of sour cream. A Mexican favorite for all ages.",
    img: "/beef-tacos.webp",
    time: "20 min",
    servings: 3,
    tag: "Non Vegetarian",
    difficulty: "Easy",
    featured: true,
    ingredients: [
      { name: "Ground beef", qty: 250, unit: "g", price: 150 },
      { name: "Taco shells", qty: 6, unit: "pieces", price: 60 },
      { name: "Lettuce", qty: 1, unit: "cup", price: 20 },
      { name: "Tomato", qty: 1, unit: "piece", price: 15 },
      { name: "Cheddar cheese", qty: 0.5, unit: "cup", price: 40 },
      { name: "Sour cream", qty: 3, unit: "tbsp", price: 15 }
    ],
    nutrition: { calories: 290, protein: 16, carbs: 22, fat: 15 }
  },
  {
    title: "Chocolate Lava Cake",
    description: "A decadent dessert with a rich, molten chocolate center. Served warm and often paired with vanilla ice cream or fresh berries for an indulgent treat.",
    img: "/chocolate-lava-cake.webp",
    time: "30 min",
    servings: 2,
    tag: "Dessert",
    difficulty: "Medium",
    featured: true,
    ingredients: [
      { name: "Dark chocolate", qty: 100, unit: "g", price: 50 },
      { name: "Butter", qty: 50, unit: "g", price: 20 },
      { name: "Eggs", qty: 2, unit: "", price: 20 },
      { name: "Sugar", qty: 0.5, unit: "cup", price: 15 },
      { name: "Flour", qty: 0.25, unit: "cup", price: 10 }
    ],
    nutrition: { calories: 370, protein: 6, carbs: 38, fat: 22 }
  },
  {
    title: "Classic Margherita Pizza",
    description: "An Italian classic featuring a thin, crispy crust topped with fresh mozzarella, ripe tomatoes, basil leaves, and a drizzle of olive oil. Simple, fresh, and delicious.",
    img: "/classic margherita pizza.jpeg",
    time: "30 min",
    servings: 3,
    tag: "Vegetarian",
    difficulty: "Easy",
    ingredients: [
      { name: "Pizza dough", qty: 1, unit: "base", price: 50 },
      { name: "Tomato sauce", qty: 0.5, unit: "cup", price: 20 },
      { name: "Mozzarella cheese", qty: 100, unit: "g", price: 40 },
      { name: "Tomato", qty: 1, unit: "piece", price: 10 },
      { name: "Basil", qty: 6, unit: "leaves", price: 5 }
    ],
    nutrition: { calories: 270, protein: 11, carbs: 34, fat: 10 }
  },
  {
    title: "Palak Paneer",
    description: "A popular North Indian dish made with soft paneer cubes simmered in a creamy spinach gravy, seasoned with aromatic spices. Best enjoyed with naan or rice.",
    img: "/palak paneer.webp",
    time: "35 min",
    servings: 3,
    tag: "Vegetarian",
    difficulty: "Medium",
    ingredients: [
      { name: "Paneer", qty: 200, unit: "g", price: 80 },
      { name: "Spinach", qty: 250, unit: "g", price: 30 },
      { name: "Onion", qty: 1, unit: "piece", price: 10 },
      { name: "Tomato", qty: 1, unit: "piece", price: 10 },
      { name: "Cream", qty: 2, unit: "tbsp", price: 10 }
    ],
    nutrition: { calories: 320, protein: 14, carbs: 12, fat: 24 }
  },
  {
    title: "Pani Puri",
    description: "A beloved Indian street food consisting of crispy puris filled with spicy, tangy water, potatoes, chickpeas, and chutneys. A burst of flavors in every bite.",
    img: "/pani-puri.jpg",
    time: "20 min",
    servings: 6,
    tag: "Popular",
    difficulty: "Easy",
    ingredients: [
      { name: "Puris", qty: 24, unit: "pieces", price: 60 },
      { name: "Potato", qty: 2, unit: "medium", price: 20 },
      { name: "Chickpeas", qty: 0.5, unit: "cup", price: 10 },
      { name: "Tamarind chutney", qty: 0.25, unit: "cup", price: 10 },
      { name: "Spicy water", qty: 1, unit: "cup", price: 5 }
    ],
    nutrition: { calories: 180, protein: 4, carbs: 36, fat: 2 }
  },
  {
    title: "Samosa",
    description: "Golden, crispy pastry pockets stuffed with a spicy mixture of potatoes, peas, and aromatic spices. Served best with mint or tamarind chutney.",
    img: "/samosa.avif",
    time: "30 min",
    servings: 4,
    tag: "Traditional",
    difficulty: "Medium",
    ingredients: [
      { name: "Potato", qty: 2, unit: "medium", price: 20 },
      { name: "Green peas", qty: 0.5, unit: "cup", price: 10 },
      { name: "Onion", qty: 1, unit: "small", price: 5 },
      { name: "Cumin seeds", qty: 0.5, unit: "tsp", price: 2 },
      { name: "Coriander powder", qty: 1, unit: "tsp", price: 2 },
      { name: "Flour", qty: 1, unit: "cup", price: 10 }
    ],
    nutrition: { calories: 150, protein: 3, carbs: 22, fat: 6 }
  },
  {
    title: "Sel Roti",
    description: "A traditional Nepali rice flour doughnut, crispy on the outside and soft on the inside. Often enjoyed during festivals and special occasions.",
    img: "/sel-roti.jpeg",
    time: "45 min",
    servings: 5,
    tag: "Traditional",
    difficulty: "Medium",
    ingredients: [
      { name: "Rice flour", qty: 2, unit: "cups", price: 40 },
      { name: "Sugar", qty: 0.75, unit: "cup", price: 10 },
      { name: "Milk", qty: 1, unit: "cup", price: 10 },
      { name: "Banana", qty: 1, unit: "", price: 10 },
      { name: "Ghee", qty: 2, unit: "tbsp", price: 10 }
    ],
    nutrition: { calories: 220, protein: 3, carbs: 45, fat: 3 }
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/prep_plate');
    await Recipe.deleteMany({});
    await Recipe.insertMany(sampleRecipes);
    console.log('Sample recipes inserted!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding recipes:', err);
    process.exit(1);
  }
}

seed(); 