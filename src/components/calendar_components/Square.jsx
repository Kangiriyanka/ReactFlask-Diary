import React, { useState , useEffect} from "react"
import { Link } from "react-router-dom";
import axios from "axios";


function Square(props) {
   
    
    const dayNumber = parseInt(new Date().getDate(),10)
    const [filled, setFilled] = useState(false);
  

    useEffect(() => {
      async function isFilled() {
        try {
    
          
          const response = await axios.get(`/api/get_diary_entry/${props.year}/${props.month}/${props.day}/`);
          const data = response.data;
        
        
          if (data["day_title"] != "default_title" || data["day_content"] != "default_content") {
            setFilled(true);
        } 
          console.log(filled)
    }
        
        catch (error) {
          console.log(error.response);
        }
    }
      
    
      isFilled();

    }, []);
   
  
  

    return (

        <Link className= {`${props.day === dayNumber ? 'calendar-square active-square': 'calendar-square'} ${filled ? "filled-square" : ""}` } 
            to={{pathname: `/calendar/days/${props.year}/${props.month}/${props.day}`}}>
          <div  className="day-entry">
            <div className= "day-number "> {props.day} </div>
        </div>

        </Link>
    )


}

export default Square;