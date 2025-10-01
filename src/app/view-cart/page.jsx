"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ViewCart() {
  const [cart, setCart] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (type) => {
    if (!cart) return;
    let newQuantity = cart.quantity;
    if (type === "inc") newQuantity++;
    if (type === "dec" && newQuantity > 1) newQuantity--;

    const updatedCart = { ...cart, quantity: newQuantity };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (!cart) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border p-6 rounded-lg">
        {/* Product Image */}
        <div className="relative w-full h-80">
          <Image
            src={cart.image}
            alt={cart.name}
            fill
            className="object-cover rounded"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{cart.name}</h2>
            <p className="text-lg text-gray-700 mb-2">{cart.price}</p>
            <p className="text-gray-600 mb-4">{cart.description}</p>

            <p className="mb-2">
              <span className="font-semibold">Size:</span>{" "}
              {cart.size ? cart.size : "Not Selected"}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-4">
              <p className="font-medium">Quantity:</p>
              <button
                onClick={() => updateQuantity("dec")}
                className="border px-3 py-1"
              >
                -
              </button>
              <span>{cart.quantity}</span>
              <button
                onClick={() => updateQuantity("inc")}
                className="border px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/customerDetailForm")}
              className="flex-1 py-2 bg-black text-white hover:bg-red-600 transition"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("cart");
                setCart(null);
              }}
              className="flex-1 py-2 border border-black hover:bg-red-600 hover:text-white transition"
            >
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
