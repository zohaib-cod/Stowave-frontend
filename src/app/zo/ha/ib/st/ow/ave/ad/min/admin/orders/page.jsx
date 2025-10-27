"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // ✅ Use environment variable for backend
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🧩 Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      alert("Failed to fetch orders. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🧩 Delete Order API
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((o) => o._id !== id));
      alert("✅ Order deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting order:", err);
      alert("Failed to delete order");
    }
  };

  // 🧩 Update Status API
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      // Update local state instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("❌ Error updating status:", err);
      alert("Failed to update status!");
    }
  };

  // 🧩 Filter orders based on status
  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status === filter.toLowerCase());

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* ✅ Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-3xl font-bold">Customer Orders</h2>

        <div className="flex gap-3 items-center">
          {/* ✅ Filter Buttons */}
          {["All", "Pending", "Processing", "Shipped"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded font-medium border ${
                filter === status
                  ? "bg-black text-white"
                  : "hover:bg-gray-200 bg-white"
              }`}
            >
              {status}
            </button>
          ))}

          {/* ✅ Refresh Button */}
          <button
            onClick={fetchOrders}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-200 transition"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* ✅ Orders List */}
      {filteredOrders.map((order, index) => (
        <div
          key={order._id || index}
          className="bg-white border shadow-md rounded-xl p-6 space-y-4"
        >
          {/* 🧍 Customer Info */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold border-b pb-1">
                  Customer Details
                </h3>

                {/* ✅ Colored Status Tag */}
                <span
                  className={`px-2 py-1 text-xs rounded text-white ${
                    order.status === "pending"
                      ? "bg-yellow-500"
                      : order.status === "processing"
                      ? "bg-blue-500"
                      : order.status === "shipped"
                      ? "bg-green-600"
                      : "bg-gray-400"
                  }`}
                >
                  {order.status ? order.status.toUpperCase() : "PENDING"}
                </span>
              </div>

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

            {/* 🗑️ Delete + Status Dropdown */}
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => handleDelete(order._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>

              <select
                value={order.status || "pending"}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border rounded px-2 py-1 text-sm bg-white"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
              </select>
            </div>
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
                    : "/no-image.png";

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
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
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
                const priceNum = Number(item.price?.replace(/[^\d]/g, "")) || 0;
                return acc + priceNum * item.quantity;
              }, 0)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
