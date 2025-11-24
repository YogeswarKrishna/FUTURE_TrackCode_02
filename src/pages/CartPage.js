import React, { useContext } from "react";
import { CartContext } from "../CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQuantity, totalAmount } =
    useContext(CartContext);

  // Convert dollar price to INR as you used previously (approx rate used earlier)
  const toINR = (price) => Math.round(price * 83);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                borderBottom: "1px solid #ddd",
                marginBottom: "18px",
                paddingBottom: "18px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "6px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "4px 0" }}>{item.title}</h4>
                <p style={{ margin: "6px 0" }}>
                  Price: ₹{toINR(item.price)}
                </p>

                <label style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    style={{
                      width: "72px",
                      padding: "6px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </label>

                <p style={{ marginTop: "8px", fontWeight: 600 }}>
                  Item Total: ₹{toINR(item.price * item.quantity)}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{toINR(totalAmount)}</h3>

          <div style={{ marginTop: "12px" }}>
            <button
              onClick={clearCart}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
