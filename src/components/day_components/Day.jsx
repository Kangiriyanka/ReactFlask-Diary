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
    const [date, setDate] = useState("")
    const { year, month, day} = useParams();
    
    
    useEffect(() => {
      async function fetchDiaryEntry() {
        try {
          const response = await axios.get(`/get_diary_entry/${year}/${month}/${day}/`);
          const res = response.data;
          console.log(res)
          setDayTitle(res["day_title"]);
          setDayContent(res["day_content"]);
          setDate(res["date"]);
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
            <h2 className= "day-title"> {dayTitle == "" ? "There's nothing yet" : dayTitle} </h2>
            <button className= "button-38">
            <Link  className="edit-entry" style ={{textDecoration: "none", color: "var(--link-color)"}} to={{pathname: `edit/`}} state = {{edit_title: dayTitle , edit_content: dayContent}}> Edit contents</Link>
            </button>
            <article>
           

              {dayContent}


            </article>
           
        </div>

    )
}


export default Day;