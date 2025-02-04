//UPLADING MEDIA PAGE
'use client';
import React, { useState, useEffect } from "react";
//import TextEditor from "@components/TextEditor";
import "@styles/write.css";
import { useRouter } from "next/navigation";

const Write = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const router = useRouter();

  useEffect(() => {
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

    // handle reload and tab exit protection
    function beforeUnload(e: BeforeUnloadEvent) {
      if (isFormDirty) {
        e.preventDefault();
        confirm("Are you sure you want to leave? Your changes will not be saved.")
      }
    }
  
    window.addEventListener('beforeunload', beforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [isFormDirty, router]);

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setMedia("");
    setDescription("");
    setIsFormDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("media", media);
    formData.append("description", description);

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Blog created successfully");
        clearForm();
        router.push("/pages/admin");
      } else {
        alert("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigation = () => {
    if (isFormDirty) {
      // Show confirmation dialog
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (confirmed) {
        // Navigate to the target page
        router.push("/pages/admin");
      }
    } else {
      // No unsaved changes, just navigate
      router.push("/pages/admin");
    }
  };

  return (
    <div className="container">
      <button onClick={handleNavigation} className="return-button"> ← Return to Dashboard </button>
      <form onSubmit={handleSubmit}>
        <h1>Input a Title</h1>
        {/* TODO double check if this is good */}
        <input 
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setIsFormDirty(true); }} 
          required
        />
        
        <h1>Input an Author</h1>
        <input 
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => { setAuthor(e.target.value); setIsFormDirty(true); }}
          required
        />

        <div className="media-upload">
          <h1>Input Youtube Link</h1>
          <input 
            type="text" 
            placeholder = "Youtube Link"
            className="media-input"
            onChange={(e) => { setMedia(e.target.value); setIsFormDirty(true); }}
          />
        </div>

        <h1>Input Video Description</h1>
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Write;