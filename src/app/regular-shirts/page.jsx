"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RegularShirtsPage() {
  const router = useRouter();
  const [regularProducts, setRegularProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

  // ✅ Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products?category=regular-tshirts`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        // ✅ Ensure `data` is an array before mapping
        if (Array.isArray(data)) {
          setRegularProducts(
            data.map((item) => ({
              id: item._id,
              name: item.title,
              price: `PKR ${item.price}`,
              oldPrice: `PKR ${item.originalPrice}`,
              discount: item.discount || "0",
              image: item.image?.startsWith("http")
                ? item.image
                : `${BASE_URL}/uploads/${item.image}`,
              description: item.description || "No description available",
            }))
          );
        } else {
          console.error("Unexpected API response:", data);
          setRegularProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setRegularProducts([]);
      }
    };

    fetchProducts();

    // ✅ Load favorites from localStorage
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs.map((item) => item.id));
  }, [BASE_URL]);

  // ✅ Toggle favorite item
  const toggleFavorite = (product) => {
    let existingFav = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = existingFav.find((item) => item.id === product.id);

    if (exists) {
      existingFav = existingFav.filter((item) => item.id !== product.id);
    } else {
      existingFav.push(product);
    }

    localStorage.setItem("favorites", JSON.stringify(existingFav));
    setFavorites(existingFav.map((item) => item.id));
  };

  // ✅ Add item to cart
  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize) return alert("Please select a size!");

    const newItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      size: selectedSize,
      quantity,
      image: selectedProduct.image,
    };

    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += newItem.quantity;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    router.push("/cart");
  };

  return (
    // <div className="max-w-6xl mx-auto px-6 py-12">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 bg-white dark:bg-white text-black">

      <h2 className="text-3xl font-bold text-black mb-4">Regular-Shirts</h2>
      <p className="text-gray-500 mb-8">
        Comfortable & stylish regular-fit shirts perfect for daily wear and formal occasions.
      </p>

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {regularProducts.map((product) => (
          <div key={product.id} className="relative group">
            <div className="relative w-full h-72 overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Discount Tag */}
              {product.discount !== "0" && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}

              {/* Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setQuantity(1);
                    setSelectedSize(null);
                  }}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
                >
                  <FaEye className="text-gray-800" />
                </button>
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-2 rounded-full shadow ${
                    favorites.includes(product.id)
                      ? "bg-gray-300 text-red-600"
                      : "bg-white text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <FaHeart />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setQuantity(1);
                  setSelectedSize(null);
                }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500"
              >
                <span className="bg-red-600 text-white px-4 py-2 font-semibold rounded">
                  Add to Cart
                </span>
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-4 text-center">
              <p className="font-semibold text-gray-900">{product.name}</p>
              <div className="flex justify-center gap-2 items-center">
                <span className="text-gray-400 line-through text-sm">
                  {product.oldPrice}
                </span>
                <span className="text-red-600 font-bold">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
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
              <div className="relative w-full h-96 flex items-center justify-center">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-lg text-gray-700 mb-2">{selectedProduct.price}</p>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                {/* Size Selection */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Size:</p>
                  <div className="flex gap-3">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`border px-3 py-1 text-sm transition ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "hover:bg-black hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
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

                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 bg-black text-white hover:bg-red-600 transition"
                >
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
