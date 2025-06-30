import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-50 border-t mt-8">
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-wrap gap-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/contact" className="hover:text-green-600">Contact</Link>
        <Link to="/help" className="hover:text-green-600">Help</Link>
      </div>
    </div>
    <div className="text-center text-xs text-gray-400 pb-4">© 2025 Prep & Plate. All rights reserved.</div>
  </footer>
);

export default Footer; 