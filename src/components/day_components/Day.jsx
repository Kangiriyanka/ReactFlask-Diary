import React from 'react'
import {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "../../assets/styles/days.scss"


function Day() {
    const [dayTitle, setDayTitle] = useState("")
    const [dayContent, setDayContent] = useState("")
    const [date, setDate] = useState("")
    const { year, month, day} = useParams();
    
    useEffect(() => {
    
        async function fetchDiaryEntry() {
          axios({
            method: "GET",
            url:`/get_diary_entry/${year}/${month}/${day}/`,
            
      
            
          })

            .then(response => {
              const res = response.data
              setDayTitle(res["day_title"])
              setDayContent(res["day_content"])
              setDate(res["date"])
             
            })
          
            .catch(error => {
                  console.log(error.response)
            });
          
        }
        fetchDiaryEntry();
      }, []);

    // Using Regex to adjust the date suffixes by checking the last digit with dollar sign ($)
    function addDayPrefix() {

      
        const firsts = /[1]$/;
        const seconds = /[2]$/;
        const thirds = /[3]$/;

        if (firsts.exec(day) && day !== 11) {
            return "st";
        }

        else if  (seconds.exec(day) && day !== 12 )  {
            return "nd";
        }

        else if  (thirds.exec(day) && day !== 13) {
            return "rd";
        }

        else {
            return "th"
        }



    }

    return (

        <div className = "day-box" contenteditable="true"> 
            <h1> {month} {day}{addDayPrefix()} {year} </h1>
            <h2 className= "day-title"> {dayTitle} </h2>
            <p> {dayContent} </p>
            <Link  className="edit-entry" to={{pathname: `edit/`}} state = {{edit_title: dayTitle , edit_content: dayContent}}> Edit </Link>
           
           
        </div>

    )
}

export default Day;