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
       /* Change the api endpoint below to where this data is getting POST'ed to
        To get started making this new backend/ api endpoint u should check out api/admin folder in the app
        see what the POST method looks like in there specifically (basically just taking data that is sent in the request and adding it to the database)
          (main diff between the existing POST method and urs is u dont have to worry about saving images, so ur method should be smaller/ simpler)
        you wanna make a new folder called api/media and follow the same idea as the POST method in api/admin
        once u r able to add a media thing to the db (u check the website and see it) go to mediaView.tsx, see comment on line 24 
       */
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Media uploaded successfully");
        clearForm();
        router.push("/pages/admin");
      } else {
        alert("Failed to create media entry");
      }
    } catch (error) {
      console.error("Error creating media:", error);
      alert("Error creating media");
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