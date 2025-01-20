'use client'
import React, { useState } from "react";
import Image from "next/image";

const BlogImage = ({ imageId, alt, className }: BlogImageProps) => {
  if (!imageId) return null;
  
  return (
    <img
      src={`/api/blog/image?id=${imageId}`}
      alt={alt}
      className={className}
    />
  );
};

interface BlogImageProps {
  imageId: string;
  alt: string;
  className?: string;
}

export default BlogImage;
/*
import { useState, ChangeEvent, FormEvent } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [picture, setPicture] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, picture, text }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Picture URL"
        value={picture}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPicture(e.target.value)}
      />
      <textarea
        placeholder="Text"
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
*/