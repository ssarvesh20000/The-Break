'use client';
import React from "react";
import Image from "next/image";
import plus from "@assets/plusButton.png"
import image from "@assets/image.png"
import video from "@assets/video.png"
import TextEditor from "@components/TextEditor";
import "../../Styles/write.css";


const Write = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
      },
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
        <div>
          <button type="button" title="Add" onClick={() => setOpen(!open)}>
            <Image src={plus} alt="add" width={20} height={20} />
          </button>
          {open && (
            <div>
              <button type="button" title="Button 1">
                <Image src={image} alt="button1" width={20} height={20} />
              </button>
              <button type="button" title="Button 2">
                <Image src={plus} alt="button2" width={20} height={20} />
              </button>
              <button type="button" title="Button 3">
                <Image src={video} alt="button3" width={20} height={20} />
              </button>
            </div>
          )}
        <TextEditor></TextEditor> 
        </div>
        <button type='submit'>Submit</button>
        </form>
    </div>
  );
};

export default Write;
