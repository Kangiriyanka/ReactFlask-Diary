import React from "react";
import Square from "./Square.jsx"
import { motion } from "framer-motion"
import EmptySquare from "./EmptySquare.jsx";

function MonthGrid(props) {
let customStyle = {color: "black"}
const emptySquares = Array.from({length: props.offset}, (_,i) => i +1)


    // Create an array of days in the current month
    
   return (
  <div className="monthGrid">
    
        
       {emptySquares.map((day) => (

            
                <EmptySquare />
            )
       )}

       {props.days.map((day) => (
            <Square key={day} day={day} month={props.month} year={props.year} customStyle={customStyle} />
        ))}
        
   

       
    


  </div>
);
           
}



export default MonthGrid; 