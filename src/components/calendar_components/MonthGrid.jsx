import React from "react";
import Square from "./Square.jsx"
import EmptySquare from "./EmptySquare.jsx";

function MonthGrid(props) {

const emptySquares = Array.from({length: props.offset}, (_,i) => i +1)


    // Create an array of days in the current month
    
   return (
  <div className="month-grid">
       {emptySquares.map((day) => ( 
                <EmptySquare key ={day} />
            )
       )}
       {props.days.map((day) => (
            <Square key={day} day={day} month={props.month} year={props.year}  />
        ))}
        
  </div>
);
           
}



export default MonthGrid; 