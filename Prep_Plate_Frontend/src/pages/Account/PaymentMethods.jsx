import React from "react";

const PaymentMethods = () => (
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
        <span className="font-medium">Esewa</span>
        <button className="ml-auto bg-green-100 text-green-600 px-3 py-1 rounded">+</button>
      </div>
    </section>
  </div>
);

export default PaymentMethods; 