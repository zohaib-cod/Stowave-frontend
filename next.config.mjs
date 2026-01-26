// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;






// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "5000",
//         pathname: "/uploads/**", // allow all files in uploads folder
//       },
//     ],
//   },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
// images: {
//   remotePatterns: [
//     {
//       protocol: "http",
//       hostname: "localhost",
//       port: "5000",
//       pathname: "/uploads/**",
//     },
//   ],
// },

// };

// export default nextConfig;














// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
         

//         hostname: "localhost",
//         port: "5000",
//       },
//     ],
//     unoptimized: true, // Optional, disables Next image optimization for localhost
//   },
// };

// export default nextConfig;





const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "stowaveb-1.onrender.com" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;








