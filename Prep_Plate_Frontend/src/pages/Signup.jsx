import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Orange Modern Cargo Delivery Company Logo (1).png";
import pizzaImg from "../assets/classic margherita pizza.jpeg";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
    // Password validation
    if (password.length < 6) {
      setPasswordError("Password is too weak. Please use at least 6 characters.");
      setLoading(false);
      return;
    }
    // Optionally, check for stronger password (e.g., at least 8 chars, mix of letters and numbers)
    const strong = password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    if (!strong) {
      setPasswordError("Password is weak. Use at least 8 characters, including letters and numbers, for a stronger password.");
      setLoading(false);
      return;
    }
    setTimeout(() => {
      if (email.includes("fail")) {
        setError("Email already in use or invalid (simulated error)");
        setLoading(false);
      } else {
        // Store credentials in localStorage
        localStorage.setItem("prep_plate_user", JSON.stringify({ email, password }));
        // Store profile info
        localStorage.setItem("prep_plate_profile", JSON.stringify({
          firstName,
          lastName,
          email,
          phone: "",
          image: null
        }));
        setMessage("Account created! Redirecting to login...");
        setLoading(false);
        window.dispatchEvent(new Event('storage'));
        setTimeout(() => navigate("/login"), 1200);
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
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-green-700">Create your account</h1>
          <div className="text-gray-500 text-sm mb-6">Already have an account? <Link to="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link></div>
          {message && <div className="mb-4 text-green-600 text-center font-medium bg-green-50 border border-green-200 rounded py-2">{message}</div>}
          {error && <div className="mb-4 text-red-600 text-center font-medium bg-red-50 border border-red-200 rounded py-2">{error}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">First name</label>
                <input type="text" placeholder="First name" className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-green-200" value={firstName} onChange={e => setFirstName(e.target.value)} required />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Last name</label>
                <input type="text" placeholder="Last name" className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-green-200" value={lastName} onChange={e => setLastName(e.target.value)} required />
              </div>
            </div>
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
              <div className="text-xs text-gray-400 mt-1 ml-1">Password must be at least 6 characters.</div>
              {passwordError && <div className="text-red-500 text-xs mt-1 ml-1">{passwordError}</div>}
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition disabled:opacity-60" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup; 