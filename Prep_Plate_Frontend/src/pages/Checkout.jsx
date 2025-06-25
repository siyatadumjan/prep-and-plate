import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const [payment, setPayment] = useState("Esewa");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate("/order-confirmation");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
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
        </div>
        
        <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Address</h3>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              placeholder="Enter your address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <input
              type="tel"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number"
              value={phone}
              onChange={e => {
                const value = e.target.value;
                setPhone(value);
                // Validate Nepali phone number: 10 digits, starts with 98, 97, or 96
                if (!/^9[876]\d{8}$/.test(value)) {
                  setPhoneError("Enter a valid 10-digit Nepali mobile number (starts with 98, 97, or 96)");
                } else {
                  setPhoneError("");
                }
              }}
              required
            />
            {phoneError && <div className="text-red-500 text-sm mt-1">{phoneError}</div>}
        </div>

        <button 
            onClick={handlePayment}
            disabled={loading || !address.trim() || !phone.trim() || !!phoneError}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? 'Processing...' : `Pay with ${payment}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
