import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const recipeData = {
  1: {
    id: 1,
    title: "Lemon Herb Roasted Chicken",
    desc: "This perfectly roasted chicken has a bright lemon and herb flavor profile. The recipe uses precise measurements to ensure zero waste while creating a delicious meal.",
    img: "https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=800",
    servings: 2,
    pricePerServing: 850,
    time: "1 hr 30 min",
    ingredients: [
      { name: "Whole chicken", qty: 1.5, unit: "kg" },
      { name: "Lemons", qty: 2, unit: "" },
      { name: "Fresh rosemary", qty: 3, unit: "sprigs" },
      { name: "Fresh thyme", qty: 4, unit: "sprigs" },
      { name: "Garlic cloves", qty: 6, unit: "" },
      { name: "Olive oil", qty: 2, unit: "tbsp" },
      { name: "Salt", qty: 1, unit: "tsp" },
      { name: "Black pepper", qty: 0.5, unit: "tsp" },
    ],
    nutrition: { calories: 350, protein: 42, carbs: 2, fat: 18 },
    instructions: [
      "Preheat your oven to 375°F (190°C).",
      "Remove any giblets from the chicken cavity and pat the chicken dry with paper towels.",
      "Cut one lemon into quarters and place inside the chicken cavity along with half of the rosemary, thyme, and garlic.",
      "In a small bowl, mix the olive oil, salt, pepper, and the juice from the second lemon.",
      "Rub the olive oil mixture all over the chicken, including under the skin where possible.",
      "Place the chicken in a roasting pan and scatter the remaining herbs and garlic around it.",
      "Roast for approximately 1 hour and 15 minutes, or until the internal temperature reaches 165°F (74°C) at the thickest part of the thigh.",
      "Let the chicken rest for 10-15 minutes before carving and serving.",
    ],
  },
  2: {
    id: 2,
    title: "Vegetarian Pasta Primavera",
    desc: "A vibrant, healthy pasta dish loaded with fresh vegetables and tossed in a light garlic and olive oil sauce. Perfect for a quick, nutritious meal.",
    img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
    servings: 2,
    pricePerServing: 600,
    time: "30 min",
    ingredients: [
      { name: "Penne pasta", qty: 200, unit: "g" },
      { name: "Broccoli florets", qty: 1, unit: "cup" },
      { name: "Red bell pepper, sliced", qty: 0.5, unit: "cup" },
      { name: "Zucchini, sliced", qty: 0.5, unit: "cup" },
      { name: "Carrot, julienned", qty: 0.5, unit: "cup" },
      { name: "Cherry tomatoes, halved", qty: 0.5, unit: "cup" },
      { name: "Olive oil", qty: 2, unit: "tbsp" },
      { name: "Garlic cloves, minced", qty: 2, unit: "" },
      { name: "Salt", qty: 0.5, unit: "tsp" },
      { name: "Black pepper", qty: 0.25, unit: "tsp" },
      { name: "Parmesan cheese, grated (optional)", qty: 2, unit: "tbsp" },
    ],
    nutrition: { calories: 320, protein: 10, carbs: 58, fat: 7 },
    instructions: [
      "Cook the penne pasta according to package instructions. Drain and set aside.",
      "Heat olive oil in a large skillet over medium heat. Add garlic and sauté until fragrant.",
      "Add broccoli, bell pepper, zucchini, and carrot. Sauté for 4-5 minutes until just tender.",
      "Add cherry tomatoes, salt, and pepper. Cook for another 2 minutes.",
      "Add the cooked pasta to the skillet and toss everything together until well combined and heated through.",
      "Serve hot, topped with grated Parmesan cheese if desired.",
    ],
  },
  3: {
    id: 3,
    title: "Steamed Chicken Momo",
    desc: "A beloved Nepali dumpling filled with flavorful minced chicken and steamed to perfection. Served with a spicy dipping sauce, it's a favorite comfort food.",
    img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    servings: 2,
    pricePerServing: 500,
    time: "50 min",
    ingredients: [
      { name: "All-purpose flour", qty: 1, unit: "cup" },
      { name: "Minced chicken", qty: 200, unit: "g" },
      { name: "Onion, finely chopped", qty: 0.5, unit: "cup" },
      { name: "Green onion, chopped", qty: 0.25, unit: "cup" },
      { name: "Garlic, minced", qty: 2, unit: "cloves" },
      { name: "Ginger, minced", qty: 1, unit: "tsp" },
      { name: "Soy sauce", qty: 1, unit: "tbsp" },
      { name: "Salt", qty: 0.5, unit: "tsp" },
      { name: "Black pepper", qty: 0.25, unit: "tsp" },
      { name: "Water (for dough)", qty: 0.5, unit: "cup" },
      { name: "Oil", qty: 1, unit: "tbsp" },
    ],
    nutrition: { calories: 290, protein: 14, carbs: 38, fat: 8 },
    instructions: [
      "In a bowl, mix flour and water to form a smooth dough. Cover and let it rest for 20 minutes.",
      "In another bowl, combine minced chicken, onion, green onion, garlic, ginger, soy sauce, salt, pepper, and oil. Mix well.",
      "Divide the dough into small balls and roll each into a thin circle.",
      "Place a spoonful of filling in the center of each wrapper. Fold and pleat the edges to seal the momo.",
      "Arrange momos in a steamer lined with parchment or cabbage leaves. Steam for 12-15 minutes until the wrappers are translucent and the filling is cooked.",
      "Serve hot with spicy tomato dipping sauce.",
    ],
  },
};

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const recipe = recipeData[id] || recipeData[1]; // Fallback to recipe 1 if ID not found
  const [servings, setServings] = useState(recipe.servings);

  const handleOrder = () => {
    const itemToAdd = {
      id: recipe.id,
      title: recipe.title,
      img: recipe.img,
      servings: servings,
      price: recipe.pricePerServing * servings,
      pricePerServing: recipe.pricePerServing
    };
    addToCart(itemToAdd);
    navigate('/cart');
  };

  // Adjust ingredient quantities based on servings
  const adjustedIngredients = recipe.ingredients.map(ing => ({
    ...ing,
    qty: (ing.qty * servings) / recipe.servings,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={recipe.img} alt={recipe.title} className="rounded-xl shadow-lg w-full md:w-1/2 object-cover" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-gray-600 mb-4">{recipe.desc}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-500">⏱ {recipe.time}</span>
            <span className="text-gray-500">🍽 {servings} servings</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-medium">Adjust servings:</span>
            <button onClick={() => setServings(s => Math.max(1, s-1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
            <span className="px-3">{servings}</span>
            <button onClick={() => setServings(s => s+1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
            <span className="text-xs text-gray-400 ml-2">Ingredient quantities will adjust automatically to reduce waste</span>
          </div>
          <button onClick={handleOrder} className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 mb-6">Order Ingredients</button>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h2 className="font-semibold mb-2">Ingredients</h2>
            <ul className="space-y-1">
              {adjustedIngredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-green-600" />
                  <span>{ing.qty} {ing.unit} {ing.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-500">
              <div>Nutrition Facts (per serving):</div>
              <div>Calories {recipe.nutrition.calories} | Protein {recipe.nutrition.protein}g | Carbs {recipe.nutrition.carbs}g | Fat {recipe.nutrition.fat}g</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-semibold mb-4 text-lg">Instructions</h2>
        <ol className="list-decimal pl-6 space-y-3">
          {recipe.instructions.map((step, i) => (
            <li key={i} className="bg-green-50 rounded p-3 flex gap-3 items-start">
              <span className="inline-block w-6 h-6 bg-green-600 text-white rounded-full text-center font-bold mr-2">{i+1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails; 