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
  const [value, setValue] = React.useState("");
  return (
    <div className="container">
      <input type="text" className="titleInput" placeholder="Title" />
      <div className="addButtonContainer">
        <button title="Add" className="addButton" onClick={() => setOpen(!open)}>
          <Image src={plus} alt="add" width={20} height={20} />
        </button>
        {open && (
          <div className="optionsContainer">
            <button title="Button 1" className="optionButton">
              <Image src={image} alt="button1" width={20} height={20} />
            </button>
            <button title="Button 2" className="optionButton">
              <Image src={plus} alt="button2" width={20} height={20} />
            </button>
            <button title="Button 3" className="optionButton">
              <Image src={video} alt="button3" width={20} height={20} />
            </button>
          </div>
        )}
        <TextEditor />
      </div>
    </div>
  );
};

export default Write;
