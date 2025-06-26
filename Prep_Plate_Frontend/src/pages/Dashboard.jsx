import React from "react";
import { Link } from "react-router-dom";

// Copy getUser from Navbar
const getUser = () => {
  const stored = localStorage.getItem("prep_plate_user");
  if (stored) return JSON.parse(stored);
  return null;
};

const Dashboard = () => {
  const user = getUser();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Welcome{user ? `, ${user.email}` : " to Prep & Plate!"}</h1>
        <p className="text-gray-600 mb-8 text-lg">Your personal dashboard for recipes, orders, and more.</p>
        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <Link to="/recipes" className="bg-white rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center transition group">
            <span className="text-3xl mb-2">🍽️</span>
            <span className="font-semibold text-lg mb-1 group-hover:text-green-600">Browse Recipes</span>
            <span className="text-gray-500 text-sm">Find your next meal</span>
          </Link>
          <Link to="/cart" className="bg-white rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center transition group">
            <span className="text-3xl mb-2">🛒</span>
            <span className="font-semibold text-lg mb-1 group-hover:text-green-600">Your Cart</span>
            <span className="text-gray-500 text-sm">View or edit your cart</span>
          </Link>
          <Link to="/account/orders" className="bg-white rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center transition group">
            <span className="text-3xl mb-2">📦</span>
            <span className="font-semibold text-lg mb-1 group-hover:text-green-600">Order History</span>
            <span className="text-gray-500 text-sm">See your past orders</span>
          </Link>
          <Link to="/account/profile" className="bg-white rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center transition group">
            <span className="text-3xl mb-2">👤</span>
            <span className="font-semibold text-lg mb-1 group-hover:text-green-600">Account</span>
            <span className="text-gray-500 text-sm">Manage your profile</span>
          </Link>
        </div>
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-700 mb-1">8</span>
            <span className="font-semibold">Total Orders</span>
          </div>
          <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-700 mb-1">2</span>
            <span className="font-semibold">Active Deliveries</span>
          </div>
          <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-700 mb-1">5</span>
            <span className="font-semibold">Favorite Recipes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 