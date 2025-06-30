import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import selrotiImg from "../assets/sel-roti.jpeg";
import beefStirFryImg from "../assets/beef-stir-fry.jpg";
import palakPaneerImg from "../assets/palak paneer.webp";
import classicMargheritaPizzaImg from "../assets/classic margherita pizza.jpeg";
import paniPuriImg from "../assets/pani-puri.jpg";
import beefTacosImg from "../assets/beef-tacos.webp";
import chocolateLavaCakeImg from "../assets/chocolate-lava-cake.webp";
import samosaImg from "../assets/samosa.avif";
import { FaShoppingCart } from "react-icons/fa";

const recipeData = {
  1: {
    id: 1,
    title: "Lemon Herb Roasted Chicken",
    desc: "This perfectly roasted chicken has a bright lemon and herb flavor profile. The recipe uses precise measurements to ensure zero waste while creating a delicious meal.",
    img: "https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=800",
    servings: 2,
    pricePerServing: 850,
    time: "1 hr 30 min",
    difficulty: "Medium",
    ingredients: [
      { name: "Whole chicken", qty: 1.5, unit: "kg", price: 500 },
      { name: "Lemons", qty: 2, unit: "pieces", price: 40 },
      { name: "Fresh rosemary", qty: 3, unit: "sprigs", price: 30 },
      { name: "Fresh thyme", qty: 4, unit: "sprigs", price: 30 },
      { name: "Garlic cloves", qty: 6, unit: "pieces", price: 20 },
      { name: "Olive oil", qty: 2, unit: "tbsp", price: 25 },
      { name: "Salt", qty: 1, unit: "tsp", price: 5 },
      { name: "Black pepper", qty: 0.5, unit: "tsp", price: 5 },
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
    difficulty: "Easy",
    ingredients: [
      { name: "Penne pasta", qty: 200, unit: "g", price: 100 },
      { name: "Broccoli florets", qty: 1, unit: "cup", price: 50 },
      { name: "Red bell pepper, sliced", qty: 1, unit: "piece", price: 25 },
      { name: "Zucchini, sliced", qty: 1, unit: "piece", price: 25 },
      { name: "Carrot, julienned", qty: 1, unit: "piece", price: 25 },
      { name: "Cherry tomatoes, halved", qty: 8, unit: "pieces", price: 50 },
      { name: "Olive oil", qty: 2, unit: "tbsp", price: 10 },
      { name: "Garlic cloves, minced", qty: 2, unit: "", price: 10 },
      { name: "Salt", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Black pepper", qty: 0.25, unit: "tsp", price: 5 },
      { name: "Parmesan cheese, grated (optional)", qty: 2, unit: "tbsp", price: 20 },
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
    difficulty: "Medium",
    ingredients: [
      { name: "All-purpose flour", qty: 1, unit: "cup", price: 50 },
      { name: "Minced chicken", qty: 200, unit: "g", price: 200 },
      { name: "Onion, finely chopped", qty: 0.5, unit: "cup", price: 25 },
      { name: "Green onion, chopped", qty: 0.25, unit: "cup", price: 15 },
      { name: "Garlic, minced", qty: 2, unit: "cloves", price: 10 },
      { name: "Ginger, minced", qty: 1, unit: "tsp", price: 5 },
      { name: "Soy sauce", qty: 1, unit: "tbsp", price: 10 },
      { name: "Salt", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Black pepper", qty: 0.25, unit: "tsp", price: 5 },
      { name: "Water (for dough)", qty: 0.5, unit: "cup", price: 25 },
      { name: "Oil", qty: 1, unit: "tbsp", price: 10 },
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
    difficulty: "Medium",
    ingredients: [
      { name: "Rice flour", qty: 2, unit: "cups", price: 100 },
      { name: "Sugar", qty: 0.75, unit: "cup", price: 25 },
      { name: "Milk", qty: 1, unit: "cup", price: 50 },
      { name: "Ripe banana, mashed", qty: 1, unit: "", price: 50 },
      { name: "Ghee or butter (melted)", qty: 2, unit: "tbsp", price: 20 },
      { name: "Cardamom powder", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Oil (for frying)", qty: 2, unit: "cups", price: 100 },
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
    difficulty: "Medium",
    ingredients: [
      { name: "Beef sirloin, thinly sliced", qty: 300, unit: "g", price: 200 },
      { name: "Broccoli florets", qty: 1, unit: "cup", price: 50 },
      { name: "Carrot, julienned", qty: 0.5, unit: "cup", price: 25 },
      { name: "Red bell pepper, sliced", qty: 1, unit: "piece", price: 25 },
      { name: "Snow peas", qty: 0.5, unit: "cup", price: 50 },
      { name: "Soy sauce", qty: 2, unit: "tbsp", price: 10 },
      { name: "Garlic cloves, minced", qty: 2, unit: "", price: 10 },
      { name: "Ginger, minced", qty: 1, unit: "tsp", price: 5 },
      { name: "Vegetable oil", qty: 1, unit: "tbsp", price: 10 },
      { name: "Sesame seeds (optional)", qty: 1, unit: "tsp", price: 5 },
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
    difficulty: "Medium",
    ingredients: [
      { name: "Paneer (cubed)", qty: 200, unit: "g", price: 100 },
      { name: "Fresh spinach (palak)", qty: 250, unit: "g", price: 50 },
      { name: "Onion (chopped)", qty: 1, unit: "medium", price: 25 },
      { name: "Tomato (chopped)", qty: 1, unit: "medium", price: 25 },
      { name: "Garlic cloves (minced)", qty: 3, unit: "", price: 15 },
      { name: "Ginger (minced)", qty: 1, unit: "tsp", price: 5 },
      { name: "Green chili (optional)", qty: 1, unit: "", price: 10 },
      { name: "Cumin seeds", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Garam masala", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Turmeric powder", qty: 0.25, unit: "tsp", price: 5 },
      { name: "Red chili powder", qty: 0.25, unit: "tsp", price: 5 },
      { name: "Cream (optional)", qty: 2, unit: "tbsp", price: 20 },
      { name: "Salt", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Oil or ghee", qty: 1, unit: "tbsp", price: 10 },
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
    difficulty: "Medium",
    ingredients: [
      { name: "Sushi-grade tuna (diced)", qty: 100, unit: "g", price: 100 },
      { name: "Sriracha sauce", qty: 1, unit: "tbsp", price: 10 },
      { name: "Mayonnaise", qty: 2, unit: "tbsp", price: 20 },
      { name: "Cooked sushi rice", qty: 2, unit: "cups", price: 100 },
      { name: "Nori sheets", qty: 2, unit: "", price: 20 },
      { name: "Cucumber (julienned)", qty: 0.25, unit: "cup", price: 25 },
      { name: "Green onion (chopped)", qty: 1, unit: "tbsp", price: 5 },
      { name: "Soy sauce (for serving)", qty: 2, unit: "tbsp", price: 10 },
      { name: "Wasabi & pickled ginger (optional)", qty: 1, unit: "serving", price: 5 },
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
    difficulty: "Easy",
    ingredients: [
      { name: "Pizza dough", qty: 1, unit: "base", price: 50 },
      { name: "Tomato sauce", qty: 0.5, unit: "cup", price: 25 },
      { name: "Fresh mozzarella cheese (sliced)", qty: 150, unit: "g", price: 100 },
      { name: "Fresh basil leaves", qty: 8, unit: "", price: 20 },
      { name: "Olive oil", qty: 1, unit: "tbsp", price: 10 },
      { name: "Salt", qty: 0.25, unit: "tsp", price: 5 },
      { name: "Black pepper", qty: 0.25, unit: "tsp", price: 5 },
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
  9: {
    id: 9,
    title: "Beef Tacos",
    desc: "Classic Mexican-style beef tacos featuring seasoned ground beef, fresh toppings, and soft or crispy taco shells. Perfect for a quick and delicious meal!",
    img: beefTacosImg,
    servings: 4,
    pricePerServing: 350,
    time: "25 min",
    difficulty: "Medium",
    ingredients: [
      { name: "Ground beef", qty: 400, unit: "g", price: 200 },
      { name: "Taco shells (soft or crispy)", qty: 8, unit: "pieces", price: 80 },
      { name: "Onion (chopped)", qty: 1, unit: "small", price: 25 },
      { name: "Garlic cloves (minced)", qty: 2, unit: "", price: 10 },
      { name: "Tomato (chopped)", qty: 1, unit: "medium", price: 50 },
      { name: "Taco seasoning", qty: 2, unit: "tbsp", price: 10 },
      { name: "Lettuce (shredded)", qty: 1, unit: "cup", price: 25 },
      { name: "Cheddar cheese (grated)", qty: 0.5, unit: "cup", price: 50 },
      { name: "Sour cream", qty: 0.25, unit: "cup", price: 20 },
      { name: "Salt", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Black pepper", qty: 0.25, unit: "tsp", price: 5 },
      { name: "Oil", qty: 1, unit: "tbsp", price: 10 },
    ],
    nutrition: { calories: 290, protein: 16, carbs: 22, fat: 15 },
    instructions: [
      "Heat oil in a skillet over medium heat. Add onion and garlic, sauté until soft.",
      "Add ground beef and cook until browned. Drain excess fat if needed.",
      "Stir in tomato, taco seasoning, salt, and pepper. Cook for 5 minutes until well combined.",
      "Warm taco shells as per package instructions.",
      "Fill each shell with beef mixture, then top with lettuce, cheese, and sour cream.",
      "Serve immediately and enjoy!",
    ],
  },
  10: {
    id: 10,
    title: "Chocolate Lava Cakes",
    desc: "Rich and decadent individual chocolate cakes with a gooey, molten chocolate center. Perfect for special occasions or whenever you crave a chocolate treat!",
    img: chocolateLavaCakeImg,
    servings: 2,
    pricePerServing: 250,
    time: "22 min",
    difficulty: "Medium",
    ingredients: [
      { name: "Dark chocolate (chopped)", qty: 100, unit: "g", price: 50 },
      { name: "Unsalted butter", qty: 50, unit: "g", price: 20 },
      { name: "Eggs", qty: 2, unit: "", price: 50 },
      { name: "Powdered sugar", qty: 0.5, unit: "cup", price: 25 },
      { name: "All-purpose flour", qty: 0.25, unit: "cup", price: 20 },
      { name: "Vanilla extract", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Salt", qty: 1, unit: "pinch", price: 5 },
      { name: "Butter (for greasing)", qty: 1, unit: "tbsp", price: 10 },
      { name: "Cocoa powder (for dusting)", qty: 1, unit: "tbsp", price: 5 },
    ],
    nutrition: { calories: 370, protein: 6, carbs: 38, fat: 22 },
    instructions: [
      "Preheat oven to 220°C (425°F). Grease two ramekins with butter and dust with cocoa powder.",
      "Melt chocolate and butter together until smooth. Let cool slightly.",
      "In a bowl, whisk eggs and powdered sugar until thick and pale.",
      "Fold in the melted chocolate mixture, then add flour, vanilla, and salt. Mix until just combined.",
      "Divide batter between ramekins. Bake for 10-12 minutes until the edges are set but the center is still soft.",
      "Let cool for 1 minute, then invert onto plates. Serve immediately, optionally with ice cream or berries.",
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
    difficulty: "Easy",
    ingredients: [
      { name: "Puris (crispy shells)", qty: 24, unit: "pieces", price: 120 },
      { name: "Boiled potatoes (mashed)", qty: 2, unit: "medium", price: 50 },
      { name: "Boiled chickpeas", qty: 0.5, unit: "cup", price: 25 },
      { name: "Onion (finely chopped)", qty: 1, unit: "small", price: 25 },
      { name: "Fresh coriander (chopped)", qty: 2, unit: "tbsp", price: 10 },
      { name: "Tamarind chutney", qty: 0.25, unit: "cup", price: 20 },
      { name: "Green chutney", qty: 0.25, unit: "cup", price: 20 },
      { name: "Chaat masala", qty: 1, unit: "tsp", price: 5 },
      { name: "Salt", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Spicy flavored water (pani)", qty: 2, unit: "cups", price: 50 },
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
  12: {
    id: 12,
    title: "Samosa",
    desc: "Samosa is a classic Indian snack featuring a crispy, golden pastry filled with a spicy mixture of potatoes, peas, and aromatic spices. Perfect as a tea-time treat or party appetizer!",
    img: samosaImg,
    servings: 4,
    pricePerServing: 80,
    time: "1 hr",
    difficulty: "Medium",
    ingredients: [
      { name: "All-purpose flour", qty: 1.5, unit: "cups", price: 50 },
      { name: "Oil (for dough)", qty: 2, unit: "tbsp", price: 10 },
      { name: "Salt", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Water (as needed)", qty: 0.5, unit: "cup", price: 25 },
      { name: "Potatoes (boiled, mashed)", qty: 3, unit: "medium", price: 100 },
      { name: "Green peas (boiled)", qty: 0.5, unit: "cup", price: 25 },
      { name: "Green chili (chopped)", qty: 1, unit: "", price: 10 },
      { name: "Ginger (grated)", qty: 1, unit: "tsp", price: 5 },
      { name: "Cumin seeds", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Coriander powder", qty: 1, unit: "tsp", price: 5 },
      { name: "Garam masala", qty: 0.5, unit: "tsp", price: 5 },
      { name: "Red chili powder", qty: 0.25, unit: "tsp", price: 5 },
      { name: "Lemon juice", qty: 1, unit: "tsp", price: 5 },
      { name: "Fresh coriander (chopped)", qty: 2, unit: "tbsp", price: 10 },
      { name: "Oil (for frying)", qty: 2, unit: "cups", price: 100 },
    ],
    nutrition: { calories: 150, protein: 3, carbs: 22, fat: 6 },
    instructions: [
      "Mix flour, salt, and oil. Add water gradually to form a stiff dough. Cover and rest for 20 minutes.",
      "Heat 1 tbsp oil in a pan. Add cumin seeds, then ginger and green chili. Sauté briefly.",
      "Add mashed potatoes, peas, coriander powder, garam masala, red chili powder, salt, and lemon juice. Mix well. Stir in fresh coriander and let filling cool.",
      "Divide dough into balls, roll each into an oval, cut in half. Form a cone, fill with potato mixture, and seal edges with water.",
      "Heat oil for deep frying. Fry samosas on medium heat until golden and crisp.",
      "Serve hot with chutney or sauce.",
    ],
  },
};

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const recipe = recipeData[id] || recipeData[1]; // Fallback to recipe 1 if ID not found
  const [servings, setServings] = useState(recipe.servings);
  const [checked, setChecked] = useState(Array(recipe.ingredients.length).fill(false));
  const [orderWarning, setOrderWarning] = useState("");
  const [addedMsg, setAddedMsg] = useState("");

  const user = localStorage.getItem('prep_plate_user');

  const handleOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const itemToAdd = {
      id: recipe.id,
      title: recipe.title,
      img: recipe.img,
      servings: servings,
      price: Number(totalPrice),
      pricePerServing: (Number(totalPrice) / servings).toFixed(2)
    };
    addToCart(itemToAdd);
    setAddedMsg("Added to cart!");
    setTimeout(() => setAddedMsg(""), 2000);
  };

  // Calculate adjusted price for each ingredient based on servings
  const adjustedIngredients = recipe.ingredients.map(ing => ({
    ...ing,
    qty: (ing.qty * servings) / recipe.servings,
    adjustedPrice: ((ing.price || 0) * servings / recipe.servings)
  }));

  const totalPrice = adjustedIngredients.reduce((sum, ing) => sum + ing.adjustedPrice, 0).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-2 overflow-hidden relative max-h-screen overflow-y-auto">
        {/* Close button */}
        <button onClick={() => window.history.back()} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
        {/* Image at the top */}
        <img src={recipe.img} alt={recipe.title} className="w-full h-80 object-cover rounded-t-2xl" />
        {/* Two-column layout below image */}
        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* Left column: details and ingredients */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold mb-2">{recipe.title}</h1>
            <p className="text-gray-600 mb-4 text-base">{recipe.desc}</p>
            <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
              <span className="flex items-center gap-1"><span className="material-icons text-base align-middle">schedule</span> {recipe.time}</span>
              <span className="flex items-center gap-1"><span className="material-icons text-base align-middle">star</span> {recipe.difficulty}</span>
            </div>
            {/* Tags */}
            <div className="flex gap-2 mb-6">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Thai</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Curry</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Vegetarian</span>
            </div>
            {/* Ingredients */}
            <h2 className="font-semibold mb-2 text-lg">Ingredients</h2>
            <div className="divide-y divide-gray-200">
              {adjustedIngredients.map((ing, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex-1 font-medium text-gray-800">{ing.name}</div>
                  <div className="w-32 text-gray-600 text-right">
                    <div>{ing.qty} {ing.unit}</div>
                    <div className="text-xs text-gray-400 mt-1">NPR {ing.adjustedPrice.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right column: order card */}
          <div className="bg-gray-50 rounded-xl shadow p-6 w-full md:w-80 flex flex-col gap-4 h-fit">
            <h3 className="font-semibold mb-2 text-lg">Customize Your Order</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Number of Servings</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setServings(s => Math.max(1, s-1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span className="px-3 font-semibold">{servings}</span>
                <button onClick={() => setServings(s => s+1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Price:</span>
              <span className="text-green-600 text-2xl font-bold">NPR {totalPrice}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">All ingredients pre-measured and ready to cook</div>
            <button onClick={handleOrder} className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 w-full">
              <FaShoppingCart className="inline-block mr-2 mb-1" /> Add to Cart
            </button>
            {addedMsg && <div className="text-green-600 font-semibold mt-2 text-center">{addedMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails; 