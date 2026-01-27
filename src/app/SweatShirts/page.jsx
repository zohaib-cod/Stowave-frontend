"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SwagShirtsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://stowave-backend-1.onrender.com";

  // Fetch products and load favorites
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products?category=swage-shirts`);
        const data = await res.json();

        const list =
          Array.isArray(data) && data.length
            ? data
            : Array.isArray(data.products)
            ? data.products
            : [];

        const normalized = list.map((item) => ({
          id: item._id || item.id,
          name: item.title || item.name,
          price: `PKR ${item.price}`,
          oldPrice: `PKR ${item.originalPrice || item.oldPrice || item.original_price}`,
          discount: item.discount || "0",
          image: item.image?.startsWith("http")
            ? item.image
            : `${BASE_URL}/uploads/${item.image}`,
          description: item.description || "No description available",
          raw: item,
        }));

        setProducts(normalized);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs.map((item) => item.id));
  }, [BASE_URL]);

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
    setSelectedProduct(null);
    router.push("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-black dark:text-white transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        SweatShirts
      </h2>

      <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base text-center md:text-left">
        Trendy & stylish SweatShirts shirts perfect for casual and streetwear looks.
      </p>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-none bg-gray-200 dark:bg-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-none">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {product.discount !== "0" && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}

                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setQuantity(1);
                      setSelectedSize(null);
                    }}
                    className="bg-white dark:bg-white p-1.5 md:p-2 rounded-full shadow hover:bg-gray-200 transition"
                  >
                    <FaEye className="text-gray-800 dark:text-black text-sm md:text-base" />
                  </button>

                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`p-1.5 md:p-2 rounded-full shadow transition ${
                      favorites.includes(product.id)
                        ? "bg-gray-300 text-red-600"
                        : "bg-white dark:bg-white text-gray-800 dark:text-black hover:bg-gray-200"
                    }`}
                  >
                    <FaHeart className="text-sm md:text-base" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setQuantity(1);
                    setSelectedSize(null);
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           flex items-center justify-center bg-red-600 text-white font-semibold 
                           px-3 py-1.5 md:px-4 md:py-2 rounded-md opacity-0 group-hover:opacity-100 transition duration-500 text-sm md:text-base"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-3 md:mt-4 text-center">
                <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                  {product.name}
                </p>
                {/* <div className="flex justify-center items-center gap-2 mt-1">
                  <p className="text-gray-500 line-through text-xs md:text-sm dark:text-gray-300">
                    {product.oldPrice}
                  </p>
                  <p className="text-red-600 font-bold text-sm md:text-base">
                    {product.price}
                  </p>
                </div> */}<div className="flex justify-center items-center gap-2 mt-1">
  {product.oldPrice !== product.price && (
    <p className="text-gray-500 line-through text-xs md:text-sm dark:text-gray-300">
      {product.oldPrice}
    </p>
  )}
  <p className="text-red-600 font-bold text-sm md:text-base">
    {product.price}
  </p>
</div>

              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 dark:text-white p-4 md:p-6 rounded-lg w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 md:top-3 md:right-3 text-xl font-bold z-10 bg-white dark:bg-white rounded-full w-8 h-8 flex items-center justify-center text-black"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-bold dark:text-white">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 line-through text-sm md:text-base dark:text-gray-300">
                    {selectedProduct.oldPrice}
                  </p>
                  <p className="text-lg text-gray-700 font-semibold dark:text-white">
                    {selectedProduct.price}
                  </p>
                </div>
                <p className="text-gray-600 text-sm md:text-base dark:text-gray-300">
                  {selectedProduct.description}
                </p>

                <div>
                  <p className="font-medium mb-2 text-sm md:text-base dark:text-white">
                    Size:
                  </p>
                  <div className="flex gap-2 md:gap-3">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`border px-2 md:px-3 py-1 text-xs md:text-sm transition ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-medium text-sm md:text-base dark:text-white">
                    Quantity:
                  </p>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="border px-2 md:px-3 py-1 text-sm md:text-base dark:text-white dark:border-white"
                  >
                    -
                  </button>
                  <span className="text-sm md:text-base dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="border px-2 md:px-3 py-1 text-sm md:text-base dark:text-white dark:border-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 md:py-3 bg-black text-white hover:bg-red-600 transition text-sm md:text-base rounded-md"
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
