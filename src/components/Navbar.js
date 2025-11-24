import React, { useContext } from "react";
import { CartContext } from "../CartContext";

export default function Navbar({ setRoute, logoutUser }) {
  const { cartItems } = useContext(CartContext);

  const hours = new Date().getHours();
  const greeting =
    hours < 12 ? "Good Morning 🌞" : hours < 18 ? "Good Afternoon 🌤️" : "Good Evening 🌙";

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #00b4db, #0083b0)",
        padding: "18px 35px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div style={{ fontSize: "32px", fontWeight: "900" }}>Krishna’s Mart 🛍️</div>

      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => setRoute("home")} className="nav-btn">
          Products
        </button>
        <button onClick={() => setRoute("cart")} className="nav-btn">
          Cart ({cartItems.length})
        </button>
        <button onClick={() => setRoute("checkout")} className="nav-btn">
          Checkout
        </button>
        <button onClick={logoutUser} className="nav-btn logout-btn">
          Logout
        </button>
      </div>

      <div style={{ fontSize: "18px", fontWeight: "500" }}>{greeting}</div>
    </nav>
  );
}
