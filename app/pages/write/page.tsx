'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import plus from "@assets/plusButton.png";
import image from "@assets/image.png";
import TextEditor from "@components/TextEditor";
import "@styles/write.css";
import { useRouter } from "next/navigation";

const Write = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const router = useRouter();

  useEffect(() => {
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
    setMedia(null);
    setMediaPreview(null);
    setDescription("");
    setContent("");
    setCategory("");
    setIsFormDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    if (media) formData.append("image", media);
    formData.append("description", description);
    formData.append("content", content);

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

        <h1>Select Article Category</h1>
        <select 
          value={category} 
          onChange={(e) => { setCategory(e.target.value); setIsFormDirty(true); }} 
          required
        >
          <option value="" disabled>Select a category</option>
          <option value="United States">United States</option>
          <option value="San Diego">San Diego</option>
          <option value="World">World</option>
          <option value="Opinion">Opinion</option>
          {/*<option value="Multimedia">Multimedia</option>*/}
        </select>

        <div className="media-upload">
          <h1>Upload Image</h1>
          <button 
            type="button" 
            className="upload-button"
            onClick={() => setOpen(!open)}
          >
            <Image src={plus} alt="add" width={20} height={20} />
          </button>
          
          {open && (
            <div className="upload-options">
              <label htmlFor="uploadImage" style={{ cursor: "pointer" }}>
                <Image src={image} alt="Upload Image" width={20} height={20} />
                <input 
                  type="file"
                  id="uploadImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setMedia(file);
                      const reader = new FileReader();
                      reader.onloadend = () => setMediaPreview(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          )}
          
          {mediaPreview && (
            <div className="media-preview">
              <h3>Preview:</h3>
              <Image 
                src={mediaPreview} 
                alt="Selected Media"
                width={0}
                height={0}
                style={{ width: '30%', height: 'auto' }}
              />
            </div>
          )}
        </div>

        <h1>Input Image Description</h1>
        <textarea 
          placeholder="Description"
          value={description}
          onChange={(e) => { setDescription(e.target.value); setIsFormDirty(true); }}
          required
        />

        <div className="editor-container">
          <TextEditor 
            value={content}
            onChange={(updatedContent: string) => { setContent(updatedContent); setIsFormDirty(true); }}
          />
        </div>

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