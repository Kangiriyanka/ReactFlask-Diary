import React from "react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import QuillEditor from "./QuillEditor"
import axios from "axios";
import "../../assets/styles/days.scss"

function EditDay() {
  
  const location = useLocation();
  const [response, setResponse] = useState("");
  const { year, month, day } = useParams();
  const { edit_title, edit_content } = location.state;
  const [newTitle, setNewTitle] = useState(edit_title);
  const [content, setContent] = useState("<p> Hey </p>");

  function sendDataToFlask(data) {
    const formData = new FormData();

    formData.append("dayTitle", data.day_title);
    formData.append("dayContent", data.day_content);

    axios
      .post(`/edit_diary_entry/${year}/${month}/${day}`, formData)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      <h1> What did you do today?</h1>
      <form onSubmit={submitDay}>
        <label>
          Day Title :
          <input
            className= "day-title-input"
            type="textarea"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </label>

        <QuillEditor content ={content} onChange ={setContent}/>
        


        <button className= "submit-button" type="submit">Edit Diary Entry </button>
        <p> {response} </p>
      </form>

    </div>
  );
}

export default EditDay;
