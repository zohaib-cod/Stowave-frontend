"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaCheckCircle,
  FaHeart,
  FaEye,
} from "react-icons/fa";

export default function RegularShirtsPage() {
  const categories = [
    {
      label: "Oversize-Shirts",
      image: "/oversize-circle.jpeg",
      link: "/oversize-shirts",
    },
    {
      label: "Regular-Shirts",
      image: "/simple-circle.jpeg",
      link: "/regular-shirts",
    },
  ];

  const regularProducts = [
    {
      id: 1,
      name: "Regular Fit Polo",
      price: "PKR 2,199",
      image: "/slider1.png",
      hoverImage: "/slider2.png",
      description: "Classic polo shirt with a timeless regular fit.",
    },
    {
      id: 2,
      name: "Casual Regular Tee",
      price: "PKR 1,699",
      image: "/slider3.png",
      hoverImage: "/slider4.png",
      description: "Everyday casual tee with regular fit comfort.",
    },
    {
      id: 3,
      name: "Regular Cotton Shirt",
      price: "PKR 2,399",
      image: "/slider5.png",
      hoverImage: "/slider1.png",
      description: "Soft cotton shirt, breathable & durable for daily use.",
    },
    {
      id: 4,
      name: "Classic Regular Shirt",
      price: "PKR 2,599",
      image: "/slider2.png",
      hoverImage: "/slider3.png",
      description: "Classic style regular shirt with sharp stitching.",
    },
    {
      id: 5,
      name: "Formal Regular Shirt",
      price: "PKR 2,999",
      image: "/slider3.png",
      hoverImage: "/slider4.png",
      description: "Perfect formal wear with a modern regular fit.",
    },
    {
      id: 6,
      name: "Regular Striped Tee",
      price: "PKR 1,899",
      image: "/slider4.png",
      hoverImage: "/slider5.png",
      description: "Trendy striped tee in a comfortable regular fit.",
    },
    {
      id: 7,
      name: "Summer Regular Fit",
      price: "PKR 2,099",
      image: "/slider5.png",
      hoverImage: "/slider1.png",
      description: "Light & breathable shirt for hot summer days.",
    },
    {
      id: 8,
      name: "Winter Regular Hoodie",
      price: "PKR 3,199",
      image: "/slider2.png",
      hoverImage: "/slider3.png",
      description: "Cozy winter hoodie in a versatile regular fit.",
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
    <div>
      {/* Category Circles */}
      <main className="w-full flex flex-col items-center py-12 bg-gray-50">
        <div className="flex gap-10 flex-wrap justify-center">
          {categories.map((cat) => (
            <Link key={cat.label} href={cat.link} className="group">
              <div className="w-56 h-56 overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-110">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-center mt-4 text-lg font-medium">{cat.label}</p>
            </Link>
          ))}
        </div>
        <div className="line w-96 h-0.5 bg-red-700"></div>
      </main>

      {/* Rating Bar */}
      <div className="w-full border-y border-gray-300 bg-[#f7f7f7] py-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-4 px-4">
          <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
            <FaCheckCircle className="text-red-700" />
            <span>4.6</span>
            <div className="flex text-red-700">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
          </div>
          <div className="text-red-700 text-sm md:text-base border-x px-4 text-center">
            4.6 out of 5 stars based on 614 reviews
          </div>
          <div className="flex items-center gap-2 text-red-700 font-semibold">
            <span>Verified</span>
            <FaCheckCircle className="text-red-700" />
          </div>
        </div>
      </div>

      {/* Regular Shirts Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-black mb-2">Regular-Shirts</h2>
        <p className="text-gray-500 mb-8">
          Comfortable & stylish regular-fit shirts perfect for daily wear and
          formal occasions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {regularProducts.map((product) => (
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

                {/* Eye + Heart */}
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
      </section>

      {/* Modal */}
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

                {/* Size Options */}
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

                {/* Quantity */}
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
