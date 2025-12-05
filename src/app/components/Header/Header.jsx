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
import { BsFillCartPlusFill } from "react-icons/bs";

import Image from "next/image";
import Link from "next/link";
import Fuse from "fuse.js";
import axios from "axios";

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
        const res = await fetch(
          "https://stowave-backend-1.onrender.com/api/products"
        );
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
    { href: "/winter", label: "Swage-Shirts" },
  ];

  return (
    <header>
      {/* ---------- TOP BAR ---------- */}
      <div className="bg-black text-white text-sm flex justify-between items-center px-4 md:px-6 py-2">
        <div className="hidden md:flex items-center gap-4">
          <span
            className="flex items-center gap-1 hover:text-red-500 cursor-pointer"
            onClick={() => window.open("https://wa.me/+923290010909", "_blank")}
          >
            <FaPhoneAlt /> Call Us
          </span>
          <span>|</span>
          <span
            className="flex items-center gap-1 hover:text-red-500 cursor-pointer"
            onClick={() => window.location.href = "mailto:your-email@example.com"}
          >
            <FaEnvelope /> Email Us
          </span>
        </div>

        <div className="hidden md:flex flex-col items-center">
          <p>
            Get Free Shipping on Orders Above 12,000 –{" "}
            <button className="text-red-600 hover:text-white relative">
              SHOP NOW!
              <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600"></span>
            </button>
          </p>
        </div>

        <div className="md:hidden flex-1 text-center">
          <p className="text-xs">
            Free Shipping Above 12,000 –{" "}
            <button className="text-red-600 hover:text-white">SHOP NOW!</button>
          </p>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/pakistan.png"
              alt="Pakistan"
              width={20}
              height={14}
              className="md:w-6 md:h-4"
            />
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
            <FaFacebookF
              className="hover:text-red-500 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/profile.php?id=61581100161289",
                  "_blank"
                )
              }
            />
            <FaInstagram
              className="hover:text-red-500 cursor-pointer"
              onClick={() =>
                window.open("https://www.instagram.com/stowave.store/", "_blank")
              }
            />
            <FaTiktok
              className="hover:text-red-500 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.tiktok.com/@stowave.stoore?is_from_webapp=1&sender_device=pc",
                  "_blank"
                )
              }
            />
          </div>
        </div>
      </div>

      {/* ---------- NAVBAR ---------- */}
      <nav className="flex justify-between items-center px-4 md:px-6 py-4 border-b bg-white dark:bg-white text-black">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image src="/black-logo2.png" alt="Logo" width={100} height={40} priority />
        </div>

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

        <div className="flex items-center gap-4 md:gap-6">
          <FaSearch
            className="cursor-pointer hover:text-red-500 text-lg md:text-base"
            onClick={() => setSearchOpen(true)}
          />
          
          <Link href="/cart" className="relative flex items-center">
            <BsFillCartPlusFill className="hover:text-red-500 text-xl md:text-base" />
            {cartCount > 0 && (
              <span className="ml-1 md:ml-2 bg-red-600 text-white text-xs px-1.5 md:px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/userOrder" className="relative flex items-center">
            <FaShoppingBag  className="hover:text-red-500 text-xl md:text-base" />
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

      {/* ---------- SLIDER ---------- */}
      <Slider />
    </header>
  );
}

/* ---------- SLIDER COMPONENT ---------- */
function Slider() {
  const [sliders, setSliders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch sliders from backend
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await axios.get("https://stowaveb-1.onrender.com/api/sliders");
        setSliders(res.data.sliders || []);
      } catch (err) {
        console.error("Error fetching sliders:", err);
      }
    };
    fetchSliders();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (sliders.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliders]);

  if (sliders.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-black">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliders.map((slider, idx) => (
          <div
            key={slider._id}
            className="w-full flex-shrink-0 relative h-[300px] md:h-[500px]"
          >
            <Image
              src={slider.imageUrl}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-contain bg-black"
            />
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + sliders.length) % sliders.length)
        }
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/70"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % sliders.length)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/70"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {sliders.map((_, idx) => (
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
