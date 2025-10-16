// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import OversizeShirts from "./oversize-shirts/page";
// import RegularShirtsPage from "./regular-shirts/page";
// import {
//   FaStar,
//   FaStarHalfAlt,
//   FaCheckCircle,
//   FaHeart,
//   FaEye,
// } from "react-icons/fa";

// export default function Home() {
//   const categories = [
//     { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
//     { label: "Regular-Shirts", image: "/simple-circle.jpeg", link: "/regular-shirts" },
//   ];

//   return (
//     <div>
//       {/* Category Circles */}
//       <main className="w-full flex flex-col items-center py-12 bg-gray-50">
//         <div className="flex gap-10 flex-wrap justify-center">
//           {categories.map((cat) => (
//             <Link key={cat.label} href={cat.link} className="group">
//               <div className="w-56 h-56 overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-110">
//                 <Image
//                   src={cat.image}
//                   alt={cat.label}
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//               <p className="text-center mt-4 text-lg font-medium">{cat.label}</p>
//             </Link>
//           ))}
//         </div>
//         <div className="line w-96 h-0.5 bg-red-700"></div>
//       </main>



//        {/* Rating Bar */}
//             <div className="w-full border-y border-gray-300 bg-[#f7f7f7] py-4">
//               <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-4 px-4">
//                 <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
//                   <FaCheckCircle className="text-red-700" />
//                   <span>4.6</span>
//                   <div className="flex text-red-700">
//                     <FaStar />
//                     <FaStar />
//                     <FaStar />
//                     <FaStar />
//                     <FaStarHalfAlt />
//                   </div>
//                 </div>
//                 <div className="text-red-700 text-sm md:text-base border-x px-4 text-center">
//                   4.6 out of 5 stars based on 614 reviews
//                 </div>
//                 <div className="flex items-center gap-2 text-red-700 font-semibold">
//                   <span>Verified</span>
//                   <FaCheckCircle className="text-red-700" />
//                 </div>
//               </div>
//             </div>
      

//       {/* Oversize Shirts Section */}
//       <section className="py-10">
//         <OversizeShirts />
//       </section>

//       {/* Regular Fit Section */}
//       <section className="py-10">
//         <RegularShirtsPage />
//       </section>
//     </div>
//   );
// }





















// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import OversizeShirts from "./oversize-shirts/page";
// import RegularShirtsPage from "./regular-shirts/page";
// import {
//   FaStar,
//   FaStarHalfAlt,
//   FaCheckCircle,
//   FaHeart,
//   FaEye,
// } from "react-icons/fa";

// export default function Home() {
//   const categories = [
//     { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
//     { label: "Regular-Shirts", image: "/simple-circle.jpeg", link: "/regular-shirts" },
//   ];

//   return (
//     <div>
//       {/* Category Circles */}
//       <main className="w-full flex flex-col items-center py-8 md:py-12 bg-gray-50">
//         <div className="flex gap-6 md:gap-10 flex-wrap justify-center px-4">
//           {categories.map((cat) => (
//             <Link key={cat.label} href={cat.link} className="group">
//               <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden relative cursor-pointer transition-all duration-500 hover:scale-110 border-4 border-white shadow-lg hover:shadow-xl">
//                 <Image
//                   src={cat.image}
//                   alt={cat.label}
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//               <p className="text-center mt-4 text-base md:text-lg font-medium text-gray-800 hover:text-red-600 transition-colors">
//                 {cat.label}
//               </p>
//             </Link>
//           ))}
//         </div>
//         <div className="line w-48 md:w-96 h-0.5 bg-red-700 mt-8 md:mt-12"></div>
//       </main>

//       {/* Rating Bar */}
//       <div className="w-full border-y border-gray-300 bg-[#f7f7f7] py-4">
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-4 px-4">
//           {/* Stars Rating */}
//           <div className="flex items-center gap-2 text-red-700 font-bold text-base md:text-lg">
//             <FaCheckCircle className="text-red-700" />
//             <span>4.6</span>
//             <div className="flex text-red-700">
//               <FaStar />
//               <FaStar />
//               <FaStar />
//               <FaStar />
//               <FaStarHalfAlt />
//             </div>
//           </div>
          
//           {/* Review Text */}
//           <div className="text-red-700 text-xs md:text-sm lg:text-base border-x-0 md:border-x border-gray-300 px-0 md:px-4 text-center py-2 md:py-0">
//             4.6 out of 5 stars based on 614 reviews
//           </div>
          
//           {/* Verified */}
//           <div className="flex items-center gap-2 text-red-700 font-semibold text-sm md:text-base">
//             <span>Verified</span>
//             <FaCheckCircle className="text-red-700" />
//           </div>
//         </div>
//       </div>

//       {/* Oversize Shirts Section */}
//       <section className="py-8 md:py-10">
//         <OversizeShirts />
//       </section>

//       {/* Regular Fit Section */}
//       <section className="py-8 md:py-10">
//         <RegularShirtsPage />
//       </section>
//     </div>
//   );
// }






































// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import OversizeShirts from "./oversize-shirts/page";
// import RegularShirtsPage from "./regular-shirts/page";
// import {
//   FaStar,
//   FaStarHalfAlt,
//   FaCheckCircle,
//   FaHeart,
//   FaEye,
// } from "react-icons/fa";

// export default function Home() {
//   const categories = [
//     { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
//     { label: "Regular-Shirts", image: "/simple-circle.jpeg", link: "/regular-shirts" },
//   ];

//   return (
//     <div>
//       {/* Category Circles */}
//       <main className="w-full flex flex-col items-center py-8 md:py-12 bg-gray-50">
//         {/* responsive fix: horizontal scroll for mobile */}
//         <div className="flex gap-6 md:gap-10 justify-center px-4 flex-nowrap md:flex-wrap overflow-x-auto scrollbar-hide">
//           {categories.map((cat) => (
//             <Link key={cat.label} href={cat.link} className="group flex-shrink-0">
//               <div className="w-36 h-36 md:w-56 md:h-56 rounded-full overflow-hidden relative cursor-pointer transition-all duration-500 hover:scale-110 border-4 border-white shadow-lg hover:shadow-xl">
//                 <Image
//                   src={cat.image}
//                   alt={cat.label}
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//               <p className="text-center mt-4 text-sm md:text-lg font-medium text-gray-800 hover:text-red-600 transition-colors whitespace-nowrap">
//                 {cat.label}
//               </p>
//             </Link>
//           ))}
//         </div>
//         <div className="line w-48 md:w-96 h-0.5 bg-red-700 mt-8 md:mt-12"></div>
//       </main>

//       {/* Rating Bar */}
//       <div className="w-full border-y border-gray-300 bg-[#f7f7f7] py-4">
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-4 px-4">
//           {/* Stars Rating */}
//           <div className="flex items-center gap-2 text-red-700 font-bold text-base md:text-lg">
//             <FaCheckCircle className="text-red-700" />
//             <span>4.6</span>
//             <div className="flex text-red-700">
//               <FaStar />
//               <FaStar />
//               <FaStar />
//               <FaStar />
//               <FaStarHalfAlt />
//             </div>
//           </div>
          
//           {/* Review Text */}
//           <div className="text-red-700 text-xs md:text-sm lg:text-base border-x-0 md:border-x border-gray-300 px-0 md:px-4 text-center py-2 md:py-0">
//             4.6 out of 5 stars based on 614 reviews
//           </div>
          
//           {/* Verified */}
//           <div className="flex items-center gap-2 text-red-700 font-semibold text-sm md:text-base">
//             <span>Verified</span>
//             <FaCheckCircle className="text-red-700" />
//           </div>
//         </div>
//       </div>

//       {/* Oversize Shirts Section */}
//       <section className="py-8 md:py-10">
//         <OversizeShirts />
//       </section>

//       {/* Regular Fit Section */}
//       <section className="py-8 md:py-10">
//         <RegularShirtsPage />
//       </section>
//     </div>
//   );
// }





















"use client";

import Image from "next/image";
import Link from "next/link";
import OversizeShirts from "./oversize-shirts/page";
import RegularShirtsPage from "./regular-shirts/page";
import {
  FaStar,
  FaStarHalfAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function Home() {
  const categories = [
    { label: "Oversize-Shirts", image: "/oversize-circle.jpeg", link: "/oversize-shirts" },
    { label: "Regular-Shirts", image: "/simple-circle.jpeg", link: "/regular-shirts" },
  ];

  return (
    <div>
      {/* Category Circles */}
      <main className="w-full flex flex-col items-center py-8 md:py-12 bg-gray-50">
        <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap sm:flex-nowrap px-4 w-full sm:w-auto">
          {categories.map((cat) => (
            <Link key={cat.label} href={cat.link} className="group">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full overflow-hidden cursor-pointer border-4 border-white shadow-lg hover:shadow-xl transition-transform duration-500 group-hover:scale-110 mx-auto">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-center mt-3 text-sm sm:text-base md:text-lg font-medium text-gray-800 hover:text-red-600 transition-colors">
                {cat.label}
              </p>
            </Link>
          ))}
        </div>
        <div className="line w-48 md:w-96 h-0.5 bg-red-700 mt-8 md:mt-12"></div>
      </main>

      {/* Rating Bar */}
      <div className="w-full border-y border-gray-300 bg-[#f7f7f7] py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-4 px-4">
          {/* Stars Rating */}
          <div className="flex items-center gap-2 text-red-700 font-bold text-base md:text-lg">
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

          {/* Review Text */}
          <div className="text-red-700 text-xs md:text-sm lg:text-base border-x-0 md:border-x border-gray-300 px-0 md:px-4 text-center py-2 md:py-0">
            4.6 out of 5 stars based on 614 reviews
          </div>

          {/* Verified */}
          <div className="flex items-center gap-2 text-red-700 font-semibold text-sm md:text-base">
            <span>Verified</span>
            <FaCheckCircle className="text-red-700" />
          </div>
        </div>
      </div>

      {/* Oversize Shirts Section */}
      <section className="py-8 md:py-10">
        <OversizeShirts />
      </section>

      {/* Regular Fit Section */}
      <section className="py-8 md:py-10">
        <RegularShirtsPage />
      </section>
    </div>
  );
}
