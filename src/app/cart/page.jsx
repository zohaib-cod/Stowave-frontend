// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [tax, setTax] = useState(0);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(cart);
//   }, []);

//   useEffect(() => {
//     const calcSubtotal = cartItems.reduce((acc, item) => {
//       const priceNum = Number(item.price.replace(/[^\d]/g, "")) || 0;
//       return acc + priceNum * item.quantity;
//     }, 0);

//     setSubtotal(calcSubtotal);
//     setTax(Math.round(calcSubtotal * 0.1)); // 10% tax
//   }, [cartItems]);

//   const updateQuantity = (index, change) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   if (cartItems.length === 0) {
//     return <div className="p-6 text-center text-lg">Your cart is empty.</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">
//         Your Cart ({cartItems.length} items)
//       </h1>

//       {/* Cart Items */}
//       <div className="space-y-6">
//         {cartItems.map((item, idx) => (
//           <div key={idx} className="flex justify-between items-center border-b pb-4">
//             {/* Left: Image + Details */}
//             <div className="flex gap-4">
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 width={80}
//                 height={80}
//                 className="object-cover rounded"
//               />
//               <div>
//                 <h2 className="font-semibold">{item.name}</h2>
//                 <p className="text-gray-600">{item.size ? `Size: ${item.size}` : ""}</p>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="w-28 text-center">
//               <p>PKR {Number(item.price.replace(/[^\d]/g, ""))}</p>
//             </div>

//             {/* Quantity */}
//             <div className="flex items-center gap-2 border rounded px-2">
//               <button
//                 onClick={() => updateQuantity(idx, -1)}
//                 className="px-2 py-1 text-lg"
//               >
//                 –
//               </button>
//               <span>{item.quantity}</span>
//               <button
//                 onClick={() => updateQuantity(idx, 1)}
//                 className="px-2 py-1 text-lg"
//               >
//                 +
//               </button>
//             </div>

//             {/* Total */}
//             <div className="w-28 text-right">
//               <p>
//                 PKR {Number(item.price.replace(/[^\d]/g, "")) * item.quantity}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Summary */}
//       <div className="mt-8 border-t pt-6">
//         <div className="flex justify-between mb-2">
//           <p>Subtotal:</p>
//           <p>PKR {subtotal}</p>
//         </div>
//         <div className="flex justify-between mb-2">
//           <p>Sales Tax:</p>
//           <p>PKR {tax}</p>
//         </div>
//         <div className="flex justify-between mb-2">
//           <p>Coupon Code:</p>
//           <button className="text-blue-600 underline">Add Coupon</button>
//         </div>
//         <div className="flex justify-between font-bold text-lg border-t pt-2">
//           <p>Grand Total:</p>
//           <p>PKR {subtotal + tax}</p>
//         </div>
//       </div>

//       {/* Checkout */}
//       <div className="mt-6 flex flex-col items-end">
//         <p className="text-green-600 mb-2">
//           Congrats, you’re eligible for Free Shipping 🚚
//         </p>
//         <button className="bg-black text-white px-6 py-3 font-semibold rounded hover:bg-red-600 transition">
//           Check out
//         </button>
//       </div>
//     </div>
//   );
// }













"use client"; 
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Router import

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const router = useRouter(); // ✅ Router instance

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  useEffect(() => {
    const calcSubtotal = cartItems.reduce((acc, item) => {
      const priceNum = Number(item.price.replace(/[^\d]/g, "")) || 0;
      return acc + priceNum * item.quantity;
    }, 0);

    setSubtotal(calcSubtotal);
    setTax(Math.round(calcSubtotal * 0.1)); // 10% tax
  }, [cartItems]);

  const updateQuantity = (index, change) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return <div className="p-6 text-center text-lg">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Your Cart ({cartItems.length} items)
      </h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center border-b pb-4">
            {/* Left: Image + Details */}
            <div className="flex gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.size ? `Size: ${item.size}` : ""}</p>
              </div>
            </div>

            {/* Price */}
            <div className="w-28 text-center">
              <p>PKR {Number(item.price.replace(/[^\d]/g, ""))}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2 border rounded px-2">
              <button
                onClick={() => updateQuantity(idx, -1)}
                className="px-2 py-1 text-lg"
              >
                –
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(idx, 1)}
                className="px-2 py-1 text-lg"
              >
                +
              </button>
            </div>

            {/* Total */}
            <div className="w-28 text-right">
              <p>
                PKR {Number(item.price.replace(/[^\d]/g, "")) * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between mb-2">
          <p>Subtotal:</p>
          <p>PKR {subtotal}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Sales Tax:</p>
          <p>PKR {tax}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Coupon Code:</p>
          <button className="text-blue-600 underline">Add Coupon</button>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <p>Grand Total:</p>
          <p>PKR {subtotal + tax}</p>
        </div>
      </div>

      {/* Checkout */}
      <div className="mt-6 flex flex-col items-end">
        <p className="text-green-600 mb-2">
          Congrats, you’re eligible for Free Shipping 🚚
        </p>
        <button
          className="bg-black text-white px-6 py-3 font-semibold rounded hover:bg-red-600 transition"
          onClick={() => router.push("/customerDetailForm")} // ✅ Checkout route
        >
          Check out
        </button>
      </div>
    </div>
  );
}
