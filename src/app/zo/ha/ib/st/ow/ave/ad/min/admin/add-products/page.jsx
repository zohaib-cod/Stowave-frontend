"use client";
import React, { useState, useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";

// ✅ Use environment variable for backend API
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

export default function AddProductsPage() {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    discount: "",
    stock: true,
    image: null,
    category: "regular-tshirts",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const categories = ["all", "regular-tshirts", "oversize-tshirts"];

  // ✅ Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (cat = category) => {
    try {
      let url = `${API_BASE}/api/products`;
      if (cat && cat !== "all") url += `?category=${cat}`;

      const res = await fetch(url);
      const data = await res.json();

      // ✅ Handle both object and array responses safely
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.warn("Unexpected response:", data);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") setFormData({ ...formData, [name]: files[0] });
    else if (type === "checkbox") setFormData({ ...formData, [name]: checked });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("price", formData.price);
    payload.append("originalPrice", formData.originalPrice);
    payload.append("discount", formData.discount);
    payload.append("stock", formData.stock);
    payload.append("category", formData.category);
    if (formData.image) payload.append("image", formData.image);

    try {
      let url = `${API_BASE}/api/products`;
      const method = editingId ? "PUT" : "POST";
      if (editingId) url += `/${editingId}`;

      const res = await fetch(url, { method, body: payload });
      if (!res.ok) throw new Error("Failed to save product");

      await fetchProducts();
      setFormData({
        title: "",
        price: "",
        originalPrice: "",
        discount: "",
        stock: true,
        image: null,
        category: "regular-tshirts",
      });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      stock: product.stock,
      image: null,
      category: product.category,
    });
    setEditingId(product._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700 text-center">
        Products Management
      </h1>

      {/* Category Tabs + Add Button */}
      <div className="flex gap-4 mb-8 justify-center flex-wrap items-center">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              category === cat
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-indigo-50"
            }`}
            onClick={() => {
              setCategory(cat);
              fetchProducts(cat);
            }}
          >
            {cat === "all" ? "All" : cat.replace("-", " ").toUpperCase()}
          </button>
        ))}

        <button
          onClick={() => setShowForm(!showForm)}
          className="ml-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
        >
          {showForm ? <FiX size={24} /> : <FiPlus size={24} />}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product Title"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Discounted Price"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="Original Price"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Discount %"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="stock"
                checked={formData.stock}
                onChange={handleChange}
                className="w-5 h-5 accent-indigo-600"
              />
              <span className="text-gray-700 font-medium">In Stock</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="regular-tshirts">Regular T-Shirts</option>
              <option value="oversize-tshirts">Oversize T-Shirts</option>
            </select>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((p) => (
              <div
                key={p._id}
                className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center"
              >
                <img
                  src={
                    p.image?.startsWith("http")
                      ? p.image
                      : `${API_BASE}/uploads/${p.image}`
                  }
                  alt={p.title}
                  className="w-32 h-32 object-cover rounded-xl mb-4"
                />
                <h3 className="font-semibold text-lg mb-2 text-gray-800 text-center">
                  {p.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  Price: <span className="font-semibold">${p.price}</span>
                </p>
                <p className="text-gray-400 mb-2 line-through">${p.originalPrice}</p>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    p.stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.stock ? "In Stock" : "Sold Out"}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-600 text-white px-4 py-1 rounded-xl hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-xl hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
