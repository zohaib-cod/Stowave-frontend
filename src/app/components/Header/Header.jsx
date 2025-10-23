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
//   FaBars,
// } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";
// import Fuse from "fuse.js";

// export default function Header() {
//   const [cartCount, setCartCount] = useState(0);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Load cart count (safe for hydration)
//   useEffect(() => {
//     const updateCart = () => {
//       if (typeof window !== "undefined") {
//         const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//         setCartCount(cart.length);
//       }
//     };
//     updateCart();
//     window.addEventListener("storage", updateCart);
//     return () => window.removeEventListener("storage", updateCart);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [pathname]);

//   // Dummy products
//   const products = [
//     { id: 1, name: "Oversize Shirt", price: 2500, img: "/slider1.png" },
//     { id: 2, name: "Casual T-Shirt", price: 1500, img: "/slider2.png" },
//     { id: 3, name: "Graphic Tee", price: 1800, img: "/slider3.png" },
//     { id: 4, name: "Black Hoodie", price: 3500, img: "/slider4.png" },
//     { id: 5, name: "Summer Polo", price: 2200, img: "/slider5.png" },
//   ];

//   //  Fuse.js setup
//   const fuse = new Fuse(products, { keys: ["name"], threshold: 0.4, distance: 100 });
//   let filteredProducts = [];
//   if (searchQuery.trim() !== "") {
//     const results = fuse.search(searchQuery);
//     filteredProducts = results.map((r) => r.item);
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

//   //  Navbar links
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/oversize-shirts", label: "Oversize-Shirts" },
//     { href: "/regular-shirts", label: "Regular-Shirts" },
//   ];

//   return (
//     <header>
//       {/* Top Bar - Now Responsive */}
//       <div className="bg-black text-white text-sm flex justify-between items-center px-4 md:px-6 py-2">
//         {/* Left Side - Contact Info (Hidden on Mobile) */}
//         <div className="hidden md:flex items-center gap-4">
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaPhoneAlt /> Call Us
//           </span>
//           <span>|</span>
//           <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
//             <FaEnvelope /> Email Us
//           </span>
//         </div>

//         {/* Center - Shipping Info (Hidden on Mobile) */}
//         <div className="hidden md:flex flex-col items-center">
//           <p>
//             Get Free Shipping on Orders Above 12,000 –{" "}
//             <button className="text-red-600 hover:text-white relative">
//               SHOP NOW!
//               <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600"></span>
//             </button>
//           </p>
//         </div>

//         {/* Mobile Center - Only show shipping text on mobile */}
//         <div className="md:hidden flex-1 text-center">
//           <p className="text-xs">
//             Free Shipping Above 12,000 –{" "}
//             <button className="text-red-600 hover:text-white">
//               SHOP NOW!
//             </button>
//           </p>
//         </div>

//         {/* Right Side - Flag & Social Icons */}
//         <div className="flex items-center gap-3 md:gap-4">
//           {/* Flag and Dropdown - Always Visible */}
//           <div className="flex items-center gap-2">
//             <Image src="/pakistan.png" alt="Pakistan" width={20} height={14} className="md:w-6 md:h-4" />
            
//             <select
//               defaultValue="Pakistan"
//               className="bg-black text-white border border-gray-600 px-1 md:px-2 py-1 rounded hover:border-red-500 text-xs md:text-sm"
//             >
//               <option disabled value="Pakistan">
//                 Pakistan
//               </option>
//               <option value="Punjab">Punjab</option>
//               <option value="Sindh">Sindh</option>
//               <option value="Balochistan">Balochistan</option>
//               <option value="KPK">KPK</option>
//             </select>
//           </div>

//           {/* Social Icons - Hidden on Mobile */}
//           <div className="hidden md:flex gap-3 text-white">
//             <FaFacebookF className="hover:text-red-500 cursor-pointer" />
//             <FaInstagram className="hover:text-red-500 cursor-pointer" />
//             <FaTiktok className="hover:text-red-500 cursor-pointer" />
//           </div>
//         </div>
//       </div>

//       {/*Navbar */}
//       <nav className="flex justify-between items-center px-4 md:px-6 py-4 border-b">
//         {/* Logo */}
//         <div onClick={() => router.push("/")} className="cursor-pointer">
//           <Image src="/black-logo2.png" alt="Logo" width={100} height={40} priority />
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex gap-6 relative">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="relative pb-1 text-black group"
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
//         <div className="flex items-center gap-4 md:gap-6">
//           <FaSearch
//             className="cursor-pointer hover:text-red-500 text-lg md:text-base"
//             onClick={() => setSearchOpen(true)}
//           />
//           <Link href="/cart" className="relative flex items-center">
//             <FaShoppingBag className="hover:text-red-500 text-xl md:text-base" />
//             {cartCount > 0 && (
//               <span className="ml-1 md:ml-2 bg-red-600 text-white text-xs px-1.5 md:px-2 py-0.5 rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {/* Mobile Hamburger Menu */}
//           <button 
//             className="md:hidden text-xl hover:text-red-500"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <FaBars />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && isMobile && (
//         <div className="md:hidden bg-white border-b shadow-lg">
//           <div className="flex flex-col px-4 py-3">
//             {navLinks.map((link) => {
//               const isActive = pathname === link.href;
//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`py-3 px-2 border-b border-gray-100 text-black ${
//                     isActive ? "text-red-600 font-semibold" : ""
//                   } hover:text-red-500 transition-colors`}
//                 >
//                   {link.label}
//                 </Link>
//               );
//             })}
            
//             {/* Mobile-only contact links */}
//             <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
//               <span className="flex items-center gap-2 text-gray-600">
//                 <FaPhoneAlt /> Call Us
//               </span>
//               <span className="flex items-center gap-2 text-gray-600">
//                 <FaEnvelope /> Email Us
//               </span>
//               <div className="flex gap-4 mt-2">
//                 <FaFacebookF className="text-gray-600 hover:text-red-500 cursor-pointer" />
//                 <FaInstagram className="text-gray-600 hover:text-red-500 cursor-pointer" />
//                 <FaTiktok className="text-gray-600 hover:text-red-500 cursor-pointer" />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Search Sidebar */}
//       {searchOpen && (
//         <div className="fixed inset-0 bg-black/40 z-50">
//           <div className="absolute right-0 top-0 w-full md:w-80 h-full bg-white shadow-lg p-4 flex flex-col">
//             <button
//               className="ml-auto text-gray-600 hover:text-red-500 mb-4"
//               onClick={() => setSearchOpen(false)}
//             >
//               <FaTimes size={20} />
//             </button>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border px-3 py-3 md:py-2 rounded mb-4 w-full text-lg md:text-base"
//             />
//             <div className="flex flex-col gap-3 overflow-y-auto">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     onClick={() => {
//                       setSearchOpen(false);
//                       router.push("/cart");
//                     }}
//                     className="flex items-center gap-3 border p-3 md:p-2 rounded cursor-pointer hover:shadow-md"
//                   >
//                     <Image
//                       src={product.img}
//                       alt={product.name}
//                       width={60}
//                       height={60}
//                       className="rounded"
//                     />
//                     <div>
//                       <h4 className="font-semibold text-lg md:text-base">{product.name}</h4>
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

//       {/* Slider */}
//       <Slider />
//     </header>
//   );
// }

// /* -------------------- SLIDER -------------------- */
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
//     let timer = setTimeout(() => {
//       const interval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//       }, 4000);
//       return () => clearInterval(interval);
//     }, 9000);
//     return () => clearTimeout(timer);
//   }, [images.length]);

//   return (
//     <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
//       <div
//         className="flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((src, idx) => (
//           <div key={idx} className="w-full flex-shrink-0 relative h-[300px] md:h-[500px]">
//             <Image src={src} alt={`Slide ${idx + 1}`} fill className="object-cover" />
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() =>
//           setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
//         }
//         className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/70 text-sm md:text-base"
//       >
//         ❮
//       </button>
//       <button
//         onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
//         className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/70 text-sm md:text-base"
//       >
//         ❯
//       </button>

//       <div className="absolute bottom-4 w-full flex justify-center gap-2">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
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
  FaBars,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Fuse from "fuse.js";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // ✅ Responsive Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Cart Count
  useEffect(() => {
    const updateCart = () => {
      if (typeof window !== "undefined") {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(cart.length);
      }
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  // ✅ Fetch Live Products (from backend)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Live Search with Fuse.js
  const fuse = new Fuse(products, { keys: ["title"], threshold: 0.4, distance: 100 });
  let filteredProducts = [];
  if (searchQuery.trim() !== "") {
    const results = fuse.search(searchQuery);
    filteredProducts = results.map((r) => r.item);
  }

  // ✅ Navbar links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/oversize-shirts", label: "Oversize-Shirts" },
    { href: "/regular-shirts", label: "Regular-Shirts" },
  ];

  return (
    <header>
      {/* ---------- TOP BAR ---------- */}
      <div className="bg-black text-white text-sm flex justify-between items-center px-4 md:px-6 py-2">
        {/* Left Side */}
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
            <FaPhoneAlt /> Call Us
          </span>
          <span>|</span>
          <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
            <FaEnvelope /> Email Us
          </span>
        </div>

        {/* Center */}
        <div className="hidden md:flex flex-col items-center">
          <p>
            Get Free Shipping on Orders Above 12,000 –{" "}
            <button className="text-red-600 hover:text-white relative">
              SHOP NOW!
              <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600"></span>
            </button>
          </p>
        </div>

        {/* Mobile Center */}
        <div className="md:hidden flex-1 text-center">
          <p className="text-xs">
            Free Shipping Above 12,000 –{" "}
            <button className="text-red-600 hover:text-white">SHOP NOW!</button>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Image src="/pakistan.png" alt="Pakistan" width={20} height={14} className="md:w-6 md:h-4" />
            <select
              defaultValue="Pakistan"
              className="bg-black text-white border border-gray-600 px-1 md:px-2 py-1 rounded hover:border-red-500 text-xs md:text-sm"
            >
              <option disabled value="Pakistan">
                Pakistan
              </option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Balochistan">Balochistan</option>
              <option value="KPK">KPK</option>
            </select>
          </div>

          <div className="hidden md:flex gap-3 text-white">
            <FaFacebookF className="hover:text-red-500 cursor-pointer" />
            <FaInstagram className="hover:text-red-500 cursor-pointer" />
            <FaTiktok className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ---------- NAVBAR ---------- */}
      <nav className="flex justify-between items-center px-4 md:px-6 py-4 border-b">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image src="/black-logo2.png" alt="Logo" width={100} height={40} priority />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 relative">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative pb-1 text-black group"
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
        <div className="flex items-center gap-4 md:gap-6">
          <FaSearch
            className="cursor-pointer hover:text-red-500 text-lg md:text-base"
            onClick={() => setSearchOpen(true)}
          />
          <Link href="/cart" className="relative flex items-center">
            <FaShoppingBag className="hover:text-red-500 text-xl md:text-base" />
            {cartCount > 0 && (
              <span className="ml-1 md:ml-2 bg-red-600 text-white text-xs px-1.5 md:px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden text-xl hover:text-red-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* ---------- MOBILE MENU ---------- */}
      {mobileMenuOpen && isMobile && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="flex flex-col px-4 py-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 px-2 border-b border-gray-100 text-black ${
                    isActive ? "text-red-600 font-semibold" : ""
                  } hover:text-red-500 transition-colors`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- SEARCH SIDEBAR ---------- */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 w-full md:w-80 h-full bg-white shadow-lg p-4 flex flex-col">
            <button
              className="ml-auto text-gray-600 hover:text-red-500 mb-4"
              onClick={() => setSearchOpen(false)}
            >
              <FaTimes size={20} />
            </button>

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-3 md:py-2 rounded mb-4 w-full text-lg md:text-base"
            />

            <div className="flex flex-col gap-3 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => {
                      setSearchOpen(false);
                      router.push(`/product/${product._id}`);
                    }}
                    className="flex items-center gap-3 border p-3 md:p-2 rounded cursor-pointer hover:shadow-md"
                  >
                    <Image
                      src={product.image || "/no-image.png"}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-lg md:text-base">
                        {product.title}
                      </h4>
                      <p className="text-sm text-gray-600">Rs. {product.price}</p>
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

/* ---------- SLIDER COMPONENT ---------- */
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
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full flex-shrink-0 relative h-[300px] md:h-[500px]">
            <Image src={src} alt={`Slide ${idx + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/70 text-sm md:text-base"
      >
        ❮
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/70 text-sm md:text-base"
      >
        ❯
      </button>

      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              currentIndex === idx ? "bg-red-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
