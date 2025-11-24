import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import { CartProvider } from "./CartContext";
import "./App.css";

export default function App() {
  const [route, setRoute] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  const logoutUser = () => {
    setLoggedIn(false);
    alert("Logging out successfully 👋");
  };

  return (
    <CartProvider>
      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <>
          <Navbar setRoute={setRoute} logoutUser={logoutUser} />
          {route === "home" && <Home />}
          {route === "cart" && <CartPage />}
          {route === "checkout" && <Checkout />}
        </>
      )}
    </CartProvider>
  );
}
