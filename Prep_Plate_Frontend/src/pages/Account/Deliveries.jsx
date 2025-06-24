import React from "react";

const deliveries = [
  { id: "2001", date: "2025-06-28", address: "Kathmandu, Nepal", status: "On the way" },
  { id: "2002", date: "2025-07-01", address: "Bhaktapur, Nepal", status: "Scheduled" },
];

const Deliveries = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Upcoming Deliveries</h2>
    <div className="bg-white rounded shadow p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Delivery Date</th>
            <th className="py-2">Address</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id} className="border-b last:border-b-0">
              <td className="py-2">{delivery.date}</td>
              <td className="py-2">{delivery.address}</td>
              <td className="py-2">{delivery.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Deliveries; 