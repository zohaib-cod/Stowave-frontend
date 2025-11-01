// "use client";

// import Link from "next/link";
// import { FaChartBar, FaShoppingCart, FaPlus, FaCog } from "react-icons/fa";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-[#e9eef6] text-gray-800">
//       {/* Sidebar */}
//       <aside className="w-64 bg-[#1f2251] text-white flex flex-col p-5 rounded-r-3xl">
//         <h1 className="text-2xl font-bold mb-8">Stowave Admin</h1>

//         <nav className="space-y-4">
//           <Link href="/zo/ha/ib/st/ow/ave/ad/min/admin" className="flex items-center gap-3 hover:text-yellow-400">
//             <FaChartBar /> Dashboard
//           </Link>
//           <Link href="/zo/ha/ib/st/ow/ave/ad/min/admin/orders" className="flex items-center gap-3 hover:text-yellow-400">
//             <FaShoppingCart /> Orders
//           </Link>
//           <Link href="/zo/ha/ib/st/ow/ave/ad/min/admin/add-products" className="flex items-center gap-3 hover:text-yellow-400">
//             <FaPlus /> Add Products
//           </Link>
//           <Link href="/zo/ha/ib/st/ow/ave/ad/min/admin/settings" className="flex items-center gap-3 hover:text-yellow-400">
//             <FaCog /> Settings
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Page Content */}
//       <main className="flex-1 p-8 overflow-y-auto">{children}</main>
//     </div>
//   );
// }


















  "use client";

  import { useState } from "react";
  import Link from "next/link";
  import { FaChartBar, FaShoppingCart, FaPlus, FaCog, FaBars, FaTimes } from "react-icons/fa";

  export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <div className="flex h-screen bg-[#e9eef6] text-gray-800">
        {/* Sidebar (responsive) */}
        <aside
          className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-[#1f2251] text-white flex flex-col p-5 rounded-r-3xl transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Stowave Admin</h1>
            {/* Close button (mobile) */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white text-2xl"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="space-y-4">
            <Link
              href="/zo/ha/ib/st/ow/ave/ad/min/admin"
              className="flex items-center gap-3 hover:text-yellow-400"
            >
              <FaChartBar /> Dashboard
            </Link>
            <Link
              href="/zo/ha/ib/st/ow/ave/ad/min/admin/orders"
              className="flex items-center gap-3 hover:text-yellow-400"
            >
              <FaShoppingCart /> Orders
            </Link>
            <Link
              href="/zo/ha/ib/st/ow/ave/ad/min/admin/add-products"
              className="flex items-center gap-3 hover:text-yellow-400"
            >
              <FaPlus /> Add Products
            </Link>
            <Link
              href="/zo/ha/ib/st/ow/ave/ad/min/admin/settings"
              className="flex items-center gap-3 hover:text-yellow-400"
            >
              <FaCog /> Settings
            </Link>
          </nav>
        </aside>

        {/* Overlay (for mobile) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header (mobile hamburger) */}
          <header className="flex items-center justify-between bg-[#1f2251] text-white p-4 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl"
            >
              <FaBars />
            </button>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </header>

          {/* Main Page Content */}
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    );
  }
