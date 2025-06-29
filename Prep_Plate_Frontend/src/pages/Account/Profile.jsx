import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const initialProfile = {
  firstName: "Siyata",
  lastName: "Dumjan",
  email: "siyata@example.com",
  phone: "9767581845",
  image: null,
};

const PROFILE_KEY = "prep_plate_profile";

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem(PROFILE_KEY);
    return stored ? JSON.parse(stored) : initialProfile;
  });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = e => {
    e.preventDefault();
    setEdit(false);
    // profile is already saved to localStorage by useEffect
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex gap-8">
      <aside className="w-64 bg-white rounded-lg shadow p-6 flex flex-col items-center">
        {profile.image ? (
          <img src={profile.image} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-3xl text-gray-400">
            <span>👤</span>
          </div>
        )}
        {edit && (
          <label className="mb-2 cursor-pointer text-green-600 hover:underline text-sm">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            Upload Image
          </label>
        )}
        <div className="font-semibold text-lg mb-1">{profile.firstName} {profile.lastName}</div>
        <div className="text-gray-500 text-sm mb-2">{profile.email}</div>
        <nav className="w-full mt-6">
          <ul className="space-y-2">
            <li
              className={`rounded px-3 py-2 font-medium cursor-pointer ${location.pathname === "/account/profile" ? "bg-green-50 text-green-600" : "hover:bg-gray-50 text-gray-700"}`}
              onClick={() => navigate("/account/profile")}
            >
              Profile
            </li>
            <li
              className={`rounded px-3 py-2 font-medium cursor-pointer ${location.pathname === "/account/orders" ? "bg-green-50 text-green-600" : "hover:bg-gray-50 text-gray-700"}`}
              onClick={() => navigate("/account/orders")}
            >
              Order History
            </li>
            <li
              className={`rounded px-3 py-2 font-medium cursor-pointer ${location.pathname === "/account/deliveries" ? "bg-green-50 text-green-600" : "hover:bg-gray-50 text-gray-700"}`}
              onClick={() => navigate("/account/deliveries")}
            >
              Upcoming Deliveries
            </li>
          </ul>
        </nav>
      </aside>
      <section className="flex-1 bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
        <form className="space-y-4 max-w-lg" onSubmit={edit ? handleSave : e => e.preventDefault()}>
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
        <div className="mt-8 flex justify-center">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition"
            onClick={() => navigate('/recipes')}
          >
            Explore Recipes
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile; 