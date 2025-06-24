import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-50 border-t mt-8">
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-wrap gap-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/recipes" className="hover:text-green-600">Recipes</Link>
        <Link to="/about" className="hover:text-green-600">About Us</Link>
        <Link to="/contact" className="hover:text-green-600">Contact</Link>
        <Link to="/terms" className="hover:text-green-600">Terms</Link>
        <Link to="/privacy" className="hover:text-green-600">Privacy</Link>
      </div>
      <div className="flex gap-4 text-xl text-gray-500">
        <a href="#" aria-label="Facebook"><FaFacebook /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" aria-label="Twitter"><FaTwitter /></a>
      </div>
    </div>
    <div className="text-center text-xs text-gray-400 pb-4">© 2025 Prep & Plate. All rights reserved.</div>
  </footer>
);

export default Footer; 