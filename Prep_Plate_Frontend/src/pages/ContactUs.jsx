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
                  <a href="https://maps.google.com/?q=Pulchowk Road, Lalitpur 44700, Nepal" target="_blank" rel="noopener noreferrer" className="text-gray-600 underline">Pulchowk Road, Lalitpur 44700, Nepal</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-3xl text-green-500" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+9779800000000" className="text-gray-600 underline">+977-98-0000-0000</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-3xl text-green-500" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:support@prepandplate.com" className="text-gray-600 underline">support@prepandplate.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form removed, only contact info links remain */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 
