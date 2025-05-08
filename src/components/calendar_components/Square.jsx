import React from "react"
import { Link } from "react-router-dom";


function Square(props) {
   
 
    return (

        <Link className="calendar-square" to={{pathname: `/calendar/days/${props.year}/${props.month}/${props.day}`}}>

          <div  className="day-entry">
            <div className= "day-number "  > {props.day} </div>
        </div>

        </Link>
    )


}

export default Square;