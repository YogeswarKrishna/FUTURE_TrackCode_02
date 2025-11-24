import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const { addToCart } = useContext(CartContext);
  const [toast, setToast] = useState(""); // 👈 Added toast state

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleFilter = () => {
    let filtered = [...products];
    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (price !== "All") {
      if (price === "Low") filtered = filtered.filter((p) => p.price < 50);
      if (price === "Medium")
        filtered = filtered.filter((p) => p.price >= 50 && p.price <= 100);
      if (price === "High") filtered = filtered.filter((p) => p.price > 100);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [category, price]);

  // 🛒 Handle Add to Cart with Toast
  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(`"${product.title}" added to cart 🛒`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div style={{ padding: "30px", position: "relative" }}>
      <h2>🛍️ Products</h2>

      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <label>
          Category:{" "}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option>All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewellery</option>
            <option value="electronics">Electronics</option>
          </select>
        </label>

        <label>
          Price:{" "}
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option>All</option>
            <option value="Low">Low (&lt; ₹4000)</option>
            <option value="Medium">Medium (₹4000 - ₹8000)</option>
            <option value="High">High (&gt; ₹8000)</option>
          </select>
        </label>
      </div>

      {/* Products */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "120px", objectFit: "contain" }}
            />
            <h4>{product.title}</h4>
            <p>₹{Math.round(product.price * 83)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Toast Popup */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#007bff",
            color: "white",
            padding: "14px 20px",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            animation: "fadeInOut 2.5s ease",
            fontWeight: "500",
          }}
        >
          {toast}
        </div>
      )}

      {/* Toast Animation */}
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; }
            100% { opacity: 0; transform: translateY(20px); }
          }
        `}
      </style>
    </div>
  );
}
