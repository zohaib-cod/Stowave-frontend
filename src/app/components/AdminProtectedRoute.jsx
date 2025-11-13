"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/zo/ha/ib/st/ow/ave/ad/min/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}

