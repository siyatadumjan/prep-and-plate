import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-green-100 p-10 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-green-700 text-center">Forgot Password</h1>
        {submitted ? (
          <div className="mb-8 text-green-700 text-center font-semibold bg-green-50 border border-green-200 rounded-xl py-8 px-6 text-lg sm:text-xl leading-relaxed">
            Dear User, You will shortly receive an email to reset your password. If you have any questions, comments or concerns, please feel free to contact us via email at{' '}
            <a href="mailto:support@prepandplate.com" className="underline text-green-800">support@prepandplate.com</a>{' '}or call us at{' '}
            <a href="tel:+9779800000000" className="underline text-green-800">+977-98-0000-0000</a>.
          </div>
        ) : (
          <form className="space-y-6 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base font-medium mb-2">Email address</label>
              <input type="email" placeholder="Email address" className="w-full border rounded px-4 py-3 focus:ring-2 focus:ring-green-200 text-lg" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition">Send reset link</button>
          </form>
        )}
        <div className="text-center text-base text-gray-500 mt-8">
          <Link to="/login" className="text-green-600 font-semibold hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 