import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile, changePassword, fetchOrders } from "../../server/API";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePassError, setChangePassError] = useState("");
  const [changePassSuccess, setChangePassSuccess] = useState("");
  const [changePassLoading, setChangePassLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // Add a new sidebar item for Change Password
  // Track selected section: 'profile', 'orders', 'changePassword'
  const [selectedSection, setSelectedSection] = useState('profile');

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

  useEffect(() => {
    if (selectedSection === "orders") {
      const fetchUserOrders = async () => {
        setOrdersLoading(true);
        setOrdersError("");
        try {
          const userData = JSON.parse(localStorage.getItem("prep_plate_user"));
          if (userData && userData._id) {
            const data = await fetchOrders(userData._id);
            setOrders(data);
          }
        } catch (err) {
          setOrdersError("Failed to load order history.");
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchUserOrders();
    }
  }, [selectedSection]);

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
              className={`rounded px-3 py-2 font-medium cursor-pointer ${selectedSection === "profile" ? "bg-green-50 text-green-600" : "hover:bg-gray-50 text-gray-700"}`}
              onClick={() => setSelectedSection("profile")}
            >
              Profile
            </li>
            <li
              className={`rounded px-3 py-2 font-medium cursor-pointer ${selectedSection === "orders" ? "bg-green-50 text-green-600" : "hover:bg-gray-50 text-gray-700"}`}
              onClick={() => setSelectedSection("orders")}
            >
              Order History
            </li>
            <li
              className={`rounded px-3 py-2 font-medium cursor-pointer ${selectedSection === "changePassword" ? "bg-green-50 text-green-600" : "hover:bg-gray-50 text-gray-700"}`}
              onClick={() => setSelectedSection("changePassword")}
            >
              Change Password
            </li>
          </ul>
        </nav>
      </aside>
      <section className="flex-1 bg-white rounded-lg shadow p-8">
        {selectedSection === "profile" && (
          <>
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
          </>
        )}
        {selectedSection === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Order History</h2>
            {ordersLoading ? (
              <div>Loading orders...</div>
            ) : ordersError ? (
              <div className="text-red-600">{ordersError}</div>
            ) : orders.length === 0 ? (
              <div>No orders found.</div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order._id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">Order ID: {order.orderId}</div>
                      <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium">Status:</span> <span className="text-green-700">{order.status}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium">Payment:</span> {order.paymentMethod}
                    </div>
                    <div className="mb-2">
                      <span className="font-medium">Total:</span> Rs {order.total}
                    </div>
                    <div>
                      <span className="font-medium">Items:</span>
                      <ul className="list-disc ml-6">
                        {order.items.map((item, idx) => (
                          <li key={idx}>{item.title} x {item.servings} (Rs {item.price})</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {selectedSection === "changePassword" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Change Password</h2>
            <form className="space-y-4 max-w-md mt-4" onSubmit={async e => {
              e.preventDefault();
              setChangePassError("");
              setChangePassSuccess("");
              if (newPassword !== confirmNewPassword) {
                setChangePassError("New passwords do not match");
                return;
              }
              setChangePassLoading(true);
              try {
                const userData = JSON.parse(localStorage.getItem("prep_plate_user"));
                await changePassword(userData._id, oldPassword, newPassword);
                setChangePassSuccess("Password changed successfully.");
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
              } catch (err) {
                setChangePassError(err.message || "Failed to change password");
              } finally {
                setChangePassLoading(false);
              }
            }}>
              {changePassError && <div className="text-red-600 font-semibold">{changePassError}</div>}
              {changePassSuccess && <div className="text-green-600 font-semibold">{changePassSuccess}</div>}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Old Password</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="w-full border rounded px-4 py-2"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    required
                    disabled={changePassLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowOldPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showOldPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full border rounded px-4 py-2"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    disabled={changePassLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowNewPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showNewPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    className="w-full border rounded px-4 py-2"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    required
                    disabled={changePassLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmNewPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showConfirmNewPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
                disabled={changePassLoading}
              >
                {changePassLoading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        )}
        <div className="mt-8 flex justify-center">
          {/* <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition"
            onClick={() => navigate('/recipes')}
          >
            Explore Recipes
          </button> */}
        </div>
      </section>
    </div>
  );
};

export default Profile; 