import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Orange Modern Cargo Delivery Company Logo (1).png";
import pizzaImg from "../assets/classic margherita pizza.jpeg";
import { registerUser } from "../server/API";
import { getUserProfile } from "../server/API"; // Added import for getUserProfile

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setPasswordError("");

    // Validation
    if (!fullName.trim()) {
      setError("Full name is required");
      setLoading(false);
      return;
    }

    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await registerUser(fullName, email, phoneNumber, password);
      console.log("User registered:", res);
      setMessage(res.message || "User registered! Redirecting to login...");
      // After registration, fetch user profile to get _id
      try {
        const userProfile = await getUserProfile(email.toLowerCase());
        localStorage.setItem("prep_plate_user", JSON.stringify({ 
          _id: userProfile._id, // Store MongoDB ObjectId
          email: userProfile.email, 
          fullName: userProfile.fullName, 
          phoneNumber: userProfile.phoneNumber 
        }));
      } catch (profileErr) {
        localStorage.setItem("prep_plate_user", JSON.stringify({ email, fullName, phoneNumber }));
      }
      setLoading(false);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      <img src={pizzaImg} alt="Pizza background" className="absolute inset-0 w-full h-full object-cover opacity-60 blur-sm z-0" />
      <div className="relative z-10 flex w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl overflow-hidden border border-green-100">
        {/* Left side with image and logo - removed for simplicity */}
        {/* <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-green-100 to-green-50 p-8">
          <img src={logo} alt="Prep & Plate Logo" className="h-16 mb-4" />
          <img src={pizzaImg} alt="Pizza" className="rounded-xl shadow-lg w-full object-cover" style={{ maxHeight: '220px' }} />
        </div> */}
        <div className="flex-1 flex flex-col justify-center p-8 w-full">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-green-700">Create your account</h1>
          <div className="text-gray-500 text-sm mb-6">Already have an account? <Link to="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link></div>
          {message && <div className="mb-4 text-green-600 text-center font-medium bg-green-50 border border-green-200 rounded py-2">{message}</div>}
          {error && <div className="mb-4 text-red-600 text-center font-medium bg-red-50 border border-red-200 rounded py-2">{error}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-green-200"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input
                type="email"
                placeholder="Email address"
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-green-200"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-green-200"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-green-200 pr-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                  onClick={() => setShowPassword(prev => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {passwordError && <div className="text-red-500 text-xs mt-1 ml-1">{passwordError}</div>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
