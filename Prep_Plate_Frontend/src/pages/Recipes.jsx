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
    title: "Selroti",
    desc: "Traditional Nepali rice flour ring bread, crispy on the outside and soft inside. Often enjoyed during festivals and special occasions.",
    img: selrotiImg,
    time: "1 hr",
    servings: 4,
    tag: "Traditional",
  },
  {
    id: 5,
    title: "Beef Stir Fry",
    desc: "Quick and easy beef stir fry with precise portions of vegetables and sauce.",
    img: beefStirFryImg,
    time: "30 min",
    servings: 4,
    tag: "",
  },
  {
    id: 6,
    title: "Palak Paneer",
    desc: "Classic Indian dish made with paneer cubes simmered in a creamy spinach gravy.",
    img: palakPaneerImg,
    time: "15 min",
    servings: 2,
    tag: "Vegan",
  },
  {
    id: 7,
    title: "Spicy Tuna Rolls",
    desc: "Classic sushi rolls with spicy tuna and avocado, perfectly portioned.",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80",
    time: "50 min",
    servings: 2,
    tag: "Popular",
  },
  {
    id: 8,
    title: "Classic Margherita Pizza",
    desc: "Simple and delicious pizza with fresh mozzarella, tomatoes, and basil.",
    img: classicMargheritaPizzaImg,
    time: "30 min",
    servings: 3,
    tag: "Vegetarian",
  },
  {
    id: 9,
    title: "Beef Tacos",
    desc: "Flavorful ground beef tacos with all the fixings.",
    img: beefTacosImg,
    time: "25 min",
    servings: 4,
    tag: "",
  },
   {
    id: 10,
    title: "Chocolate Lava Cakes",
    desc: "Decadent individual chocolate cakes with a gooey, molten chocolate center.",
    img: chocolateLavaCakeImg,
    time: "22 min",
    servings: 2,
    tag: "Dessert",
  },
  {
    id: 11,
    title: "Panipuri",
    desc: "A popular Indian street food consisting of crispy puris filled with spicy, tangy water, potatoes, and chickpeas.",
    img: paniPuriImg,
    time: "20 min",
    servings: 2,
    tag: "",
  },
  {
    id: 12,
    title: "Samosa",
    desc: "A popular Indian snack with a crispy pastry filled with spicy potatoes and peas.",
    img: samosaImg,
    time: "1 hr",
    servings: 4,
    tag: "Vegan",
  }
];

const cuisineOptions = [
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Dessert', value: 'Dessert' },
  { label: 'Traditional', value: 'Traditional' },
  { label: 'Popular', value: 'Popular' },
];

const Recipes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read page from query param, default to 1
  const params = new URLSearchParams(location.search);
  const initialPage = parseInt(params.get("page")) || 1;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(initialPage);
  const recipesPerPage = 6;

  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  // Update URL when page changes
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (page !== initialPage) {
      params.set("page", page);
      navigate({ search: params.toString() }, { replace: true });
    }
    // eslint-disable-next-line
  }, [page]);

  const filtered = allRecipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) &&
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
            onChange={e => setSearch(e.target.value)}
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
      {/* Add service hour at the bottom */}
      <div className="text-center text-gray-500 text-sm mt-12 mb-4">Service Hour 08:00 AM to 9:00 PM</div>
    </div>
  );
};

export default Recipes; 