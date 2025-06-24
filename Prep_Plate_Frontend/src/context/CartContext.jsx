import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('prep_plate_cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('prep_plate_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if item already exists
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Update servings if it exists
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, servings: cartItem.servings + item.servings, price: cartItem.price + item.price } : cartItem
        );
      } else {
        // Add new item
        return [...prevCart, item];
      }
    });
  };

  const updateServings = (id, delta) => {
    setCart(cart => cart.map(item =>
      item.id === id ? { 
        ...item, 
        servings: Math.max(1, item.servings + delta),
        // This assumes price is per-serving. Adjust if needed.
        price: (item.price / item.servings) * Math.max(1, item.servings + delta)
      } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart => cart.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateServings, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}; 