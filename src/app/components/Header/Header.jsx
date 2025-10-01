// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaFacebookF,
//   FaInstagram,
//   FaTiktok,
//   FaSearch,
//   FaShoppingBag,
// } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";

// export default function Header() {
//   const [cartCount, setCartCount] = useState(0);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const pathname = usePathname();

//   // Navbar links
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/oversize-shirts", label: "Oversize-Shirts" },
//     { href: "/t-shirts", label: "T-Shirts" },
//   ];

//   return (
//     <header>
//       {/* 🔹 Top Bar */}
//       <div className="bg-black text-white text-sm flex justify-between items-center px-6 py-2">
//         {/* Left */}
//         <div className="flex items-center gap-4">
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaPhoneAlt /> Call Us
//           </span>
//           <span>|</span>
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaEnvelope /> Email Us
//           </span>
//         </div>

//         {/* Center */}
//         <div className="flex flex-col items-center">
//           <p className="relative">
//             Get Free Shipping on Orders Above 12,000 -{" "}
//             <button className="relative text-red-600 hover:text-white">
//               SHOP NOW!
//               <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600"></span>
//             </button>
//           </p>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-4">
//           {/* Pakistan Flag */}
//           <Image src="/pakistan.png" alt="Pakistan" width={24} height={16} />

//           {/* Dropdown */}
//           <select className="bg-black text-white border border-gray-600 px-2 py-1 rounded hover:border-red-500">
//             <option>Pakistan</option>
//             <option>Punjab</option>
//             <option>Sindh</option>
//             <option>Balochistan</option>
//             <option>KPK</option>
//           </select>

//           {/* Social Icons */}
//           <div className="flex gap-3 text-white">
//             <FaFacebookF className="hover:text-red-500 cursor-pointer" />
//             <FaInstagram className="hover:text-red-500 cursor-pointer" />
//             <FaTiktok className="hover:text-red-500 cursor-pointer" />
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Navbar */}
//       <nav className="flex justify-between items-center px-6 py-4 border-b">
//         {/* Logo */}
//         <div>
//           <Image
//             src="/black-logo2.png"
//             alt="Logo"
//             width={100}
//             height={40}
//             priority
//           />
//         </div>

//         {/* Center Links */}
//         <div className="flex gap-6 relative">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="relative pb-1 text-black"
//               >
//                 {link.label}
//                 <span
//                   className={`absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-200 
//                   ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
//                 />
//               </Link>
//             );
//           })}
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center gap-6">
//           {/* Search */}
//           <div className="relative">
//             <FaSearch
//               className="cursor-pointer hover:text-red-500"
//               onClick={() => setSearchOpen(!searchOpen)}
//             />
//             {searchOpen && (
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="absolute right-0 top-6 border rounded px-2 py-1 text-black"
//               />
//             )}
//           </div>

//           {/* Shopping Bag */}
//           <Link href="/cart" className="relative flex items-center">
//             <FaShoppingBag className="hover:text-red-500 text-xl cursor-pointer" />
//             {cartCount > 0 && (
//               <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </nav>

//       {/* 🔹 Slider Below Navbar */}
//       <Slider />
//     </header>
//   );
// }

// /* -------------------- SLIDER COMPONENT -------------------- */
// function Slider() {
//   const images = [
//     "/slider1.png",
//     "/slider2.png",
//     "/slider3.png",
//     "/slider4.png",
//     "/slider5.png",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let startTimer;
//     let slideInterval;

//     // ⏳ First 9s -> no slide
//     startTimer = setTimeout(() => {
//       // Auto slide every 4s
//       slideInterval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//       }, 4000);
//     }, 9000);

//     return () => {
//       clearTimeout(startTimer);
//       clearInterval(slideInterval);
//     };
//   }, [images.length]);

//   // ⬅️ Prev & ➡️ Next
//   const goPrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };
//   const goNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   return (
//     <div className="relative w-full h-[500px] overflow-hidden">
//       {/* Slider Images */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((src, idx) => (
//           <div key={idx} className="w-full flex-shrink-0 relative h-[500px]">
//             <Image
//               src={src}
//               alt={`Slide ${idx + 1}`}
//               fill
//               className="object-cover"
//               priority={idx === 0}
//             />
//           </div>
//         ))}
//       </div>

//       {/* ⬅️ Left Arrow */}
//       <button
//         onClick={goPrev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
//       >
//         ❮
//       </button>

//       {/* ➡️ Right Arrow */}
//       <button
//         onClick={goNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
//       >
//         ❯
//       </button>

//       {/* 🔹 Slide Count */}
//       <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
//         {currentIndex + 1} / {images.length}
//       </div>

//       {/* 🔹 Dots Indicators */}
//       <div className="absolute bottom-4 w-full flex justify-center gap-2">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === idx ? "bg-red-600" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaFacebookF,
//   FaInstagram,
//   FaTiktok,
//   FaSearch,
//   FaShoppingBag,
//   FaTimes,
// } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";

// export default function Header() {
//   const [cartCount, setCartCount] = useState(0);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Dummy products (yeh API se bhi aa sakte hain)
//   const [products] = useState([
//     { id: 1, name: "Oversize Shirt", price: 2500, img: "/slider1.png" },
//     { id: 2, name: "Casual T-Shirt", price: 1500, img: "/slider2.png" },
//     { id: 3, name: "Graphic Tee", price: 1800, img: "/slider3.png" },
//   ]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Navbar links
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/oversize-shirts", label: "Oversize-Shirts" },
//     { href: "/t-shirts", label: "T-Shirts" },
//   ];

//   return (
//     <header>
//       {/* 🔹 Top Bar */}
//       <div className="bg-black text-white text-sm flex justify-between items-center px-6 py-2">
//         {/* Left */}
//         <div className="flex items-center gap-4">
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaPhoneAlt /> Call Us
//           </span>
//           <span>|</span>
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaEnvelope /> Email Us
//           </span>
//         </div>

//         {/* Center */}
//         <div className="flex flex-col items-center">
//           <p className="relative">
//             Get Free Shipping on Orders Above 12,000 -{" "}
//             <button className="relative text-red-600 hover:text-white">
//               SHOP NOW!
//               <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600"></span>
//             </button>
//           </p>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-4">
//           {/* Pakistan Flag */}
//           <Image src="/pakistan.png" alt="Pakistan" width={24} height={16} />

//           {/* Dropdown */}
//           <select className="bg-black text-white border border-gray-600 px-2 py-1 rounded hover:border-red-500">
//             <option>Pakistan</option>
//             <option>Punjab</option>
//             <option>Sindh</option>
//             <option>Balochistan</option>
//             <option>KPK</option>
//           </select>

//           {/* Social Icons */}
//           <div className="flex gap-3 text-white">
//             <FaFacebookF className="hover:text-red-500 cursor-pointer" />
//             <FaInstagram className="hover:text-red-500 cursor-pointer" />
//             <FaTiktok className="hover:text-red-500 cursor-pointer" />
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Navbar */}
//       <nav className="flex justify-between items-center px-6 py-4 border-b">
//         {/* Logo */}
//         <div>
//           <Image
//             src="/black-logo2.png"
//             alt="Logo"
//             width={100}
//             height={40}
//             priority
//           />
//         </div>

//         {/* Center Links */}
//         <div className="flex gap-6 relative">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="relative pb-1 text-black"
//               >
//                 {link.label}
//                 <span
//                   className={`absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-200 
//                   ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
//                 />
//               </Link>
//             );
//           })}
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center gap-6">
//           {/* Search */}
//           <div className="relative">
//             <FaSearch
//               className="cursor-pointer hover:text-red-500"
//               onClick={() => setSearchOpen(true)}
//             />
//           </div>

//           {/* Shopping Bag */}
//           <Link href="/cart" className="relative flex items-center">
//             <FaShoppingBag className="hover:text-red-500 text-xl cursor-pointer" />
//             {cartCount > 0 && (
//               <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </nav>

//       {/* 🔹 Search Sidebar */}
//       {searchOpen && (
//         <div className="fixed inset-0 bg-black/40 z-40">
//           <div className="absolute right-0 top-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col">
//             {/* Close Button */}
//             <button
//               className="ml-auto text-gray-600 hover:text-red-500"
//               onClick={() => setSearchOpen(false)}
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* Search Input */}
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border px-3 py-2 rounded mb-4 w-full"
//             />

//             {/* Products List */}
//             <div className="flex flex-col gap-3 overflow-y-auto">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     onClick={() => {
//                       setSearchOpen(false);
//                       router.push("/cart"); // direct cart page
//                     }}
//                     className="flex items-center gap-3 border p-2 rounded cursor-pointer hover:shadow-md"
//                   >
//                     <Image
//                       src={product.img}
//                       alt={product.name}
//                       width={60}
//                       height={60}
//                       className="rounded"
//                     />
//                     <div>
//                       <h4 className="font-semibold">{product.name}</h4>
//                       <p className="text-sm text-gray-600">Rs. {product.price}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-sm">No products found</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔹 Slider Below Navbar */}
//       <Slider />
//     </header>
//   );
// }

// /* -------------------- SLIDER COMPONENT -------------------- */
// function Slider() {
//   const images = [
//     "/slider1.png",
//     "/slider2.png",
//     "/slider3.png",
//     "/slider4.png",
//     "/slider5.png",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let startTimer;
//     let slideInterval;

//     // ⏳ First 9s -> no slide
//     startTimer = setTimeout(() => {
//       // Auto slide every 4s
//       slideInterval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//       }, 4000);
//     }, 9000);

//     return () => {
//       clearTimeout(startTimer);
//       clearInterval(slideInterval);
//     };
//   }, [images.length]);

//   const goPrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };
//   const goNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   return (
//     <div className="relative w-full h-[500px] overflow-hidden">
//       {/* Slider Images */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((src, idx) => (
//           <div key={idx} className="w-full flex-shrink-0 relative h-[500px]">
//             <Image
//               src={src}
//               alt={`Slide ${idx + 1}`}
//               fill
//               className="object-cover"
//               priority={idx === 0}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={goPrev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
//       >
//         ❮
//       </button>
//       <button
//         onClick={goNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
//       >
//         ❯
//       </button>

//       {/* Counter */}
//       <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
//         {currentIndex + 1} / {images.length}
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-4 w-full flex justify-center gap-2">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === idx ? "bg-red-600" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }






















// "use client";

// import { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaFacebookF,
//   FaInstagram,
//   FaTiktok,
//   FaSearch,
//   FaShoppingBag,
//   FaTimes,
// } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div>
//       <Header />
//     </div>
//   );
// }

// /* -------------------- HEADER -------------------- */
// function Header() {
//   const [cartCount, setCartCount] = useState(0);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Dummy products
//   const [products] = useState([
//     { id: 1, name: "Oversize Shirt", price: 2500, img: "/slider1.png" },
//     { id: 2, name: "Casual T-Shirt", price: 1500, img: "/slider2.png" },
//     { id: 3, name: "Graphic Tee", price: 1800, img: "/slider3.png" },
//   ]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Navbar links
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/oversize-shirts", label: "Oversize-Shirts" },
//     { href: "/t-shirts", label: "T-Shirts" },
//   ];

//   return (
//     <header>
//       {/* 🔹 Top Bar */}
//       <div className="bg-black text-white text-sm flex justify-between items-center px-6 py-2">
//         {/* Left */}
//         <div className="flex items-center gap-4">
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaPhoneAlt /> Call Us
//           </span>
//           <span>|</span>
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaEnvelope /> Email Us
//           </span>
//         </div>

//         {/* Center */}
//         <div className="flex flex-col items-center">
//           <p className="relative">
//             Get Free Shipping on Orders Above 12,000 -{" "}
//             <button className="relative text-red-600 hover:text-white">
//               SHOP NOW!
//               <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600"></span>
//             </button>
//           </p>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-4">
//           {/* Pakistan Flag */}
//           <Image src="/pakistan.png" alt="Pakistan" width={24} height={16} />

//           {/* Dropdown */}
//           <select className="bg-black text-white border border-gray-600 px-2 py-1 rounded hover:border-red-500">
//             <option>Pakistan</option>
//             <option>Punjab</option>
//             <option>Sindh</option>
//             <option>Balochistan</option>
//             <option>KPK</option>
//           </select>

//           {/* Social Icons */}
//           <div className="flex gap-3 text-white">
//             <FaFacebookF className="hover:text-red-500 cursor-pointer" />
//             <FaInstagram className="hover:text-red-500 cursor-pointer" />
//             <FaTiktok className="hover:text-red-500 cursor-pointer" />
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Navbar */}
//       <nav className="flex justify-between items-center px-6 py-4 border-b">
//         {/* Logo */}
//         <div>
//           <Image
//             src="/black-logo2.png"
//             alt="Logo"
//             width={100}
//             height={40}
//             priority
//           />
//         </div>

//         {/* Center Links */}
//         <div className="flex gap-6 relative">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="relative pb-1 text-black"
//               >
//                 {link.label}
//                 <span
//                   className={`absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-200 
//                   ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
//                 />
//               </Link>
//             );
//           })}
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center gap-6">
//           {/* Search */}
//           <div className="relative">
//             <FaSearch
//               className="cursor-pointer hover:text-red-500"
//               onClick={() => setSearchOpen(true)}
//             />
//           </div>

//           {/* Shopping Bag */}
//           <Link href="/cart" className="relative flex items-center">
//             <FaShoppingBag className="hover:text-red-500 text-xl cursor-pointer" />
//             {cartCount > 0 && (
//               <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </nav>

//       {/* 🔹 Search Sidebar */}
//       {searchOpen && (
//         <div className="fixed inset-0 bg-black/40 z-40">
//           <div className="absolute right-0 top-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col">
//             {/* Close Button */}
//             <button
//               className="ml-auto text-gray-600 hover:text-red-500"
//               onClick={() => setSearchOpen(false)}
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* Search Input */}
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border px-3 py-2 rounded mb-4 w-full"
//             />

//             {/* Products List */}
//             <div className="flex flex-col gap-3 overflow-y-auto">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     onClick={() => {
//                       setSearchOpen(false);
//                       router.push("/cart"); // direct cart page
//                     }}
//                     className="flex items-center gap-3 border p-2 rounded cursor-pointer hover:shadow-md"
//                   >
//                     <Image
//                       src={product.img}
//                       alt={product.name}
//                       width={60}
//                       height={60}
//                       className="rounded"
//                     />
//                     <div>
//                       <h4 className="font-semibold">{product.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         Rs. {product.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-sm">No products found</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔹 Slider Below Navbar */}
//       <Slider />
//     </header>
//   );
// }

// /* -------------------- SLIDER COMPONENT -------------------- */
// function Slider() {
//   const images = [
//     "/slider1.png",
//     "/slider2.png",
//     "/slider3.png",
//     "/slider4.png",
//     "/slider5.png",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let startTimer;
//     let slideInterval;

//     // ⏳ First 9s -> no slide
//     startTimer = setTimeout(() => {
//       // Auto slide every 4s
//       slideInterval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//       }, 4000);
//     }, 9000);

//     return () => {
//       clearTimeout(startTimer);
//       clearInterval(slideInterval);
//     };
//   }, [images.length]);

//   const goPrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };
//   const goNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   return (
//     <div className="relative w-full h-[500px] overflow-hidden">
//       {/* Slider Images */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((src, idx) => (
//           <div key={idx} className="w-full flex-shrink-0 relative h-[500px]">
//             <Image
//               src={src}
//               alt={`Slide ${idx + 1}`}
//               fill
//               className="object-cover"
//               priority={idx === 0}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={goPrev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
//       >
//         ❮
//       </button>
//       <button
//         onClick={goNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
//       >
//         ❯
//       </button>

//       {/* Counter */}
//       <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
//         {currentIndex + 1} / {images.length}
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-4 w-full flex justify-center gap-2">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === idx ? "bg-red-600" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



















































































// "use client";

// import { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaFacebookF,
//   FaInstagram,
//   FaTiktok,
//   FaSearch,
//   FaShoppingBag,
//   FaTimes,
// } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";
// import Fuse from "fuse.js";

// export default function Header() {
//   const [cartCount, setCartCount] = useState(0);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // 🔹 Dummy products (API se bhi aa sakte hain)
//   const [products] = useState([
//     { id: 1, name: "Oversize Shirt", price: 2500, img: "/slider1.png" },
//     { id: 2, name: "Casual T-Shirt", price: 1500, img: "/slider2.png" },
//     { id: 3, name: "Graphic Tee", price: 1800, img: "/slider3.png" },
//     { id: 4, name: "Black Hoodie", price: 3500, img: "/slider4.png" },
//     { id: 5, name: "Summer Polo", price: 2200, img: "/slider5.png" },
//   ]);

//   const [searchQuery, setSearchQuery] = useState("");

//   // 🔎 Fuse.js setup
//   const fuse = new Fuse(products, {
//     keys: ["name"],
//     threshold: 0.4, // typo tolerance
//     distance: 100,
//   });

//   // Filtered Products
//   let filteredProducts = [];
//   if (searchQuery.trim() !== "") {
//     const results = fuse.search(searchQuery);
//     filteredProducts = results.map((r) => r.item);

//     // ✅ Exact match ko sabse pehle lao
//     const exactMatch = products.find(
//       (p) => p.name.toLowerCase() === searchQuery.toLowerCase()
//     );
//     if (exactMatch) {
//       filteredProducts = [
//         exactMatch,
//         ...filteredProducts.filter((p) => p.id !== exactMatch.id),
//       ];
//     }
//   }

//   // 🔹 Navbar links
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/oversize-shirts", label: "Oversize-Shirts" },
//     { href: "/regular-shirts", label: "Regular-Shirts" },
//   ];

//   return (
//     <header>
//       {/* 🔹 Top Bar */}
//       <div className="bg-black text-white text-sm flex justify-between items-center px-6 py-2">
//         {/* Left */}
//         <div className="flex items-center gap-4">
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaPhoneAlt /> Call Us
//           </span>
//           <span>|</span>
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaEnvelope /> Email Us
//           </span>
//         </div>

//         {/* Center */}
//         <div className="flex flex-col items-center">
//           <p className="relative">
//             Get Free Shipping on Orders Above 12,000 -{" "}
//             <button className="relative text-red-600 hover:text-white hover:cursor-pointer">
//               SHOP NOW!
//               <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600"></span>
//             </button>
//           </p>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-4">
//           {/* Pakistan Flag */}
//           <Image src="/pakistan.png" alt="Pakistan" width={24} height={16} />

//           {/* Dropdown */}
//           <select className="bg-black text-white border border-gray-600 px-2 py-1 rounded hover:border-red-500">
//             <option disabled selected>Pakistan</option>
//             <option>Punjab</option>
//             <option>Sindh</option>
//             <option>Balochistan</option>
//             <option>KPK</option>
//           </select>

//           {/* Social Icons */}
//           <div className="flex gap-3 text-white">
//             <FaFacebookF className="hover:text-red-500 cursor-pointer" />
//             <FaInstagram className="hover:text-red-500 cursor-pointer" />
//             <FaTiktok className="hover:text-red-500 cursor-pointer" />
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Navbar */}
//       <nav className="flex justify-between items-center px-6 py-4 border-b">
//         {/* Logo */}
//         <div>
//           <Image
//             src="/black-logo2.png"
//             alt="Logo"
//             width={100}
//             height={40}
//             priority
//           />
//         </div>

//         {/* Center Links */}
//         <div className="flex gap-6 relative">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="relative pb-1 text-black"
//               >
//                 {link.label}
//                 <span
//                   className={`absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-200 
//                   ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
//                 />
//               </Link>
//             );
//           })}
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center gap-6">
//           {/* Search */}
//           <div className="relative">
//             <FaSearch
//               className="cursor-pointer hover:text-red-500"
//               onClick={() => setSearchOpen(true)}
//             />
//           </div>

//           {/* Shopping Bag */}
//           <Link href="/cart" className="relative flex items-center">
//             <FaShoppingBag className="hover:text-red-500 text-xl cursor-pointer" />
//             {cartCount > 0 && (
//               <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </nav>

//       {/* 🔹 Search Sidebar */}
//       {searchOpen && (
//         <div className="fixed inset-0 bg-black/40 z-40">
//           <div className="absolute right-0 top-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col">
//             {/* Close Button */}
//             <button
//               className="ml-auto text-gray-600 hover:text-red-500"
//               onClick={() => setSearchOpen(false)}
//             >
//               <FaTimes size={20} />
//             </button>

//             {/* Search Input */}
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border px-3 py-2 rounded mb-4 w-full"
//             />

//             {/* Products List */}
//             <div className="flex flex-col gap-3 overflow-y-auto">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     onClick={() => {
//                       setSearchOpen(false);
//                       router.push("/cart"); // direct cart page
//                     }}
//                     className="flex items-center gap-3 border p-2 rounded cursor-pointer hover:shadow-md"
//                   >
//                     <Image
//                       src={product.img}
//                       alt={product.name}
//                       width={60}
//                       height={60}
//                       className="rounded"
//                     />
//                     <div>
//                       <h4 className="font-semibold">{product.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         Rs. {product.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-sm">No products found</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔹 Slider Below Navbar */}
//       <Slider />
//     </header>
//   );
// }

// /* -------------------- SLIDER COMPONENT -------------------- */
// function Slider() {
//   const images = [
//     "/slider1.png",
//     "/slider2.png",
//     "/slider3.png",
//     "/slider4.png",
//     "/slider5.png",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let startTimer;
//     let slideInterval;

//     // ⏳ First 9s -> no slide
//     startTimer = setTimeout(() => {
//       // Auto slide every 4s
//       slideInterval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//       }, 4000);
//     }, 9000);

//     return () => {
//       clearTimeout(startTimer);
//       clearInterval(slideInterval);
//     };
//   }, [images.length]);

//   const goPrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };
//   const goNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   return (
//     <div className="relative w-full h-[500px] overflow-hidden">
//       {/* Slider Images */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((src, idx) => (
//           <div key={idx} className="w-full flex-shrink-0 relative h-[500px]">
//             <Image
//               src={src}
//               alt={`Slide ${idx + 1}`}
//               fill
//               className="object-cover"
//               priority={idx === 0}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={goPrev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
//       >
//         ❮
//       </button>
//       <button
//         onClick={goNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
//       >
//         ❯
//       </button>

//       {/* Counter */}
//       <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
//         {currentIndex + 1} / {images.length}
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-4 w-full flex justify-center gap-2">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === idx ? "bg-red-600" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }







































"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaSearch,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Fuse from "fuse.js";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 🔹 Dummy products
  const [products] = useState([
    { id: 1, name: "Oversize Shirt", price: 2500, img: "/slider1.png" },
    { id: 2, name: "Casual T-Shirt", price: 1500, img: "/slider2.png" },
    { id: 3, name: "Graphic Tee", price: 1800, img: "/slider3.png" },
    { id: 4, name: "Black Hoodie", price: 3500, img: "/slider4.png" },
    { id: 5, name: "Summer Polo", price: 2200, img: "/slider5.png" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // 🔎 Fuse.js setup
  const fuse = new Fuse(products, {
    keys: ["name"],
    threshold: 0.4,
    distance: 100,
  });

  let filteredProducts = [];
  if (searchQuery.trim() !== "") {
    const results = fuse.search(searchQuery);
    filteredProducts = results.map((r) => r.item);

    const exactMatch = products.find(
      (p) => p.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (exactMatch) {
      filteredProducts = [
        exactMatch,
        ...filteredProducts.filter((p) => p.id !== exactMatch.id),
      ];
    }
  }

  // 🔹 Navbar links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/oversize-shirts", label: "Oversize-Shirts" },
    { href: "/regular-shirts", label: "Regular-Shirts" },
  ];

  return (
    <header>
      {/* 🔹 Top Bar */}
      <div className="bg-black text-white text-sm flex justify-between items-center px-6 py-2">
        {/* Left */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
            <FaPhoneAlt /> Call Us
          </span>
          <span>|</span>
          <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
            <FaEnvelope /> Email Us
          </span>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center">
          <p className="relative">
            Get Free Shipping on Orders Above 12,000 -{" "}
            <button className="relative text-red-600 hover:text-white hover:cursor-pointer">
              SHOP NOW!
              <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600"></span>
            </button>
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Image src="/pakistan.png" alt="Pakistan" width={24} height={16} />
          <select className="bg-black text-white border border-gray-600 px-2 py-1 rounded hover:border-red-500">
            <option disabled selected>
              Pakistan
            </option>
            <option>Punjab</option>
            <option>Sindh</option>
            <option>Balochistan</option>
            <option>KPK</option>
          </select>
          <div className="flex gap-3 text-white">
            <FaFacebookF className="hover:text-red-500 cursor-pointer" />
            <FaInstagram className="hover:text-red-500 cursor-pointer" />
            <FaTiktok className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b">
        {/* ✅ Logo - now clickable */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer hover:cursor-pointer"
        >
          <Image
            src="/black-logo2.png"
            alt="Logo"
            width={100}
            height={40}
            priority
          />
        </div>

        {/* Center Links */}
        <div className="flex gap-6 relative">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative pb-1 text-black hover:cursor-pointer"
              >
                {link.label}
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-200 
                  ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <FaSearch
              className="cursor-pointer hover:text-red-500"
              onClick={() => setSearchOpen(true)}
            />
          </div>

          <Link href="/cart" className="relative flex items-center">
            <FaShoppingBag className="hover:text-red-500 text-xl cursor-pointer" />
            {cartCount > 0 && (
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* 🔹 Search Sidebar */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 z-40">
          <div className="absolute right-0 top-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col">
            <button
              className="ml-auto text-gray-600 hover:text-red-500"
              onClick={() => setSearchOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-2 rounded mb-4 w-full"
            />
            <div className="flex flex-col gap-3 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSearchOpen(false);
                      router.push("/cart");
                    }}
                    className="flex items-center gap-3 border p-2 rounded cursor-pointer hover:shadow-md"
                  >
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-600">
                        Rs. {product.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No products found</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Slider />
    </header>
  );
}

/* -------------------- SLIDER COMPONENT -------------------- */
function Slider() {
  const images = [
    "/slider1.png",
    "/slider2.png",
    "/slider3.png",
    "/slider4.png",
    "/slider5.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let startTimer;
    let slideInterval;
    startTimer = setTimeout(() => {
      slideInterval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    }, 9000);
    return () => {
      clearTimeout(startTimer);
      clearInterval(slideInterval);
    };
  }, [images.length]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full flex-shrink-0 relative h-[500px]">
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
      >
        ❮
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70"
      >
        ❯
      </button>

      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
        {currentIndex + 1} / {images.length}
      </div>

      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx ? "bg-red-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
