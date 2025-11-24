import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";

export default function Checkout() {
  const { totalAmount, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrderPlacement = () => {
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
    }, 1000); // small delay to simulate processing
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>🧾 Checkout</h2>
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Total Amount (Pay on Delivery):{" "}
        <strong>₹{Math.round(totalAmount * 83)}</strong>
      </p>

      {!orderPlaced ? (
        <>
          <p style={{ fontSize: "16px", color: "#333" }}>
            Payment Method: <strong>💵 Cash on Delivery</strong>
          </p>
          <button
            onClick={handleOrderPlacement}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginTop: "10px",
            }}
          >
            Place Order
          </button>
        </>
      ) : (
        <div
          style={{
            marginTop: "30px",
            background: "#e6ffed",
            border: "1px solid #28a745",
            color: "#155724",
            padding: "25px",
            borderRadius: "10px",
            display: "inline-block",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            animation: "fadeIn 1s ease",
          }}
        >
          <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>
            ✅ Order Placed Successfully!
          </h3>
          <p style={{ margin: "5px 0" }}>
            Thank you for shopping with <strong>Krishna’s Mart</strong> 🛍️
          </p>
          <p style={{ fontSize: "15px", color: "#155724" }}>
            Your order will be delivered within <strong>3–5 business days.</strong>
          </p>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
