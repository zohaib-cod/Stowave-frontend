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















"use client";
import React, { useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Oversized T-Shirt",
      customer: "John Doe",
      size: "L",
      color: "Black",
      price: 320,
      coupon: "SAVE10",
      status: "Pending",
    },
    {
      id: 2,
      name: "Graphic Tee",
      customer: "Mary Jane",
      size: "M",
      color: "White",
      price: 160,
      coupon: "",
      status: "Shipped",
    },
    {
      id: 3,
      name: "Classic Polo Shirt",
      customer: "Carl Davis",
      size: "XL",
      color: "Navy Blue",
      price: 480,
      coupon: "DISCOUNT25",
      status: "Delivered",
    },
  ]);

  const [filter, setFilter] = useState("All");

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#1f2251]">Orders</h1>

      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-semibold">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Size</th>
              <th className="p-3">Color</th>
              <th className="p-3">Coupon</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{order.name}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.size}</td>
                <td className="p-3">{order.color}</td>
                <td className="p-3 text-sm text-blue-600">
                  {order.coupon ? order.coupon : "—"}
                </td>
                <td className="p-3 text-green-600 font-semibold">
                  ${order.price}
                </td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      setOrders(
                        orders.map((o) =>
                          o.id === order.id
                            ? { ...o, status: e.target.value }
                            : o
                        )
                      )
                    }
                    className="border p-1 rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            No orders found for this status.
          </p>
        )}
      </div>
    </div>
  );
}
