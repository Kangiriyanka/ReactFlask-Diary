import React, { useEffect, useRef } from "react";
import Quill from "quill";
import QuillTableBetter from "quill-table-better";
import 'quill-table-better/dist/quill-table-better.css'
import "../../assets/styles/quill.scss"
import DividerBlot from "../dividerBlot"
import keyboardBindings from "../bindings";

// https://quilljs.com/docs/modules/keyboard



function QuillEditor({ innerRef, content, onChange }) {

Quill.register({
  'modules/table-better': QuillTableBetter
}, true);

Quill.register(DividerBlot);


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
        ['table-better'],                                 // table button
      
        ['clean']                                         // remove formatting button
      ];
    const options =  {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
          table: false,
          'table-better': {
      language: 'en_US',
      menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'copy', 'delete'],
      toolbarTable: true
    },

    keyboard: {
      bindings: keyboardBindings 
    }
      }
    }
    
  
  
    const container = containerRef.current;
    const quill = new Quill(container, options)


    innerRef.current = quill
    quill.clipboard.dangerouslyPasteHTML(0, content)
    quill.on("text-change", () => {
      const newContent = quill.getSemanticHTML()
      onChange(newContent)
  
    });

    // Toggling the tabble 
    // Modules are defined in the options above
   
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('table-better', () => {
    const tableModule = quill.getModule('table-better');
    tableModule.insertTable(2, 2);
    
});
  }, []);
  
  // 
  return <div ref={containerRef} />;
}

export default QuillEditor;