import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDayPrefix } from "../../assets/data/calendar";
import QuillEditor from "./QuillEditor"
import axios from "axios";
import parse from "html-react-parser"
import "../../assets/styles/days.scss"

function EditDay() {
  
  const location = useLocation();
  const [response, setResponse] = useState("");
  const { year, month, day } = useParams();
  const { edit_title, edit_content } = location.state;
  const [newTitle, setNewTitle] = useState(edit_title);
  const [content, setContent] = useState(edit_content);
  const navigate = useNavigate();
  const quillRef = useRef();


    useEffect(() => {
       
        const handleKeyDown = (e) => {
        
  
           if (e.ctrlKey && e.code === 'KeyS') {
            console.log(e)
            e.preventDefault();
            const data = {
            day_title: newTitle,
            day_content: content,

          };

          console.log(data)
           sendDataToFlask(data);

         

            
        }
    }
        // Remove the listener when you're done pressing
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup function when the component unmounts 
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [newTitle, content]);

  
  async function sendDataToFlask(data) {
    const formData = new FormData();
    formData.append("dayTitle", data.day_title);
    formData.append("dayContent", data.day_content);
    console.log(formData)
    try {
      const response = await axios.post(`/api/edit_diary_entry/${year}/${month}/${day}`, formData)

      navigate(`/calendar/days/${year}/${month}/${day}`)
    } catch(error) {
      setResponse(response.data)
      console.log(error.response)
    }
  
  }
    // Flow: Submit -> Pack the state variables inside an object 
    //  Send the object to sendDataFlask
  function submitDay(e) {
    e.preventDefault();
   
    const data = {
      day_title: newTitle,
      day_content: content,
    };

    sendDataToFlask(data);

  }

  return (
    
    <div className= "edit-day-box">
      <h3> My {month} {day}{ getDayPrefix(day)} {year} </h3>
      <form onSubmit={submitDay}>
        <label>
          <h3>Title:</h3>   
          <input
            className= "day-title-input"
            type="textarea"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
       
        </label>

        <QuillEditor innerRef= {quillRef} content= {content} onChange ={setContent}/>
    


     
       
        <button  style ={{alignSelf: "center", margin: "2rem 0", textDecoration: "none", color: "var(--link-color)"}} className= "button-38" type="submit">Submit (Ctrl + S)</button>
      </form>

      <p style = {{fontSize: "2rem"}}> {response} </p>

    </div>
  );
}


export default EditDay;
