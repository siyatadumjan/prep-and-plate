import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const featuredRecipes = [
  {
    id: 1,
    title: "Lemon Herb Roasted Chicken",
    desc: "Perfectly roasted chicken with a bright lemon and herb flavor profile. Zero waste.",
    img: "https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=400",
    time: "1 hr 30 min",
    servings: 4,
  },
  {
    id: 2,
    title: "Vegetarian Pasta Primavera",
    desc: "Fresh spring vegetables tossed with pasta in a light sauce. Perfectly portioned.",
    img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400",
    time: "25 min",
    servings: 2,
  },
  {
    id: 3,
    title: "Steamed Chicken Momo",
    desc: "Delicious steamed dumplings filled with seasoned minced chicken.",
    img: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=400",
    time: "40 min",
    servings: 8,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center mb-8">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" alt="Hero" className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <div className="px-8 py-8 max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Prep & Plate</h1>
            <p className="max-w-xl text-white md:text-lg mb-0 mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Cook with confidence using precisely measured ingredients. Reduce waste, save money, and enjoy delicious home-cooked meals.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-2">How Prep & Plate Works</h2>
        <p className="text-center text-gray-500 mb-8">Cook with confidence using our perfectly portioned ingredients</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">🍽️</div>
            <h3 className="font-semibold mb-1">Choose Your Recipes</h3>
            <p className="text-gray-500 text-sm">Browse our collection of recipes and select meals that you'd like to cook at home.</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold mb-1">Precise Ingredients</h3>
            <p className="text-gray-500 text-sm">Receive exactly what you need - no more wasted food or measuring guesswork.</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">🚚</div>
            <h3 className="font-semibold mb-1">Home Delivery</h3>
            <p className="text-gray-500 text-sm">Get fresh ingredients delivered to your door, ready to cook with easy instructions.</p>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Featured Recipes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRecipes.map(recipe => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden block">
              <img src={recipe.img} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{recipe.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{recipe.desc}</p>
                <div className="flex items-center text-xs text-gray-400 gap-4">
                  <span>⏱ {recipe.time}</span>
                  <span>🍽 {recipe.servings} servings</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 py-10 px-4 text-center text-white mt-8">
        <h2 className="text-2xl font-semibold mb-2">Ready to start cooking?</h2>
        <p className="mb-4">Sign up today and get your first delivery free.</p>
        <Link to="/signup" className="bg-white text-green-600 px-6 py-2 rounded font-semibold hover:bg-green-50">Get Started</Link>
      </section>
      {/* Service Hour */}
      <div className="text-center text-gray-500 text-sm mt-12 mb-4">Service Hour 08:00 AM to 9:00 PM</div>
    </div>
  );
};

export default Home; 