// "use client";

// import { usePathname } from "next/navigation";
// import Header from "./Header/Header";
// import Footer from "./Footer/page";

// export default function ClientWrapper({ children }) {
//   const pathname = usePathname();

//   // Check if current page is admin or login/register etc.
//   const hideLayout =
//     pathname.startsWith("/admin") ||
//     pathname.startsWith("/login") ||
//     pathname.startsWith("/register");

//   if (hideLayout) {
//     // Hide header & footer
//     return <>{children}</>;
//   }

//   // Normal pages show header & footer
//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// }







"use client";

import { usePathname } from "next/navigation";
import Header from "./Header/Header";
import Footer from "./Footer/page";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();

  // Hide header/footer on any route containing '/admin' (even deeply nested)
  const hideLayout =
    pathname.includes("/admin") ||
    pathname.includes("/zo/ha/ib/st/ow/ave/ad/min/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  if (hideLayout) {
    // Admin page (or login/register) → no Header/Footer
    return <>{children}</>;
  }

  // All other pages → normal layout
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
