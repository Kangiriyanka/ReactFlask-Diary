import React, { useEffect, useRef } from "react";
import Quill from "quill";
import parse from "html-react-parser"

function QuillEditor({ content, onChange }) {

  // Quill requires a container where the editor will be appended
  const editorRef = useRef(null);
  const quillRef = useRef(null);
 

  useEffect(() => {
    
    if (quillRef.current) return;
    

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

    quillRef.current = new Quill(editorRef.current, options)
    quillRef.current.setText(content)
    quillRef.current.clipboard.dangerouslyPasteHTML(0, content)
    quillRef.current.on("text-change", () => {
      const newContent = quillRef.current.getSemanticHTML()
      onChange(newContent)
  
    });
  }, []);

  return <div ref={editorRef} />;
}

export default QuillEditor;