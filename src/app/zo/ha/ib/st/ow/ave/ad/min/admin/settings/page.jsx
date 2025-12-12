"use client";
import AdminProtectedRoute from "@/app/components/AdminProtectedRoute";

import React, { useEffect, useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adminCredentials"));
    if (saved) {
      setForm({
        username: saved.username || "",
        email: saved.email || "",
        password: saved.password || "",
      });
    } else {
      setForm({ username: "admin", email: "", password: "12345" });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "adminCredentials",
      JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password,
      })
    );
    alert("✅ Settings saved successfully!");
  };
 

  return (
        

    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#1f2251]">Settings</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin Name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
          <input
            type="password"
            placeholder="Change Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#1f2251] text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
        

  );
}
