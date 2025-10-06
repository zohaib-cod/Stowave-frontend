// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function WishlistPage() {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fav = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(fav);
//   }, []);

//   if (favorites.length === 0) {
//     return <div className="p-6 text-center text-lg">No favorites yet ❤️</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {favorites.map((product) => (
//           <div key={product.id} className="border rounded-lg p-4 text-center shadow">
//             <Image
//               src={product.images[0]}
//               alt={product.name}
//               width={200}
//               height={200}
//               className="object-cover mx-auto mb-4 rounded"
//             />
//             <h2 className="font-semibold">{product.name}</h2>
//             <p className="text-gray-600">{product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }











"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    let updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        <p className="text-gray-600">No items in your wishlist ❤️</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg text-center shadow">
            <Image
              src={item.images[0]}
              alt={item.name}
              width={200}
              height={200}
              className="object-cover mx-auto mb-4"
            />
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.price}</p>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-black transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
