// File: src/app/swage-shirts/Post.jsx
"use client";

import React from "react";
import { motion } from "framer-motion"; // optional, animation ke liye

const SwageShirtPost = () => {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      
      {/* Background Water & Blur */}
      <div className="absolute inset-0">
        <img
          src="/images/water-bg.jpg" // apna background image yaha use karo
          alt="Water background"
          className="w-full h-full object-cover blur-sm opacity-60"
        />
      </div>

      {/* Horizontal Red Line on Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 z-15"></div>

      {/* Shirt Image */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* <img
          src="https://res.cloudinary.com/dqmjtblih/image/upload/v1763582775/stowave/products/evrijd4kendekot0uqqh.jpg" // shirt image
          alt="Swage Shirt"
          className="max-w-md mx-auto"
        /> */}
      </motion.div>

      {/* Text Overlay */}
      <div className="absolute z-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Sweat Shirt
        </h1>
        <p className="text-lg md:text-2xl">
          Coming Soon - Stay Tuned!
        </p>
      </div>
    </div>
  );
};

export default SwageShirtPost;
