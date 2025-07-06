import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/Orange Modern Cargo Delivery Company Logo (1).png";
import { CartContext } from "../context/CartContext";

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
  const { cart } = useContext(CartContext);

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
    <nav className="bg-green-50 shadow-sm px-6 py-3 flex items-center relative">
      <div className="flex items-center mr-8 h-12 gap-2 z-10">
        <Link to="/" className="flex items-center h-12 gap-2">
          <img src={logo} alt="Prep & Plate Logo" className="h-12 min-w-[48px] w-auto object-contain align-middle" />
          <span className="text-green-600 font-bold text-xl whitespace-nowrap">Prep & Plate</span>
        </Link>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex gap-8">
          <Link to="/recipes" className="text-gray-700 hover:text-green-600">Recipes</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600">About Us</Link>
        </div>
      </div>
      <div className="flex items-center gap-10 relative ml-auto z-10">
        <Link to="/cart" className="text-gray-700 hover:text-green-600 text-xl relative">
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {cart.length}
            </span>
          )}
        </Link>
        <button
          className="text-gray-700 hover:text-green-600 text-xl relative"
          onClick={() => setDropdown((d) => !d)}
        >
          {user && user.photo ? (
            <img
              src={`http://localhost:5000${user.photo}`}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-green-200"
            />
          ) : (
            <FaUserCircle />
          )}
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
                <div className="mb-2 flex items-center gap-2">
                  {user.photo ? (
                    <img
                      src={`http://localhost:5000${user.photo}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-gray-400" />
                  )}
                  <div>
                    <div className="font-semibold">{user.fullName || user.email}</div>
                    {user.fullName && <div className="text-sm text-gray-500">{user.email}</div>}
                  </div>
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