import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setTimeout(() => {
      const stored = localStorage.getItem("prep_plate_user");
      let valid = false;
      if (stored) {
        const user = JSON.parse(stored);
        if (user.email === email && user.password === password) valid = true;
      }
      if ((email === "test@test.com" && password === "password") || valid) {
        setMessage("Login successful! Redirecting...");
        setLoading(false);
        setTimeout(() => navigate("/"), 1200);
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-4">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Login to your Account</h1>
        <p className="text-center text-gray-500 mb-6">provide your details</p>
        {message && <div className="mb-4 text-green-600 text-center">{message}</div>}
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email address" className="w-full border rounded px-4 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full border rounded px-4 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-60" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-4">
          create a account? <Link to="/signup" className="text-green-600 hover:underline">Sign up</Link>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 border rounded px-4 py-2 hover:bg-gray-50" disabled={loading}><FaGoogle /> Google</button>
          <button className="flex items-center gap-2 border rounded px-4 py-2 hover:bg-gray-50" disabled={loading}><FaFacebook /> Facebook</button>
        </div>
      </div>
    </div>
  );
};

export default Login; 