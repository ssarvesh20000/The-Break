'use client';
import React, { useState, useEffect } from "react";
import "@styles/write.css";
import { useRouter, useParams } from "next/navigation";
import { Media } from "@interfaces/Media";



const MediaEdit = () => {


  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [media, setMedia] = useState<Media | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        console.log("Fetching article with ID:", id);
        const response = await fetch(`/api/media/${id}`);
        const data = await response.json();
        setMedia(data.data);

        const media = data.data;
        if (media) {
          // prefill all fields in form
          setTitle(media?.title || ""); 
          setAuthor(media?.author || ""); 
          setYoutubeLink(media?.youtubeLink || "");
          setDescription(media?.description || ""); 
        }
        
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    const checkAuthentication = async () => {
      try {
        const res = await fetch("/api/login", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) router.push("/pages/login");
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/pages/login");
      }
    };

    checkAuthentication();
    fetchArticle();
  }, [router]);

  useEffect(() => {
     // handle reload and tab exit protection
     function beforeUnload(e: BeforeUnloadEvent) {
      console.log("beforeUnload called");
      if (isFormDirty) {
        e.preventDefault();
        confirm("Are you sure you want to leave? Your changes will be discarded.")
      }
    }
  
    window.addEventListener('beforeunload', beforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [isFormDirty]);

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setYoutubeLink("");
    setIsFormDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("id", media?._id || "");
    formData.append("title", title);
    formData.append("author", author);
    formData.append("youtubeLink", youtubeLink);
    formData.append("description", description);

    try {
      const res = await fetch("/api/media", {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Media updated successfully");
        clearForm();
        router.push("/pages/modify");
      } else {
        alert("Failed to update media");
      }
    } catch (error) {
      console.error("Error creating Media:", error);
      alert("Error updating media");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigation = () => {
    if (isFormDirty) {
      // Show confirmation dialog
      const confirmed = window.confirm("Your changes will be discarded. Are you sure you want to leave?");
      if (confirmed) {
        // Navigate to the target page
        router.push("/pages/modify");
      }
    } else {
      // No unsaved changes, just navigate
      router.push("/pages/modify");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this article?")) {
      return;
    }
    try {
      const res = await fetch("/api/media", {
        method: "DELETE",
        body: JSON.stringify({ id: media?._id }),
      });
      if (res.ok) {
        alert("Article deleted");
        router.push("/pages/modify");
      } else {
        alert("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article");
    }
  };
  
  return (
    <div className="container">
      <button onClick={handleNavigation} className="return-button"> ← Return to Modify Page </button>
      <div className="update-blog-header">
        <h1>Update Media</h1>
        <h3>Change fields below to update the Media. Leave this page to discard changes.</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Modify Title</h1>
        {/* TODO double check if this is good */}
        <input 
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setIsFormDirty(true); }} 
          required
        />
        
        <h1>Modify Author</h1>
        <input 
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => { setAuthor(e.target.value); setIsFormDirty(true); }}
          required
        />

        <h1>Modify YouTube Link</h1>
        <input 
          type="text"
          placeholder="YouTube Link"
          value={youtubeLink}
          onChange={(e) => { setYoutubeLink(e.target.value); setIsFormDirty(true); }}
          required
        />

        <h1>Modify Media Description</h1>
        <textarea 
          placeholder="Description"
          value={description}
          onChange={(e) => { setDescription(e.target.value); setIsFormDirty(true); }}
          required
        />

        <button 
          type="submit" 
          className="submit-button" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving Changes..." : "Save Changes"}
        </button>
        <button type="button" 
        className="delete-button" 
        onClick={handleDelete}>Delete Article
        </button>
      </form>
    </div>
  );
};

export default MediaEdit;