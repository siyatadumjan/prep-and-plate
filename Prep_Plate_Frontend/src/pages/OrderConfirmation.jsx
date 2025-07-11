import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [esewaStatus, setEsewaStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get last order info from localStorage (set in Cart.jsx after checkout)
    const lastOrder = JSON.parse(localStorage.getItem("prep_plate_last_order"));
    if (lastOrder) {
      setAddress(lastOrder.address || "");
      setPaymentMethod(lastOrder.paymentMethod || "");
      localStorage.removeItem("prep_plate_last_order");
    }
    // eSewa verification if redirected from eSewa
    const params = new URLSearchParams(location.search);
    const token = params.get("data");
    if (token) {
      // Use browser base64 decode for JWT-like token
      let decoded = {};
      try {
        decoded = JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        setEsewaStatus("failure");
        return;
      }
      axios.post("http://localhost:5000/api/orders/esewa/verify", {
        product_id: decoded.transaction_uuid,
      })
      .then(res => {
        setEsewaStatus(res.data && res.data.data && res.data.data.status === "COMPLETE" ? "success" : "failure");
      })
      .catch(() => setEsewaStatus("failure"));
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8 px-2 sm:px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col items-center justify-center py-10 sm:py-14 px-4 sm:px-8 border border-green-100">
        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 mb-4 sm:mb-6">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-center text-green-700">Order Confirmed!</h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-2 sm:mb-4">Thank you for your purchase. Your order has been placed successfully and will be delivered soon.</p>
        {address && (
          <div className="mb-2 text-center text-gray-700">
            <div><span className="font-semibold">Delivery Address:</span> {address}</div>
          </div>
        )}
        {paymentMethod && (
          <div className="mb-4 text-center text-gray-700">
            <div><span className="font-semibold">Payment Method:</span> {paymentMethod}</div>
          </div>
        )}
        {esewaStatus && (
          <div className={`mb-4 text-center font-semibold ${esewaStatus === "success" ? "text-green-600" : "text-red-600"}`}>
            {esewaStatus === "success" ? "eSewa Payment Successful!" : "eSewa Payment Failed!"}
          </div>
        )}
        <Link to="/recipes" className="mt-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition w-full sm:w-auto text-center">Continue Shopping</Link>
        {/* Review Section */}
        <div className="mt-8 w-full">
          <h2 className="text-lg font-semibold mb-2 text-center">Rate Your Experience</h2>
          {submitted ? (
            <div className="text-green-600 text-center font-medium py-4">Thank you for your feedback!</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <div className="flex gap-1 text-2xl">
                {[1,2,3,4,5].map(star => (
                  <button
                    type="button"
                    key={star}
                    className={star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >★</button>
                ))}
              </div>
              <textarea
                className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="Leave a short review (optional)"
                value={review}
                onChange={e => setReview(e.target.value)}
                rows={3}
                maxLength={200}
              />
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-60" disabled={rating === 0}>Submit Review</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 