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
    <div className="admin-container">
      <h1>Welcome, Admin!</h1>
      <div className="tiles-container">
        <Link style={{ textDecoration: 'none' }} href="/pages/write">
          <div className="tile">
              <button>Writers page</button>
          </div>
        </Link>
        <Link style={{ textDecoration: 'none' }} href="/pages/delete">
          <div className="tile">  
            <button>Modify page</button>
          </div>
        </Link>
        <Link style={{ textDecoration: 'none' }} href="/">
          <div className="tile">  
            <button>User View</button>
          </div>
        </Link>
      </div>
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Admin;
