// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { useState } from "react";
// // import {
// //   FaStar,
// //   FaStarHalfAlt,
// //   FaCheckCircle,
// //   FaHeart,
// //   FaEye,
// // } from "react-icons/fa";

// // export default function Home() {
// //   const categories = [
// //     {
// //       label: "Oversize-Shirts",
// //       image: "/oversize-circle.jpeg",
// //       link: "/oversize-shirts",
// //     },
// //     {
// //       label: "Simple-Shirts",
// //       image: "/simple-circle.jpeg",
// //       link: "/t-shirts",
// //     },
// //   ];

// //   // Oversize Products
// //   const oversizeProducts = [
// //     {
// //       id: 1,
// //       name: "Oversize T-Shirt",
// //       price: "PKR 1,999",
// //       image: "/simple-circle.jpeg",
// //       hoverImage: "/oversize-circle.jpeg",
// //       description: "Premium cotton oversized fit perfect for daily wear.",
// //     },
// //     {
// //       id: 2,
// //       name: "Classic Oversize",
// //       price: "PKR 2,499",
// //       image: "/slider1.png",
// //       hoverImage: "/slider2.png",
// //       description: "Classic oversize shirt with high-quality dobby fabric.",
// //     },
// //     {
// //       id: 3,
// //       name: "Streetwear Oversize",
// //       price: "PKR 2,199",
// //       image: "/slider3.png",
// //       hoverImage: "/slider4.png",
// //       description: "Streetwear-inspired oversized shirt for bold looks.",
// //     },
// //     {
// //       id: 4,
// //       name: "Dobby Fabric Shirt",
// //       price: "PKR 2,999",
// //       image: "/slider4.png",
// //       hoverImage: "/slider5.png",
// //       description: "Unique dobby fabric, perfect for late summers & winters.",
// //     },
// //     {
// //       id: 5,
// //       name: "Casual Oversize Tee",
// //       price: "PKR 1,899",
// //       image: "/slider5.png",
// //       hoverImage: "/slider1.png",
// //       description: "Soft cotton casual tee for everyday comfort.",
// //     },
// //     {
// //       id: 6,
// //       name: "Summer Oversize Shirt",
// //       price: "PKR 2,299",
// //       image: "/slider2.png",
// //       hoverImage: "/slider3.png",
// //       description: "Lightweight summer oversize shirt with breathable fabric.",
// //     },
// //     {
// //       id: 7,
// //       name: "Urban Oversize Fit",
// //       price: "PKR 2,799",
// //       image: "/slider3.png",
// //       hoverImage: "/slider4.png",
// //       description: "Trendy urban-style oversized shirt with premium stitch.",
// //     },
// //     {
// //       id: 8,
// //       name: "Winter Oversize Hoodie",
// //       price: "PKR 3,499",
// //       image: "/slider4.png",
// //       hoverImage: "/slider5.png",
// //       description: "Warm & cozy oversized hoodie perfect for winters.",
// //     },
// //   ];

// //   // Regular Fit Products
// //   const regularFitProducts = [
// //     {
// //       id: 9,
// //       name: "Regular Fit Polo",
// //       price: "PKR 2,199",
// //       image: "/slider1.png",
// //       hoverImage: "/slider2.png",
// //       description: "Classic polo shirt with a timeless regular fit.",
// //     },
// //     {
// //       id: 10,
// //       name: "Casual Regular Tee",
// //       price: "PKR 1,699",
// //       image: "/slider3.png",
// //       hoverImage: "/slider4.png",
// //       description: "Everyday casual tee with regular fit comfort.",
// //     },
// //     {
// //       id: 11,
// //       name: "Regular Cotton Shirt",
// //       price: "PKR 2,399",
// //       image: "/slider5.png",
// //       hoverImage: "/slider1.png",
// //       description: "Soft cotton shirt, breathable & durable for daily use.",
// //     },
// //     {
// //       id: 12,
// //       name: "Classic Regular Shirt",
// //       price: "PKR 2,599",
// //       image: "/slider2.png",
// //       hoverImage: "/slider3.png",
// //       description: "Classic style regular shirt with sharp stitching.",
// //     },
// //     {
// //       id: 13,
// //       name: "Formal Regular Shirt",
// //       price: "PKR 2,999",
// //       image: "/slider3.png",
// //       hoverImage: "/slider4.png",
// //       description: "Perfect formal wear with a modern regular fit.",
// //     },
// //     {
// //       id: 14,
// //       name: "Regular Striped Tee",
// //       price: "PKR 1,899",
// //       image: "/slider4.png",
// //       hoverImage: "/slider5.png",
// //       description: "Trendy striped tee in a comfortable regular fit.",
// //     },
// //     {
// //       id: 15,
// //       name: "Summer Regular Fit",
// //       price: "PKR 2,099",
// //       image: "/slider5.png",
// //       hoverImage: "/slider1.png",
// //       description: "Light & breathable shirt for hot summer days.",
// //     },
// //     {
// //       id: 16,
// //       name: "Winter Regular Hoodie",
// //       price: "PKR 3,199",
// //       image: "/slider2.png",
// //       hoverImage: "/slider3.png",
// //       description: "Cozy winter hoodie in a versatile regular fit.",
// //     },
// //   ];

// //   const [favorites, setFavorites] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [quantity, setQuantity] = useState(1);

// //   const toggleFavorite = (id) => {
// //     setFavorites((prev) =>
// //       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
// //     );
// //   };

// //   // ✅ Reusable Product Section Component
// //   const ProductSection = ({ title, products }) => (
// //     <section className="max-w-6xl mx-auto px-6 py-12">
// //       <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
// //       <p className="text-gray-500 mb-8">
// //         Introducing the Dobby fabric. Comes with a unique pattern embossed and
// //         is perfect for late summers & early winters.
// //       </p>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //         {products.map((product) => (
// //           <div key={product.id} className="relative group">
// //             <div className="relative w-full h-72 overflow-hidden">
// //               <Image
// //                 src={product.image}
// //                 alt={product.name}
// //                 fill
// //                 className="object-cover transition-opacity duration-500 group-hover:opacity-0"
// //               />
// //               <Image
// //                 src={product.hoverImage}
// //                 alt={product.name}
// //                 fill
// //                 className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
// //               />

// //               {/* Eye + Heart */}
// //               <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
// //                 <button
// //                   onClick={() => setSelectedProduct(product)}
// //                   className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
// //                 >
// //                   <FaEye className="text-gray-800" />
// //                 </button>
// //                 <button
// //                   onClick={() => toggleFavorite(product.id)}
// //                   className={`p-2 rounded-full shadow ${
// //                     favorites.includes(product.id)
// //                       ? "bg-gray-300 text-red-600"
// //                       : "bg-white text-gray-800 hover:bg-gray-200"
// //                   }`}
// //                 >
// //                   <FaHeart />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="mt-4 text-center">
// //               <p className="font-semibold text-gray-900">{product.name}</p>
// //               <p className="text-gray-700">{product.price}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );

// //   return (
// //     <div>
// //       {/* Category Circles */}
// //       <main className="w-full flex flex-col items-center py-12 bg-gray-50">
// //         <div className="flex gap-10 flex-wrap justify-center">
// //           {categories.map((cat) => (
// //             <Link key={cat.label} href={cat.link} className="group">
// //               <div className="w-56 h-56 overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-110">
// //                 <Image
// //                   src={cat.image}
// //                   alt={cat.label}
// //                   fill
// //                   className="object-cover"
// //                   priority
// //                 />
// //               </div>
// //               <p className="text-center mt-4 text-lg font-medium">{cat.label}</p>
// //             </Link>
// //           ))}
// //         </div>
// //         <div className="line w-96 h-0.5 bg-red-700"></div>
// //       </main>

// //       {/* Rating Bar */}
// //       <div className="w-full border-y border-gray-300 bg-[#f7f7f7] py-4">
// //         <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-4 px-4">
// //           <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
// //             <FaCheckCircle className="text-red-700" />
// //             <span>4.6</span>
// //             <div className="flex text-red-700">
// //               <FaStar />
// //               <FaStar />
// //               <FaStar />
// //               <FaStar />
// //               <FaStarHalfAlt />
// //             </div>
// //           </div>
// //           <div className="text-red-700 text-sm md:text-base border-x px-4 text-center">
// //             4.6 out of 5 stars based on 614 reviews
// //           </div>
// //           <div className="flex items-center gap-2 text-red-700 font-semibold">
// //             <span>Verified</span>
// //             <FaCheckCircle className="text-red-700" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Oversize Section */}
// //       <ProductSection title="Oversize-Shirts" products={oversizeProducts} />

// //       {/* Regular-Fit Section */}
// //       <ProductSection title="Regular-Fit" products={regularFitProducts} />

// //       {/* Modal */}
// //       {selectedProduct && (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
// //             <button
// //               onClick={() => setSelectedProduct(null)}
// //               className="absolute top-3 right-3 text-xl font-bold"
// //             >
// //               ✕
// //             </button>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="relative w-full h-96">
// //                 <Image
// //                   src={selectedProduct.image}
// //                   alt={selectedProduct.name}
// //                   fill
// //                   className="object-cover rounded"
// //                 />
// //               </div>

// //               <div>
// //                 <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
// //                 <p className="text-lg text-gray-700 mb-2">
// //                   {selectedProduct.price}
// //                 </p>
// //                 <div className="w-16 h-0.5 bg-gray-400 mb-4"></div>
// //                 <p className="text-gray-600 mb-4">
// //                   {selectedProduct.description}
// //                 </p>

// //                 <div className="mb-4">
// //                   <p className="font-medium mb-2">Size:</p>
// //                   <div className="flex gap-3">
// //                     {["Small", "Medium", "Large"].map((size) => (
// //                       <button
// //                         key={size}
// //                         className="border px-3 py-1 text-sm hover:bg-black hover:text-white transition"
// //                       >
// //                         {size}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="mb-4 flex items-center gap-3">
// //                   <p className="font-medium">Quantity:</p>
// //                   <button
// //                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
// //                     className="border px-3 py-1"
// //                   >
// //                     -
// //                   </button>
// //                   <span>{quantity}</span>
// //                   <button
// //                     onClick={() => setQuantity((q) => q + 1)}
// //                     className="border px-3 py-1"
// //                   >
// //                     +
// //                   </button>
// //                 </div>

// //                 <button className="w-full py-2 bg-black text-white hover:bg-red-600 transition">
// //                   Add to Cart
// //                 </button>

// //                 <div className="flex justify-between mt-4 text-sm text-gray-600">
// //                   <button className="hover:underline">Add to Wishlist</button>
// //                   <button className="hover:underline flex items-center gap-1">
// //                     View Full →
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


























// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { useState } from "react";
// // import {
// //   FaStar,
// //   FaStarHalfAlt,
// //   FaCheckCircle,
// //   FaHeart,
// //   FaEye,
// //   FaArrowLeft,
// //   FaArrowRight,
// // } from "react-icons/fa";
// // import { useRouter } from "next/navigation";

// // export default function Home() {
// //   const categories = [
// //     { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
// //     { label: "Simple-Shirts", image: "/simple-circle.jpeg", link: "/t-shirts" },
// //   ];

// //   // Oversize Products
// //   const oversizeProducts = [
// //     { id: 1, name: "Oversize T-Shirt", price: "PKR 1,999", image: "/simple-circle.jpeg", hoverImage: "/oversize-circle.jpeg", description: "Premium cotton oversized fit perfect for daily wear.", images: ["/simple-circle.jpeg","/oversize-circle.jpeg"] },
// //     { id: 2, name: "Classic Oversize", price: "PKR 2,499", image: "/slider1.png", hoverImage: "/slider2.png", description: "Classic oversize shirt with high-quality dobby fabric.", images: ["/slider1.png","/slider2.png"] },
// //     { id: 3, name: "Streetwear Oversize", price: "PKR 2,199", image: "/slider3.png", hoverImage: "/slider4.png", description: "Streetwear-inspired oversized shirt for bold looks.", images: ["/slider3.png","/slider4.png"] },
// //   ];

// //   const regularFitProducts = [
// //     { id: 9, name: "Regular Fit Polo", price: "PKR 2,199", image: "/slider1.png", hoverImage: "/slider2.png", description: "Classic polo shirt with a timeless regular fit.", images: ["/slider1.png","/slider2.png"] },
// //   ];

// //   const [favorites, setFavorites] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedSize, setSelectedSize] = useState("");
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);

// //   const router = useRouter();

// //   const toggleFavorite = (id) => {
// //     setFavorites((prev) =>
// //       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
// //     );
// //   };

// //   const handleAddToCart = () => {
// //     if (!selectedSize) {
// //       alert("Please select a size before adding to cart!");
// //       return;
// //     }

// //     // ✅ Navigate with product info to form page
// //     router.push(
// //       `/order-form?product=${selectedProduct.name}&size=${selectedSize}&qty=${quantity}&image=${selectedProduct.images[currentImageIndex]}`
// //     );
// //   };

// //   const ProductSection = ({ title, products }) => (
// //     <section className="max-w-6xl mx-auto px-6 py-12">
// //       <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //         {products.map((product) => (
// //           <div key={product.id} className="relative group">
// //             <div className="relative w-full h-72 overflow-hidden">
// //               <Image src={product.image} alt={product.name} fill className="object-cover transition-opacity duration-500 group-hover:opacity-0" />
// //               <Image src={product.hoverImage} alt={product.name} fill className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

// //               <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
// //                 <button
// //                   onClick={() => {
// //                     setSelectedProduct(product);
// //                     setCurrentImageIndex(0);
// //                     setSelectedSize("");
// //                     setQuantity(1);
// //                   }}
// //                   className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
// //                 >
// //                   <FaEye className="text-gray-800" />
// //                 </button>
// //                 <button
// //                   onClick={() => toggleFavorite(product.id)}
// //                   className={`p-2 rounded-full shadow ${
// //                     favorites.includes(product.id)
// //                       ? "bg-gray-300 text-red-600"
// //                       : "bg-white text-gray-800 hover:bg-gray-200"
// //                   }`}
// //                 >
// //                   <FaHeart />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="mt-4 text-center">
// //               <p className="font-semibold text-gray-900">{product.name}</p>
// //               <p className="text-gray-700">{product.price}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );

// //   return (
// //     <div>
// //       <ProductSection title="Oversize-Shirts" products={oversizeProducts} />
// //       <ProductSection title="Regular-Fit" products={regularFitProducts} />

// //       {/* Modal */}
// //       {selectedProduct && (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
// //             <button
// //               onClick={() => setSelectedProduct(null)}
// //               className="absolute top-3 right-3 text-xl font-bold"
// //             >
// //               ✕
// //             </button>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {/* Image with arrows */}
// //               <div className="relative w-full h-96 flex items-center justify-center bg-gray-100 rounded">
// //                 <Image
// //                   src={selectedProduct.images[currentImageIndex]}
// //                   alt={selectedProduct.name}
// //                   fill
// //                   className="object-cover rounded"
// //                 />
// //                 <button
// //                   onClick={() =>
// //                     setCurrentImageIndex(
// //                       (prev) =>
// //                         (prev - 1 + selectedProduct.images.length) %
// //                         selectedProduct.images.length
// //                     )
// //                   }
// //                   className="absolute left-2 bg-black/50 text-white p-2 rounded-full"
// //                 >
// //                   <FaArrowLeft />
// //                 </button>
// //                 <button
// //                   onClick={() =>
// //                     setCurrentImageIndex(
// //                       (prev) => (prev + 1) % selectedProduct.images.length
// //                     )
// //                   }
// //                   className="absolute right-2 bg-black/50 text-white p-2 rounded-full"
// //                 >
// //                   <FaArrowRight />
// //                 </button>
// //               </div>

// //               {/* Product Info */}
// //               <div>
// //                 <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
// //                 <p className="text-lg text-gray-700 mb-2">{selectedProduct.price}</p>
// //                 <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

// //                 {/* Sizes */}
// //                 <div className="mb-4">
// //                   <p className="font-medium mb-2">Size:</p>
// //                   <div className="flex gap-3">
// //                     {["Small", "Medium", "Large", "XL"].map((size) => (
// //                       <button
// //                         key={size}
// //                         onClick={() => setSelectedSize(size)}
// //                         className={`border px-3 py-1 text-sm transition ${
// //                           selectedSize === size
// //                             ? "bg-black text-white"
// //                             : "hover:bg-black hover:text-white"
// //                         }`}
// //                       >
// //                         {size}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Quantity */}
// //                 <div className="mb-4 flex items-center gap-3">
// //                   <p className="font-medium">Quantity:</p>
// //                   <button
// //                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
// //                     className="border px-3 py-1"
// //                   >
// //                     -
// //                   </button>
// //                   <span>{quantity}</span>
// //                   <button
// //                     onClick={() => setQuantity((q) => q + 1)}
// //                     className="border px-3 py-1"
// //                   >
// //                     +
// //                   </button>
// //                 </div>

// //                 <button
// //                   onClick={handleAddToCart}
// //                   className="w-full py-2 bg-black text-white hover:bg-red-600 transition"
// //                 >
// //                   Add to Cart
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }























































// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { useState } from "react";
// // import {
// //   FaStar,
// //   FaStarHalfAlt,
// //   FaCheckCircle,
// //   FaHeart,
// //   FaEye,
// // } from "react-icons/fa";

// // export default function Home() {
// //   const categories = [
// //     {
// //       label: "Oversize-Shirts",
// //       image: "/oversize-circle.jpeg",
// //       link: "/oversize-shirts",
// //     },
// //     {
// //       label: "Simple-Shirts",
// //       image: "/simple-circle.jpeg",
// //       link: "/t-shirts",
// //     },
// //   ];

// //   // Oversize Products
// //   const oversizeProducts = [
// //     {
// //       id: 1,
// //       name: "Oversize T-Shirt",
// //       price: "PKR 1,999",
// //       image: "/simple-circle.jpeg",
// //       hoverImage: "/oversize-circle.jpeg",
// //       description: "Premium cotton oversized fit perfect for daily wear.",
// //     },
// //     {
// //       id: 2,
// //       name: "Classic Oversize",
// //       price: "PKR 2,499",
// //       image: "/slider1.png",
// //       hoverImage: "/slider2.png",
// //       description: "Classic oversize shirt with high-quality dobby fabric.",
// //     },
// //     {
// //       id: 3,
// //       name: "Streetwear Oversize",
// //       price: "PKR 2,199",
// //       image: "/slider3.png",
// //       hoverImage: "/slider4.png",
// //       description: "Streetwear-inspired oversized shirt for bold looks.",
// //     },
// //     {
// //       id: 4,
// //       name: "Dobby Fabric Shirt",
// //       price: "PKR 2,999",
// //       image: "/slider4.png",
// //       hoverImage: "/slider5.png",
// //       description: "Unique dobby fabric, perfect for late summers & winters.",
// //     },
// //     {
// //       id: 5,
// //       name: "Casual Oversize Tee",
// //       price: "PKR 1,899",
// //       image: "/slider5.png",
// //       hoverImage: "/slider1.png",
// //       description: "Soft cotton casual tee for everyday comfort.",
// //     },
// //     {
// //       id: 6,
// //       name: "Summer Oversize Shirt",
// //       price: "PKR 2,299",
// //       image: "/slider2.png",
// //       hoverImage: "/slider3.png",
// //       description: "Lightweight summer oversize shirt with breathable fabric.",
// //     },
// //     {
// //       id: 7,
// //       name: "Urban Oversize Fit",
// //       price: "PKR 2,799",
// //       image: "/slider3.png",
// //       hoverImage: "/slider4.png",
// //       description: "Trendy urban-style oversized shirt with premium stitch.",
// //     },
// //     {
// //       id: 8,
// //       name: "Winter Oversize Hoodie",
// //       price: "PKR 3,499",
// //       image: "/slider4.png",
// //       hoverImage: "/slider5.png",
// //       description: "Warm & cozy oversized hoodie perfect for winters.",
// //     },
// //   ];

// //   // Regular Fit Products
// //   const regularFitProducts = [
// //     {
// //       id: 9,
// //       name: "Regular Fit Polo",
// //       price: "PKR 2,199",
// //       image: "/slider1.png",
// //       hoverImage: "/slider2.png",
// //       description: "Classic polo shirt with a timeless regular fit.",
// //     },
// //     {
// //       id: 10,
// //       name: "Casual Regular Tee",
// //       price: "PKR 1,699",
// //       image: "/slider3.png",
// //       hoverImage: "/slider4.png",
// //       description: "Everyday casual tee with regular fit comfort.",
// //     },
// //     {
// //       id: 11,
// //       name: "Regular Cotton Shirt",
// //       price: "PKR 2,399",
// //       image: "/slider5.png",
// //       hoverImage: "/slider1.png",
// //       description: "Soft cotton shirt, breathable & durable for daily use.",
// //     },
// //     {
// //       id: 12,
// //       name: "Classic Regular Shirt",
// //       price: "PKR 2,599",
// //       image: "/slider2.png",
// //       hoverImage: "/slider3.png",
// //       description: "Classic style regular shirt with sharp stitching.",
// //     },
// //     {
// //       id: 13,
// //       name: "Formal Regular Shirt",
// //       price: "PKR 2,999",
// //       image: "/slider3.png",
// //       hoverImage: "/slider4.png",
// //       description: "Perfect formal wear with a modern regular fit.",
// //     },
// //     {
// //       id: 14,
// //       name: "Regular Striped Tee",
// //       price: "PKR 1,899",
// //       image: "/slider4.png",
// //       hoverImage: "/slider5.png",
// //       description: "Trendy striped tee in a comfortable regular fit.",
// //     },
// //     {
// //       id: 15,
// //       name: "Summer Regular Fit",
// //       price: "PKR 2,099",
// //       image: "/slider5.png",
// //       hoverImage: "/slider1.png",
// //       description: "Light & breathable shirt for hot summer days.",
// //     },
// //     {
// //       id: 16,
// //       name: "Winter Regular Hoodie",
// //       price: "PKR 3,199",
// //       image: "/slider2.png",
// //       hoverImage: "/slider3.png",
// //       description: "Cozy winter hoodie in a versatile regular fit.",
// //     },
// //   ];

// //   const [favorites, setFavorites] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [quantity, setQuantity] = useState(1);

// //   const toggleFavorite = (id) => {
// //     setFavorites((prev) =>
// //       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
// //     );
// //   };

// //   // ✅ Reusable Product Section Component
// //   const ProductSection = ({ title, products }) => (
// //     <section className="max-w-6xl mx-auto px-6 py-12">
// //       <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
// //       <p className="text-gray-500 mb-8">
// //         Introducing the Dobby fabric. Comes with a unique pattern embossed and
// //         is perfect for late summers & early winters.
// //       </p>

// //       {/* ✅ Fixed 4 per row × 2 rows */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //         {products.slice(0, 8).map((product) => (
// //           <div key={product.id} className="relative group">
// //             <div className="relative w-full h-72 overflow-hidden">
// //               <Image
// //                 src={product.image}
// //                 alt={product.name}
// //                 fill
// //                 className="object-cover transition-opacity duration-500 group-hover:opacity-0"
// //               />
// //               <Image
// //                 src={product.hoverImage}
// //                 alt={product.name}
// //                 fill
// //                 className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
// //               />

// //               {/* Eye + Heart */}
// //               <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
// //                 <button
// //                   onClick={() => setSelectedProduct(product)}
// //                   className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
// //                 >
// //                   <FaEye className="text-gray-800" />
// //                 </button>
// //                 <button
// //                   onClick={() => toggleFavorite(product.id)}
// //                   className={`p-2 rounded-full shadow ${
// //                     favorites.includes(product.id)
// //                       ? "bg-gray-300 text-red-600"
// //                       : "bg-white text-gray-800 hover:bg-gray-200"
// //                   }`}
// //                 >
// //                   <FaHeart />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="mt-4 text-center">
// //               <p className="font-semibold text-gray-900">{product.name}</p>
// //               <p className="text-gray-700">{product.price}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );

// //   return (
// //     <div>
// //       {/* Category Circles */}
// //       <main className="w-full flex flex-col items-center py-12 bg-gray-50">
// //         <div className="flex gap-10 flex-wrap justify-center">
// //           {categories.map((cat) => (
// //             <Link key={cat.label} href={cat.link} className="group">
// //               <div className="w-56 h-56 overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-110">
// //                 <Image
// //                   src={cat.image}
// //                   alt={cat.label}
// //                   fill
// //                   className="object-cover"
// //                   priority
// //                 />
// //               </div>
// //               <p className="text-center mt-4 text-lg font-medium">{cat.label}</p>
// //             </Link>
// //           ))}
// //         </div>
// //         <div className="line w-96 h-0.5 bg-red-700"></div>
// //       </main>

// //       {/* Rating Bar */}
// //       <div className="w-full border-y border-gray-300 bg-[#f7f7f7] py-4">
// //         <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-4 px-4">
// //           <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
// //             <FaCheckCircle className="text-red-700" />
// //             <span>4.6</span>
// //             <div className="flex text-red-700">
// //               <FaStar />
// //               <FaStar />
// //               <FaStar />
// //               <FaStar />
// //               <FaStarHalfAlt />
// //             </div>
// //           </div>
// //           <div className="text-red-700 text-sm md:text-base border-x px-4 text-center">
// //             4.6 out of 5 stars based on 614 reviews
// //           </div>
// //           <div className="flex items-center gap-2 text-red-700 font-semibold">
// //             <span>Verified</span>
// //             <FaCheckCircle className="text-red-700" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Oversize Section */}
// //       <ProductSection title="Oversize-Shirts" products={oversizeProducts} />

// //       {/* Regular-Fit Section */}
// //       <ProductSection title="Regular-Fit" products={regularFitProducts} />

// //       {/* Modal */}
// //       {selectedProduct && (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
// //             <button
// //               onClick={() => setSelectedProduct(null)}
// //               className="absolute top-3 right-3 text-xl font-bold"
// //             >
// //               ✕
// //             </button>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="relative w-full h-96">
// //                 <Image
// //                   src={selectedProduct.image}
// //                   alt={selectedProduct.name}
// //                   fill
// //                   className="object-cover rounded"
// //                 />
// //               </div>

// //               <div>
// //                 <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
// //                 <p className="text-lg text-gray-700 mb-2">
// //                   {selectedProduct.price}
// //                 </p>
// //                 <div className="w-16 h-0.5 bg-gray-400 mb-4"></div>
// //                 <p className="text-gray-600 mb-4">
// //                   {selectedProduct.description}
// //                 </p>

// //                 <div className="mb-4">
// //                   <p className="font-medium mb-2">Size:</p>
// //                   <div className="flex gap-3">
// //                     {["Small", "Medium", "Large"].map((size) => (
// //                       <button
// //                         key={size}
// //                         className="border px-3 py-1 text-sm hover:bg-black hover:text-white transition"
// //                       >
// //                         {size}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="mb-4 flex items-center gap-3">
// //                   <p className="font-medium">Quantity:</p>
// //                   <button
// //                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
// //                     className="border px-3 py-1"
// //                   >
// //                     -
// //                   </button>
// //                   <span>{quantity}</span>
// //                   <button
// //                     onClick={() => setQuantity((q) => q + 1)}
// //                     className="border px-3 py-1"
// //                   >
// //                     +
// //                   </button>
// //                 </div>

// //                 <button className="w-full py-2 bg-black text-white hover:bg-red-600 transition">
// //                   Add to Cart
// //                 </button>

// //                 <div className="flex justify-between mt-4 text-sm text-gray-600">
// //                   <button className="hover:underline">Add to Wishlist</button>
// //                   <button className="hover:underline flex items-center gap-1">
// //                     View Full →
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
























"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaStar,
  FaStarHalfAlt,
  FaCheckCircle,
  FaHeart,
  FaEye,
} from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const categories = [
    { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
    { label: "Simple-Shirts", image: "/simple-circle.jpeg", link: "/t-shirts" },
  ];

  // ✅ Products me multiple images diye hain for slider
  const oversizeProducts = [
    {
      id: 1,
      name: "Oversize T-Shirt",
      price: "PKR 1,999",
      images: ["/simple-circle.jpeg", "/oversize-circle.jpeg"],
      description: "Premium cotton oversized fit perfect for daily wear.",
    },
    {
      id: 2,
      name: "Classic Oversize",
      price: "PKR 2,499",
      images: ["/slider1.png", "/slider2.png"],
      description: "Classic oversize shirt with high-quality dobby fabric.",
    },
    {
      id: 3,
      name: "Streetwear Oversize",
      price: "PKR 2,199",
      images: ["/slider3.png", "/slider4.png"],
      description: "Streetwear-inspired oversized shirt for bold looks.",
    },
    {
      id: 4,
      name: "Dobby Fabric Shirt",
      price: "PKR 2,999",
      images: ["/slider4.png", "/slider5.png"],
      description: "Unique dobby fabric, perfect for late summers & winters.",
    },
    {
      id: 5,
      name: "Casual Oversize Tee",
      price: "PKR 1,899",
      images: ["/slider5.png", "/slider1.png"],
      description: "Soft cotton casual tee for everyday comfort.",
    },
    {
      id: 6,
      name: "Summer Oversize Shirt",
      price: "PKR 2,299",
      images: ["/slider2.png", "/slider3.png"],
      description: "Lightweight summer oversize shirt with breathable fabric.",
    },
    {
      id: 7,
      name: "Urban Oversize Fit",
      price: "PKR 2,799",
      images: ["/slider3.png", "/slider4.png"],
      description: "Trendy urban-style oversized shirt with premium stitch.",
    },
    {
      id: 8,
      name: "Winter Oversize Hoodie",
      price: "PKR 3,499",
      images: ["/slider4.png", "/slider5.png"],
      description: "Warm & cozy oversized hoodie perfect for winters.",
    },
  ];

  const regularFitProducts = [
    {
      id: 9,
      name: "Regular Fit Polo",
      price: "PKR 2,199",
      images: ["/slider1.png", "/slider2.png"],
      description: "Classic polo shirt with a timeless regular fit.",
    },
    {
      id: 10,
      name: "Casual Regular Tee",
      price: "PKR 1,699",
      images: ["/slider3.png", "/slider4.png"],
      description: "Everyday casual tee with regular fit comfort.",
    },
    {
      id: 11,
      name: "Regular Cotton Shirt",
      price: "PKR 2,399",
      images: ["/slider5.png", "/slider1.png"],
      description: "Soft cotton shirt, breathable & durable for daily use.",
    },
    {
      id: 12,
      name: "Classic Regular Shirt",
      price: "PKR 2,599",
      images: ["/slider2.png", "/slider3.png"],
      description: "Classic style regular shirt with sharp stitching.",
    },
    {
      id: 13,
      name: "Formal Regular Shirt",
      price: "PKR 2,999",
      images: ["/slider3.png", "/slider4.png"],
      description: "Perfect formal wear with a modern regular fit.",
    },
    {
      id: 14,
      name: "Regular Striped Tee",
      price: "PKR 1,899",
      images: ["/slider4.png", "/slider5.png"],
      description: "Trendy striped tee in a comfortable regular fit.",
    },
    {
      id: 15,
      name: "Summer Regular Fit",
      price: "PKR 2,099",
      images: ["/slider5.png", "/slider1.png"],
      description: "Light & breathable shirt for hot summer days.",
    },
    {
      id: 16,
      name: "Winter Regular Hoodie",
      price: "PKR 3,199",
      images: ["/slider2.png", "/slider3.png"],
      description: "Cozy winter hoodie in a versatile regular fit.",
    },
  ];

  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const cartItem = {
      ...selectedProduct,
      size: selectedSize,
      quantity,
      image: selectedProduct.images[selectedImageIndex],
    };

    localStorage.setItem("cart", JSON.stringify(cartItem));
    router.push("/customerDetailForm"); // ✅ navigate to checkout page
  };

  // ✅ Product Section
  const ProductSection = ({ title, products }) => (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
      <p className="text-gray-500 mb-8">
        Introducing the Dobby fabric. Comes with a unique pattern embossed and
        is perfect for late summers & early winters.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            <div className="relative w-full h-72 overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              />

              {/* Eye + Heart */}
              <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedImageIndex(0);
                    setQuantity(1);
                    setSelectedSize(null);
                  }}
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
  );

  return (
    <div>
      {/* Categories */}
      <main className="w-full flex flex-col items-center py-12 bg-gray-50">
        <div className="flex gap-10 flex-wrap justify-center">
          {categories.map((cat) => (
            <Link key={cat.label} href={cat.link} className="group">
              <div className="w-56 h-56 overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-110">
                <Image src={cat.image} alt={cat.label} fill className="object-cover" priority />
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
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
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

      {/* Sections */}
      <ProductSection title="Oversize-Shirts" products={oversizeProducts} />
      <ProductSection title="Regular-Fit" products={regularFitProducts} />

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
              {/* Image with arrows */}
              <div className="relative w-full h-96 flex items-center justify-center">
                <Image
                  src={selectedProduct.images[selectedImageIndex]}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded"
                />
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev > 0 ? prev - 1 : selectedProduct.images.length - 1
                    )
                  }
                  className="absolute left-2 bg-white/80 px-2 py-1 rounded-full"
                >
                  ◀
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev < selectedProduct.images.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-2 bg-white/80 px-2 py-1 rounded-full"
                >
                  ▶
                </button>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-lg text-gray-700 mb-2">{selectedProduct.price}</p>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                {/* ✅ Size Selection */}
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

                {/* Add to Cart */}
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























// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useContext } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaStar,
//   FaStarHalfAlt,
//   FaCheckCircle,
//   FaHeart,
//   FaEye,
// } from "react-icons/fa";
// // import { CartContext } from "./ca"; // ✅ Context import

// export default function Home() {
//   const router = useRouter();
//   const { addToCart } = useContext(CartContext);

//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [showNotification, setShowNotification] = useState(false);

//   const oversizeProducts = [
//     { id: 1, name: "Oversize T-Shirt", price: "PKR 1,999", images: ["/simple-circle.jpeg", "/oversize-circle.jpeg"], description: "Premium cotton oversized fit perfect for daily wear." },
//     { id: 2, name: "Classic Oversize", price: "PKR 2,499", images: ["/slider1.png", "/slider2.png"], description: "Classic oversize shirt with high-quality dobby fabric." },
//   ];

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
//     );
//   };

//   const handleAddToCart = () => {
//     if (!selectedProduct) return;

//     const cartItem = {
//       ...selectedProduct,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.images[selectedImageIndex],
//     };

//     addToCart(cartItem); // ✅ Context me add hoga
//     setShowNotification(true); // ✅ Notification show
//     setTimeout(() => setShowNotification(false), 2000); // 2s baad hide
//     setSelectedProduct(null); // ✅ Modal band
//   };

//   // Product Grid Component
//   const ProductSection = ({ title, products }) => (
//     <section className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {products.map((product) => (
//           <div key={product.id} className="relative group">
//             <div className="relative w-full h-72 overflow-hidden">
//               <Image
//                 src={product.images[0]}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-opacity duration-500 group-hover:opacity-0"
//               />
//               <Image
//                 src={product.images[1]}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
//               />

//               {/* Eye + Heart */}
//               <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
//                   onClick={() => toggleFavorite(product.id)}
//                   className={`p-2 rounded-full shadow ${
//                     favorites.includes(product.id)
//                       ? "bg-gray-300 text-red-600"
//                       : "bg-white text-gray-800 hover:bg-gray-200"
//                   }`}
//                 >
//                   <FaHeart />
//                 </button>
//               </div>
//             </div>
//             <div className="mt-4 text-center">
//               <p className="font-semibold text-gray-900">{product.name}</p>
//               <p className="text-gray-700">{product.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   return (
//     <div>
//       {/* Product Sections */}
//       <ProductSection title="Oversize-Shirts" products={oversizeProducts} />

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
//               {/* Image */}
//               <div className="relative w-full h-96">
//                 <Image
//                   src={selectedProduct.images[selectedImageIndex]}
//                   alt={selectedProduct.name}
//                   fill
//                   className="object-cover rounded"
//                 />
//               </div>
//               {/* Details */}
//               <div>
//                 <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
//                 <p className="text-lg text-gray-700 mb-2">
//                   {selectedProduct.price}
//                 </p>
//                 <p className="text-gray-600 mb-4">
//                   {selectedProduct.description}
//                 </p>
//                 {/* Add to Cart */}
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

//       {/* ✅ Notification */}
//       {showNotification && (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-3 rounded shadow-lg z-50">
//           ✅ Added to Cart
//         </div>
//       )}
//     </div>
//   );
// }
