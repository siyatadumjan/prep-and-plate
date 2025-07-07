import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import selrotiImg from "../assets/sel-roti.jpeg";
import beefStirFryImg from "../assets/beef-stir-fry.jpg";
import palakPaneerImg from "../assets/palak paneer.webp";
import classicMargheritaPizzaImg from "../assets/classic margherita pizza.jpeg";
import paniPuriImg from "../assets/pani-puri.jpg";
import beefTacosImg from "../assets/beef-tacos.webp";
import chocolateLavaCakeImg from "../assets/chocolate-lava-cake.webp";
import samosaImg from "../assets/samosa.avif";

const cuisineOptions = [
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Non Vegetarian', value: 'Non Vegetarian' },
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Dessert', value: 'Dessert' },
  { label: 'Traditional', value: 'Traditional' },
  { label: 'Popular', value: 'Popular' },
];

const Recipes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialPage = parseInt(params.get("page")) || 1;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(initialPage);
  const recipesPerPage = 6;
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // Fetch all recipes on load
  useEffect(() => {
    fetchRecipes("");
    // eslint-disable-next-line
  }, []);

  // Fetch recipes from backend
  const fetchRecipes = async (query) => {
    let url = "http://localhost:5000/api/recipes";
    if (query) {
      url = `http://localhost:5000/api/recipes/search?query=${encodeURIComponent(query)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data);
  };

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchRecipes(value);
  };

  // Filter by tag (client-side)
  const filtered = recipes.filter(r =>
    (selectedTags.length === 0 || (r.tag && selectedTags.includes(r.tag)))
  );
  const paginated = filtered.slice((page-1)*recipesPerPage, page*recipesPerPage);
  const totalPages = Math.ceil(filtered.length / recipesPerPage);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <div className="flex gap-2 items-center">
          <button
            className="border rounded px-3 py-1 text-sm font-semibold bg-gray-50 hover:bg-green-100 transition"
            onClick={() => setShowFilters(f => !f)}
          >
            &#9776; Filters
          </button>
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={handleSearch}
            className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>
      {/* Filter Sidebar */}
      {showFilters && (
        <div className="mb-8 max-w-md w-full bg-white rounded-lg shadow p-6 border border-green-100">
          <div className="font-semibold mb-4 text-lg">Filters</div>
          <div className="mb-4">
            <div className="font-medium mb-2 text-gray-700">Cuisine/Type</div>
            <div className="grid grid-cols-2 gap-2">
              {cuisineOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(opt.value)}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedTags(tags => [...tags, opt.value]);
                      } else {
                        setSelectedTags(tags => tags.filter(t => t !== opt.value));
                      }
                    }}
                    className="accent-green-600"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition"
            onClick={() => setShowFilters(false)}
          >
            Done
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 min-h-[600px]">
        {paginated.map(recipe => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
            <img src={recipe.img} alt={recipe.title} className="w-full h-56 sm:h-64 md:h-72 object-cover" />
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg">{recipe.title}</h3>
                {recipe.tag && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{recipe.tag}</span>}
              </div>
              <p className="text-gray-500 text-sm mb-2 flex-1">{recipe.desc}</p>
              <div className="flex items-center text-xs text-gray-400 gap-4 mt-auto">
                <span>⏱ {recipe.time}</span>
                <span>🍽 {recipe.servings} servings</span>
              </div>
            </div>
          </Link>
        ))}
        {paginated.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No recipes found.</div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
         <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i+1)}
            className={`px-4 py-2 rounded-md font-semibold ${page === i+1 ? 'bg-green-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {i+1}
          </button>
        ))}
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Recipes; 