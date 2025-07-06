// src/pages/Cart.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCart,
  addOrUpdateCartItem,
  removeCartItem,
  checkout,
  initiateEsewaPayment,
} from "../server/API";
import logo from "../assets/Orange Modern Cargo Delivery Company Logo (1).png";
import pizzaImg from "../assets/classic margherita pizza.jpeg";

const Cart = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("prep_plate_user"))?._id;
  const [cart, setCart] = useState([]);
  const [orderMsg, setOrderMsg] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [esewaForm, setEsewaForm] = useState(null);

  // Fetch cart on load
  useEffect(() => {
    if (userId) {
      fetchCart(userId).then((data) => setCart(data.items || []));
    }
  }, [userId]);

  const updateServings = async (itemId, delta) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId) {
        const newServings = item.servings + delta;
        const newPrice = item.pricePerServing * newServings;
        return { ...item, servings: newServings, price: newPrice };
      }
      return item;
    });
    const updatedItem = updatedCart.find(i => i._id === itemId);
    await addOrUpdateCartItem(userId, updatedItem);
    setCart(updatedCart);
  };

  const handleRemove = async (itemId) => {
    await removeCartItem(userId, itemId);
    setCart(prev => prev.filter(item => item._id !== itemId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const delivery = 100;
  const total = subtotal + delivery;

  const handleCheckout = async () => {
    if (paymentMethod === "eSewa") {
      // Initiate eSewa payment
      try {
        const productId = `ORDER_${Date.now()}`;
        const successUrl = "http://localhost:5173/orderconfirmed";
        const failureUrl = "http://localhost:5173/payment-failure";
        const { formData, esewaUrl } = await initiateEsewaPayment(total, productId, successUrl, failureUrl);
        // Render a form and auto-submit to eSewa
        setEsewaForm({ formData, esewaUrl });
        // Store address/payment for confirmation page
        localStorage.setItem("prep_plate_last_order", JSON.stringify({ address, paymentMethod }));
      } catch (err) {
        setOrderMsg("Failed to initiate eSewa payment.");
      }
      return;
    }
    // Normal checkout
    try {
      await checkout(userId, cart, total, address, paymentMethod);
      setCart([]);
      setOrderMsg("Order placed successfully! Thank you for your purchase.");
      localStorage.setItem("prep_plate_last_order", JSON.stringify({ address, paymentMethod }));
      setTimeout(() => {
        setOrderMsg("");
        navigate("/order-confirmation");
      }, 1500);
    } catch (err) {
      setOrderMsg("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    if (esewaForm) {
      setTimeout(() => {
        document.getElementById("esewaForm")?.submit();
      }, 100);
    }
  }, [esewaForm]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* eSewa payment form (auto-submit) */}
      {esewaForm && (
        <form action={esewaForm.esewaUrl} method="POST" style={{ display: "none" }} id="esewaForm">
          {Object.entries(esewaForm.formData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
          <button type="submit">Pay with eSewa</button>
        </form>
      )}
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
              <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-white rounded-lg shadow p-4">
                <img src={item.img} alt={item.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-gray-500 text-sm">Price per serving: Rs {item.pricePerServing}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateServings(item._id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                      disabled={item.servings <= 1}
                    >
                      -
                    </button>
                    <span>{item.servings} servings</span>
                    <button
                      onClick={() => updateServings(item._id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="font-semibold text-gray-700">Rs {item.price.toFixed(2)}</div>
                <button onClick={() => handleRemove(item._id)} className="text-red-500 hover:text-red-700 text-xl">🗑️</button>
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
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Delivery Address</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter your delivery address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option>Cash on Delivery</option>
                <option>eSewa</option>
              </select>
            </div>
            <button
              className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
              onClick={handleCheckout}
              disabled={cart.length === 0 || !address.trim() || !paymentMethod}
              style={{
                opacity: cart.length === 0 || !address.trim() || !paymentMethod ? 0.5 : 1,
                cursor: cart.length === 0 || !address.trim() || !paymentMethod ? 'not-allowed' : 'pointer'
              }}
            >
              Proceed to Checkout
            </button>
            {orderMsg && <div className="text-green-600 text-center mt-2">{orderMsg}</div>}
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
