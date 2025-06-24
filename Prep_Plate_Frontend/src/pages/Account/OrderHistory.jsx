import React from "react";

const orders = [
  { id: "1001", date: "2025-06-20", status: "Delivered" },
  { id: "1002", date: "2025-06-15", status: "Delivered" },
  { id: "1003", date: "2025-06-10", status: "Cancelled" },
];

const OrderHistory = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Order History</h2>
    <div className="bg-white rounded shadow p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Order #</th>
            <th className="py-2">Date</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b last:border-b-0">
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.date}</td>
              <td className="py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderHistory; 