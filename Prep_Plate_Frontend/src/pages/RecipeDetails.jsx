import React, { useState } from "react";
import { useParams } from "react-router-dom";

const recipe = {
  id: 1,
  title: "Lemon Herb Roasted Chicken",
  desc: "This perfectly roasted chicken has a bright lemon and herb flavor profile. The recipe uses precise measurements to ensure zero waste while creating a delicious meal.",
  img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  servings: 2,
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
};

const RecipeDetails = () => {
  const { id } = useParams();
  const [servings, setServings] = useState(recipe.servings);

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
          <button className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 mb-6">Order Ingredients</button>
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