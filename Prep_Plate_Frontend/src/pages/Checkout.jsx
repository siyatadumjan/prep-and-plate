import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Checkout = () => {
  const [payment, setPayment] = useState("Esewa");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("prep_plate_user"))?._id;

  // Calculate total price from cart
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleEsewaPayment = async () => {
    try {
      // 1. Create the order in the backend (let MongoDB generate the _id)
      const orderRes = await axios.post("http://localhost:5000/api/orders", {
        userId,
        items: cart,
        total,
        address,
        paymentMethod: "eSewa",
      });
      const orderId = orderRes.data._id; // This is a valid ObjectId
      // 2. Initiate eSewa payment with the order _id as productId
      const response = await axios.post("http://localhost:5000/api/orders/esewa/initiate", {
        amount: total,
        productId: orderId,
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Failed to initiate eSewa payment.");
      }
    } catch (error) {
      alert("Error initiating eSewa payment.");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (payment === "Esewa") {
      await handleEsewaPayment();
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        clearCart();
        navigate("/order-confirmation");
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <h2 className="font-semibold mb-4">Payment Method</h2>
        <div className="flex flex-col gap-3 mb-6">
          <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input type="radio" name="payment" value="Esewa" checked={payment === "Esewa"} onChange={() => setPayment("Esewa")} className="accent-green-600" />
            <span>Esewa</span>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input type="radio" name="payment" value="Khalti" checked={payment === "Khalti"} onChange={() => setPayment("Khalti")} className="accent-green-600" />
            <span>Khalti</span>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input type="radio" name="payment" value="Cash on Delivery" checked={payment === "Cash on Delivery"} onChange={() => setPayment("Cash on Delivery")} className="accent-green-600" />
            <span>Cash on Delivery</span>
          </label>
        </div>
        <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Address</h3>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 text-sm sm:text-base"
              placeholder="Enter your address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 select-none">+977</span>
              <input
                type="tel"
                className="w-full border rounded pl-14 pr-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                placeholder="Enter your phone number"
                value={phone}
                onChange={e => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setPhone(value);
                  if (!/^9[876]\d{8}$/.test(value)) {
                    setPhoneError("Enter a valid 10-digit Nepali mobile number (starts with 98, 97, or 96)");
                  } else {
                    setPhoneError("");
                  }
                }}
                maxLength={10}
                required
              />
            </div>
            {phoneError && <div className="text-red-500 text-sm mt-1">{phoneError}</div>}
        </div>
        <button 
            onClick={handlePayment}
            disabled={loading || !address.trim() || !phone.trim() || !!phoneError}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition disabled:opacity-60 text-base sm:text-lg"
        >
          {loading ? 'Processing...' : `Pay with ${payment}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
