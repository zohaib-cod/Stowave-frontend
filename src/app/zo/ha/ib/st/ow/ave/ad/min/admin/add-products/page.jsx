"use client";
import React, { useState } from "react";

export default function AddProductsPage() {
  const [category, setCategory] = useState("regular-tshirts");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#1f2251]">Add New Product</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
        <form className="space-y-4">
          <input type="text" placeholder="Product Name" className="w-full border rounded-lg p-2" />

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-lg p-2">
            <option value="regular-tshirts">Regular T-Shirts</option>
            <option value="oversize-tshirts">Oversize T-Shirts</option>
          </select>

          <input type="number" placeholder="Price" className="w-full border rounded-lg p-2" />
          <input type="file" className="w-full border rounded-lg p-2" />

          <button type="submit" className="w-full bg-[#1f2251] text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
