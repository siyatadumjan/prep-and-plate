import React, { useState } from "react";

const initialAddress = {
  street: "Pulchowk Road, Lalitpur 44700, Nepal",
  city: "Lalitpur",
  province: "Bagmati",
  instructions: "",
};

const Address = () => {
  const [address, setAddress] = useState(initialAddress);
  const [edit, setEdit] = useState(false);

  const handleChange = e => {
    setAddress({ ...address, [e.target.name]: e.target.value });
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
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Payment Methods</li>
            <li className="bg-green-50 rounded px-3 py-2 font-medium text-green-600">Delivery Address</li>
          </ul>
        </nav>
      </aside>
      <section className="flex-1 bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Delivery Address</h2>
        <form className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Street address</label>
            <input name="street" value={address.street} onChange={handleChange} disabled={!edit} className="w-full border rounded px-4 py-2" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">City</label>
              <input name="city" value={address.city} onChange={handleChange} disabled={!edit} className="w-full border rounded px-4 py-2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Province</label>
              <input name="province" value={address.province} onChange={handleChange} disabled={!edit} className="w-full border rounded px-4 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Delivery Instructions</label>
            <input name="instructions" value={address.instructions} onChange={handleChange} disabled={!edit} className="w-full border rounded px-4 py-2" placeholder="Special instructions for delivery (optional)" />
          </div>
          <div className="flex gap-2 mt-6">
            {edit ? (
              <>
                <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => setEdit(false)}>Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Save</button>
              </>
            ) : (
              <button type="button" className="bg-green-600 text-white px-4 py-2 rounded font-semibold" onClick={() => setEdit(true)}>Edit</button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default Address; 