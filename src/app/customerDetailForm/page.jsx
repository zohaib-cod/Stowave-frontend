// "use client";

// import { useState } from "react";

// export default function CustomerDetails() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Customer Details Submitted:", formData);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex justify-center items-center p-6">
//       <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 p-8">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
//           Customer Details
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:border-red-600"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:border-red-600"
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:border-red-600"
//               required
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Address
//             </label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:border-red-600"
//               rows="3"
//               required
//             ></textarea>
//           </div>

//           {/* City & Postal Code */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 City
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:border-red-600"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Postal Code
//               </label>
//               <input
//                 type="text"
//                 name="postalCode"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:border-red-600"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 font-semibold transition-colors hover:bg-red-600"
//           >
//             Save & Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
























// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function CustomerDetails() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });

//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(cart);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Combine customer details + cart items
//     const order = {
//       customer: formData,
//       cart: cartItems,
//       orderDate: new Date().toISOString(),
//     };

//     // Save to local storage "orders"
//     const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

//     alert("Order saved to local storage!");
    
//     // Clear cart after checkout
//     localStorage.removeItem("cart");
//     setCartItems([]);
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       postalCode: "",
//     });
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row justify-center items-start p-6 gap-6">
      
//       {/* ---------------- Cart Preview ---------------- */}
//       <div className="w-full md:w-1/2 bg-white shadow-md border border-gray-200 p-6 rounded-xl max-h-[80vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4 border-b pb-2">Cart Items</h2>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item, idx) => (
//               <div key={idx} className="flex gap-4 items-center border-b pb-2">
//                 <Image
//                   src={item.image || item.images?.[0]}
//                   alt={item.name}
//                   width={60}
//                   height={60}
//                   className="object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold">{item.name}</p>
//                   {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
//                   <p className="text-sm">Qty: {item.quantity}</p>
//                   <p className="text-sm">Price: PKR {item.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ---------------- Customer Form ---------------- */}
//       <div className="w-full md:w-1/2 bg-white shadow-md border border-gray-200 p-6 rounded-xl">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Customer Details</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//             required
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//             required
//           />
//           <textarea
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             rows={3}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//             required
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//               required
//             />
//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal Code"
//               value={formData.postalCode}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded hover:bg-red-600 transition"
//           >
//             Save Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }























// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function CustomerDetails() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });

//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("orders")) || [];
//     setCartItems(cart);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const order = {
//       customer: formData,
//       cart: cartItems,
//       orderDate: new Date().toISOString(),
//     };

//     const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

//     // Clear cart after saving
//     localStorage.removeItem("cart");
//     setCartItems([]);
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       postalCode: "",
//     });

//     // ---------------- API PLACEHOLDER ----------------
//     // fetch("/api/orders", { method: "POST", body: JSON.stringify(order) })

//     alert("Order saved! (Cart cleared and ready for next order)");
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row justify-center items-start p-6 gap-6">
      
//       {/* ---------------- Cart Preview ---------------- */}
//       <div className="w-full md:w-1/2 bg-white shadow-md border border-gray-200 p-6 rounded-xl max-h-[80vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4 border-b pb-2">Cart Items</h2>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item, idx) => (
//               <div key={idx} className="flex gap-4 items-center border-b pb-2">
//                 <Image
//                   src={item.image || item.images?.[0]}
//                   alt={item.name}
//                   width={60}
//                   height={60}
//                   className="object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold">{item.name}</p>
//                   {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
//                   <p className="text-sm">Qty: {item.quantity}</p>
//                   <p className="text-sm">Price: PKR {item.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ---------------- Customer Form ---------------- */}
//       <div className="w-full md:w-1/2 bg-white shadow-md border border-gray-200 p-6 rounded-xl">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Customer Details</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//             required
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//             required
//           />
//           <textarea
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             rows={3}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//             required
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//               required
//             />
//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal Code"
//               value={formData.postalCode}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-600"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded hover:bg-red-600 transition"
//           >
//             Save & Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import React from 'react'

const page = () => {
  return (
    <div>
      this page is under construction by zohaib 
    </div>
  )
}

export default page
