import {React, useState} from "react"
import {Link} from "react-router-dom";
import { getDayPrefix } from "../../assets/data/calendar"




function Home(props) {

    
    const currentDate =  new Date();
    const currentYear = currentDate.getFullYear()
    const dayIndex = currentDate.getDay()
    const monthIndex = currentDate.getMonth() 
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayNumber = currentDate.getDate()
    const currentDay = daysOfTheWeek[dayIndex]
    const currentMonth = months[monthIndex]
    const prefix = getDayPrefix(dayNumber);
  

    return (
        <div style ={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
       
            <h2 style={{textAlign: "center", color: "var(--custom-black)"}}> Today is {currentDay},  {currentMonth} {dayNumber}{prefix} {currentYear} </h2>
            <Link  className="edit-entry"  to={{pathname: `/calendar/days/${currentYear}/${currentMonth}/${dayNumber}`}}>
            <button className= "button-38">
             See contents
            </button>
            </Link>
          
      
        </div>
    )


}

export default Home