"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@styles/Admin.css";

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await fetch("/api/login", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (!res.ok) { // if cookie is not present, redirect to login page
          router.push("/pages/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/pages/login");
      }
    };

    checkAuthentication();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (res.ok) {
        router.push("/pages/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome, Admin!</h1>
      <div className="tiles-container">
        <div className="tile">
          <Link href="/pages/write">
            <button>Writers page</button>
          </Link>
        </div>
        <div className="tile">
          <Link href="/pages/delete">
            <button>Modify page</button>
          </Link>
        </div>
      </div>
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Admin;
