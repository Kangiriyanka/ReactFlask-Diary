import React from "react"
import { Link } from "react-router-dom";


function Header(props) {
    
    const currentDate =  new Date("December 17, 2001 03:24:00");
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() 
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
   
    return (
        <nav>
       
        <ul>
          <li><a href={`/calendar/${currentYear}/${months[currentMonth] }`}>Calendar </a></li>
     
        </ul>
      </nav>
    )


}

export default Header;