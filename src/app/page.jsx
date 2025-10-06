// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaStar,
//   FaStarHalfAlt,
//   FaCheckCircle,
//   FaHeart,
//   FaEye,
// } from "react-icons/fa";

// export default function Home() {
//   const router = useRouter();

//   const categories = [
//     { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
//     { label: "Simple-Shirts", image: "/simple-circle.jpeg", link: "/t-shirts" },
//   ];

//   const oversizeProducts = [
//     {
//       id: 1,
//       name: "Oversize T-Shirt",
//       price: "PKR 1,999",
//       images: ["/simple-circle.jpeg", "/oversize-circle.jpeg"],
//       description: "Premium cotton oversized fit perfect for daily wear.",
//     },
//     {
//       id: 2,
//       name: "Classic Oversize",
//       price: "PKR 2,499",
//       images: ["/slider1.png", "/slider2.png"],
//       description: "Classic oversize shirt with high-quality dobby fabric.",
//     },
//   ];

//   const regularFitProducts = [
//     {
//       id: 3,
//       name: "Regular Fit Polo",
//       price: "PKR 2,199",
//       images: ["/slider3.png", "/slider4.png"],
//       description: "Classic polo shirt with a timeless regular fit.",
//     },
//     {
//       id: 4,
//       name: "Casual Regular Tee",
//       price: "PKR 1,699",
//       images: ["/slider5.png", "/slider1.png"],
//       description: "Everyday casual tee with regular fit comfort.",
//     },
//   ];

//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
//     );
//   };

//   const handleAddToCart = () => {
//     if (!selectedProduct || !selectedSize) return; // size required

//     const newItem = {
//       id: selectedProduct.id,
//       name: selectedProduct.name,
//       price: selectedProduct.price,
//       size: selectedSize,
//       quantity,
//       image: selectedProduct.images[selectedImageIndex],
//     };

//     let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Check if item already exists (same product + size)
//     const existingIndex = existingCart.findIndex(
//       (item) => item.id === newItem.id && item.size === newItem.size
//     );

//     if (existingIndex >= 0) {
//       existingCart[existingIndex].quantity += newItem.quantity;
//     } else {
//       existingCart.push(newItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart));

//     setSelectedProduct(null); // modal close
//     router.push("/cart"); // go to cart
//   };

//   const ProductSection = ({ title, products }) => (
//     <section className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
//       <p className="text-gray-500 mb-8">Our latest collection</p>

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
//       {/* Categories */}
//       <main className="w-full flex flex-col items-center py-12 bg-gray-50">
//         <div className="flex gap-10 flex-wrap justify-center">
//           {categories.map((cat) => (
//             <Link key={cat.label} href={cat.link} className="group">
//               <div className="w-56 h-56 overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-110">
//                 <Image src={cat.image} alt={cat.label} fill className="object-cover" priority />
//               </div>
//               <p className="text-center mt-4 text-lg font-medium">{cat.label}</p>
//             </Link>
//           ))}
//         </div>
//         <div className="line w-96 h-0.5 bg-red-700"></div>
//       </main>

//       {/* Sections */}
//       <ProductSection title="Oversize-Shirts" products={oversizeProducts} />
//       <ProductSection title="Regular-Fit" products={regularFitProducts} />

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
//               <div className="relative w-full h-96 flex items-center justify-center">
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
//                 <p className="text-lg text-gray-700 mb-2">{selectedProduct.price}</p>
//                 <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

//                 {/* Size */}
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

//                 {/* Quantity */}
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
//     </div>
//   );
// }

















// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaHeart,
//   FaEye,
// } from "react-icons/fa";

// export default function Home() {
//   const router = useRouter();

//   const categories = [
//     { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
//     { label: "Simple-Shirts", image: "/simple-circle.jpeg", link: "/t-shirts" },
//   ];

//   const oversizeProducts = [
//     {
//       id: 1,
//       name: "Oversize T-Shirt",
//       price: "PKR 1,999",
//       images: ["/simple-circle.jpeg", "/oversize-circle.jpeg"],
//       description: "Premium cotton oversized fit perfect for daily wear.",
//     },
//     {
//       id: 2,
//       name: "Classic Oversize",
//       price: "PKR 2,499",
//       images: ["/slider1.png", "/slider2.png"],
//       description: "Classic oversize shirt with high-quality dobby fabric.",
//     },
//   ];

//   const regularFitProducts = [
//     {
//       id: 3,
//       name: "Regular Fit Polo",
//       price: "PKR 2,199",
//       images: ["/slider3.png", "/slider4.png"],
//       description: "Classic polo shirt with a timeless regular fit.",
//     },
//     {
//       id: 4,
//       name: "Casual Regular Tee",
//       price: "PKR 1,699",
//       images: ["/slider5.png", "/slider1.png"],
//       description: "Everyday casual tee with regular fit comfort.",
//     },
//   ];

//   const [favorites, setFavorites] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);

//   //  Wishlist handle
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

//     //  Wishlist page pe redirect
//   };

//   //  Add to cart
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

//   const ProductSection = ({ title, products }) => (
//     <section className="max-w-6xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
//       <p className="text-gray-500 mb-8">Our latest collection</p>

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
//       {/* Categories */}
//       <main className="w-full flex flex-col items-center py-12 bg-gray-50">
//         <div className="flex gap-10 flex-wrap justify-center">
//           {categories.map((cat) => (
//             <Link key={cat.label} href={cat.link} className="group">
//               <div className="w-56 h-56 overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-110">
//                 <Image src={cat.image} alt={cat.label} fill className="object-cover" priority />
//               </div>
//               <p className="text-center mt-4 text-lg font-medium">{cat.label}</p>
//             </Link>
//           ))}
//         </div>
//         <div className="line w-96 h-0.5 bg-red-700"></div>
//       </main>

//       {/* Sections */}
//       <ProductSection title="Oversize-Shirts" products={oversizeProducts} />
//       <ProductSection title="Regular-Fit" products={regularFitProducts} />

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
//               <div className="relative w-full h-96 flex items-center justify-center">
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
//                 <p className="text-lg text-gray-700 mb-2">{selectedProduct.price}</p>
//                 <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

//                 {/* Size */}
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

//                 {/* Quantity */}
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
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import OversizeShirts from "./oversize-shirts/page";
import RegularShirtsPage from "./regular-shirts/page";
import {
  FaStar,
  FaStarHalfAlt,
  FaCheckCircle,
  FaHeart,
  FaEye,
} from "react-icons/fa";

export default function Home() {
  const categories = [
    { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
    { label: "Regular-Shirts", image: "/simple-circle.jpeg", link: "/regular-shirts" },
  ];

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
      

      {/* Oversize Shirts Section */}
      <section className="py-10">
        <OversizeShirts />
      </section>

      {/* Regular Fit Section */}
      <section className="py-10">
        <RegularShirtsPage />
      </section>
    </div>
  );
}






































