import React from "react";
import Square from "./Square.jsx"
import { motion } from "framer-motion"


function MonthGrid(props) {


let customStyle = {color: "black"}

    // Create an array of days in the current month
 
    return (
        
        <div className = "monthGrid">
            
             {props.days.map((day) =>
            //  Every odd number , add a background 
             
             <Square key= {day}  customStyle= {day % 2 == 0 ? customStyle : ""} day = {day} month= {props.month} year={props.year} />)}
             
             
        </div>
            
           
    )
}


export default MonthGrid; 