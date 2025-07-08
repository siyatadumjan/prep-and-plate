import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart, addOrUpdateCartItem, removeCartItem } from "../server/API";

const Cart = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("prep_plate_user"))?._id;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchCart(userId).then(data => setCart(data.items || []));
    }
  }, [userId]);

  const updateServings = async (itemId, delta) => {
    const updated = cart.map(item => {
      if (item._id === itemId) {
        const newCount = item.servings + delta;
        return { ...item, servings: newCount, price: item.pricePerServing * newCount };
      }
      return item;
    });
    setCart(updated);
    const changed = updated.find(i => i._id === itemId);
    await addOrUpdateCartItem(userId, changed);
  };

  const removeItem = async itemId => {
    await removeCartItem(userId, itemId);
    setCart(prev => prev.filter(item => item._id !== itemId));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price, 0);
  const delivery = 100;
  const total = subtotal + delivery;

  const handleProceed = () => {
    if (cart.length === 0) return;
    navigate("/checkout", { state: { cart, total } });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link to="/recipes" className="text-green-600">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item._id} className="flex items-center p-4 bg-white rounded shadow">
                <img src={item.img} className="w-20 h-20 rounded" />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">Rs {item.pricePerServing} per serving</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => updateServings(item._id, -1)} disabled={item.servings<=1}>-</button>
                    <span className="mx-2">{item.servings}</span>
                    <button onClick={() => updateServings(item._id, 1)}>+</button>
                  </div>
                </div>
                <div className="font-semibold">Rs {item.price.toFixed(2)}</div>
                <button onClick={() => removeItem(item._id)} className="ml-4 text-red-500">🗑️</button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-white rounded shadow flex justify-between">
            <div>
              <div>Subtotal: Rs {subtotal.toFixed(2)}</div>
              <div>Delivery: Rs {delivery}</div>
              <div className="font-bold">Total: Rs {total.toFixed(2)}</div>
            </div>
            <button onClick={handleProceed} className="bg-green-600 text-white px-6 py-3 rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;