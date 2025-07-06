// src/server/API.jsx
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const registerUser = async (fullName, email, phoneNumber, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const getUserProfile = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

const Cart_API_BASE_URL = "http://localhost:5000/api";

// 🛒 Get Cart for a user
export const fetchCart = async (userId) => {
  const response = await axios.get(`${Cart_API_BASE_URL}/cart`, {
    params: { userId },
  });
  return response.data;
};

// ➕ Add or update item in cart
export const addOrUpdateCartItem = async (userId, item) => {
  const response = await axios.post(`${Cart_API_BASE_URL}/cart`, {
    userId,
    item,
  });
  return response.data;
};

// ❌ Remove item from cart
export const removeCartItem = async (userId, itemId) => {
  const response = await axios.delete(`${Cart_API_BASE_URL}/cart/${itemId}`, {
    params: { userId },
  });
  return response.data;
};

export const checkout = async (userId, items, total, address, paymentMethod) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, {
    userId,
    items,
    total,
    address,
    paymentMethod,
  });
  return response.data;
};

export const fetchOrders = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/orders`, {
    params: { userId },
  });
  return response.data;
};

export const initiateEsewaPayment = async (amount, productId, successUrl, failureUrl) => {
  const response = await axios.post(`${API_BASE_URL}/orders/esewa/initiate`, {
    amount,
    productId,
    successUrl,
    failureUrl,
  });
  return response.data;
};

export const verifyEsewaPayment = async (amt, rid, pid) => {
  const response = await axios.post(`${API_BASE_URL}/orders/esewa/verify`, {
    amt,
    rid,
    pid,
  });
  return response.data;
};