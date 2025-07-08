// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("prep_plate_user"))?._id;

  const { cart = [], total = 0 } = state || {};

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("eSewa");
  const [orderMsg, setOrderMsg] = useState("");

  const handlePayment = async () => {
    if (!address.trim() || !/^9[876]\d{8}$/.test(phone)) {
      setOrderMsg("Valid address and phone are required.");
      return;
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      setOrderMsg("Cart is empty or missing.");
      return;
    }

    const payload = {
      userId,
      items: cart,
      total,
      address,
      paymentMethod,
    };

    try {
      // Step 1: Create Order
      const orderRes = await axios.post("http://localhost:5000/api/orders", payload);
      const productId = orderRes?.data?._id;

      if (!productId) {
        console.error("Invalid order response:", orderRes.data);
        setOrderMsg("Order creation failed.");
        return;
      }

      if (paymentMethod === "eSewa") {
        // Step 2: Open eSewa payment form in new tab (expects HTML from backend)
        const { data: formHTML } = await axios.post(
          "http://localhost:5000/api/esewa/initiate",
          {
            amount: total,
            productId,
            successUrl: `${window.location.origin}/orderconfirmed`,
            failureUrl: `${window.location.origin}/payment-failure`,
          },
          { responseType: "text" } // very important!
        );

        const popup = window.open("", "_blank");
        if (popup) {
          popup.document.open();
          popup.document.write(formHTML);
          popup.document.close();
        } else {
          setOrderMsg("Popup blocked! Please allow popups for this site.");
        }
      } else {
        // Cash on Delivery
        navigate("/orderconfirmed");
      }
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      setOrderMsg("Failed to process order.");
    }
  };

  if (!Array.isArray(cart) || cart.length === 0) {
    return <div className="p-6">No order data available. Please return to cart.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-4">
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border w-full p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
          className="border w-full p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label>Payment</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border w-full p-2 rounded"
        >
          <option value="eSewa">eSewa</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        Pay Rs {total.toFixed(2)} with {paymentMethod}
      </button>

      {orderMsg && <div className="mt-4 text-red-500">{orderMsg}</div>}
    </div>
  );
};

export default Checkout;
