import {React, useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom";
import { getDayPrefix } from "../../assets/data/calendar"
import TodosBox from "../calendar_components/TodosBox"



const getDateInfo = () => {
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    const monthIndex = currentDate.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return {
        currentYear: currentDate.getFullYear(),
        currentMonth: months[monthIndex],
        dayNumber: currentDate.getDate(),
        currentDay: daysOfTheWeek[dayIndex]
    };
};

function Home() {

    const navigate = useNavigate();
    const {currentYear, currentMonth, dayNumber, currentDay} = getDateInfo();
    const prefix = getDayPrefix(dayNumber);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.code === 'KeyE') {
                navigate(`/calendar/days/${currentYear}/${currentMonth}/${dayNumber}`);
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate, currentYear, currentMonth, dayNumber]);

    




    return (
        <div style ={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
       

        
            <h2 style={{textAlign: "center"}}> Today is {currentDay},  {currentMonth} {dayNumber}{prefix} {currentYear} </h2>

          


            <Link  className="edit-entry"  to={{pathname: `/calendar/days/${currentYear}/${currentMonth}/${dayNumber}`}}>
            <button className= "button-38">
            See contents  (Ctrl + E)
            </button>
            </Link>
            
           
          
      
        </div>

        
    )


}

export default Home