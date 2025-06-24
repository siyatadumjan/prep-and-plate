import React, { useState } from "react";
import { Link } from "react-router-dom";

const allRecipes = [
  {
    id: 1,
    title: "Lemon Herb Roasted Chicken",
    desc: "Perfectly roasted chicken with a bright lemon and herb flavor profile. Zero waste.",
    img: "https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=400",
    time: "1 hr 30 min",
    servings: 4,
    tag: "",
  },
  {
    id: 2,
    title: "Vegetarian Pasta Primavera",
    desc: "Fresh spring vegetables tossed with pasta in a light sauce. Perfectly portioned.",
    img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400",
    time: "25 min",
    servings: 2,
    tag: "Vegetarian",
  },
  {
    id: 3,
    title: "Steamed Chicken Momo",
    desc: "Delicious steamed dumplings filled with seasoned minced chicken.",
    img: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=400",
    time: "40 min",
    servings: 8,
    tag: "Popular",
  },
  {
    id: 4,
    title: "Mushroom Risotto",
    desc: "Creamy risotto with perfectly measured arborio rice and fresh mushrooms.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    time: "45 min",
    servings: 3,
    tag: "Vegetarian",
  },
  {
    id: 5,
    title: "Beef Stir Fry",
    desc: "Quick and easy beef stir fry with precise portions of vegetables and sauce.",
    img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    time: "30 min",
    servings: 4,
    tag: "",
  },
  {
    id: 6,
    title: "Mediterranean Chickpea Salad",
    desc: "Refreshing salad with chickpeas, cucumber, tomatoes, and a simple dressing.",
    img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    time: "15 min",
    servings: 2,
    tag: "Vegan",
  },
];

const Recipes = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const recipesPerPage = 6;

  const filtered = allRecipes.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page-1)*recipesPerPage, page*recipesPerPage);
  const totalPages = Math.ceil(filtered.length / recipesPerPage);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button className="border px-3 py-1 rounded text-sm text-gray-600 hover:bg-green-50">Filter</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {paginated.map(recipe => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <img src={recipe.img} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg">{recipe.title}</h3>
                {recipe.tag && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{recipe.tag}</span>}
              </div>
              <p className="text-gray-500 text-sm mb-2">{recipe.desc}</p>
              <div className="flex items-center text-xs text-gray-400 gap-4">
                <span>⏱ {recipe.time}</span>
                <span>🍽 {recipe.servings} servings</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i+1)}
            className={`px-3 py-1 rounded ${page === i+1 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {i+1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Recipes; 