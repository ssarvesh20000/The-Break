"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = true;
    if (!isAuthenticated) {
      router.push("/pages/login");
    }
  }, []);
  return (
    <div>
        <h1>Welcome, Admin!</h1>
        <Link href="/pages/login">Click here to back.</Link>
    </div>
  )
};

export default Admin;
