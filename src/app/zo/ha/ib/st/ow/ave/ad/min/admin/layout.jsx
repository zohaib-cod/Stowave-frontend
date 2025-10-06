"use client";

import Link from "next/link";
import { FaChartBar, FaShoppingCart, FaPlus, FaCog } from "react-icons/fa";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#e9eef6] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f2251] text-white flex flex-col p-5 rounded-r-3xl">
        <h1 className="text-2xl font-bold mb-8">Stowave Admin</h1>

        <nav className="space-y-4">
          <Link href="/zo/ha/ib/st/ow/ave/ad/min/admin" className="flex items-center gap-3 hover:text-yellow-400">
            <FaChartBar /> Dashboard
          </Link>
          <Link href="/zo/ha/ib/st/ow/ave/ad/min/admin/orders" className="flex items-center gap-3 hover:text-yellow-400">
            <FaShoppingCart /> Orders
          </Link>
          <Link href="/zo/ha/ib/st/ow/ave/ad/min/admin/add-products" className="flex items-center gap-3 hover:text-yellow-400">
            <FaPlus /> Add Products
          </Link>
          <Link href="/zo/ha/ib/st/ow/ave/ad/min/admin/settings" className="flex items-center gap-3 hover:text-yellow-400">
            <FaCog /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Page Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
