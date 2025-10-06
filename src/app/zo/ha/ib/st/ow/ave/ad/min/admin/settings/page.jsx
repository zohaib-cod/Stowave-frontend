"use client";
import React from "react";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#1f2251]">Settings</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
        <form className="space-y-4">
          <input type="text" placeholder="Admin Name" className="w-full border rounded-lg p-2" />
          <input type="email" placeholder="Email" className="w-full border rounded-lg p-2" />
          <input type="password" placeholder="Change Password" className="w-full border rounded-lg p-2" />
          <button type="submit" className="w-full bg-[#1f2251] text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
