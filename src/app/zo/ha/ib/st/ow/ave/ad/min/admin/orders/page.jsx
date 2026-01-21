"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { FiDownload } from "react-icons/fi"; // React icon import
import { BiRefresh } from "react-icons/bi";


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedFilter = localStorage.getItem("ordersActiveTab");
    if (storedFilter) setFilter(storedFilter);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/orders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status: newStatus } : order))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // --- Safe Excel download function ---
  const downloadExcel = async (ordersData, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Orders");

    ordersData.forEach((order) => {
      sheet.addRow(["Customer Details"]);
      sheet.addRow(["Status", (order.status || "PENDING").toUpperCase()]);
      sheet.addRow(["Name", order.customer?.fullName || ""]);
      sheet.addRow(["Email", order.customer?.email || ""]);
      sheet.addRow(["Phone", order.customer?.phone || ""]);
      sheet.addRow(["Address", order.customer?.address || ""]);
      sheet.addRow(["City", order.customer?.city || ""]);
      sheet.addRow(["Postal Code", order.customer?.postalCode || ""]);
      sheet.addRow([
        "Order Date",
        order.orderDate ? new Date(order.orderDate).toLocaleString() : "",
      ]);
      sheet.addRow([]);

      sheet.addRow(["Ordered Products"]);
      sheet.addRow(["Product Name", "Size", "Quantity", "Price", "Image URL"]);

      order.cart?.forEach((item) => {
        const imgSrc =
          item.image?.startsWith("http")
            ? item.image
            : item.images?.[0]?.startsWith("http")
            ? item.images[0]
            : "";
        sheet.addRow([
          item.name || "",
          item.size || "",
          item.quantity || 0,
          item.price || "",
          imgSrc,
        ]);
      });

      sheet.addRow([]);
      sheet.addRow(["Total Items", order.cart?.reduce((acc, item) => acc + (item.quantity || 0), 0)]);
      sheet.addRow([
        "Estimated Total",
        order.cart?.reduce(
          (acc, item) =>
            acc + ((Number(item.price?.replace(/[^\d]/g, "")) || 0) * (item.quantity || 0)),
          0
        ),
      ]);
      sheet.addRow([]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter.toLowerCase());

  const handleTabChange = (status) => {
    setFilter(status);
    localStorage.setItem("ordersActiveTab", status);
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          Customer Orders
        </h2>

        <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto items-center">
          {["All", "Pending", "Processing", "Shipped"].map((status) => (
            <button
              key={status}
              onClick={() => handleTabChange(status)}
              className={`px-3 py-1 rounded font-medium border text-sm sm:text-base ${
                filter === status ? "bg-black text-white" : "hover:bg-gray-200 bg-white"
              }`}
            >
              {status}
            </button>
          ))}

          <button
            onClick={fetchOrders}
            className="px-3 py-1 flex rounded border bg-white hover:bg-gray-200 transition text-sm sm:text-base"
          >
            <BiRefresh className="text-center m-auto"/>
 Refresh
          </button>

          <button
            onClick={() => downloadExcel(filteredOrders, "Orders")}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-200 transition text-sm sm:text-base flex items-center gap-1"
            title="Download Excel"
          >
            <FiDownload size={18} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.map((order, index) => (
        <div
          key={order._id || index}
          className="bg-white border shadow-md rounded-xl p-4 sm:p-6 space-y-4"
        >
          {/* Customer Info */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg sm:text-xl font-semibold border-b pb-1">
                  Customer Details
                </h3>
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
                  {order.status?.toUpperCase() || "PENDING"}
                </span>
              </div>

              <div className="text-sm sm:text-base space-y-1">
                <p>
                  <span className="font-medium">Name:</span> {order.customer?.fullName || ""}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {order.customer?.email || ""}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {order.customer?.phone || ""}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {order.customer?.address || ""}
                </p>
                <p>
                  <span className="font-medium">City:</span> {order.customer?.city || ""}
                </p>
                <p>
                  <span className="font-medium">Postal Code:</span> {order.customer?.postalCode || ""}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  <span className="font-medium">Order Date:</span>{" "}
                  {order.orderDate ? new Date(order.orderDate).toLocaleString() : ""}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
              <button
                onClick={() => handleDelete(order._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
              >
                Delete
              </button>

              <select
                value={order.status || "pending"}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border rounded px-2 py-1 text-sm bg-white w-28 sm:w-auto"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
              </select>

              <button
                onClick={() => downloadExcel([order], order.customer?.fullName || "Order")}
                title="Download Single Order"
                className="px-2 py-1 border rounded hover:bg-gray-200 transition text-sm flex items-center gap-1"
              >
                <FiDownload size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Products Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-3">
              Ordered Products
            </h3>
            <div className="space-y-3">
              {order.cart?.map((item, i) => {
                const imgSrc =
                  item.image?.startsWith("http")
                    ? item.image
                    : item.images?.[0]?.startsWith("http")
                    ? item.images[0]
                    : "/no-image.png";
                return (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 border-b pb-2 last:border-none"
                  >
                    <Image
                      src={imgSrc}
                      alt={item.name || "Product Image"}
                      width={70}
                      height={70}
                      className="object-cover rounded"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <p className="font-semibold">{item.name}</p>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      <p className="text-sm text-gray-700">Quantity: {item.quantity || 0}</p>
                      <p className="text-sm text-gray-700">Price: PKR {item.price || 0}</p>
                      <p className="text-xs text-gray-400">Image URL: {imgSrc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t pt-3 text-sm sm:text-base">
            <p>
              <span className="font-medium">Total Items:</span>{" "}
              {order.cart?.reduce((acc, item) => acc + (item.quantity || 0), 0)}
            </p>
            <p>
              <span className="font-medium">Estimated Total:</span>{" "}
              PKR{" "}
              {order.cart?.reduce((acc, item) => {
                const priceNum = Number(item.price?.replace(/[^\d]/g, "")) || 0;
                return acc + priceNum * (item.quantity || 0);
              }, 0)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}














