"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@interfaces/Blog";

const Admin = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);

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
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/admin");

        if (res.ok) {
          const data = (await res.json()).data;
          setBlogs(data);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    checkAuthentication();
    fetchBlogs();
  }, [router]);

  const handleArticleClick = (id: string) => {
    router.push(`/pages/articleView/${id}`);
  };

  // TODO pass index so remove it from blog list
  const handleDelete = async (index: number) => {
    try {
      const blogId = blogs[index]._id;
      await fetch("/api/admin", {
        method: "DELETE",
        body: JSON.stringify({ id: blogId }), // Send blog ID in the body
        // TODO add body with blog id to delete
      });

      alert("Article deleted");
      setBlogs((prevBlogs) => prevBlogs.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article:");
    }
  }

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
    <div>
      <h1>Welcome, Admin!</h1>
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div>
        <Link href="/pages/write">
          <button>Writers page</button>
        </Link>
      </div>
      <div> {/* TODO Sarvy update formating */}
        {blogs.map((blog: Blog, index) => (
          <div key={blog._id}>
            <div
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <h3>{blog.title}</h3>
              <p className="">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className=""
                width={300}
                height={200}
              />  
            </div>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <p> ----------------- </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
