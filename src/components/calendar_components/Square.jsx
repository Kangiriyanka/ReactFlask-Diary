import React from "react"
import { Link } from "react-router-dom";


function Square(props) {
   
 
    return (
        <div className="calendar-square">

<Link  className="day-entry" to={{pathname: `/calendar/days/${props.year}/${props.month}/${props.day}`}} >
            <div className= "day-number "  style={{...props.customStyle}} > {props.day} </div>
</Link>
           

        </div>
    )


}

export default Square;