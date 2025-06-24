import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialCart = [
  {
    id: 1,
    title: "Lemon Herb Roasted Chicken",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
    servings: 2,
    price: 3500,
  },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const delivery = 100;
  const total = subtotal + delivery;

  const updateServings = (id, delta) => {
    setCart(cart => cart.map(item =>
      item.id === id ? { ...item, servings: Math.max(1, item.servings + delta) } : item
    ));
  };

  const removeItem = id => setCart(cart => cart.filter(item => item.id !== id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {cart.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-6 bg-white rounded-lg shadow p-4">
                <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-gray-500 text-sm">Precisely portioned ingredients</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateServings(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.servings} servings</span>
                    <button onClick={() => updateServings(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                </div>
                <div className="font-semibold text-gray-700">Rs {item.price}</div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 text-xl">🗑️</button>
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-80">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2"><span>Subtotal</span><span>Rs {subtotal}</span></div>
            <div className="flex justify-between mb-2"><span>Delivery Fee</span><span>Rs {delivery}</span></div>
            <div className="flex justify-between font-bold text-lg mb-4"><span>Total</span><span>Rs {total}</span></div>
            <button
              className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700"
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