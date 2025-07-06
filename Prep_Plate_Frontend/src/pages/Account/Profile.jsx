import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile } from "../../server/API";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    photo: "",
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("prep_plate_user"));
        if (!userData || !userData.email) {
          setError("No user data found. Please login again.");
          setLoading(false);
          return;
        }
        try {
          const userProfile = await getUserProfile(userData.email);
          setProfile({
            fullName: userProfile.fullName || "",
            email: userProfile.email || "",
            phoneNumber: userProfile.phoneNumber || "",
            photo: userProfile.photo || "",
          });
        } catch (apiErr) {
          setProfile({
            fullName: userData.fullName || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            photo: userData.photo || "",
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message || "Failed to load profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (file) {
      try {
        const userData = JSON.parse(localStorage.getItem("prep_plate_user"));
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("userId", userData._id); // fallback if needed
        const token = localStorage.getItem("prep_plate_token");
        const res = await axios.post(
          "http://localhost:5000/api/user/upload-photo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        setProfile(prev => ({ ...prev, photo: res.data.user.photo }));
        // Update localStorage and notify other components
        const updatedUser = { ...userData, photo: res.data.user.photo };
        localStorage.setItem("prep_plate_user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        alert("Failed to upload photo");
      }
    }
  };

  const handleSave = e => {
    e.preventDefault();
    setEdit(false);
    // TODO: Add API call to update profile
    // For now, just save to localStorage
    const userData = JSON.parse(localStorage.getItem("prep_plate_user"));
    localStorage.setItem("prep_plate_user", JSON.stringify({ 
      ...userData, 
      fullName: profile.fullName 
    }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 flex items-center justify-center">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <div className="text-lg mb-2">Error loading profile</div>
          <div className="text-sm">{error}</div>
          <button 
            onClick={() => navigate("/login")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex gap-8">
      <aside className="w-64 bg-white rounded-lg shadow p-6 flex flex-col items-center">
        {profile.photo ? (
          <img src={`http://localhost:5000${profile.photo}`} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
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
        <div className="font-semibold text-lg mb-1">{profile.fullName}</div>
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
          </ul>
        </nav>
      </aside>
      <section className="flex-1 bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
        <form className="space-y-4 max-w-lg" onSubmit={edit ? handleSave : e => e.preventDefault()}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input 
              name="fullName" 
              value={profile.fullName} 
              onChange={handleChange} 
              disabled={!edit} 
              className="w-full border rounded px-4 py-2" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email address</label>
            <input 
              name="email" 
              value={profile.email} 
              onChange={handleChange} 
              disabled 
              className="w-full border rounded px-4 py-2 bg-gray-50" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone number</label>
            <input 
              name="phoneNumber" 
              value={profile.phoneNumber} 
              onChange={handleChange} 
              disabled={!edit} 
              className="w-full border rounded px-4 py-2" 
            />
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