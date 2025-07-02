import React, { useEffect, useRef } from "react";
import Quill from "quill";


function QuillEditor({ innerRef, content, onChange }) {


  const containerRef = useRef();
  
  useEffect(() => {
    // Make sure we don't create another Quill editor
    
    if (innerRef.current) return;

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];
    const options =  {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions
        },
      }
    
  
  
    const container = containerRef.current;
    const quill = new Quill(container, options)
    innerRef.current = quill
    quill.clipboard.dangerouslyPasteHTML(0, content)
    quill.on("text-change", () => {
      const newContent = quill.getSemanticHTML()
      onChange(newContent)
  
    });
  }, []);
  
  // 
  return <div ref={containerRef} />;
}

export default QuillEditor;