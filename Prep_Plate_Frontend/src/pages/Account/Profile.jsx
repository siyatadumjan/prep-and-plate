import React, { useState } from "react";

const initialProfile = {
  firstName: "Siyata",
  lastName: "Dumjan",
  email: "siyata@example.com",
  phone: "9767581845",
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [edit, setEdit] = useState(false);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex gap-8">
      <aside className="w-64 bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
        <div className="font-semibold text-lg mb-1">{profile.firstName} {profile.lastName}</div>
        <div className="text-gray-500 text-sm mb-2">{profile.email}</div>
        <nav className="w-full mt-6">
          <ul className="space-y-2">
            <li className="bg-green-50 rounded px-3 py-2 font-medium text-green-600">Profile</li>
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Order History</li>
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Upcoming Deliveries</li>
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Payment Methods</li>
            <li className="rounded px-3 py-2 hover:bg-gray-50 cursor-pointer">Delivery Address</li>
          </ul>
        </nav>
      </aside>
      <section className="flex-1 bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
        <form className="space-y-4 max-w-lg">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">First name</label>
              <input name="firstName" value={profile.firstName} onChange={handleChange} disabled={!edit} className="w-full border rounded px-4 py-2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Last name</label>
              <input name="lastName" value={profile.lastName} onChange={handleChange} disabled={!edit} className="w-full border rounded px-4 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email address</label>
            <input name="email" value={profile.email} onChange={handleChange} disabled className="w-full border rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone number</label>
            <input name="phone" value={profile.phone} onChange={handleChange} disabled={!edit} className="w-full border rounded px-4 py-2" />
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

export default Profile; 