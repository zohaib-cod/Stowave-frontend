// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FaHeart, FaEye } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function RegularShirtsPage() {
//   const router = useRouter();
//   const [regularProducts, setRegularProducts] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);

//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

//   // ✅ Fetch products on mount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products?category=regular-tshirts`);
//         if (!res.ok) throw new Error("Failed to fetch products");

//         const data = await res.json();

//         // ✅ Ensure `data` is an array before mapping
//         if (Array.isArray(data)) {
//           setRegularProducts(
//             data.map((item) => ({
//               id: item._id,
//               name: item.title,
//               price: `PKR ${item.price}`,
//               oldPrice: `PKR ${item.originalPrice}`,
//               discount: item.discount || "0",
//               image: item.image?.startsWith("http")
//                 ? item.image
//                 : `${BASE_URL}/uploads/${item.image}`,
//               description: item.description || "No description available",
//             }))
//           );
//         } else {
//           console.error("Unexpected API response:", data);
//           setRegularProducts([]);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setRegularProducts([]);
//       }
//     };

//     fetchProducts();

//     // ✅ Load favorites from localStorage
//     const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(savedFavs.map((item) => item.id));
//   }, [BASE_URL]);

//   // ✅ Toggle favorite item
//   const toggleFavorite = (product) => {
//     let existingFav = JSON.parse(localStorage.getItem("favorites")) || [];
//     const exists = existingFav.find((item) => item.id === product.id);

//     if (exists) {
//       existingFav = existingFav.filter((item) => item.id !== product.id);
//     } else {
//       existingFav.push(product);
//     }

//     localStorage.setItem("favorites", JSON.stringify(existingFav));
//     setFavorites(existingFav.map((item) => item.id));
//   };

//   // ✅ Add item to cart
//   const handleAddToCart = () => {
//     if (!selectedProduct || !selectedSize) return alert("Please select a size!");

//     const newItem = {
//       id: selectedProduct.id,
//       name: selectedProduct.name,
//       price: selectedProduct.price,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.image,
//     };

//     let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = existingCart.findIndex(
//       (item) => item.id === newItem.id && item.size === newItem.size
//     );

//     if (existingIndex >= 0) {
//       existingCart[existingIndex].quantity += newItem.quantity;
//     } else {
//       existingCart.push(newItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart));
//     router.push("/cart");
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-black mb-4">Regular-Shirts</h2>
//       <p className="text-gray-500 mb-8">
//         Comfortable & stylish regular-fit shirts perfect for daily wear and formal occasions.
//       </p>

//       {/* ✅ Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {regularProducts.map((product) => (
//           <div key={product.id} className="relative group">
//             <div className="relative w-full h-72 overflow-hidden rounded-lg">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-110"
//               />

//               {/* Discount Tag */}
//               {product.discount !== "0" && (
//                 <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                   {product.discount}% OFF
//                 </div>
//               )}

//               {/* Buttons */}
//               <div className="absolute top-3 right-3 flex flex-col gap-3">
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setQuantity(1);
//                     setSelectedSize(null);
//                   }}
//                   className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
//                 >
//                   <FaEye className="text-gray-800" />
//                 </button>
//                 <button
//                   onClick={() => toggleFavorite(product)}
//                   className={`p-2 rounded-full shadow ${
//                     favorites.includes(product.id)
//                       ? "bg-gray-300 text-red-600"
//                       : "bg-white text-gray-800 hover:bg-gray-200"
//                   }`}
//                 >
//                   <FaHeart />
//                 </button>
//               </div>

//               {/* Add to Cart Button */}
//               <button
//                 onClick={() => {
//                   setSelectedProduct(product);
//                   setQuantity(1);
//                   setSelectedSize(null);
//                 }}
//                 className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500"
//               >
//                 <span className="bg-red-600 text-white px-4 py-2 font-semibold rounded">
//                   Add to Cart
//                 </span>
//               </button>
//             </div>

//             {/* Product Details */}
//             <div className="mt-4 text-center">
//               <p className="font-semibold text-gray-900">{product.name}</p>
//               <div className="flex justify-center gap-2 items-center">
//                 <span className="text-gray-400 line-through text-sm">
//                   {product.oldPrice}
//                 </span>
//                 <span className="text-red-600 font-bold">{product.price}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
//             <button
//               onClick={() => setSelectedProduct(null)}
//               className="absolute top-3 right-3 text-xl font-bold"
//             >
//               ✕
//             </button>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="relative w-full h-96 flex items-center justify-center">
//                 <Image
//                   src={selectedProduct.image}
//                   alt={selectedProduct.name}
//                   fill
//                   className="object-cover rounded"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
//                 <p className="text-lg text-gray-700 mb-2">{selectedProduct.price}</p>
//                 <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

//                 {/* Size Selection */}
//                 <div className="mb-4">
//                   <p className="font-medium mb-2">Size:</p>
//                   <div className="flex gap-3">
//                     {["S", "M", "L", "XL"].map((size) => (
//                       <button
//                         key={size}
//                         onClick={() => setSelectedSize(size)}
//                         className={`border px-3 py-1 text-sm transition ${
//                           selectedSize === size
//                             ? "bg-black text-white"
//                             : "hover:bg-black hover:text-white"
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quantity Selector */}
//                 <div className="mb-4 flex items-center gap-3">
//                   <p className="font-medium">Quantity:</p>
//                   <button
//                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                     className="border px-3 py-1"
//                   >
//                     -
//                   </button>
//                   <span>{quantity}</span>
//                   <button
//                     onClick={() => setQuantity((q) => q + 1)}
//                     className="border px-3 py-1"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={handleAddToCart}
//                   className="w-full py-2 bg-black text-white hover:bg-red-600 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }















// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FaHeart, FaEye } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function RegularShirtsPage() {
//   const router = useRouter();
//   const [regularProducts, setRegularProducts] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);

//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products?category=regular-tshirts`);
//         if (!res.ok) throw new Error("Failed to fetch products");

//         const data = await res.json();

//         if (Array.isArray(data)) {
//           setRegularProducts(
//             data.map((item) => ({
//               id: item._id,
//               name: item.title,
//               price: `PKR ${item.price}`,
//               oldPrice: `PKR ${item.originalPrice}`,
//               discount: item.discount || "0",
//               image: item.image?.startsWith("http")
//                 ? item.image
//                 : `${BASE_URL}/uploads/${item.image}`,
//               description: item.description || "No description available",
//             }))
//           );
//         } else {
//           console.error("Unexpected API response:", data);
//           setRegularProducts([]);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setRegularProducts([]);
//       }
//     };

//     fetchProducts();

//     const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(savedFavs.map((item) => item.id));
//   }, [BASE_URL]);

//   const toggleFavorite = (product) => {
//     let existingFav = JSON.parse(localStorage.getItem("favorites")) || [];
//     const exists = existingFav.find((item) => item.id === product.id);

//     if (exists) {
//       existingFav = existingFav.filter((item) => item.id !== product.id);
//     } else {
//       existingFav.push(product);
//     }

//     localStorage.setItem("favorites", JSON.stringify(existingFav));
//     setFavorites(existingFav.map((item) => item.id));
//   };

//   const handleAddToCart = () => {
//     if (!selectedProduct || !selectedSize) return alert("Please select a size!");

//     const newItem = {
//       id: selectedProduct.id,
//       name: selectedProduct.name,
//       price: selectedProduct.price,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.image,
//     };

//     let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = existingCart.findIndex(
//       (item) => item.id === newItem.id && item.size === newItem.size
//     );

//     if (existingIndex >= 0) {
//       existingCart[existingIndex].quantity += newItem.quantity;
//     } else {
//       existingCart.push(newItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart));
//     router.push("/cart");
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-black mb-4">Regular-Shirts</h2>
//       <p className="text-gray-500 mb-8">
//         Comfortable & stylish regular-fit shirts perfect for daily wear and formal occasions.
//       </p>

//       {/* ✅ Product Grid (4 per row on laptop, 2 on tablet/mobile) */}
//       <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {regularProducts.map((product) => (
//           <div key={product.id} className="relative group">
//             <div className="relative w-full h-72 overflow-hidden">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-110"
//               />

//               {product.discount !== "0" && (
//                 <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1">
//                   {product.discount}% OFF
//                 </div>
//               )}

//               <div className="absolute top-3 right-3 flex flex-col gap-3">
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setQuantity(1);
//                     setSelectedSize(null);
//                   }}
//                   className="bg-white p-2 shadow hover:bg-gray-200"
//                 >
//                   <FaEye className="text-gray-800" />
//                 </button>
//                 <button
//                   onClick={() => toggleFavorite(product)}
//                   className={`p-2 shadow ${
//                     favorites.includes(product.id)
//                       ? "bg-gray-300 text-red-600"
//                       : "bg-white text-gray-800 hover:bg-gray-200"
//                   }`}
//                 >
//                   <FaHeart className="text-sm md:text-base" />
//                 </button>
//               </div>

//               <button
//                 onClick={() => {
//                   setSelectedProduct(product);
//                   setQuantity(1);
//                   setSelectedSize(null);
//                 }}
//                 className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500"
//               >
//                 <span className="bg-red-600 text-white px-4 py-2 font-semibold">
//                   Add to Cart
//                 </span>
//               </button>
//             </div>

//             <div className="mt-4 text-center">
//               <p className="font-semibold text-gray-900">{product.name}</p>
//               <div className="flex justify-center gap-2 items-center">
//                 <span className="text-gray-400 line-through text-sm">
//                   {product.oldPrice}
//                 </span>
//                 <span className="text-red-600 font-bold">{product.price}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white p-6 w-full max-w-3xl relative">
//             <button
//               onClick={() => setSelectedProduct(null)}
//               className="absolute top-3 right-3 text-xl font-bold"
//             >
//               ✕
//             </button>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="relative w-full h-96 flex items-center justify-center">
//                 <Image
//                   src={selectedProduct.image}
//                   alt={selectedProduct.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
//                 <p className="text-lg text-gray-700 mb-2">{selectedProduct.price}</p>
//                 <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

//                 <div className="mb-4">
//                   <p className="font-medium mb-2">Size:</p>
//                   <div className="flex gap-3">
//                     {["S", "M", "L", "XL"].map((size) => (
//                       <button
//                         key={size}
//                         onClick={() => setSelectedSize(size)}
//                         className={`border px-3 py-1 text-sm transition ${
//                           selectedSize === size
//                             ? "bg-black text-white"
//                             : "hover:bg-black hover:text-white"
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mb-4 flex items-center gap-3">
//                   <p className="font-medium">Quantity:</p>
//                   <button
//                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                     className="border px-3 py-1"
//                   >
//                     -
//                   </button>
//                   <span>{quantity}</span>
//                   <button
//                     onClick={() => setQuantity((q) => q + 1)}
//                     className="border px-3 py-1"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={handleAddToCart}
//                   className="w-full py-2 bg-black text-white hover:bg-red-600 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }











// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FaHeart, FaEye } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function RegularShirtsPage() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL =
//     process.env.NEXT_PUBLIC_API_URL ||
//     "https://stowave-backend-1.onrender.com";

//   // ✅ Fetch products
//   useEffect(() => {
//     fetch(`${BASE_URL}/api/products?category=regular-tshirts`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setProducts(data);
//         } else if (Array.isArray(data.products)) {
//           setProducts(data.products);
//         } else {
//           console.error("Unexpected API response format:", data);
//           setProducts([]);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       });

//     // Load favorites
//     const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(savedFavs.map((item) => item.id));
//   }, [BASE_URL]);

//   // ✅ Toggle favorite
//   const toggleFavorite = (product) => {
//     let existingFav = JSON.parse(localStorage.getItem("favorites")) || [];
//     const exists = existingFav.find((item) => item.id === product.id);

//     if (exists) {
//       existingFav = existingFav.filter((item) => item.id !== product.id);
//     } else {
//       existingFav.push(product);
//     }

//     localStorage.setItem("favorites", JSON.stringify(existingFav));
//     setFavorites(existingFav.map((item) => item.id));
//   };

//   // ✅ Add to cart
//   const handleAddToCart = () => {
//     if (!selectedProduct || !selectedSize)
//       return alert("Please select a size!");

//     const newItem = {
//       id: selectedProduct.id,
//       name: selectedProduct.name,
//       price: selectedProduct.price,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.image,
//     };

//     let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = existingCart.findIndex(
//       (item) => item.id === newItem.id && item.size === newItem.size
//     );

//     if (existingIndex >= 0) {
//       existingCart[existingIndex].quantity += newItem.quantity;
//     } else {
//       existingCart.push(newItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart));
//     router.push("/cart");
//   };

//   return (
//     // <div className="max-w-6xl mx-auto px-6 py-12">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12  text-black  dark:text-white transition-colors duration-300">

//       <h2 className="text-3xl font-bold text-black mb-4 dark:text-white">Regular-Shirts</h2>
//       <p className="text-gray-500 mb-8 dark:text-white">
//         Comfortable & stylish regular-fit shirts perfect for daily wear and
//         formal occasions.
//       </p>

//       {/* ✅ Loading skeletons */}
//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="w-full h-72 bg-gray-200 animate-pulse rounded-none"
//             ></div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div key={product._id} className="relative group">
//               <div className="relative w-full h-72 overflow-hidden rounded-none">
//                 <Image
//                   src={
//                     product.image?.startsWith("http")
//                       ? product.image
//                       : `${BASE_URL}/uploads/${product.image}`
//                   }
//                   alt={product.title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />

//                 {/* Discount Tag */}
//                 {product.discount && product.discount !== "0" && (
//                   <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                     {product.discount}% OFF
//                   </div>
//                 )}

//                 {/* Buttons */}
//                 <div className="absolute top-3 right-3 flex flex-col gap-3">
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setQuantity(1);
//                       setSelectedSize(null);
//                     }}
//                     className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
//                   >
//                     <FaEye className="text-gray-800" />
//                   </button>
//                   <button
//                     onClick={() => toggleFavorite(product)}
//                     className={`p-2 rounded-full shadow transition ${
//                       favorites.includes(product.id)
//                         ? "bg-gray-300 text-red-600"
//                         : "bg-white text-gray-800 hover:bg-gray-200"
//                     }`}
//                   >
//                     <FaHeart />
//                   </button>
//                 </div>

//                 {/* Add to Cart Button */}
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setQuantity(1);
//                     setSelectedSize(null);
//                   }}
//                   className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500"
//                 >
//                   <span className="bg-red-600 text-white px-4 py-2 font-semibold rounded-md">
//                     Add to Cart
//                   </span>
//                 </button>
//               </div>

//               {/* Product Details */}
//               <div className="mt-4 text-center">
//                 <p className="font-semibold text-gray-900">{product.title}</p>
//                 <div className="flex justify-center gap-2 items-center">
//                   <span className="text-gray-400 line-through text-sm dark:text-white">
//                     PKR {product.originalPrice}
//                   </span>
//                   <span className="text-red-600 font-bold">
//                     PKR {product.price}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
//             <button
//               onClick={() => setSelectedProduct(null)}
//               className="absolute top-3 right-3 text-xl font-bold"
//             >
//               ✕
//             </button>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="relative w-full h-96 flex items-center justify-center">
//                 <Image
//                   src={
//                     selectedProduct.image?.startsWith("http")
//                       ? selectedProduct.image
//                       : `${BASE_URL}/uploads/${selectedProduct.image}`
//                   }
//                   alt={selectedProduct.title}
//                   fill
//                   className="object-cover rounded"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold">
//                   {selectedProduct.title}
//                 </h2>
//                 <p className="text-lg text-gray-700 mb-2">
//                   PKR {selectedProduct.price}
//                 </p>
//                 <p className="text-gray-600 mb-4">
//                   {selectedProduct.description}
//                 </p>

//                 {/* Size Selection */}
//                 <div className="mb-4">
//                   <p className="font-medium mb-2">Size:</p>
//                   <div className="flex gap-3">
//                     {["S", "M", "L", "XL"].map((size) => (
//                       <button
//                         key={size}
//                         onClick={() => setSelectedSize(size)}
//                         className={`border px-3 py-1 text-sm transition ${
//                           selectedSize === size
//                             ? "bg-black text-white"
//                             : "hover:bg-black hover:text-white"
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quantity Selector */}
//                 <div className="mb-4 flex items-center gap-3">
//                   <p className="font-medium">Quantity:</p>
//                   <button
//                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                     className="border px-3 py-1"
//                   >
//                     -
//                   </button>
//                   <span>{quantity}</span>
//                   <button
//                     onClick={() => setQuantity((q) => q + 1)}
//                     className="border px-3 py-1"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={handleAddToCart}
//                   className="w-full py-2 bg-black text-white hover:bg-red-600 transition rounded-md"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
















// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FaHeart, FaEye } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function RegularShirtsPage() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL =
//     process.env.NEXT_PUBLIC_API_URL ||
//     "https://stowave-backend-1.onrender.com";

//   // ✅ Fetch products
//   useEffect(() => {
//     fetch(`${BASE_URL}/api/products?category=regular-tshirts`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setProducts(data);
//         } else if (Array.isArray(data.products)) {
//           setProducts(data.products);
//         } else {
//           console.error("Unexpected API response format:", data);
//           setProducts([]);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       });

//     // Load favorites
//     const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(savedFavs.map((item) => item.id));
//   }, [BASE_URL]);

//   // ✅ Toggle favorite
//   const toggleFavorite = (product) => {
//     let existingFav = JSON.parse(localStorage.getItem("favorites")) || [];
//     const exists = existingFav.find((item) => item.id === product.id);

//     if (exists) {
//       existingFav = existingFav.filter((item) => item.id !== product.id);
//     } else {
//       existingFav.push(product);
//     }

//     localStorage.setItem("favorites", JSON.stringify(existingFav));
//     setFavorites(existingFav.map((item) => item.id));
//   };

//   // ✅ Add to cart
//   const handleAddToCart = () => {
//     if (!selectedProduct || !selectedSize)
//       return alert("Please select a size!");

//     const newItem = {
//       id: selectedProduct.id,
//       name: selectedProduct.name,
//       price: selectedProduct.price,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.image,
//     };

//     let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = existingCart.findIndex(
//       (item) => item.id === newItem.id && item.size === newItem.size
//     );

//     if (existingIndex >= 0) {
//       existingCart[existingIndex].quantity += newItem.quantity;
//     } else {
//       existingCart.push(newItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart));
//     router.push("/cart");
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-black dark:text-white transition-colors duration-300">
//       <h2 className="text-3xl font-bold text-black mb-4 dark:text-white">
//         Regular-Shirts
//       </h2>
//       <p className="text-gray-500 mb-8 dark:text-white">
//         Comfortable & stylish regular-fit shirts perfect for daily wear and
//         formal occasions.
//       </p>

//       {/* ✅ Loading skeletons */}
//       {loading ? (
//         // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">

//         {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="w-full h-72 bg-gray-200 dark:bg-white/20 animate-pulse rounded-none"
//             ></div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div key={product._id} className="relative group">
//               <div className="relative w-full h-72 overflow-hidden rounded-none">
//                 <Image
//                   src={
//                     product.image?.startsWith("http")
//                       ? product.image
//                       : `${BASE_URL}/uploads/${product.image}`
//                   }
//                   alt={product.title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />

//                 {/* Discount Tag */}
//                 {product.discount && product.discount !== "0" && (
//                   <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                     {product.discount}% OFF
//                   </div>
//                 )}

//                 {/* Buttons */}
//                 <div className="absolute top-3 right-3 flex flex-col gap-3">
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setQuantity(1);
//                       setSelectedSize(null);
//                     }}
//                     className="bg-white dark:bg-white dark:text-black p-2 rounded-full shadow hover:bg-gray-200 transition"
//                   >
//                     <FaEye className="text-gray-800 dark:text-black" />
//                   </button>
//                   <button
//                     onClick={() => toggleFavorite(product)}
//                     className={`p-2 rounded-full shadow transition ${
//                       favorites.includes(product.id)
//                         ? "bg-gray-300 text-red-600 dark:bg-white dark:text-red-600"
//                         : "bg-white text-gray-800 hover:bg-gray-200 dark:bg-white dark:text-black"
//                     }`}
//                   >
//                     <FaHeart />
//                   </button>
//                 </div>

//                 {/* Add to Cart Button */}
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setQuantity(1);
//                     setSelectedSize(null);
//                   }}
//                   className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500"
//                 >
//                   <span className="bg-red-600 text-white px-4 py-2 font-semibold rounded-md">
//                     Add to Cart
//                   </span>
//                 </button>
//               </div>

//               {/* Product Details */}
//               <div className="mt-4 text-center">
//                 <p className="font-semibold text-gray-900 dark:text-white">
//                   {product.title}
//                 </p>
//                 <div className="flex justify-center gap-2 items-center">
//                   <span className="text-gray-400 line-through text-sm dark:text-white/70">
//                     PKR {product.originalPrice}
//                   </span>
//                   <span className="text-red-600 font-bold">
//                     PKR {product.price}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative text-black dark:text-white">
//             <button
//               onClick={() => setSelectedProduct(null)}
//               className="absolute top-3 right-3 text-xl font-bold dark:text-white"
//             >
//               ✕
//             </button>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="relative w-full h-96 flex items-center justify-center">
//                 <Image
//                   src={
//                     selectedProduct.image?.startsWith("http")
//                       ? selectedProduct.image
//                       : `${BASE_URL}/uploads/${selectedProduct.image}`
//                   }
//                   alt={selectedProduct.title}
//                   fill
//                   className="object-cover rounded"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold dark:text-white">
//                   {selectedProduct.title}
//                 </h2>
//                 <p className="text-lg text-gray-700 mb-2 dark:text-white">
//                   PKR {selectedProduct.price}
//                 </p>
//                 <p className="text-gray-600 mb-4 dark:text-white/80">
//                   {selectedProduct.description}
//                 </p>

//                 {/* Size Selection */}
//                 <div className="mb-4">
//                   <p className="font-medium mb-2">Size:</p>
//                   <div className="flex gap-3">
//                     {["S", "M", "L", "XL"].map((size) => (
//                       <button
//                         key={size}
//                         onClick={() => setSelectedSize(size)}
//                         className={`border px-3 py-1 text-sm transition ${
//                           selectedSize === size
//                             ? "bg-black text-white dark:bg-white dark:text-black"
//                             : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quantity Selector */}
//                 <div className="mb-4 flex items-center gap-3">
//                   <p className="font-medium">Quantity:</p>
//                   <button
//                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                     className="border px-3 py-1 dark:text-white"
//                   >
//                     -
//                   </button>
//                   <span>{quantity}</span>
//                   <button
//                     onClick={() => setQuantity((q) => q + 1)}
//                     className="border px-3 py-1 dark:text-white"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={handleAddToCart}
//                   className="w-full py-2 bg-black text-white hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-red-600 transition rounded-md"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






























"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RegularShirtsPage() {
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

  // ✅ Fetch products
  useEffect(() => {
    fetch(`${BASE_URL}/api/products?category=regular-tshirts`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected API response format:", data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });

    // Load favorites
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs.map((item) => item.id));
  }, [BASE_URL]);

  // ✅ Toggle favorite
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

  // ✅ Add to cart
  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize)
      return alert("Please select a size!");

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-black dark:text-white transition-colors duration-300">
      <h2 className="text-3xl font-bold text-black mb-4 dark:text-white">
        Regular-Shirts
      </h2>
      <p className="text-gray-500 mb-8 dark:text-white">
        Comfortable & stylish regular-fit shirts perfect for daily wear and
        formal occasions.
      </p>

      {/* ✅ Loading skeletons */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-full h-72 bg-gray-200 dark:bg-white/20 animate-pulse rounded-none"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product._id} className="relative group">
              <div className="relative w-full h-72 overflow-hidden rounded-none">
                <Image
                  src={
                    product.image?.startsWith("http")
                      ? product.image
                      : `${BASE_URL}/uploads/${product.image}`
                  }
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Discount Tag */}
                {product.discount && product.discount !== "0" && (
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
                    className="bg-white dark:bg-white dark:text-black p-2 rounded-full shadow hover:bg-gray-200 transition"
                  >
                    <FaEye className="text-gray-800 dark:text-black rounded-full p-1 bg-gray-100" />
                  </button>

                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`p-2 rounded-full shadow transition ${
                      favorites.includes(product.id)
                        ? "bg-gray-300 text-red-600 dark:bg-white dark:text-red-600"
                        : "bg-white text-gray-800 hover:bg-gray-200 dark:bg-white dark:text-black"
                    }`}
                  >
                    <FaHeart className="rounded-full p-1 bg-gray-100" />
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
                  <span className="bg-red-600 text-white px-4 py-2 font-semibold rounded-lg">
                    Add to Cart
                  </span>
                </button>
              </div>

              {/* Product Details */}
              <div className="mt-4 text-center">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </p>
                <div className="flex justify-center gap-2 items-center">
                  <span className="text-gray-400 line-through text-sm dark:text-white/70">
                    PKR {product.originalPrice}
                  </span>
                  <span className="text-red-600 font-bold">
                    PKR {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative text-black dark:text-white">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-xl font-bold dark:text-white"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full h-96 flex items-center justify-center">
                <Image
                  src={
                    selectedProduct.image?.startsWith("http")
                      ? selectedProduct.image
                      : `${BASE_URL}/uploads/${selectedProduct.image}`
                  }
                  alt={selectedProduct.title}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold dark:text-white">
                  {selectedProduct.title}
                </h2>
                <p className="text-lg text-gray-700 mb-2 dark:text-white">
                  PKR {selectedProduct.price}
                </p>
                <p className="text-gray-600 mb-4 dark:text-white/80">
                  {selectedProduct.description}
                </p>

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
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
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
                    className="border px-3 py-1 dark:text-white"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="border px-3 py-1 dark:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 bg-black text-white hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-red-600 transition rounded-md"
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
