import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart (increment quantity if exists)
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity } // remove 1-item limit
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Remove or decrement quantity
  const removeFromCart = (_id, quantity = null) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === _id);
      if (!existing) return prevCart;

      if (quantity === null || existing.quantity <= quantity) {
        // Remove entire item
        return prevCart.filter((item) => item._id !== _id);
      } else {
        // Decrease quantity
        return prevCart.map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity - quantity } : item
        );
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
