import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encodedData = params.get("data");

    if (!encodedData) {
      setError("No payment data found.");
      return;
    }

    try {
      // Decode base64 string to JSON string
      const jsonStr = atob(encodedData);

      // Parse JSON string to object
      const data = JSON.parse(jsonStr);

      setPaymentData(data);
    } catch (e) {
      setError("Failed to parse payment data.");
    }
  }, [location.search]);

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="mt-6 bg-green-600 text-white py-2 px-4 rounded">
          Back to Home
        </button>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
        <p>Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>

      <p className="mb-4 text-green-600">Payment {paymentData.status === "COMPLETE" ? "Successful" : "Failed"}</p>

      <p><strong>Transaction Code:</strong> {paymentData.transaction_code || paymentData.transaction_uuid}</p>
      <p><strong>Status:</strong> {paymentData.status}</p>
      <p><strong>Total Amount:</strong> Rs {paymentData.total_amount || paymentData.total_amount}</p>

      <button onClick={() => navigate("/")} className="mt-6 bg-green-600 text-white py-2 px-4 rounded">
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmed;
