


// "use client";

// import React, { useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// export default function AdminDashboard() {
//   const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

//   const pieData = [
//     { name: "Regular T-Shirts", value: 45 },
//     { name: "Oversize T-Shirts", value: 30 },
//     { name: "Other", value: 25 },
//   ];

//   const COLORS = ["#4F46E5", "#F59E0B", "#10B981"];

//   // Chart Data for all periods
//   const chartData = {
//     "Last 5 Hours": [
//       { name: "1h", sales: 80 },
//       { name: "2h", sales: 120 },
//       { name: "3h", sales: 60 },
//       { name: "4h", sales: 90 },
//       { name: "5h", sales: 70 },
//     ],
//     Daily: Array.from({ length: 24 }, (_, i) => ({
//       name: `${i + 1}:00`,
//       sales: Math.floor(Math.random() * 200) + 50,
//     })),
//     Weekly: [
//       { name: "Mon", sales: 400 },
//       { name: "Tue", sales: 550 },
//       { name: "Wed", sales: 300 },
//       { name: "Thu", sales: 700 },
//       { name: "Fri", sales: 600 },
//       { name: "Sat", sales: 350 },
//       { name: "Sun", sales: 450 },
//     ],
//     Monthly: [
//       { name: "Jan", sales: 3200 },
//       { name: "Feb", sales: 2800 },
//       { name: "Mar", sales: 4000 },
//       { name: "Apr", sales: 3700 },
//       { name: "May", sales: 5000 },
//       { name: "Jun", sales: 4200 },
//       { name: "Jul", sales: 3900 },
//       { name: "Aug", sales: 4500 },
//       { name: "Sep", sales: 4100 },
//       { name: "Oct", sales: 4800 },
//       { name: "Nov", sales: 4600 },
//       { name: "Dec", sales: 5100 },
//     ],
//     Yearly: [
//       { name: "2025", sales: 8000 },
//       { name: "2026", sales: 12500 },
//       { name: "2027", sales: 15500 },
//       { name: "2028", sales: 19000 },
//     ],
//   };

//   const currentData = chartData[selectedPeriod];

//   return (
//     <div className="min-h-screen bg-[#e9eef6] text-gray-800 p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold">Dashboard Overview</h2>
//         <input
//           type="text"
//           placeholder="Search..."
//           className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {/* Products Overview */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h3 className="text-lg font-semibold mb-4">Products Overview</h3>
//           <div className="space-y-3">
//             <div>
//               <p className="flex justify-between">
//                 <span>Regular T-Shirts</span>
//                 <span>70%</span>
//               </p>
//               <div className="w-full h-2 bg-gray-200 rounded-full">
//                 <div className="h-2 bg-yellow-400 rounded-full w-[70%]"></div>
//               </div>
//             </div>
//             <div>
//               <p className="flex justify-between">
//                 <span>Oversize T-Shirts</span>
//                 <span>50%</span>
//               </p>
//               <div className="w-full h-2 bg-gray-200 rounded-full">
//                 <div className="h-2 bg-indigo-500 rounded-full w-[50%]"></div>
//               </div>
//             </div>
//             <div>
//               <p className="flex justify-between">
//                 <span>Other</span>
//                 <span>30%</span>
//               </p>
//               <div className="w-full h-2 bg-gray-200 rounded-full">
//                 <div className="h-2 bg-green-500 rounded-full w-[30%]"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Monthly Sales Pie Chart */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
//           <ResponsiveContainer width="100%" height={220}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 outerRadius={80}
//                 labelLine={false}
//                 label={({ name, percent }) =>
//                   `${name} ${(percent * 100).toFixed(0)}%`
//                 }
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Earnings */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h3 className="text-lg font-semibold mb-4">Total Earnings</h3>
//           <p className="text-3xl font-bold text-indigo-600">$ 12,845.00</p>
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white shadow-md rounded-2xl p-6 col-span-1 md:col-span-2">
//           <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
//           <ul className="space-y-3">
//             <li className="flex justify-between">
//               <span>Order #1123 - John Doe</span>
//               <span className="text-green-600">$320</span>
//             </li>
//             <li className="flex justify-between">
//               <span>Order #1124 - Mary Jane</span>
//               <span className="text-green-600">$160</span>
//             </li>
//             <li className="flex justify-between">
//               <span>Order #1125 - Carl Davis</span>
//               <span className="text-green-600">$480</span>
//             </li>
//           </ul>
//         </div>

//         {/* Activity Overview */}
//         <div className="bg-[#1f2251] text-white shadow-md rounded-2xl p-6 col-span-1 md:col-span-2">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Activity Overview</h3>
//             <select
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//               className="text-gray-900 px-3 py-2 rounded-md outline-none"
//             >
//               <option>Daily</option>
//               <option>Weekly</option>
//               <option>Monthly</option>
//               <option>Yearly</option>
//               <option>Last 5 Hours</option>
//             </select>
//           </div>

//           <ResponsiveContainer width="100%" height={260}>
//             <BarChart data={currentData}>
//               <XAxis dataKey="name" stroke="#fff" />
//               <YAxis stroke="#fff" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#fff",
//                   color: "#000",
//                   borderRadius: "10px",
//                 }}
//               />
//               <Bar dataKey="sales" fill="#F59E0B" radius={[10, 10, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }




























// "use client";

// import React, { useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// export default function AdminDashboard() {
//   const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

//   const pieData = [
//     { name: "Regular T-Shirts", value: 45 },
//     { name: "Oversize T-Shirts", value: 30 },
//     { name: "Other", value: 25 },
//   ];

//   const COLORS = ["#4F46E5", "#F59E0B", "#10B981"];

//   // Chart Data for all periods
//   const chartData = {
//     "Last 5 Hours": [
//       { name: "1h", sales: 80 },
//       { name: "2h", sales: 120 },
//       { name: "3h", sales: 60 },
//       { name: "4h", sales: 90 },
//       { name: "5h", sales: 70 },
//     ],
//     Daily: Array.from({ length: 24 }, (_, i) => ({
//       name: `${i + 1}:00`,
//       sales: Math.floor(Math.random() * 200) + 50,
//     })),
//     Weekly: [
//       { name: "Mon", sales: 400 },
//       { name: "Tue", sales: 550 },
//       { name: "Wed", sales: 300 },
//       { name: "Thu", sales: 700 },
//       { name: "Fri", sales: 600 },
//       { name: "Sat", sales: 350 },
//       { name: "Sun", sales: 450 },
//     ],
//     Monthly: [
//       { name: "Jan", sales: 3200 },
//       { name: "Feb", sales: 2800 },
//       { name: "Mar", sales: 4000 },
//       { name: "Apr", sales: 3700 },
//       { name: "May", sales: 5000 },
//       { name: "Jun", sales: 4200 },
//       { name: "Jul", sales: 3900 },
//       { name: "Aug", sales: 4500 },
//       { name: "Sep", sales: 4100 },
//       { name: "Oct", sales: 4800 },
//       { name: "Nov", sales: 4600 },
//       { name: "Dec", sales: 5100 },
//     ],
//     Yearly: [
//       { name: "2025", sales: 8000 },
//       { name: "2026", sales: 12500 },
//       { name: "2027", sales: 15500 },
//       { name: "2028", sales: 19000 },
//     ],
//   };

//   const currentData = chartData[selectedPeriod];

//   return (
//     <div className="min-h-screen bg-[#e9eef6] text-gray-800 p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold">Dashboard Overview</h2>
//         <input
//           type="text"
//           placeholder="Search..."
//           className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {/* Products Overview */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h3 className="text-lg font-semibold mb-4">Products Overview</h3>
//           <div className="space-y-3">
//             <div>
//               <p className="flex justify-between">
//                 <span>Regular T-Shirts</span>
//                 <span>70%</span>
//               </p>
//               <div className="w-full h-2 bg-gray-200 rounded-full">
//                 <div className="h-2 bg-yellow-400 rounded-full w-[70%]"></div>
//               </div>
//             </div>
//             <div>
//               <p className="flex justify-between">
//                 <span>Oversize T-Shirts</span>
//                 <span>50%</span>
//               </p>
//               <div className="w-full h-2 bg-gray-200 rounded-full">
//                 <div className="h-2 bg-indigo-500 rounded-full w-[50%]"></div>
//               </div>
//             </div>
//             <div>
//               <p className="flex justify-between">
//                 <span>Other</span>
//                 <span>30%</span>
//               </p>
//               <div className="w-full h-2 bg-gray-200 rounded-full">
//                 <div className="h-2 bg-green-500 rounded-full w-[30%]"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Monthly Sales Pie Chart */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h3 className="text-lg font-semibold mb-4 text-center">Monthly Sales</h3>
//           <div className="flex justify-center">
//             <ResponsiveContainer width="100%" height={240}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   outerRadius={80}
//                   innerRadius={40}
//                   labelLine={false}
//                   label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="flex justify-center gap-6 mt-4 flex-wrap">
//             {pieData.map((entry, index) => (
//               <div key={index} className="flex items-center gap-2 text-sm">
//                 <div
//                   className="w-3 h-3 rounded-full"
//                   style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                 ></div>
//                 <span>{entry.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Total Earnings */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h3 className="text-lg font-semibold mb-4">Total Earnings</h3>
//           <p className="text-3xl font-bold text-indigo-600">$ 12,845.00</p>
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white shadow-md rounded-2xl p-6 col-span-1 md:col-span-2">
//           <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
//           <ul className="space-y-3">
//             <li className="flex justify-between">
//               <span>Order #1123 - John Doe</span>
//               <span className="text-green-600">$320</span>
//             </li>
//             <li className="flex justify-between">
//               <span>Order #1124 - Mary Jane</span>
//               <span className="text-green-600">$160</span>
//             </li>
//             <li className="flex justify-between">
//               <span>Order #1125 - Carl Davis</span>
//               <span className="text-green-600">$480</span>
//             </li>
//           </ul>
//         </div>

//         {/* Activity Overview */}
//         <div className="bg-[#1f2251] text-white shadow-md rounded-2xl p-6 col-span-1 md:col-span-2">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Activity Overview</h3>
//             <select
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//               className="text-gray-900 px-3 py-2 rounded-md outline-none"
//             >
//               <option>Daily</option>
//               <option>Weekly</option>
//               <option>Monthly</option>
//               <option>Yearly</option>
//               <option>Last 5 Hours</option>
//             </select>
//           </div>

//           <ResponsiveContainer width="100%" height={260}>
//             <BarChart data={currentData}>
//               <XAxis dataKey="name" stroke="#fff" />
//               <YAxis stroke="#fff" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#fff",
//                   color: "#000",
//                   borderRadius: "10px",
//                 }}
//               />
//               <Bar dataKey="sales" fill="#F59E0B" radius={[10, 10, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }



























"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const pieData = [
    { name: "Regular T-Shirts", value: 60 },
    { name: "Oversize T-Shirts", value: 40 },
  ];

  const COLORS = ["#4F46E5", "#F59E0B"];

  // Chart Data for all periods
  const chartData = {
    "Last 5 Hours": [
      { name: "1h", sales: 80 },
      { name: "2h", sales: 120 },
      { name: "3h", sales: 60 },
      { name: "4h", sales: 90 },
      { name: "5h", sales: 70 },
    ],
    Daily: Array.from({ length: 24 }, (_, i) => ({
      name: `${i + 1}:00`,
      sales: Math.floor(Math.random() * 200) + 50,
    })),
    Weekly: [
      { name: "Mon", sales: 400 },
      { name: "Tue", sales: 550 },
      { name: "Wed", sales: 300 },
      { name: "Thu", sales: 700 },
      { name: "Fri", sales: 600 },
      { name: "Sat", sales: 350 },
      { name: "Sun", sales: 450 },
    ],
    Monthly: [
      { name: "Jan", sales: 3200 },
      { name: "Feb", sales: 2800 },
      { name: "Mar", sales: 4000 },
      { name: "Apr", sales: 3700 },
      { name: "May", sales: 5000 },
      { name: "Jun", sales: 4200 },
      { name: "Jul", sales: 3900 },
      { name: "Aug", sales: 4500 },
      { name: "Sep", sales: 4100 },
      { name: "Oct", sales: 4800 },
      { name: "Nov", sales: 4600 },
      { name: "Dec", sales: 5100 },
    ],
    Yearly: [
      { name: "2025", sales: 8000 },
      { name: "2026", sales: 12500 },
      { name: "2027", sales: 15500 },
      { name: "2028", sales: 19000 },
    ],
  };

  const currentData = chartData[selectedPeriod];

  return (
    <div className="min-h-screen bg-[#e9eef6] text-gray-800 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Dashboard Overview</h2>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Products Overview */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Products Overview</h3>
          <div className="space-y-3">
            <div>
              <p className="flex justify-between">
                <span>Regular T-Shirts</span>
                <span>60%</span>
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-yellow-400 rounded-full w-[60%]"></div>
              </div>
            </div>
            <div>
              <p className="flex justify-between">
                <span>Oversize T-Shirts</span>
                <span>40%</span>
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-indigo-500 rounded-full w-[40%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Sales Pie Chart */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Monthly Sales
          </h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={80}
                  innerRadius={40}
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Total Earnings</h3>
          <p className="text-3xl font-bold text-indigo-600">$ 12,845.00</p>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-md rounded-2xl p-6 col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Order #1123 - John Doe</span>
              <span className="text-green-600">$320</span>
            </li>
            <li className="flex justify-between">
              <span>Order #1124 - Mary Jane</span>
              <span className="text-green-600">$160</span>
            </li>
            <li className="flex justify-between">
              <span>Order #1125 - Carl Davis</span>
              <span className="text-green-600">$480</span>
            </li>
          </ul>
        </div>

        {/* Activity Overview */}
        <div className="bg-[#1f2251] text-white shadow-md rounded-2xl p-6 col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Activity Overview</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-black bg-white  px-3 py-2 rounded-md border-none font-bold outline-none"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
              <option>Last 5 Hours</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={currentData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "10px",
                }}
              />
              <Bar dataKey="sales" fill="#F59E0B" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
