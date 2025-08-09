import React from 'react'
import {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import { getDayPrefix } from '../../assets/data/calendar';
import axios from "axios";
import parse from "html-react-parser"
import "../../assets/styles/days.scss"
import { useNavigate } from "react-router-dom";
import { isLeapYear } from '../../assets/data/calendar';
import CommandBox from '../calendar_components/CommandBox.jsx';

function Day() {
    const [dayTitle, setDayTitle] = useState("")
    const [dayContent, setDayContent] = useState("")
    const { year, month, day} = useParams();
    const numericDay = parseInt(day);
    const numericYear = parseInt(year);
    const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const longMonths = ["January", "March", "May", "July", "August", "October", "December"];
    const shortMonths = ["April", "June", "September", "November"];
  
   
    
    const navigate = useNavigate();

    useEffect(() => {
     
      const handleKeyDown = (e) => {
          console.log(e.key,e.code)
          // 1 is  (1 , Digit1)
        if (e.code === 'ArrowLeft') {
          handlePreviousDay()
        } else if (e.code === 'ArrowRight') {
          handleNextDay()
        }

        else if (e.ctrlKey && e.code === 'KeyE') {
          navigate(`edit/`, {state: {edit_title: dayTitle , edit_content: dayContent}});
          e.preventDefault();
          
      }
  }
      // Remove the listener when you're done pressing
      window.addEventListener('keydown', handleKeyDown);
      // Cleanup function when the component unmounts 
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePreviousDay]);
    
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
    }, [year,month,day]);

    function handlePreviousDay() {
      // No Year Support
      if (numericDay  == 1 && month == "January") {
        return;
      }
      if (numericDay > 1) {
        navigate(`/calendar/days/${year}/${month}/${numericDay -  1}`);
      } else {
       if (longMonths.includes(month)) {
        if (month == "August"){
        navigate(`/calendar/days/${year}/${allMonths[allMonths.indexOf(month) - 1]}/${31}`);
       }
       if (month == "March") {
        navigate(`/calendar/days/${year}/${allMonths[allMonths.indexOf(month) - 1]}/${isLeapYear(numericYear) ? 29 : 28}`);
       }
       else {
        navigate(`/calendar/days/${year}/${allMonths[allMonths.indexOf(month) - 1]}/${30}`);
       }
      }
      else {
        navigate(`/calendar/days/${year}/${allMonths[allMonths.indexOf(month) - 1]}/${31}`);
      }
    

      }
    }
  
   
    function handleNextDay() {
     
      if (numericDay == 31 && month == "December") {
        return;
      }

      else if (month == "February" ) {
        if (numericDay < 28 || (isLeapYear(numericYear) && numericDay<29))  {
          navigate(`/calendar/days/${year}/${month}/${numericDay + 1}`);
        }
        else {
          navigate(`/calendar/days/${year}/${allMonths[allMonths.indexOf(month) + 1 ]}/${1}`);
        }
       
      }
     
   
      else if (longMonths.includes(month)) {
         if (numericDay < 31) {
         
          navigate(`/calendar/days/${year}/${month}/${numericDay + 1}`);
         }
         else { 
         navigate(`/calendar/days/${year}/${allMonths[allMonths.indexOf(month) + 1 ]}/${1}`);
         }
        }

  


       else {
          if (numericDay < 30) {
            navigate(`/calendar/days/${year}/${month}/${numericDay + 1}`);
          }
           else {
             
              navigate(`/calendar/days/${year}/${allMonths[allMonths.indexOf(month) + 1 ]}/${1}`);
              }
           }
       }
      


      

    
     
     

      
    


  

    return (

        <div className = "day-box"> 
       
            <div className = "day-header">
            <div className= "previous-triangle" onClick ={handlePreviousDay} > </div> 
            <h2 style = {{color: "var(--custom-black)"}}> My {month} {day}{getDayPrefix(day)} {year} </h2>
            <div className= "next-triangle" onClick = {handleNextDay} >  </div> 
            </div>
          
            <div className= "article-container">
            <article>
            <h3  className= "day-title"> Title: { dayTitle} </h3>

            
           

              {parse(dayContent)}

            
            </article>
            <Link  className="edit-entry"  to={{pathname: `edit/`}} state = {{edit_title: dayTitle , edit_content: dayContent}}>
            <button  className= "button-38">
         
      Edit (Ctrl + E)
             </button>
             </Link>
             </div>
        </div>

    )
}


export default Day;