// "use client";
// import React, { useState } from "react";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([
//     { id: 1, name: "Order #1123 - John Doe", price: 320, status: "Pending" },
//     { id: 2, name: "Order #1124 - Mary Jane", price: 160, status: "Shipped" },
//     { id: 3, name: "Order #1125 - Carl Davis", price: 480, status: "Delivered" },
//   ]);
//   const [filter, setFilter] = useState("All");

//   const deleteOrder = (id) => {
//     setOrders(orders.filter((order) => order.id !== id));
//   };

//   const filteredOrders =
//     filter === "All" ? orders : orders.filter((o) => o.status === filter);

//   return (
//     <div className="min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-[#1f2251]">Orders</h1>

//       {/* Filter */}
//       <div className="flex items-center gap-4 mb-6">
//         <label className="font-semibold">Filter:</label>
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 rounded-lg"
//         >
//           <option value="All">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//         </select>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white shadow-md rounded-2xl p-6 overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3">Order</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order) => (
//               <tr key={order.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{order.name}</td>
//                 <td className="p-3 text-green-600">${order.price}</td>
//                 <td className="p-3">
//                   <select
//                     value={order.status}
//                     onChange={(e) =>
//                       setOrders(
//                         orders.map((o) =>
//                           o.id === order.id ? { ...o, status: e.target.value } : o
//                         )
//                       )
//                     }
//                     className="border p-1 rounded-md"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                 </td>
//                 <td className="p-3 text-center">
//                   <button
//                     onClick={() => deleteOrder(order.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredOrders.length === 0 && (
//           <p className="text-gray-500 text-center mt-4">
//             No orders found for this status.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }















// "use client";
// import React, { useState } from "react";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       name: "Oversized T-Shirt",
//       customer: "John Doe",
//       size: "L",
//       color: "Black",
//       price: 320,
//       coupon: "SAVE10",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       name: "Graphic Tee",
//       customer: "Mary Jane",
//       size: "M",
//       color: "White",
//       price: 160,
//       coupon: "",
//       status: "Shipped",
//     },
//     {
//       id: 3,
//       name: "Classic Polo Shirt",
//       customer: "Carl Davis",
//       size: "XL",
//       color: "Navy Blue",
//       price: 480,
//       coupon: "DISCOUNT25",
//       status: "Delivered",
//     },
//   ]);

//   const [filter, setFilter] = useState("All");

//   const deleteOrder = (id) => {
//     setOrders(orders.filter((order) => order.id !== id));
//   };

//   const filteredOrders =
//     filter === "All" ? orders : orders.filter((o) => o.status === filter);

//   return (
//     <div className="min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-[#1f2251]">Orders</h1>

//       {/* Filter Section */}
//       <div className="flex items-center gap-4 mb-6">
//         <label className="font-semibold">Filter:</label>
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 rounded-lg"
//         >
//           <option value="All">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//         </select>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white shadow-md rounded-2xl p-6 overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3">Product</th>
//               <th className="p-3">Customer</th>
//               <th className="p-3">Size</th>
//               <th className="p-3">Color</th>
//               <th className="p-3">Coupon</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredOrders.map((order) => (
//               <tr key={order.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3 font-medium">{order.name}</td>
//                 <td className="p-3">{order.customer}</td>
//                 <td className="p-3">{order.size}</td>
//                 <td className="p-3">{order.color}</td>
//                 <td className="p-3 text-sm text-blue-600">
//                   {order.coupon ? order.coupon : "—"}
//                 </td>
//                 <td className="p-3 text-green-600 font-semibold">
//                   ${order.price}
//                 </td>
//                 <td className="p-3">
//                   <select
//                     value={order.status}
//                     onChange={(e) =>
//                       setOrders(
//                         orders.map((o) =>
//                           o.id === order.id
//                             ? { ...o, status: e.target.value }
//                             : o
//                         )
//                       )
//                     }
//                     className="border p-1 rounded-md"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                 </td>
//                 <td className="p-3 text-center">
//                   <button
//                     onClick={() => deleteOrder(order.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredOrders.length === 0 && (
//           <p className="text-gray-500 text-center mt-4">
//             No orders found for this status.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }















"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real orders from MongoDB backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold border-b pb-3">Customer Orders</h2>

      {orders.map((order, index) => (
        <div
          key={order._id || index}
          className="bg-white border shadow-md rounded-xl p-6 space-y-4"
        >
          {/* 🧍 Customer Info */}
          <div>
            <h3 className="text-xl font-semibold border-b pb-2 mb-2">
              Customer Details
            </h3>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {order.customer?.fullName}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {order.customer?.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {order.customer?.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {order.customer?.address}
            </p>
            <p>
              <span className="font-medium">City:</span> {order.customer?.city}
            </p>
            <p>
              <span className="font-medium">Postal Code:</span>{" "}
              {order.customer?.postalCode}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium">Order Date:</span>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>

          {/* 🛍 Product Info */}
          <div>
            <h3 className="text-xl font-semibold border-b pb-2 mb-3">
              Ordered Products
            </h3>
            <div className="space-y-4">
              {order.cart?.map((item, i) => {
                const imgSrc =
                  item.image && item.image.startsWith("http")
                    ? item.image
                    : item.images?.[0] && item.images[0].startsWith("http")
                    ? item.images[0]
                    : "/no-image.png"; // fallback image

                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b pb-2 last:border-none"
                  >
                    <Image
                      src={imgSrc}
                      alt={item.name || "Product Image"}
                      width={70}
                      height={70}
                      className="object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      {item.size && (
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                      )}
                      <p className="text-sm text-gray-700">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-700">
                        Price: PKR {item.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 💰 Summary */}
          <div className="border-t pt-3">
            <p>
              <span className="font-medium">Total Items:</span>{" "}
              {order.cart?.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p>
              <span className="font-medium">Estimated Total:</span>{" "}
              PKR{" "}
              {order.cart?.reduce((acc, item) => {
                const priceNum =
                  Number(item.price?.replace(/[^\d]/g, "")) || 0;
                return acc + priceNum * item.quantity;
              }, 0)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
