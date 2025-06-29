import React from "react"
import { Link } from "react-router-dom";


function Square(props) {
   
    
    const dayNumber = parseInt(new Date().getDate(),10)
   
  
  

    return (

        <Link className= {`${props.day === dayNumber ? 'calendar-square active-square': 'calendar-square'} ` } 
            to={{pathname: `/calendar/days/${props.year}/${props.month}/${props.day}`}}>
          <div  className="day-entry">
            <div className= "day-number "> {props.day} </div>
        </div>

        </Link>
    )


}

export default Square;