'use client';
import React from "react";
import Image from "next/image";
import plus from "@assets/plusButton.png"
import image from "@assets/image.png"
import video from "@assets/video.png"
import TextEditor from "@components/TextEditor";
const Write = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <div>
      <input type="text" placeholder="Title" />
      <div>
        <button title="Add" onClick={() => setOpen(!open)}>
          <Image src={plus} alt="add" width={20} height={20} />
        </button>
        {open && (
          <div>
            <button title="Button 1">
              <Image src={image} alt="button1" width={20} height={20} />
            </button>
            <button title="Button 2">
              <Image src={plus} alt="button2" width={20} height={20} />
            </button>
            <button title="Button 3">
              <Image src={video} alt="button3" width={20} height={20} />
            </button>
          </div>
        )}
      <TextEditor></TextEditor> 
      </div>
    </div>
      );
};

export default Write;
