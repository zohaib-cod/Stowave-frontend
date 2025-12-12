"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminSlider() {
  const [imageFile, setImageFile] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Live API URL from .env
  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/sliders";

  // Fetch all sliders
  const fetchSliders = async () => {
    try {
      const res = await axios.get(API_URL);
      setSliders(res.data.sliders || []);
    } catch (err) {
      console.error("Error fetching sliders:", err.response || err);
      alert("Failed to fetch sliders");
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // Upload slider
  const handleUpload = async () => {
    if (!imageFile) return alert("Select an image first!");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Slider uploaded!");
      setImageFile(null);
      fetchSliders();
    } catch (err) {
      console.error("Upload error:", err.response || err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete single slider
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this slider?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSliders();
    } catch (err) {
      console.error(err.response || err);
      alert("Delete failed");
    }
  };

  // ✅ Delete All Sliders
  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete ALL sliders?")) return;
    try {
      await Promise.all(sliders.map((s) => axios.delete(`${API_URL}/${s._id}`)));
      fetchSliders();
      alert("All sliders deleted!");
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to delete all sliders");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Slider Admin Panel</h1>

      {/* Delete All Button */}
      {sliders.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
        >
          Delete All Sliders
        </button>
      )}

      {/* Upload Form */}
      <div className="mb-6 flex flex-col gap-3 border p-4 rounded shadow">
        <input
          className="rounded-[3px] bg-amber-600 pl-1 w-52"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-32"
        >
          {loading ? "Uploading..." : "Upload Slider"}
        </button>
      </div>

      {/* Existing Sliders */}
      <h2 className="text-xl font-semibold mb-2">Existing Sliders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sliders.length === 0 && <p>No sliders yet.</p>}
        {sliders.map((slider) => (
          <div key={slider._id} className="border rounded p-2 relative">
            <img
              src={slider.imageUrl}
              alt="slider"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <button
              onClick={() => handleDelete(slider._id)}
              className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
