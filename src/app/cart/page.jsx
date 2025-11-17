// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });

//   const BASE_URL =
//     process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

//   // ✅ Load cart
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(cart);
//   }, []);

//   // ✅ Subtotal ONLY (Tax Removed)
//   useEffect(() => {
//     const calcSubtotal = cartItems.reduce((acc, item) => {
//       const priceNum = Number(item.price.replace(/[^\d]/g, "")) || 0;
//       return acc + priceNum * item.quantity;
//     }, 0);
//     setSubtotal(calcSubtotal);
//   }, [cartItems]);

//   const updateQuantity = (index, change) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const deleteItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSaveContinue = async (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) return alert("🛒 Your cart is empty!");

//     const order = {
//       customer: formData,
//       cart: cartItems,
//       orderDate: new Date().toISOString(),
//     };

//     try {
//       const res = await fetch(`${BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(order),
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData.error || "Failed to save order");
//       }

//       const data = await res.json();
//       console.log("✅ Order saved:", data);

//       localStorage.removeItem("cart");
//       setCartItems([]);
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         address: "",
//         city: "",
//         postalCode: "",
//       });
//       setShowForm(false);
//       alert("✅ Order saved successfully!");
//     } catch (err) {
//       console.error("❌ API Error:", err);
//       alert("Failed to save order! Check console for details.");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 gap-6 text-black dark:text-white transition-colors duration-300">
//       {/* ---------------- CART ---------------- */}
//       <div className="w-full md:w-2/3 bg-white dark:bg-neutral-900 shadow-md border border-gray-200 dark:border-neutral-700 p-6 rounded-2xl">
//         <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-neutral-700 pb-2">
//           Cart Items
//         </h2>

//         {cartItems.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="flex gap-4 items-center border-b border-gray-200 dark:border-neutral-700 pb-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition rounded-lg p-2"
//               >
//                 <Image
//                   src={item.image || item.images?.[0]}
//                   alt={item.name}
//                   width={70}
//                   height={70}
//                   className="object-cover rounded-md"
//                 />

//                 <div className="flex-1">
//                   <p className="font-semibold">{item.name}</p>
//                   {item.size && (
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Size: {item.size}</p>
//                   )}
//                   <p className="text-sm">Qty: {item.quantity}</p>
//                   <p className="text-sm font-medium">{item.price}</p>
//                 </div>

//                 <div className="flex flex-col gap-1">
//                   <button
//                     onClick={() => updateQuantity(idx, 1)}
//                     className="px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => updateQuantity(idx, -1)}
//                     className="px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600"
//                   >
//                     –
//                   </button>
//                   <button
//                     onClick={() => deleteItem(idx)}
//                     className="px-2 py-1 text-red-600 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {cartItems.length > 0 && (
//           <div className="mt-6 border-t border-gray-300 dark:border-neutral-700 pt-4">
//             <p className="flex justify-between">
//               <span>Subtotal:</span> <span>PKR {subtotal}</span>
//             </p>

//             {/* ❌ TAX REMOVED */}

//             <p className="flex justify-between font-bold mt-2 border-t border-gray-300 dark:border-neutral-700 pt-2">
//               <span>Grand Total:</span> <span>PKR {subtotal}</span>
//             </p>

//             <button
//               onClick={() => setShowForm(true)}
//               className="mt-4 w-full bg-black dark:bg-red-600 text-white py-3 rounded-md hover:bg-red-600 dark:hover:bg-black transition font-medium"
//             >
//               Enter Customer Details
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ---------------- CUSTOMER FORM ---------------- */}
//       {showForm && (
//         <div className="w-full md:w-1/3 bg-white dark:bg-neutral-900 shadow-md border border-gray-200 dark:border-neutral-700 p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
//           <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-neutral-700 pb-2">
//             Customer Details
//           </h2>

//           <form onSubmit={handleSaveContinue} className="space-y-4">
//             {[
//               { name: "fullName", type: "text", placeholder: "Full Name" },
//               { name: "email", type: "email", placeholder: "Email Address" },
//               { name: "phone", type: "tel", placeholder: "Phone Number" },
//             ].map((field) => (
//               <input
//                 key={field.name}
//                 type={field.type}
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                 required
//               />
//             ))}

//             <textarea
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               rows={3}
//               className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//               required
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                 required
//               />
//               <input
//                 type="text"
//                 name="postalCode"
//                 placeholder="Postal Code"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-black dark:bg-red-600 text-white py-3 rounded-md hover:bg-red-600 dark:hover:bg-black transition font-medium"
//             >
//               Save & Continue
//             </button>

//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="w-full mt-2 border border-gray-400 dark:border-neutral-700 text-gray-700 dark:text-gray-300 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }













// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FaMapMarkerAlt } from "react-icons/fa";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });
//   const [addressDisplay, setAddressDisplay] = useState("");

//   const BASE_URL =
//     process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

//   // Load cart
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(cart);
//   }, []);

//   // Calculate subtotal
//   useEffect(() => {
//     const calcSubtotal = cartItems.reduce((acc, item) => {
//       const priceNum = Number(item.price.replace(/[^\d]/g, "")) || 0;
//       return acc + priceNum * item.quantity;
//     }, 0);
//     setSubtotal(calcSubtotal);
//   }, [cartItems]);

//   const updateQuantity = (index, change) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const deleteItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleConfirmOrder = async (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) return alert("🛒 Your cart is empty!");

//     const order = {
//       customer: formData,
//       cart: cartItems,
//       orderDate: new Date().toISOString(),
//     };

//     try {
//       const res = await fetch(`${BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(order),
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData.error || "Failed to save order");
//       }

//       const data = await res.json();
//       console.log("✅ Order saved:", data);

//       localStorage.removeItem("cart");
//       setCartItems([]);
//       setAddressDisplay(formData.address);
//       setShowForm(false);
//       alert("✅ Order confirmed successfully!");
//     } catch (err) {
//       console.error("❌ API Error:", err);
//       alert("Failed to save order! Check console for details.");
//     }
//   };

//   return (
//     <div className="relative max-w-6xl mx-auto p-6 text-black dark:text-white transition-colors duration-300">
//       {/* ---------------- ENTER ADDRESS BOX ---------------- */}
//       {cartItems.length > 0 && (
//         <div
//           onClick={() => setShowForm(true)}
//           className="cursor-pointer flex items-center gap-2 p-3 bg-white dark:bg-neutral-900 shadow-md border border-gray-300 dark:border-neutral-700 rounded-xl mb-6 hover:shadow-lg transition"
//         >
//           <FaMapMarkerAlt className="text-red-600" />
//           <span className="text-gray-700 dark:text-white">
//             {addressDisplay || "Enter your address"}
//           </span>
//         </div>
//       )}

//       {/* ---------------- CART ---------------- */}
//       <div className="bg-white dark:bg-neutral-900 shadow-md border border-gray-200 dark:border-neutral-700 p-6 rounded-2xl">
//         <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-neutral-700 pb-2">
//           Cart Items
//         </h2>

//         {cartItems.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="flex gap-4 items-center border-b border-gray-200 dark:border-neutral-700 pb-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition rounded-lg p-2"
//               >
//                 <Image
//                   src={item.image || item.images?.[0]}
//                   alt={item.name}
//                   width={70}
//                   height={70}
//                   className="object-cover rounded-md"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold">{item.name}</p>
//                   {item.size && (
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Size: {item.size}
//                     </p>
//                   )}
//                   <p className="text-sm">Qty: {item.quantity}</p>
//                   <p className="text-sm font-medium">{item.price}</p>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <button
//                     onClick={() => updateQuantity(idx, 1)}
//                     className="px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => updateQuantity(idx, -1)}
//                     className="px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600"
//                   >
//                     –
//                   </button>
//                   <button
//                     onClick={() => deleteItem(idx)}
//                     className="px-2 py-1 text-red-600 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {cartItems.length > 0 && (
//           <div className="mt-6 border-t border-gray-300 dark:border-neutral-700 pt-4">
//             <p className="flex justify-between font-bold">
//               <span>Subtotal:</span> <span>PKR {subtotal}</span>
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ---------------- CUSTOMER FORM MODAL ---------------- */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl w-full max-w-md relative shadow-lg">
//             <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
//               Customer Details
//             </h2>

//             <form onSubmit={handleConfirmOrder} className="space-y-4">
//               {[
//                 { name: "fullName", type: "text", placeholder: "Full Name" },
//                 { name: "email", type: "email", placeholder: "Email Address" },
//                 { name: "phone", type: "tel", placeholder: "Phone Number" },
//               ].map((field) => (
//                 <input
//                   key={field.name}
//                   type={field.type}
//                   name={field.name}
//                   placeholder={field.placeholder}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                   required
//                 />
//               ))}

//               <textarea
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                 required
//               />

//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="postalCode"
//                   placeholder="Postal Code"
//                   value={formData.postalCode}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-black dark:bg-red-600 text-white py-3 rounded-md hover:bg-red-600 dark:hover:bg-black transition font-medium"
//               >
//                 Confirm Order
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="w-full mt-2 border border-gray-400 dark:border-neutral-700 text-gray-700 dark:text-gray-300 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




















// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FaMapMarkerAlt } from "react-icons/fa";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });
//   const [addressDisplay, setAddressDisplay] = useState("");

//   const BASE_URL =
//     process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

//   // Load cart
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(cart);
//   }, []);

//   // Calculate subtotal
//   useEffect(() => {
//     const calcSubtotal = cartItems.reduce((acc, item) => {
//       const priceNum = Number(item.price.replace(/[^\d]/g, "")) || 0;
//       return acc + priceNum * item.quantity;
//     }, 0);
//     setSubtotal(calcSubtotal);
//   }, [cartItems]);

//   const updateQuantity = (index, change) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const deleteItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Save address only
//   const handleSaveAddress = (e) => {
//     e.preventDefault();
//     setAddressDisplay(formData.address);
//     setShowForm(false);
//   };

//   // Confirm order (API post)
//   const handleConfirmOrder = async () => {
//     if (cartItems.length === 0) return alert("🛒 Your cart is empty!");
//     if (!formData.address) return alert("Please enter your address first!");

//     const order = {
//       customer: formData,
//       cart: cartItems,
//       orderDate: new Date().toISOString(),
//     };

//     try {
//       const res = await fetch(`${BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(order),
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData.error || "Failed to save order");
//       }

//       const data = await res.json();
//       console.log("✅ Order saved:", data);

//       localStorage.removeItem("cart");
//       setCartItems([]);
//       alert("✅ Order confirmed successfully!");
//     } catch (err) {
//       console.error("❌ API Error:", err);
//       alert("Failed to confirm order! Check console.");
//     }
//   };

//   return (
//     <div className="relative max-w-6xl mx-auto p-6 text-black dark:text-white transition-colors duration-300">
//       {/* ---------------- ENTER ADDRESS BOX ---------------- */}
//       {cartItems.length > 0 && (
//         <div
//           onClick={() => setShowForm(true)}
//           className="cursor-pointer flex items-center gap-2 p-3 bg-white dark:bg-neutral-900 shadow-md border border-gray-300 dark:border-neutral-700 rounded-xl mb-6 hover:shadow-lg transition"
//         >
//           <FaMapMarkerAlt className="text-red-600" />
//           <span className="text-gray-700 dark:text-white">
//             {addressDisplay || "Enter your address"}
//           </span>
//         </div>
//       )}

//       {/* ---------------- CART ---------------- */}
//       <div className="bg-white dark:bg-neutral-900 shadow-md border border-gray-200 dark:border-neutral-700 p-6 rounded-2xl">
//         <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-neutral-700 pb-2">
//           Cart Items
//         </h2>

//         {cartItems.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="flex gap-4 items-center border-b border-gray-200 dark:border-neutral-700 pb-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition rounded-lg p-2"
//               >
//                 <Image
//                   src={item.image || item.images?.[0]}
//                   alt={item.name}
//                   width={70}
//                   height={70}
//                   className="object-cover rounded-md"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold">{item.name}</p>
//                   {item.size && (
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Size: {item.size}
//                     </p>
//                   )}
//                   <p className="text-sm">Qty: {item.quantity}</p>
//                   <p className="text-sm font-medium">{item.price}</p>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <button
//                     onClick={() => updateQuantity(idx, 1)}
//                     className="px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => updateQuantity(idx, -1)}
//                     className="px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600"
//                   >
//                     –
//                   </button>
//                   <button
//                     onClick={() => deleteItem(idx)}
//                     className="px-2 py-1 text-red-600 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {cartItems.length > 0 && (
//           <div className="mt-6 border-t border-gray-300 dark:border-neutral-700 pt-4">
//             <p className="flex justify-between font-bold">
//               <span>Subtotal:</span> <span>PKR {subtotal}</span>
//             </p>

//             {/* ---------------- CONFIRM ORDER BUTTON ---------------- */}
//             <button
//               onClick={handleConfirmOrder}
//               className="mt-4 w-full bg-red-600 dark:bg-black text-white py-3 rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition font-medium"
//             >
//               Confirm Order
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ---------------- CUSTOMER FORM MODAL ---------------- */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl w-full max-w-md relative shadow-lg">
//             <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
//               Customer Details
//             </h2>

//             <form onSubmit={handleSaveAddress} className="space-y-4">
//               {[
//                 { name: "fullName", type: "text", placeholder: "Full Name" },
//                 { name: "email", type: "email", placeholder: "Email Address" },
//                 { name: "phone", type: "tel", placeholder: "Phone Number" },
//               ].map((field) => (
//                 <input
//                   key={field.name}
//                   type={field.type}
//                   name={field.name}
//                   placeholder={field.placeholder}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                   required
//                 />
//               ))}

//               <textarea
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                 required
//               />

//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="postalCode"
//                   placeholder="Postal Code"
//                   value={formData.postalCode}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center gap-2 bg-black dark:bg-red-600 text-white py-3 rounded-md hover:bg-red-600 dark:hover:bg-black transition font-medium"
//               >
//                 <FaMapMarkerAlt /> Save Address
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="w-full mt-2 border border-gray-400 dark:border-neutral-700 text-gray-700 dark:text-gray-300 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


























"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [addressDisplay, setAddressDisplay] = useState("");

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

  // Load cart
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Calculate subtotal
  useEffect(() => {
    const calcSubtotal = cartItems.reduce((acc, item) => {
      const priceNum = Number(item.price.replace(/[^\d]/g, "")) || 0;
      return acc + priceNum * item.quantity;
    }, 0);
    setSubtotal(calcSubtotal);
  }, [cartItems]);

  const updateQuantity = (index, change) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save address only
  const handleSaveAddress = (e) => {
    e.preventDefault();
    const display = `${formData.fullName}, ${formData.email}, ${formData.phone}, ${formData.address}, ${formData.city}, ${formData.postalCode}`;
    setAddressDisplay(display);
    setShowForm(false);
  };

  // Confirm order (API post)
  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) return alert("🛒 Your cart is empty!");
    if (!formData.address) return alert("Please enter your address first!");

    const order = {
      customer: formData,
      cart: cartItems,
      orderDate: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save order");
      }

      const data = await res.json();
      console.log("✅ Order saved:", data);

      localStorage.removeItem("cart");
      setCartItems([]);
      alert("✅ Order confirmed successfully!");
    } catch (err) {
      console.error("❌ API Error:", err);
      alert("Failed to confirm order! Check console.");
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto p-6 text-black dark:text-white transition-colors duration-300">
      {/* ---------------- ENTER ADDRESS BOX ---------------- */}
      {cartItems.length > 0 && (
        <div
          onClick={() => setShowForm(true)}
          className="cursor-pointer flex items-center gap-2 p-3 bg-white dark:bg-neutral-900 shadow-md border border-gray-300 dark:border-neutral-700 rounded-xl mb-6 hover:shadow-lg transition"
        >
          <FaMapMarkerAlt className="text-red-600" />
          <span className="text-gray-700 dark:text-white text-sm truncate">
            {addressDisplay || "Enter your address"}
          </span>
        </div>
      )}

      {/* ---------------- CART ---------------- */}
      <div className="bg-white dark:bg-neutral-900 shadow-md border border-gray-200 dark:border-neutral-700 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-neutral-700 pb-2">
          Cart Items
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-center border-b border-gray-200 dark:border-neutral-700 pb-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition rounded-lg p-2"
              >
                <Image
                  src={item.image || item.images?.[0]}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  {item.size && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Size: {item.size}
                    </p>
                  )}
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium">{item.price}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => updateQuantity(idx, 1)}
                    className="px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateQuantity(idx, -1)}
                    className="px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600"
                  >
                    –
                  </button>
                  <button
                    onClick={() => deleteItem(idx)}
                    className="px-2 py-1 text-red-600 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 border-t border-gray-300 dark:border-neutral-700 pt-4">
            <p className="flex justify-between font-bold">
              <span>Subtotal:</span> <span>PKR {subtotal}</span>
            </p>

            {/* ---------------- CONFIRM ORDER BUTTON ---------------- */}
            <button
              onClick={handleConfirmOrder}
              className="mt-4 w-full bg-red-600 dark:bg-black text-white py-3 rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition font-medium"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>

      {/* ---------------- CUSTOMER FORM MODAL ---------------- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl w-full max-w-md relative shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
              Customer Details
            </h2>

            <form onSubmit={handleSaveAddress} className="space-y-4">
              {[
                { name: "fullName", type: "text", placeholder: "Full Name" },
                { name: "email", type: "email", placeholder: "Email Address" },
                { name: "phone", type: "tel", placeholder: "Phone Number" },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
                  required
                />
              ))}

              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent px-3 py-2 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-black dark:bg-red-600 text-white py-3 rounded-md hover:bg-red-600 dark:hover:bg-black transition font-medium"
              >
                <FaMapMarkerAlt /> Save Address
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full mt-2 border border-gray-400 dark:border-neutral-700 text-gray-700 dark:text-gray-300 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
