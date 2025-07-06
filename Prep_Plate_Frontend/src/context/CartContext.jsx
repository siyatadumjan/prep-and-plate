// src/context/CartContext.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  fetchCart,
  addOrUpdateCartItem,
  removeCartItem,
} from "../server/API";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userId = JSON.parse(localStorage.getItem("prep_plate_user"))?._id;

  useEffect(() => {
    if (userId) {
      fetchCart(userId).then(data => {
        setCart(data.items || []);
      });
    }
  }, [userId]);

  const updateServings = async (itemId, delta) => {
    const updated = cart.map((item) =>
      item.id === itemId
        ? { ...item, servings: item.servings + delta, price: item.pricePerServing * (item.servings + delta) }
        : item
    );
    const item = updated.find(i => i.id === itemId);
    await addOrUpdateCartItem(userId, item);
    setCart(updated);
  };

  const addItem = async (item) => {
    console.log('CARTCONTEXT DEBUG userId:', userId); // Debug log
    await addOrUpdateCartItem(userId, item);
    // Fetch updated cart from backend
    const data = await fetchCart(userId);
    setCart(data.items || []);
  };

  const removeItem = async (itemId) => {
    await removeCartItem(userId, itemId);
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, updateServings, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
