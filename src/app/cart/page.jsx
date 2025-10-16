"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Calculate subtotal and tax
  useEffect(() => {
    const calcSubtotal = cartItems.reduce((acc, item) => {
      const priceNum = Number(item.price.replace(/[^\d]/g, "")) || 0;
      return acc + priceNum * item.quantity;
    }, 0);
    setSubtotal(calcSubtotal);
    setTax(Math.round(calcSubtotal * 0.1)); // 10% tax
  }, [cartItems]);

  // Update quantity
  const updateQuantity = (index, change) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Delete item
  const deleteItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save & Continue (with API call)
  const handleSaveContinue = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Cart is empty!");

    const order = {
      customer: formData,
      cart: cartItems,
      orderDate: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save order");
      }

      const data = await res.json();
      console.log("✅ Order Saved:", data);

      // Clear local data
      localStorage.removeItem("cart");
      setCartItems([]);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
      });

      alert("✅ Order saved successfully in database!");
      setShowForm(false);
    } catch (err) {
      console.error("❌ API Error:", err);
      alert("Failed to save order! Check console for details.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 gap-6">
      {/* ---------------- Cart ---------------- */}
      <div className="w-full md:w-2/3 bg-white shadow-md border border-gray-200 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center border-b pb-2">
                <Image
                  src={item.image || item.images?.[0]}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="text-sm">Price: PKR {item.price}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => updateQuantity(idx, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateQuantity(idx, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    –
                  </button>
                  <button
                    onClick={() => deleteItem(idx)}
                    className="px-2 py-1 text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>PKR {subtotal}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (10%):</span> <span>PKR {tax}</span>
            </p>
            <p className="flex justify-between font-bold mt-2 border-t pt-2">
              <span>Grand Total:</span> <span>PKR {subtotal + tax}</span>
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-4 w-full bg-black text-white py-3 rounded hover:bg-red-600 transition"
            >
              Enter Customer Details
            </button>
          </div>
        )}
      </div>

      {/* ---------------- Slide-in Customer Form ---------------- */}
      {showForm && (
        <div className="w-full md:w-1/3 bg-white shadow-md border border-gray-200 p-6 rounded-xl max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Customer Details</h2>
          <form onSubmit={handleSaveContinue} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded hover:bg-red-600 transition"
            >
              Save & Continue
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-full mt-2 border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
