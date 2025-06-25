import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-4 bg-gradient-to-br from-green-50 to-white">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl flex flex-col items-center justify-center py-16 px-6 border border-green-100">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center text-green-700">Order Confirmed!</h1>
      <p className="text-lg text-gray-600 text-center mb-6">Thank you for your purchase. Your order has been placed successfully and will be delivered soon.</p>
      <Link to="/recipes" className="mt-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Continue Shopping</Link>
    </div>
  </div>
);

export default OrderConfirmation; 