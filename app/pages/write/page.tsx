'use client';
import React, { useState } from "react";
import Image from "next/image";
import plus from "@assets/plusButton.png";
import image from "@assets/image.png";
import video from "@assets/video.png";
import TextEditor from "@components/TextEditor";
import "@styles/write.css";

const Write = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the selected file
    setMedia(file);
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onloadend = () => setMediaPreview(reader.result as string); // Update preview when file is read
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    if (media) {
      formData.append("image", media);
    }
    formData.append("description", description);
    formData.append("content", content);

    const res = await fetch("/api/admin", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      alert("Blog created successfully");
    } else {
      alert("Failed to create blog");
    }
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <h1>Input a Title</h1>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={handleTitleChange} 
          required 
        />
        <h1>Input an Author</h1>
        <input 
          type="text" 
          placeholder="Author" 
          value={author} 
          onChange={handleAuthorChange} 
          required 
        />

        <h1>Select Article Category</h1>
        <select value={category} onChange={handleCategoryChange} required>
          <option value="" disabled>
            Select a category
          </option>
          <option value="United States">United States</option>
          <option value="San Diego">San Diego</option>
          <option value="World">World</option>
          <option value="Opinion">Opinion</option>
          <option value="Multimedia">Multimedia</option>
          <option value="Other">Other</option>
        </select>

        <div>
          <h1> Upload Image </h1>
          <button type="button" title="Add" onClick={() => setOpen(!open)}>
            <Image src={plus} alt="add" width={20} height={20} />
          </button>
          {open && (
            <div>
              <label htmlFor="uploadImage" style={{ cursor: "pointer" }}>
                <Image src={image} alt="Upload Image" width={20} height={20} />
                <input 
                  type="file" 
                  id="uploadImage" 
                  accept="image/*" 
                  style={{ display: "none" }} 
                  onChange={handleMediaChange} 
                />
              </label>
              <label htmlFor="uploadVideo" style={{ cursor: "pointer" }}>
                <Image src={video} alt="Upload Video" width={20} height={20} />
                <input 
                  type="file" 
                  id="uploadVideo" 
                  accept="video/*" 
                  style={{ display: "none" }} 
                  onChange={handleMediaChange} 
                />
              </label>
            </div>
          )}
          {mediaPreview && (
            <div style={{ marginTop: "10px" }}>
              <h3>Preview:</h3>
              {media?.type.startsWith("image/") ? (
                <img src={mediaPreview} alt="Selected Media" style={{ maxWidth: "100%", maxHeight: "300px" }} />
              ) : media?.type.startsWith("video/") ? (
                <video controls style={{ maxWidth: "100%", maxHeight: "300px" }}>
                  <source src={mediaPreview} type={media.type} />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
          )}

          <h1>Input Image Description</h1>
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={handleDescriptionChange} 
            required
          />

          <TextEditor 
            value={content} 
            onChange={(updatedContent: string) => setContent(updatedContent)} 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Write;
