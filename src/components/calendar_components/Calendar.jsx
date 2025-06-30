import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import MonthGrid from "./MonthGrid.jsx"
import EmptyView from "../general_components/EmptyView.jsx"
import CommandBox from '../calendar_components/CommandBox.jsx'
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
    const months = Object.keys(calendar)
    const [index, setIndex] = useState(Object.keys(calendar).indexOf(month))
    const [currentMonth, setCurrentMonth] = useState(months[index])
    const [currentYear, setCurrentYear] = useState(parseInt(year,10))
    const [days, setDays] = useState([])
    const [firstDayOfTheMonth, setFirstDayOfTheMonth] = useState(0)

    

    // Whenever the month changes, update the days. 
    // [currentMonth] is what the hook is watching for.
    useEffect(() => {
        setFirstDayOfTheMonth(getDayOfTheWeek(currentYear, index))
        setDays(createDays(calendar[currentMonth] ));
    }, [currentMonth, currentYear]);

    useEffect(() => {
        const numberRowMap = {
            "Digit1": 0,
            "Digit2": 1,
            "Digit3": 2,
            "Digit4": 3,
            "Digit5": 4,
            "Digit6": 5,
            "Digit7": 6,
            "Digit8": 7,
            "Digit9": 8,
            "Digit0": 9,
            "Minus": 10,
            "Equal": 11
          };
        const handleKeyDown = (e) => {
            console.log(e.key,e.code)
            // 1 is  (1 , Digit1)
          if (e.code === 'ArrowLeft') {
            handlePreviousYear()
          } else if (e.code === 'ArrowRight') {
            handleNextYear()
            
          } else if (numberRowMap.hasOwnProperty(e.code)) {
             //e.code is a string 
            
             changeMonth(numberRowMap[e.code])
          

        }
    }
        // Remove the listener when you're done pressing
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup function when the component unmounts 
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, []);

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
        setCurrentYear(prev => {
            if (prev + 1 > maxYear) return prev;
            return prev + 1;
        });
    }

    function handlePreviousYear() {
        setCurrentYear(prev => {
            if (prev - 1 < minYear) return prev;
            return prev - 1;
        });
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
         <CommandBox/>
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