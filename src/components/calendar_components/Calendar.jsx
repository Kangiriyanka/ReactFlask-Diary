import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import MonthGrid from "./MonthGrid.jsx"
import EmptyView from "../general_components/EmptyView.jsx"
import {getDayOfTheWeek, isLeapYear} from "../../assets/data/calendar.js"
import "../../assets/styles/calendar.scss"

function Calendar() {
    
    const date = new Date()
    const minYear = 2000;
    const maxYear = date.getFullYear()
    const {year, month} = useParams()
    const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const calendar = {
      "January": 31,
      "February": isLeapYear(year) ? 29 : 28,
      "March": 31,
      "April":  30,
      "May": 31,
      "June": 30,
      "July": 31,
      "August": 31,
      "September": 30,
      "October": 31,
      "November": 30,
      "December": 31,
  
  }
//   Hooks 
    const [months] = useState(Object.keys(calendar))
    const [index, setIndex] = useState(Object.keys(calendar).indexOf(month))
    const [currentMonth, setCurrentMonth] = useState(months[index])
    const [days, setDays] = useState([])
    const [firstDayOfTheMonth, setFirstDayOfTheMonth] = useState(0)
    const [currentYear, setCurrentYear] = useState(parseInt(year,10))

    // Whenever the month changes, update the days. 
    // [currentMonth] is what the hook is watching for.
    useEffect(() => {
        
        setFirstDayOfTheMonth(getDayOfTheWeek(currentYear, index))
        setDays(createDays(calendar[currentMonth] ));
    }, [currentMonth, currentYear]);

    // Validate the year and month
    function validateYear(year) {
        const yearNum = parseInt(year, 10);
        if (isNaN(yearNum)) {
            return false;
        }
        return yearNum >= minYear && yearNum <= maxYear;
    }

    function validateMonth(month) {
        if (Object.keys(calendar).includes(month)) {
            return true;
        }
        return false;

    }

// Ordinary functions

    function handleNextYear() {           
        
        if (currentYear + 1 > maxYear) {
            return;
        }
        setCurrentYear(currentYear + 1)
    
        
    }

    function handlePreviousYear() {

        if (currentYear -1 < minYear) {
            return ;
        }
        setCurrentYear(currentYear - 1)

    }


    if (!validateYear(year) || !validateMonth(month)) {
        return <EmptyView />;
    }

 
    

    // Returns an array of integers corresponding to the # of days in the given month
    function createDays(days_in_the_month) {

        let days = []
        for ( let i = 0 ; i < days_in_the_month; i++ ) {
            days[i] = i+1
        }

        return days
    }

   
    function changeMonth(newIndex) {
        setIndex(newIndex)
        setCurrentMonth(months[newIndex])


    }

    return (

        <div className= "calendar-container"> 
    
            <div className= "year-month-container">
                
            <div className= "previous-triangle" onClick ={handlePreviousYear} > </div> 
            <h1 style = {{color: "var(--custom-black)"}}> {currentYear} </h1>
         
            <div className= "next-triangle" onClick = {handleNextYear} >  </div> 

            </div>
         
            <div className = "months-container">
                {months.map((month, index) => (
                 
                    <div 
                    key={index} 
                    onClick = {() => changeMonth(index)} 
                    className={`month ${currentMonth === month ? 'active' : ''}`}>
                        {month}
                    </div>
                ))}
            </div>
    
            <div className= "day-of-week-container">
     
            {daysOfTheWeek.map((day, index) => (
                <div  key={index} className= "day-of-week">
                    {day}
                </div>
            ))}
           
            </div>
            <MonthGrid  key = {currentMonth} offset = {firstDayOfTheMonth} month= {currentMonth} days={days} year={currentYear} />
           
            
            
            
         
            
        </div>

    )
}

export default Calendar;