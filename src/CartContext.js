import React, { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

/**
 * CartProvider (named export)
 * - cartItems: [{ id, title, price, image, quantity, ... }]
 * - addToCart(product) : adds product or increments quantity if exists
 * - removeFromCart(id)
 * - updateQuantity(id, qty)
 * - clearCart()
 * - totalAmount (number, in product.price units)
 */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add product (if exists -> increment quantity)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove by id
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Update quantity (enforces minimum 1)
  const updateQuantity = (id, qty) => {
    const q = Math.max(1, Number(qty) || 1);
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: q } : p))
    );
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // totalAmount in product.price units (not converted to INR here)
  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
