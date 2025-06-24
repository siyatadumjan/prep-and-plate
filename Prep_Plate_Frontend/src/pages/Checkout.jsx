import React, { useState } from "react";

const Checkout = () => {
  const [payment, setPayment] = useState("Esewa");
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Payment</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-semibold mb-4">Payment</h2>
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input type="radio" checked={payment === "Esewa"} onChange={() => setPayment("Esewa")} className="accent-green-600" />
            Esewa
          </label>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded font-semibold mb-4">Pay</button>
        <div className="text-gray-600 text-sm mb-2">Billing address</div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <input type="checkbox" checked readOnly className="accent-green-600" />
          Same as shipping address
        </div>
      </div>
    </div>
  );
};

export default Checkout; 