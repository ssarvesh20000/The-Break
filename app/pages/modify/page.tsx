"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Blog } from "@interfaces/Blog";
import { Media } from "@interfaces/Media";
import "@styles/Modify.css";
import Loading from "@components/Loading";

//create toggle to show the media upload (youtube link) field
const Modify = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [mediaUploads, setMediaUploads] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMedia, setShowMedia] = useState(false);

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

    const fetchMedia = async () => {
      try {
        const res = await fetch("/api/media");
        if (res.ok) {
          const data = (await res.json()).data;
          setMediaUploads(data);
        } else {
          console.error("Failed to fetch media uploads");
        }
      } catch (error) {
        console.error("Error fetching media uploads:", error);
      }
    };

    checkAuthentication();
    fetchBlogs();
    fetchMedia();
  }, [router]);

  const handleArticleClick = (id: string) => {
    router.push(`/pages/blogChange/${id}`);
  };

  const handleMediaClick = (id: string) => {
    router.push(`/pages/mediaChange/${id}`);
  }

  const handleDelete = async (id: string, type: "blog" | "media") => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${type}? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);

      const endpoint = type === "blog" ? "/api/admin" : "/api/media";
      await fetch(endpoint, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted.`);
      if (type === "blog") {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } else {
        setMediaUploads((prev) => prev.filter((media) => media._id !== id));
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Error deleting ${type}.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {  
    return <Loading />;
  }

  return (
    <div className="delete-container">
      <button onClick={() => { router.push("/pages/admin") }} className="return-button"> ← Return to Dashboard </button>
      <div className="header">
        <h1>Modify {showMedia ? "Media" : "Blogs"}</h1>
        <h3>Select an item below to modify it, or select delete to remove it.</h3>
      </div>

      {/* Toggle Switch for Blogs/Media */}
      <div className="toggle-container">
        <label className="toggle-label">
          <span>Show Blogs</span>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={showMedia}
            onChange={() => setShowMedia(!showMedia)}
          />
          <span className="toggle-slider"></span>
          <span>Show Media Uploads</span>
        </label>
      </div>

      
      {showMedia ? (
        // Display Media Uploads (YouTube Videos)
        <div className="blog-grid">
          {mediaUploads.map((media) => (
            <div key={media._id} className="blog-card">
              <div onClick={() => router.push(`/pages/mediaChange/${media._id}`)}>
                <iframe
                  width="300"
                  height="200"
                  src={`https://www.youtube.com/embed/${new URL(media.youtubeLink).searchParams.get("v")}`}
                  title={media.title}
                  //frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="blog-content">
                  <h3 className="blog-title">{media.title}</h3>
                  <p className="blog-meta">
                    {media.author} - {new Date(media.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(media._id, "media")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Display Blogs
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <div onClick={() => router.push(`/pages/blogChange/${blog._id}`)}>
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
                onClick={() => handleDelete(blog._id, "blog")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Modify;