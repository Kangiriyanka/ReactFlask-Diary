import React from 'react'
import {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import { getDayPrefix } from '../../assets/data/calendar';
import axios from "axios";
import parse from "html-react-parser"
import "../../assets/styles/days.scss"


function Day() {
    const [dayTitle, setDayTitle] = useState("")
    const [dayContent, setDayContent] = useState("")
    const { year, month, day} = useParams();
    
    
    useEffect(() => {
      async function fetchDiaryEntry() {
        try {
          const response = await axios.get(`/api/get_diary_entry/${year}/${month}/${day}/`);
          const data = response.data;
          setDayTitle(data["day_title"]);
          setDayContent(data["day_content"]);
          setDate(data["date"]);
        } catch (error) {
          console.log(error.response);
        }
      }
    
      fetchDiaryEntry();
      // No depedencies
    }, []);

  

    return (

        <div className = "day-box" contentEditable="true"> 
            <h2> {month} {day}{getDayPrefix(day)} {year} </h2>
           
          
            <h3  className= "day-title"> { dayTitle} </h3>
            <article>

            
           

              {parse(dayContent)}


            </article>
            <Link  className="edit-entry"  to={{pathname: `edit/`}} state = {{edit_title: dayTitle , edit_content: dayContent}}>
            <button  className= "button-38">
         
      Edit
             </button>
             </Link>
        </div>

    )
}


export default Day;