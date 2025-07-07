import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchFeaturedRecipes } from "../server/API";

const Home = () => {
  const navigate = useNavigate();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFeatured = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchFeaturedRecipes();
        setFeaturedRecipes(data);
      } catch (err) {
        setError("Failed to load featured recipes.");
      } finally {
        setLoading(false);
      }
    };
    getFeatured();
  }, []);

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <section className="w-full flex items-center justify-center bg-green-50 py-16 mb-8 border-b">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 max-w-4xl">
            Cook Perfect Meals with <span className="text-green-600">Zero Food Waste</span>
          </h1>
          <p className="max-w-4xl text-gray-700 md:text-lg mb-8 text-center">
            Get pre-measured ingredients delivered to your door. Just tell us how many people you're cooking for, and we'll calculate the exact quantities you need.
          </p>
          <div className="flex justify-center">
            <Link to="/recipes" className="bg-green-600 text-white px-8 py-3 rounded font-semibold shadow hover:bg-green-700 transition">Explore Recipes</Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-green-100 py-12 flex flex-col items-center">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full shadow p-4 mb-4">
              <span className="text-green-600 text-3xl">🍃</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Zero Waste</h3>
            <p className="text-gray-600">Pre-measured ingredients mean no leftovers, no waste, just perfect portions.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full shadow p-4 mb-4">
              <span className="text-green-600 text-3xl">⏰</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Save Time</h3>
            <p className="text-gray-600">Skip the shopping and measuring. Everything arrives ready to cook.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full shadow p-4 mb-4">
              <span className="text-green-600 text-3xl">👥</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Perfect Portions</h3>
            <p className="text-gray-600">Automatically scaled for your exact number of guests or family members.</p>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-12 px-4 max-w-6xl mx-auto bg-green-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Featured Recipes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center">Loading...</div>
          ) : error ? (
            <div className="col-span-3 text-center text-red-600">{error}</div>
          ) : featuredRecipes.length === 0 ? (
            <div className="col-span-3 text-center">No featured recipes found.</div>
          ) : (
            featuredRecipes.map(recipe => (
              <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden block">
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
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 