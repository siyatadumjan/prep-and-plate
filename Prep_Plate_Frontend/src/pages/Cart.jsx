import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, updateServings, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const delivery = 100; // Flat delivery fee
  const total = subtotal + delivery;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {cart.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Your cart is empty.</p>
              <Link to="/recipes" className="text-green-600 font-semibold hover:underline">
                Browse Recipes
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-white rounded-lg shadow p-4">
                <img src={item.img} alt={item.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-gray-500 text-sm">Price per serving: Rs {item.pricePerServing}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateServings(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.servings} servings</span>
                    <button onClick={() => updateServings(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                </div>
                <div className="font-semibold text-gray-700">Rs {item.price.toFixed(2)}</div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 text-xl">🗑️</button>
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-80 mt-8 md:mt-0">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2"><span>Subtotal</span><span>Rs {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between mb-2"><span>Delivery Fee</span><span>Rs {delivery.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg mb-4 border-t pt-2"><span>Total</span><span>Rs {total.toFixed(2)}</span></div>
            <button
              className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
            >
              BUY NOW
            </button>
            <div className="text-xs text-gray-400 mt-2">Delivery scheduled for tomorrow between 9am - 12pm</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-sm">
            <div className="font-semibold mb-1">We use precise measurements</div>
            <div>All ingredients are perfectly portioned to eliminate food waste and ensure recipe success.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 