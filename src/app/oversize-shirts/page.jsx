"use client";

import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";

export default function OversizeShirts() {
  const oversizeProducts = [
    {
      id: 1,
      name: "Oversize T-Shirt",
      price: "PKR 1,999",
      image: "/simple-circle.jpeg",
      hoverImage: "/oversize-circle.jpeg",
      description: "Premium cotton oversized fit perfect for daily wear.",
    },
    {
      id: 2,
      name: "Classic Oversize",
      price: "PKR 2,499",
      image: "/slider1.png",
      hoverImage: "/slider2.png",
      description: "Classic oversize shirt with high-quality dobby fabric.",
    },
    {
      id: 3,
      name: "Streetwear Oversize",
      price: "PKR 2,199",
      image: "/slider3.png",
      hoverImage: "/slider4.png",
      description: "Streetwear-inspired oversized shirt for bold looks.",
    },
    {
      id: 4,
      name: "Dobby Fabric Shirt",
      price: "PKR 2,999",
      image: "/slider4.png",
      hoverImage: "/slider5.png",
      description: "Unique dobby fabric, perfect for late summers & winters.",
    },
    {
      id: 5,
      name: "Casual Oversize Tee",
      price: "PKR 1,899",
      image: "/slider5.png",
      hoverImage: "/slider1.png",
      description: "Soft cotton casual tee for everyday comfort.",
    },
    {
      id: 6,
      name: "Summer Oversize Shirt",
      price: "PKR 2,299",
      image: "/slider2.png",
      hoverImage: "/slider3.png",
      description: "Lightweight summer oversize shirt with breathable fabric.",
    },
    {
      id: 7,
      name: "Urban Oversize Fit",
      price: "PKR 2,799",
      image: "/slider3.png",
      hoverImage: "/slider4.png",
      description: "Trendy urban-style oversized shirt with premium stitch.",
    },
    {
      id: 8,
      name: "Winter Oversize Hoodie",
      price: "PKR 3,499",
      image: "/slider4.png",
      hoverImage: "/slider5.png",
      description: "Warm & cozy oversized hoodie perfect for winters.",
    },
  ];

  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-black mb-4">Oversize-Shirts</h2>
      <p className="text-gray-500 mb-8">
        Introducing the Dobby fabric. Comes with a unique pattern embossed and
        is perfect for late summers & early winters.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {oversizeProducts.map((product) => (
          <div key={product.id} className="relative group">
            <div className="relative w-full h-72 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              <Image
                src={product.hoverImage}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
                >
                  <FaEye className="text-gray-800" />
                </button>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-2 rounded-full shadow ${
                    favorites.includes(product.id)
                      ? "bg-gray-300 text-red-600"
                      : "bg-white text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-gray-700">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-xl font-bold"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full h-96">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-lg text-gray-700 mb-2">
                  {selectedProduct.price}
                </p>
                <div className="w-16 h-0.5 bg-gray-400 mb-4"></div>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                <div className="mb-4">
                  <p className="font-medium mb-2">Size:</p>
                  <div className="flex gap-3">
                    {["Small", "Medium", "Large"].map((size) => (
                      <button
                        key={size}
                        className="border px-3 py-1 text-sm hover:bg-black hover:text-white transition"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <p className="font-medium">Quantity:</p>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="border px-3 py-1"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="border px-3 py-1"
                  >
                    +
                  </button>
                </div>

                <button className="w-full py-2 bg-black text-white hover:bg-red-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
