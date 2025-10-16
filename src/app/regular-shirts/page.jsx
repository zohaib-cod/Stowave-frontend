// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FaHeart, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function RegularShirtsPage() {
//   const router = useRouter();
//   const [regularProducts, setRegularProducts] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);

//   // Fetch products with real-time images and discount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/products?category=regular-tshirts"
//         );
//         const data = await res.json();
//         setRegularProducts(
//           data.map((item) => ({
//             id: item._id,
//             name: item.title,
//             price: `PKR ${item.price}`,
//             oldPrice: `PKR ${item.originalPrice}`,
//             discount: item.discount || "0",
//             images: item.image
//               ? [`http://localhost:5000/uploads/${item.image}`]
//               : ["/placeholder.png"],
//             description: item.description || "No description available",
//           }))
//         );
//       } catch (err) {
//         console.error(err);
//         setRegularProducts([]);
//       }
//     };

//     fetchProducts();
//   }, []);

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
//     if (!selectedProduct || !selectedSize) return;

//     const newItem = {
//       id: selectedProduct.id,
//       name: selectedProduct.name,
//       price: selectedProduct.price,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.images[selectedImageIndex],
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

//   const handleNextImage = () => {
//     setSelectedImageIndex((prev) =>
//       selectedProduct && prev < selectedProduct.images.length - 1 ? prev + 1 : 0
//     );
//   };

//   const handlePrevImage = () => {
//     setSelectedImageIndex((prev) =>
//       selectedProduct && prev > 0
//         ? prev - 1
//         : selectedProduct.images.length - 1
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-black mb-4">Regular-Shirts</h2>
//       <p className="text-gray-500 mb-8">
//         Comfortable & stylish regular-fit shirts perfect for daily wear and formal occasions.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {regularProducts.map((product) => (
//           <div key={product.id} className="relative group">
//             <div className="relative w-full h-72 overflow-hidden">
//               <Image
//                 src={product.images[0]}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-opacity duration-500 group-hover:opacity-0"
//               />
//               {product.images[1] && (
//                 <Image
//                   src={product.images[1]}
//                   alt={product.name}
//                   fill
//                   className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
//                 />
//               )}

//               {product.discount !== "0" && (
//                 <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                   {product.discount}% OFF
//                 </div>
//               )}

//               <div className="absolute top-3 right-3 flex flex-col gap-3">
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setSelectedImageIndex(0);
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

//               <button
//                 onClick={() => {
//                   setSelectedProduct(product);
//                   setSelectedImageIndex(0);
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

//             <div className="mt-4 text-center">
//               <p className="font-semibold text-gray-900">{product.name}</p>
//               <div className="flex justify-center gap-2 items-center">
//                 <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
//                 <span className="text-red-600 font-bold">{product.price}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
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
//                   src={selectedProduct.images[selectedImageIndex]}
//                   alt={selectedProduct.name}
//                   fill
//                   className="object-cover rounded"
//                 />
//                 <button
//                   onClick={handlePrevImage}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
//                 >
//                   <FaArrowLeft />
//                 </button>
//                 <button
//                   onClick={handleNextImage}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
//                 >
//                   <FaArrowRight />
//                 </button>
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
// import { FaHeart, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function RegularShirtsPage() {
//   const router = useRouter();
//   const [regularProducts, setRegularProducts] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);

//   // Fetch products with real-time images and discount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/products?category=regular-tshirts"
//         );
//         const data = await res.json();
//         setRegularProducts(
//           data.map((item) => ({
//             id: item._id,
//             name: item.title,
//             price: `PKR ${item.price}`,
//             oldPrice: `PKR ${item.originalPrice}`,
//             discount: item.discount || "0",
//             images: [
//               item.imageMain ? `http://localhost:5000/uploads/${item.imageMain}` : null,
//               item.imageHover ? `http://localhost:5000/uploads/${item.imageHover}` : null,
//             ].filter(Boolean),
//             description: item.description || "No description available",
//           }))
//         );
//       } catch (err) {
//         console.error(err);
//         setRegularProducts([]);
//       }
//     };

//     fetchProducts();

//     const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(storedFavs.map((item) => item._id));
//   }, []);

//   const toggleFavorite = (product) => {
//     let existingFav = JSON.parse(localStorage.getItem("favorites")) || [];
//     const exists = existingFav.find((item) => item._id === product.id);

//     if (exists) {
//       existingFav = existingFav.filter((item) => item._id !== product.id);
//     } else {
//       existingFav.push({ _id: product.id, name: product.name });
//     }

//     localStorage.setItem("favorites", JSON.stringify(existingFav));
//     setFavorites(existingFav.map((item) => item._id));
//   };

//   const handleAddToCart = () => {
//     if (!selectedProduct || !selectedSize) return;

//     const newItem = {
//       id: selectedProduct.id,
//       name: selectedProduct.name,
//       price: selectedProduct.price,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.images[selectedImageIndex],
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
//     setSelectedProduct(null);
//     router.push("/cart");
//   };

//   const handleNextImage = () => {
//     setSelectedImageIndex((prev) =>
//       selectedProduct && prev < selectedProduct.images.length - 1 ? prev + 1 : 0
//     );
//   };

//   const handlePrevImage = () => {
//     setSelectedImageIndex((prev) =>
//       selectedProduct && prev > 0
//         ? prev - 1
//         : selectedProduct.images.length - 1
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-black mb-4">Regular-Shirts</h2>
//       <p className="text-gray-500 mb-8">
//         Comfortable & stylish regular-fit shirts perfect for daily wear and formal occasions.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {regularProducts.map((product) => (
//           <div key={product.id} className="relative group">
//             <div className="relative w-full h-72 overflow-hidden">
//               <Image
//                 src={product.images[0]}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-opacity duration-500 group-hover:opacity-0"
//               />
//               {product.images[1] && (
//                 <Image
//                   src={product.images[1]}
//                   alt={product.name}
//                   fill
//                   className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
//                 />
//               )}

//               {product.discount !== "0" && (
//                 <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                   {product.discount}% OFF
//                 </div>
//               )}

//               <div className="absolute top-3 right-3 flex flex-col gap-3">
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setSelectedImageIndex(0);
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

//               <button
//                 onClick={() => {
//                   setSelectedProduct(product);
//                   setSelectedImageIndex(0);
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

//             <div className="mt-4 text-center">
//               <p className="font-semibold text-gray-900">{product.name}</p>
//               <div className="flex justify-center gap-2 items-center">
//                 <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
//                 <span className="text-red-600 font-bold">{product.price}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
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
//                   src={selectedProduct.images[selectedImageIndex]}
//                   alt={selectedProduct.name}
//                   fill
//                   className="object-cover rounded"
//                 />
//                 <button
//                   onClick={handlePrevImage}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
//                 >
//                   <FaArrowLeft />
//                 </button>
//                 <button
//                   onClick={handleNextImage}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
//                 >
//                   <FaArrowRight />
//                 </button>
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
//                 <div className="flex items-center gap-2 mb-2">
//                   <p className="text-gray-500 line-through text-sm">{selectedProduct.oldPrice}</p>
//                   <p className="text-lg text-gray-700 font-semibold">{selectedProduct.price}</p>
//                 </div>
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
// import { FaHeart, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function RegularShirtsPage() {
//   const router = useRouter();
//   const [regularProducts, setRegularProducts] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/products?category=regular-tshirts"
//         );
//         const data = await res.json();
//         setRegularProducts(
//           data.map((item) => ({
//             id: item._id,
//             name: item.title,
//             price: `PKR ${item.price}`,
//             oldPrice: `PKR ${item.originalPrice}`,
//             discount: item.discount || "0",
//             images: item.imageMain
//               ? [
//                   `http://localhost:5000/uploads/${item.imageMain}`,
//                   ...(item.imageHover ? [`http://localhost:5000/uploads/${item.imageHover}`] : []),
//                 ]
//               : ["/placeholder.png"],
//             description: item.description || "No description available",
//           }))
//         );
//       } catch (err) {
//         console.error(err);
//         setRegularProducts([]);
//       }
//     };

//     fetchProducts();
//   }, []);

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
//     if (!selectedProduct || !selectedSize) return;

//     const newItem = {
//       id: selectedProduct.id,
//       name: selectedProduct.name,
//       price: selectedProduct.price,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.images[selectedImageIndex],
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

//   const handleNextImage = () => {
//     setSelectedImageIndex((prev) =>
//       selectedProduct && prev < selectedProduct.images.length - 1 ? prev + 1 : 0
//     );
//   };

//   const handlePrevImage = () => {
//     setSelectedImageIndex((prev) =>
//       selectedProduct && prev > 0
//         ? prev - 1
//         : selectedProduct.images.length - 1
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-black mb-4">Regular-Shirts</h2>
//       <p className="text-gray-500 mb-8">
//         Comfortable & stylish regular-fit shirts perfect for daily wear and formal occasions.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {regularProducts.map((product) => (
//           <div key={product.id} className="relative group">
//             <div className="relative w-full h-72 overflow-hidden">
//               <Image
//                 src={product.images[0]}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-opacity duration-500 group-hover:opacity-0"
//               />
//               {product.images[1] && (
//                 <Image
//                   src={product.images[1]}
//                   alt={product.name}
//                   fill
//                   className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
//                 />
//               )}

//               {product.discount !== "0" && (
//                 <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                   {product.discount}% OFF
//                 </div>
//               )}

//               <div className="absolute top-3 right-3 flex flex-col gap-3">
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setSelectedImageIndex(0);
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

//               <button
//                 onClick={() => {
//                   setSelectedProduct(product);
//                   setSelectedImageIndex(0);
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

//             <div className="mt-4 text-center">
//               <p className="font-semibold text-gray-900">{product.name}</p>
//               <div className="flex justify-center gap-2 items-center">
//                 <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
//                 <span className="text-red-600 font-bold">{product.price}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
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
//                   src={selectedProduct.images[selectedImageIndex]}
//                   alt={selectedProduct.name}
//                   fill
//                   className="object-cover rounded"
//                 />
//                 <button
//                   onClick={handlePrevImage}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
//                 >
//                   <FaArrowLeft />
//                 </button>
//                 <button
//                   onClick={handleNextImage}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
//                 >
//                   <FaArrowRight />
//                 </button>
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
//                 <div className="flex items-center gap-2 mb-2">
//                   <p className="text-gray-500 line-through text-sm">{selectedProduct.oldPrice}</p>
//                   <p className="text-lg text-gray-700 font-semibold">{selectedProduct.price}</p>
//                 </div>
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




















"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaHeart, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RegularShirtsPage() {
  const router = useRouter();
  const [regularProducts, setRegularProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products?category=regular-tshirts"
        );
        const data = await res.json();
        setRegularProducts(
          data.map((item) => ({
            id: item._id,
            name: item.title,
            price: `PKR ${item.price}`,
            oldPrice: `PKR ${item.originalPrice}`,
            discount: item.discount || "0",
            images: item.imageMain
              ? [
                  `http://localhost:5000/uploads/${item.imageMain}`,
                  ...(item.imageHover ? [`http://localhost:5000/uploads/${item.imageHover}`] : []),
                ]
              : ["/placeholder.png"],
            description: item.description || "No description available",
          }))
        );
      } catch (err) {
        console.error(err);
        setRegularProducts([]);
      }
    };

    fetchProducts();
  }, []);

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
    if (!selectedProduct || !selectedSize) return;

    const newItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      size: selectedSize,
      quantity,
      image: selectedProduct.images[selectedImageIndex],
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

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      selectedProduct && prev < selectedProduct.images.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      selectedProduct && prev > 0
        ? prev - 1
        : selectedProduct.images.length - 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 text-center md:text-left">Regular-Shirts</h2>
      <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base text-center md:text-left">
        Comfortable & stylish regular-fit shirts perfect for daily wear and formal occasions.
      </p>

      {/* ✅ Products Grid - 2 cards per line on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {regularProducts.map((product) => (
          <div key={product.id} className="relative group">
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              {product.images[1] && (
                <Image
                  src={product.images[1]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              )}

              {product.discount !== "0" && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}

              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedImageIndex(0);
                    setQuantity(1);
                    setSelectedSize(null);
                  }}
                  className="bg-white p-1.5 md:p-2 rounded-full shadow hover:bg-gray-200"
                >
                  <FaEye className="text-gray-800 text-sm md:text-base" />
                </button>
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-1.5 md:p-2 rounded-full shadow ${
                    favorites.includes(product.id)
                      ? "bg-gray-300 text-red-600"
                      : "bg-white text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <FaHeart className="text-sm md:text-base" />
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedImageIndex(0);
                  setQuantity(1);
                  setSelectedSize(null);
                }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500"
              >
                <span className="bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 font-semibold rounded text-sm md:text-base">
                  Add to Cart
                </span>
              </button>
            </div>

            <div className="mt-3 md:mt-4 text-center">
              <p className="font-semibold text-gray-900 text-sm md:text-base">{product.name}</p>
              <div className="flex justify-center gap-2 items-center mt-1">
                <span className="text-gray-400 line-through text-xs md:text-sm">{product.oldPrice}</span>
                <span className="text-red-600 font-bold text-sm md:text-base">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 md:top-3 md:right-3 text-xl font-bold z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
                <Image
                  src={selectedProduct.images[selectedImageIndex]}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-1.5 md:p-2 rounded-full hover:bg-white"
                >
                  <FaArrowLeft className="text-sm md:text-base" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-1.5 md:p-2 rounded-full hover:bg-white"
                >
                  <FaArrowRight className="text-sm md:text-base" />
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 line-through text-sm md:text-base">{selectedProduct.oldPrice}</p>
                  <p className="text-lg text-gray-700 font-semibold">{selectedProduct.price}</p>
                </div>
                <p className="text-gray-600 text-sm md:text-base">{selectedProduct.description}</p>

                <div>
                  <p className="font-medium mb-2 text-sm md:text-base">Size:</p>
                  <div className="flex gap-2 md:gap-3">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`border px-2 md:px-3 py-1 text-xs md:text-sm transition ${
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

                <div className="flex items-center gap-3">
                  <p className="font-medium text-sm md:text-base">Quantity:</p>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="border px-2 md:px-3 py-1 text-sm md:text-base"
                  >
                    -
                  </button>
                  <span className="text-sm md:text-base">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="border px-2 md:px-3 py-1 text-sm md:text-base"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 md:py-3 bg-black text-white hover:bg-red-600 transition text-sm md:text-base"
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