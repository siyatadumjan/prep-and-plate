import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// AUTH
export const registerUser = async (fullName, email, phoneNumber, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phoneNumber, password }),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

export const getUserProfile = async (email) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/auth/profile`, { params: { email } });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch profile" };
  }
};

// CART
export const fetchCart = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/cart`, { params: { userId } });
  return res.data;
};

export const addOrUpdateCartItem = async (userId, item) => {
  const res = await axios.post(`${API_BASE_URL}/cart`, { userId, item });
  return res.data;
};

export const removeCartItem = async (userId, itemId) => {
  const res = await axios.delete(`${API_BASE_URL}/cart/${itemId}`, { params: { userId } });
  return res.data;
};

// ORDER
export const checkout = async (userId, items, total, address, paymentMethod) => {
  const res = await axios.post(`${API_BASE_URL}/orders`, {
    userId,
    items,
    total,
    address,
    paymentMethod,
  });
  return res.data;
};

export const fetchOrders = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/orders`, { params: { userId } });
  return res.data;
};

// eSEWA
export const initiateEsewaPayment = async (amount, productId, successUrl, failureUrl) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/orders/esewa/initiate`, {
      amount,
      productId,
      successUrl,
      failureUrl,
    });
    return res.data;
  } catch (error) {
    console.error("eSewa initiation failed:", error);
    return {
      formData: null,
      esewaUrl: null,
      error: error.response?.data?.message || "Failed to initiate eSewa payment",
    };
  }
};

export const verifyEsewaPayment = async (amt, rid, pid) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/orders/esewa/verify`, { amt, rid, pid });
    return res.data;
  } catch (error) {
    console.error("eSewa verification failed:", error);
    throw error.response?.data || { message: "Verification failed" };
  }
};

// Forgot Password (send OTP)
export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to send OTP' };
  }
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Invalid or expired OTP' };
  }
};

// Reset Password with OTP
export const resetPasswordWithOTP = async (email, otp, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/reset-password`, { email, otp, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to reset password' };
  }
};

// Change Password
export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/user/change-password`, { userId, oldPassword, newPassword });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to change password' };
  }
};
