import React, { useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "@styles/write.css"; // Ensure this path is correct based on your project structure

function TextEditor({ value, onChange }) {
    const textAreaRef = useRef(null);
    const fontSizes = Array.from({ length: 100 }, (_, i) => i + 1);

    const applyStyle = (command, value = null) => {
        document.execCommand(command, false, value); // TODO fix deprecation warning
    };

    useEffect(() => {
        // Only set the initial content or reset content if the editor is empty
        if (textAreaRef.current && textAreaRef.current.innerHTML !== value) {
            textAreaRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (textAreaRef.current) {
            onChange(textAreaRef.current.innerHTML); // Propagate changes to the parent
        }
    };

    return (
        <div className="textEditorContainer">
            <div id="editor">
                <h1>Text Editor</h1>
                
                <h3>Select Font</h3>
                <select id="font" onChange={(e) => applyStyle('fontName', e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>

                <h3>Select Font Size</h3>
                <select id="fontSize" onChange={(e) => applyStyle('fontSize', e.target.value)}>
                    {fontSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>

                <button id="bold" onClick={() => applyStyle('bold')}><i className="fas fa-bold"></i></button>
                <button id="italic" onClick={() => applyStyle('italic')}><i className="fas fa-italic"></i></button>
                <button id="underline" onClick={() => applyStyle('underline')}><i className="fas fa-underline"></i></button>
                <button id="strikethrough" onClick={() => applyStyle('strikethrough')}><i className="fas fa-strikethrough"></i></button>
                <button id="superscript" onClick={() => applyStyle('superscript')}><i className="fas fa-superscript"></i></button>
                <button id="subscript" onClick={() => applyStyle('subscript')}><i className="fas fa-subscript"></i></button>
                <button id="code" onClick={() => applyStyle('formatBlock', 'pre')}><i className="fas fa-code"></i></button>

                <button id="textColor" onClick={() => document.getElementById('textColorPicker').click()}><i className="fas fa-font"></i></button>
                <button id="bgColor" onClick={() => document.getElementById('bgColorPicker').click()}><i className="fas fa-fill-drip"></i></button>

                <button id="alignLeft" onClick={() => applyStyle('justifyLeft')}><i className="fas fa-align-left"></i></button>
                <button id="alignCenter" onClick={() => applyStyle('justifyCenter')}><i className="fas fa-align-center"></i></button>
                <button id="alignRight" onClick={() => applyStyle('justifyRight')}><i className="fas fa-align-right"></i></button>
                <button id="alignJustify" onClick={() => applyStyle('justifyFull')}><i className="fas fa-align-justify"></i></button>

                <button id="indent" onClick={() => applyStyle('indent')}><i className="fas fa-indent"></i></button>
                <button id="outdent" onClick={() => applyStyle('outdent')}><i className="fas fa-outdent"></i></button>

                <button id="orderedList" onClick={() => applyStyle('insertOrderedList')}><i className="fas fa-list-ol"></i></button>
                <button id="unorderedList" onClick={() => applyStyle('insertUnorderedList')}><i className="fas fa-list-ul"></i></button>

                <div
                    contentEditable="true"
                    id="textArea"
                    ref={textAreaRef}
                    onInput={handleInput}
                    style={{ minHeight: '200px', border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}
                ></div>
            </div>
            <input type="color" id="textColorPicker" style={{ display: 'none' }} onChange={(e) => applyStyle('foreColor', e.target.value)} />
            <input type="color" id="bgColorPicker" style={{ display: 'none' }} onChange={(e) => applyStyle('hiliteColor', e.target.value)} />
        </div>
    );
}

export default TextEditor;
