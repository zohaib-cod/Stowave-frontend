import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuth");
    if (auth !== "true") {
      router.push("/zo/ha/ib/st/ow/ave/ad/min/login");
    }
  }, []);

  return <div>Welcome Admin Dashboard</div>;
}
