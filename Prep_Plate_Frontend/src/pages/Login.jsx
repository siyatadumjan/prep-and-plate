import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Orange Modern Cargo Delivery Company Logo (1).png";
import pizzaImg from "../assets/classic margherita pizza.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setTimeout(() => {
      const stored = localStorage.getItem("prep_plate_user");
      let valid = false;
      let user = null;
      if (stored) {
        user = JSON.parse(stored);
        if (user.email === email && user.password === password) valid = true;
      }
      if ((email === "test@test.com" && password === "password") || valid) {
        // Sync profile info
        const profileKey = "prep_plate_profile";
        let profile = localStorage.getItem(profileKey);
        profile = profile ? JSON.parse(profile) : {};
        profile.email = email;
        localStorage.setItem(profileKey, JSON.stringify(profile));
        setMessage("Login successful! Redirecting...");
        setLoading(false);
        window.dispatchEvent(new Event('storage'));
        setTimeout(() => navigate("/account/profile"), 1200);
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Blurred background image */}
      <img src={pizzaImg} alt="Pizza background" className="absolute inset-0 w-full h-full object-cover opacity-60 blur-sm z-0" />
      <div className="relative z-10 flex w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl overflow-hidden border border-green-100">
        {/* Left side with image and logo */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-green-100 to-green-50 p-8">
          <img src={logo} alt="Prep & Plate Logo" className="h-16 mb-4" />
          <img src={pizzaImg} alt="Pizza" className="rounded-xl shadow-lg w-full object-cover" style={{maxHeight:'220px'}} />
        </div>
        {/* Right side with form */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-green-700">Login to Prep & Plate</h1>
          <div className="text-gray-500 text-sm mb-6">Welcome back! Please login to your account.</div>
          {message && <div className="mb-4 text-green-600 text-center font-medium bg-green-50 border border-green-200 rounded py-2">{message}</div>}
          {error && <div className="mb-4 text-red-600 text-center font-medium bg-red-50 border border-red-200 rounded py-2">{error}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input type="email" placeholder="Email address" className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-green-200" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-green-200 pr-10" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600" onClick={() => setShowPassword(s => !s)} tabIndex={-1}>{showPassword ? "🙈" : "👁️"}</button>
              </div>
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-xs text-green-600 hover:underline">Forgot password?</Link>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition disabled:opacity-60" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </form>
          <div className="text-center text-sm text-gray-500 mt-4">
            Don&apos;t have an account? <Link to="/signup" className="text-green-600 font-semibold hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 