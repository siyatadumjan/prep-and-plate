import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import logo from "../assets/Orange Modern Cargo Delivery Company Logo.png";

const getUser = () => {
  const stored = localStorage.getItem("prep_plate_user");
  if (stored) return JSON.parse(stored);
  return null;
};

const Navbar = () => {
  const [user, setUser] = useState(getUser());
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Listen for login/logout changes from other tabs
  useEffect(() => {
    const syncUser = () => setUser(getUser());
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("prep_plate_user");
    setUser(null);
    setDropdown(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center mr-8 h-24 gap-3">
          <img src={logo} alt="Prep & Plate Logo" className="h-24 min-w-[110px] w-auto object-contain align-middle" />
          <span className="text-green-600 font-bold text-2xl md:text-3xl whitespace-nowrap">Prep & Plate</span>
        </Link>
        <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
        <Link to="/recipes" className="text-gray-700 hover:text-green-600">Recipes</Link>
        <Link to="/cart" className="text-gray-700 hover:text-green-600">Cart</Link>
      </div>
      <div className="flex items-center gap-4 relative">
        <input
          type="text"
          placeholder="Search recipes..."
          className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        <Link to="/cart" className="text-gray-700 hover:text-green-600 text-xl">
          <FaShoppingCart />
        </Link>
        <button
          className="text-gray-700 hover:text-green-600 text-xl relative"
          onClick={() => setDropdown((d) => !d)}
        >
          <FaUserCircle />
        </button>
        {dropdown && (
          <div ref={dropdownRef} className="absolute right-0 top-12 bg-white shadow-lg rounded w-56 z-50 p-4">
            {!user ? (
              <div className="flex flex-col gap-2">
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-green-50"
                  onClick={() => { setDropdown(false); navigate("/login"); }}
                >Login</button>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-green-50"
                  onClick={() => { setDropdown(false); navigate("/signup"); }}
                >Register</button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="mb-2">
                  <div className="font-semibold">{user.email}</div>
                </div>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-green-50"
                  onClick={() => { setDropdown(false); navigate("/account/profile"); }}
                >Profile</button>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-green-50 text-red-600"
                  onClick={handleLogout}
                >Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 