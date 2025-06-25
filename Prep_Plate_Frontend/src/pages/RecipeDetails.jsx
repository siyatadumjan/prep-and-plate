import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import selrotiImg from "../assets/sel-roti.jpeg";
import beefStirFryImg from "../assets/beef-stir-fry.jpg";
import palakPaneerImg from "../assets/palak paneer.webp";
import classicMargheritaPizzaImg from "../assets/classic margherita pizza.jpeg";
import paniPuriImg from "../assets/pani-puri.jpg";

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
    img: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=800",
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
  4: {
    id: 4,
    title: "Selroti",
    desc: "Traditional Nepali rice flour ring bread, crispy on the outside and soft inside. Often enjoyed during festivals and special occasions.",
    img: selrotiImg,
    servings: 4,
    pricePerServing: 300,
    time: "1 hr",
    ingredients: [
      { name: "Rice flour", qty: 2, unit: "cups" },
      { name: "Sugar", qty: 0.75, unit: "cup" },
      { name: "Milk", qty: 1, unit: "cup" },
      { name: "Ripe banana, mashed", qty: 1, unit: "" },
      { name: "Ghee or butter (melted)", qty: 2, unit: "tbsp" },
      { name: "Cardamom powder", qty: 0.5, unit: "tsp" },
      { name: "Oil (for frying)", qty: 2, unit: "cups" },
    ],
    nutrition: { calories: 220, protein: 3, carbs: 45, fat: 3 },
    instructions: [
      "In a large bowl, mix rice flour, sugar, and cardamom powder.",
      "Add mashed banana, melted ghee, and milk. Mix to form a smooth, thick batter.",
      "Cover and let the batter rest for at least 2 hours (or overnight for best results).",
      "Heat oil in a deep pan over medium heat.",
      "Pour the batter in a ring shape into the hot oil (traditionally by hand or using a piping bag).",
      "Fry until golden brown and crispy on both sides. Remove and drain on paper towels.",
      "Serve warm as a snack or with tea.",
    ],
  },
  5: {
    id: 5,
    title: "Beef Stir Fry",
    desc: "Quick and easy beef stir fry with precise portions of vegetables and sauce.",
    img: beefStirFryImg,
    servings: 4,
    pricePerServing: 700,
    time: "30 min",
    ingredients: [
      { name: "Beef sirloin, thinly sliced", qty: 300, unit: "g" },
      { name: "Broccoli florets", qty: 1, unit: "cup" },
      { name: "Carrot, julienned", qty: 0.5, unit: "cup" },
      { name: "Red bell pepper, sliced", qty: 0.5, unit: "cup" },
      { name: "Snow peas", qty: 0.5, unit: "cup" },
      { name: "Soy sauce", qty: 2, unit: "tbsp" },
      { name: "Garlic cloves, minced", qty: 2, unit: "" },
      { name: "Ginger, minced", qty: 1, unit: "tsp" },
      { name: "Vegetable oil", qty: 1, unit: "tbsp" },
      { name: "Sesame seeds (optional)", qty: 1, unit: "tsp" },
    ],
    nutrition: { calories: 320, protein: 28, carbs: 12, fat: 18 },
    instructions: [
      "Heat oil in a large skillet or wok over high heat.",
      "Add beef and stir-fry until browned. Remove and set aside.",
      "Add garlic and ginger to the pan, then add vegetables and stir-fry for 3-4 minutes.",
      "Return beef to the pan, add soy sauce, and toss everything together until heated through.",
      "Sprinkle with sesame seeds and serve hot.",
    ],
  },
  6: {
    id: 6,
    title: "Palak Paneer",
    desc: "A classic North Indian dish featuring paneer cubes simmered in a creamy, spiced spinach gravy. Delicious with naan or rice.",
    img: palakPaneerImg,
    servings: 2,
    pricePerServing: 500,
    time: "40 min",
    ingredients: [
      { name: "Paneer (cubed)", qty: 200, unit: "g" },
      { name: "Fresh spinach (palak)", qty: 250, unit: "g" },
      { name: "Onion (chopped)", qty: 1, unit: "medium" },
      { name: "Tomato (chopped)", qty: 1, unit: "medium" },
      { name: "Garlic cloves (minced)", qty: 3, unit: "" },
      { name: "Ginger (minced)", qty: 1, unit: "tsp" },
      { name: "Green chili (optional)", qty: 1, unit: "" },
      { name: "Cumin seeds", qty: 0.5, unit: "tsp" },
      { name: "Garam masala", qty: 0.5, unit: "tsp" },
      { name: "Turmeric powder", qty: 0.25, unit: "tsp" },
      { name: "Red chili powder", qty: 0.25, unit: "tsp" },
      { name: "Cream (optional)", qty: 2, unit: "tbsp" },
      { name: "Salt", qty: 0.5, unit: "tsp" },
      { name: "Oil or ghee", qty: 1, unit: "tbsp" },
    ],
    nutrition: { calories: 320, protein: 14, carbs: 12, fat: 24 },
    instructions: [
      "Blanch spinach in boiling water for 2 minutes, then transfer to ice water. Drain and blend to a smooth puree.",
      "Heat oil or ghee in a pan. Add cumin seeds, then sauté onions until golden.",
      "Add ginger, garlic, and green chili. Sauté for a minute.",
      "Add tomatoes, turmeric, red chili powder, and salt. Cook until tomatoes are soft.",
      "Add spinach puree and cook for 5 minutes. Stir in garam masala.",
      "Add paneer cubes and simmer for 5 minutes. Add cream if using.",
      "Serve hot with naan or rice.",
    ],
  },
  7: {
    id: 7,
    title: "Spicy Tuna Roll",
    desc: "A popular sushi roll filled with spicy tuna, creamy mayo, and crisp cucumber, wrapped in seasoned rice and nori.",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80",
    servings: 2,
    pricePerServing: 600,
    time: "50 min",
    ingredients: [
      { name: "Sushi-grade tuna (diced)", qty: 100, unit: "g" },
      { name: "Sriracha sauce", qty: 1, unit: "tbsp" },
      { name: "Mayonnaise", qty: 2, unit: "tbsp" },
      { name: "Cooked sushi rice", qty: 2, unit: "cups" },
      { name: "Nori sheets", qty: 2, unit: "" },
      { name: "Cucumber (julienned)", qty: 0.25, unit: "cup" },
      { name: "Green onion (chopped)", qty: 1, unit: "tbsp" },
      { name: "Soy sauce (for serving)", qty: 2, unit: "tbsp" },
      { name: "Wasabi & pickled ginger (optional)", qty: 1, unit: "serving" },
    ],
    nutrition: { calories: 350, protein: 18, carbs: 48, fat: 8 },
    instructions: [
      "Mix diced tuna with sriracha and mayonnaise to make the spicy tuna filling.",
      "Place a nori sheet on a bamboo sushi mat, spread a thin layer of sushi rice over it, and flip it over.",
      "Arrange spicy tuna, cucumber, and green onion along the bottom edge of the nori.",
      "Roll tightly using the mat, then slice into 6-8 pieces.",
      "Serve with soy sauce, wasabi, and pickled ginger.",
    ],
  },
  8: {
    id: 8,
    title: "Classic Margherita Pizza",
    desc: "Simple and delicious pizza topped with fresh mozzarella, ripe tomatoes, basil leaves, and a drizzle of olive oil. A true Italian classic!",
    img: classicMargheritaPizzaImg,
    servings: 3,
    pricePerServing: 400,
    time: "30 min",
    ingredients: [
      { name: "Pizza dough", qty: 1, unit: "base" },
      { name: "Tomato sauce", qty: 0.5, unit: "cup" },
      { name: "Fresh mozzarella cheese (sliced)", qty: 150, unit: "g" },
      { name: "Fresh basil leaves", qty: 8, unit: "" },
      { name: "Olive oil", qty: 1, unit: "tbsp" },
      { name: "Salt", qty: 0.25, unit: "tsp" },
      { name: "Black pepper", qty: 0.25, unit: "tsp" },
    ],
    nutrition: { calories: 270, protein: 11, carbs: 34, fat: 10 },
    instructions: [
      "Preheat your oven to 475°F (245°C).",
      "Roll out the pizza dough on a floured surface to your desired thickness.",
      "Spread tomato sauce evenly over the base, leaving a small border for the crust.",
      "Arrange mozzarella slices on top, then add basil leaves.",
      "Drizzle with olive oil and season with salt and pepper.",
      "Bake for 10-12 minutes until the crust is golden and cheese is bubbly.",
      "Slice and serve hot.",
    ],
  },
  11: {
    id: 11,
    title: "Panipuri",
    desc: "Panipuri (also known as Golgappa or Puchka) is a beloved Indian street snack featuring crispy hollow puris filled with spicy, tangy flavored water, potatoes, chickpeas, and chutneys. It's a burst of flavors and textures in every bite!",
    img: paniPuriImg,
    servings: 4,
    pricePerServing: 120,
    time: "30 min",
    ingredients: [
      { name: "Puris (crispy shells)", qty: 24, unit: "pieces" },
      { name: "Boiled potatoes (mashed)", qty: 2, unit: "medium" },
      { name: "Boiled chickpeas", qty: 0.5, unit: "cup" },
      { name: "Onion (finely chopped)", qty: 1, unit: "small" },
      { name: "Fresh coriander (chopped)", qty: 2, unit: "tbsp" },
      { name: "Tamarind chutney", qty: 0.25, unit: "cup" },
      { name: "Green chutney", qty: 0.25, unit: "cup" },
      { name: "Chaat masala", qty: 1, unit: "tsp" },
      { name: "Salt", qty: 0.5, unit: "tsp" },
      { name: "Spicy flavored water (pani)", qty: 2, unit: "cups" },
    ],
    nutrition: { calories: 180, protein: 4, carbs: 36, fat: 2 },
    instructions: [
      "Mix mashed potatoes, chickpeas, onion, coriander, chaat masala, and salt to make the filling.",
      "Gently crack the top of each puri to make a hole.",
      "Fill each puri with the potato-chickpea mixture.",
      "Add a little tamarind chutney and green chutney to each puri.",
      "Dip the filled puri into spicy flavored water (pani) or pour some pani inside.",
      "Eat immediately for the best crunch and flavor!",
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