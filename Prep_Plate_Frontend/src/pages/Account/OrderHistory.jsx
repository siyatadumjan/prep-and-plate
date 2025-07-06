import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../server/API";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("prep_plate_user"))?._id;
  useEffect(() => {
    if (userId) {
      fetchOrders(userId).then(setOrders);
    }
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Order #</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Address</th>
              <th className="py-2">Payment</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b last:border-b-0">
                <td className="py-2">{order._id.slice(-6).toUpperCase()}</td>
                <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2">Confirmed</td>
                <td className="py-2">{order.address}</td>
                <td className="py-2">{order.paymentMethod}</td>
                <td className="py-2">Rs {order.total?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory; 