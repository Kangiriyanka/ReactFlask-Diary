import React from "react"
import { Link } from "react-router-dom";


function Header(props) {
    
    const currentDate =  new Date();
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