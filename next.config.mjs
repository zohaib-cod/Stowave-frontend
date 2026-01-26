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





/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // local images
      },
      {
        protocol: "https",
        hostname: "stowaveb-1.onrender.com", // remote API images
      },
    ],
    unoptimized: true, // optional, safe for dev
  },
};

export default nextConfig;








