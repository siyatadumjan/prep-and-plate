import React from "react";
import { FaLeaf, FaBalanceScale, FaTruck } from "react-icons/fa";

const AboutUs = () => (
  <div className="bg-white">
    {/* Hero Section */}
    <div className="relative h-64 bg-green-100">
      <img
        src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Fresh Ingredients"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">About Prep & Plate</h1>
      </div>
    </div>

    {/* Our Mission Section */}
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
      <p className="text-lg text-gray-600">
        We started Prep & Plate with a simple mission: to make home cooking joyful, sustainable, and accessible for everyone. We believe that a great meal shouldn't come at the cost of wasted food or complicated recipes. By providing perfectly portioned, fresh ingredients and easy-to-follow instructions, we empower you to cook with confidence and creativity.
      </p>
    </div>

    {/* What We Do Section */}
    <div className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">What We Stand For</h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <FaLeaf className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Freshness First</h3>
            <p className="text-gray-600">We source the highest quality, seasonal ingredients from trusted local suppliers to ensure every meal is packed with flavor.</p>
          </div>
          <div>
            <FaBalanceScale className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Zero Waste</h3>
            <p className="text-gray-600">By sending you exactly what you need, we help eliminate food waste in your kitchen and in our supply chain.</p>
          </div>
          <div>
            <FaTruck className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Convenience Delivered</h3>
            <p className="text-gray-600">Our seamless delivery service brings everything you need right to your doorstep, saving you time and effort.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
      <p className="text-lg text-gray-600 mb-8">
        Ready to rediscover the joy of cooking? Browse our delicious, waste-free recipes today.
      </p>
      <a href="/recipes" className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-600 transition">
        Browse Recipes
      </a>
    </div>
  </div>
);

export default AboutUs; 