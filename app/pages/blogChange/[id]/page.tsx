'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import plus from "@assets/plusButton.png";
import image from "@assets/image.png";
import TextEditor from "@components/TextEditor";
import "@styles/write.css";
import { useRouter, useParams } from "next/navigation";
import { Blog } from "@interfaces/Blog";


// TODO add delete button when user clicks blog and enters edit page
// see modify/page.tsx line 53 & 106 for how delete is done 
// yours will be simpler because in that it removes the blog from the list of blogs that currnetly show on screen, but u just have to remove the blog from db if that makes sense
// no frontend update other than navigate user back to home page if delete successful
const Write = () => {
  // add image window toggle
  const [open, setOpen] = useState(true);
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
  const params = useParams();
  const id = params.id;
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        console.log("Fetching article with ID:", id);
        const response = await fetch(`/api/blog/${id}`);
        const data = await response.json();
        setBlog(data.data);
        const blog = data.data;
        let imageUrl: string;
        if (blog) {
          // prefill all fields in form
          setTitle(blog?.title || ""); 
          setAuthor(blog?.author || ""); 
          setCategory(blog?.category || ""); 
          setDescription(blog?.description || ""); 
          setContent(blog?.content || "");
          // handle setting the image
          fetch(`/api/image/${blog.image}`)
              .then(response => response.blob())  // Convert response to Blob
              .then(blob => {
                imageUrl = URL.createObjectURL(blob);
                setMediaPreview(imageUrl);  // Set the image for preview
              })
              .catch(error => console.error("Error fetching image:", error));
        }
        return () => {
          if (imageUrl) {
            URL.revokeObjectURL(imageUrl); // Cleanup URL to free memory
          }
        };
        
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
    formData.append("id", blog?._id || "");
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    if (media) formData.append("image", media);
    formData.append("description", description);
    formData.append("content", content);

    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Blog updated successfully");
        clearForm();
        router.push("/pages/admin");
      } else {
        alert("Failed to update blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error updating blog");
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
      const res = await fetch("/api/admin", {
        method: "DELETE",
        body: JSON.stringify({ id: blog?._id }),
      });
      if (res.ok) {
        alert("Article deleted");
        router.push("/");
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
        <h1>Update Blog</h1>
        <h3>Change fields below to update the blog. Leave this page to discard changes.</h3>
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

        <h1>Modify Article Category</h1>
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
          <option value="Multimedia">Multimedia</option>
        </select>

        <div className="media-upload">
          <h1>Modify Image</h1>
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

        <h1>Modify Image Description</h1>
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

export default Write;