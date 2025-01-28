"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Blog } from "@interfaces/Blog";
import "@styles/Delete.css";
import Loading from "@components/Loading";

const Delete = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (index: number) => {
    try {
      // give alert to confirm deletion, if user agrees continue with deletion, if not exit
      if (!confirm("Are you sure you want to permanently delete this article?")) {
        return;
      }
      setLoading(true);
      const blogId = blogs[index]._id;
      await fetch("/api/admin", {
          method: "DELETE",
          body: JSON.stringify({ id: blogId }), // Send blog ID in the body
      });

      alert("Article deleted");
      setBlogs((prevBlogs) => prevBlogs.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article:");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {  
    return <Loading />;
  }

  return (
    <div className="delete-container">
      <button onClick={() => { router.push("/pages/admin") }} className="return-button"> ← Return to Dashboard </button>
      <div className="header">
        <h1>Modify Blogs</h1>
        <h3>Select a Blog below to modify it, or select delete to remove it.</h3>
      </div>
      
      <div className="blog-grid">
        {blogs.map((blog: Blog, index) => (
          <div key={blog._id} className="blog-card">
            <div onClick={() => handleArticleClick(blog._id)}>
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="blog-image"
                width={300}
                height={200}
              />
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-meta">
                  {blog.author} - {new Date(blog.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button 
              className="delete-button"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Delete;