import React from "react";

const orders = [
  {
    id: "ORD-12345",
    date: "Jan 10, 2025",
    total: 1000,
    status: "Delivered",
    items: [
      { name: "Lemon Herb Roasted Chicken", servings: 2 },
      { name: "Vegetarian Pasta Primavera", servings: 2 },
    ],
  },
  {
    id: "ORD-12344",
    date: "May 3, 2025",
    total: 1500,
    status: "Delivered",
    items: [
      { name: "Teriyaki Salmon Bowl", servings: 2 },
      { name: "Mediterranean Chickpea Salad", servings: 2 },
    ],
  },
];

const OrderHistory = () => (
  <div className="max-w-4xl mx-auto px-4 py-10 flex gap-8">
    <aside className="w-64 bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
      <div className="font-semibold text-lg mb-1">Siyata Dumjan</div>
      <div className="text-gray-500 text-sm mb-2">siyata@example.com</div>
      <nav className="w-full mt-6">
        <ul className="space-y-2">
          <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Profile</li>
          <li className="bg-green-50 rounded px-3 py-2 font-medium text-green-600">Order History</li>
          <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Upcoming Deliveries</li>
          <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Payment Methods</li>
          <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Delivery Address</li>
        </ul>
      </nav>
    </aside>
    <section className="flex-1 bg-white rounded-lg shadow p-8">
      <h2 className="text-xl font-semibold mb-6">Order History</h2>
      <div className="space-y-8">
        {orders.map(order => (
          <div key={order.id} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{order.id}</div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{order.status}</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Date: {order.date}</div>
            <div className="text-gray-500 text-sm mb-1">Total: Rs {order.total}</div>
            <div className="mb-2">
              <div className="font-medium text-sm mb-1">Items:</div>
              <ul className="list-disc pl-6 text-sm text-gray-700">
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} <span className="text-gray-400">({item.servings} servings)</span></li>
                ))}
              </ul>
            </div>
            <div className="text-green-600 text-sm hover:underline cursor-pointer">View order details</div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default OrderHistory; 