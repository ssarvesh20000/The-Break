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
      <div>
        <Link href="/pages/login">
          <button>Log out</button>
        </Link>
      </div>
      <div>
        <Link href="/pages/write">
          <button>Writers page</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
