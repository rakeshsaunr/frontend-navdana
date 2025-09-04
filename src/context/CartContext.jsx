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

  // ✅ Add item or increment variant quantity
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) =>
          item._id === product._id &&
          item.size === product.size &&
          item.color === product.color &&
          item.sku === product.sku
      );

      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id &&
          item.size === product.size &&
          item.color === product.color &&
          item.sku === product.sku
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  // ✅ Remove or decrement
  const removeFromCart = (_id, size, color, sku, removeAll = false) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) =>
          item._id === _id &&
          item.size === size &&
          item.color === color &&
          item.sku === sku
      );
      if (!existing) return prevCart;

      if (removeAll || existing.quantity <= 1) {
        return prevCart.filter(
          (item) =>
            !(
              item._id === _id &&
              item.size === size &&
              item.color === color &&
              item.sku === sku
            )
        );
      }

      return prevCart.map((item) =>
        item._id === _id &&
        item.size === size &&
        item.color === color &&
        item.sku === sku
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // ✅ Clear cart (used after successful order)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
