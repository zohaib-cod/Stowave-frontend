"use client";

import { usePathname } from "next/navigation";
import Header from "./Header/Header";
import Footer from "./Footer/page";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
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
