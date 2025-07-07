import React, { useState, useEffect, useContext } from "react";
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

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);

  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setServings(data.servings || 1);
      });
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  // Calculate adjusted price for each ingredient based on servings
  const adjustedIngredients = recipe.ingredients?.map(ing => ({
    ...ing,
    qty: (ing.qty * servings) / recipe.servings,
    adjustedPrice: ((ing.price || 0) * servings / recipe.servings)
  })) || [];

  const totalPrice = adjustedIngredients.reduce((sum, ing) => sum + ing.adjustedPrice, 0).toFixed(2);

  const user = localStorage.getItem('prep_plate_user');

  const handleOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const itemToAdd = {
      recipeId: String(recipe._id || recipe.id),
      title: recipe.title,
      img: recipe.img,
      servings: servings,
      price: Number(totalPrice),
      pricePerServing: (Number(totalPrice) / servings).toFixed(2)
    };
    addItem(itemToAdd);
    setAddedMsg("Added to cart!");
    setTimeout(() => setAddedMsg(""), 2000);
  };

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
            <p className="text-gray-600 mb-4 text-base">{recipe.desc || recipe.description}</p>
            <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
              <span className="flex items-center gap-1"><span className="material-icons text-base align-middle">schedule</span> {recipe.time}</span>
              {recipe.difficulty && <span className="flex items-center gap-1"><span className="material-icons text-base align-middle">star</span> {recipe.difficulty}</span>}
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