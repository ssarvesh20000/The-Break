"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@styles/Admin.css";

const Admin = () => {
  const router = useRouter();

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
      <h1 className="admin-header">Welcome, Admin!</h1>
      <div className="admin-tiles-container">
        <Link style={{ textDecoration: 'none' }} href="/pages/write">
          <div className="admin-tile">
              <button className="admin-button">Article Upload</button>
          </div>
        </Link>
        <Link style={{ textDecoration: 'none' }} href="/pages/media">
          <div className="admin-tile">
              <button className="admin-button">Media Upload</button>
          </div>
        </Link>
        <Link style={{ textDecoration: 'none' }} href="/pages/modify">
          <div className="admin-tile">  
            <button>Edit Page</button>
          </div>
        </Link>
        <Link style={{ textDecoration: 'none' }} href="/">
          <div className="admin-tile">  
            <button>User View</button>
          </div>
        </Link>
      </div>
      <div className="admin-logout-container">
        <button className="admin-logout-btn" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Admin;
