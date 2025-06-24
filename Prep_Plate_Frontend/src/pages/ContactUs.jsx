import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 4000);
    }, 1000);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-64 bg-green-100">
        <img
          src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Contact Info and Form */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-6">
                Have a question or feedback? We'd love to hear from you. Reach out to us through any of the channels below, or use the contact form.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-3xl text-green-500" />
                <div>
                  <h3 className="font-semibold">Our Office</h3>
                  <p className="text-gray-600">Pulchowk Road, Lalitpur 44700, Nepal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-3xl text-green-500" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+977-98-0000-0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-3xl text-green-500" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">support@prepandplate.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            {success && (
              <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center font-semibold">
                Your message has been sent successfully!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 