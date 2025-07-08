import React from "react";
import axios from "axios";

const PaymentMethods = () => {
  const handleEsewaPay = async () => {
    try {
      // Replace with real amount and productId as needed
      const amount = 100;
      const productId = "demo123";

      // Initiate payment - get form data from backend
      const { data } = await axios.post("http://localhost:5000/api/esewa/initiate", {
        amount,
        productId,
      });

      // Dynamically create and submit the form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.action;

      Object.entries(data.values).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("eSewa payment initiation failed:", err);
      alert("Failed to initiate eSewa payment. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex gap-8">
      <aside className="w-64 bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
        <div className="font-semibold text-lg mb-1">Siyata Dumjan</div>
        <div className="text-gray-500 text-sm mb-2">siyata@example.com</div>
        <nav className="w-full mt-6">
          <ul className="space-y-2">
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Profile</li>
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Order History</li>
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Upcoming Deliveries</li>
            <li className="bg-green-50 rounded px-3 py-2 font-medium text-green-600">Payment Methods</li>
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Delivery Address</li>
          </ul>
        </nav>
      </aside>
      <section className="flex-1 bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Payment</h2>
        <div className="bg-green-50 rounded-lg p-6 flex items-center gap-4 max-w-md">
          <input type="radio" checked readOnly className="accent-green-600" />
          <span className="font-medium">eSewa</span>
          <button
            onClick={handleEsewaPay}
            className="ml-auto bg-green-100 text-green-600 px-3 py-1 rounded"
          >
            Pay
          </button>
        </div>
      </section>
    </div>
  );
};

export default PaymentMethods;
