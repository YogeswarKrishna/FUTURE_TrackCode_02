import React, { useState } from "react";
import "./Login.css";

export default function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setToast("Login Successful 🎉");
      setTimeout(() => {
        setLoggedIn(true);
        setToast("");
      }, 1000);
    } else {
      setToast("⚠️ Please enter both email and password");
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card fade-slide">
        <h1 className="login-title">Welcome to Krishna’s Mart 🛍️</h1>
        <p className="login-subtitle">Please log in to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
