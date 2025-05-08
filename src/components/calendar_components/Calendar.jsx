import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import MonthGrid from "./MonthGrid.jsx"
import EmptyView from "../general_components/EmptyView.jsx"
import {getDayOfTheWeek, isLeapYear} from "../../assets/data/calendar.js"
import "../../assets/styles/calendar.scss"

function Calendar() {

    const minYear = 2000;
    const maxYear = 2100;
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
    const [months] = useState(Object.keys(calendar))
    const [index, setIndex] = useState(Object.keys(calendar).indexOf(month))
    const [currentMonth, setCurrentMonth] = useState(months[index])
    const [days, setDays] = useState([])
    const [firstDayOfTheMonth, setFirstDayOfTheMonth] = useState(0)

    // Whenever the month changes, update the days. 
    // [currentMonth] is what the hook is watching for.
    useEffect(() => {
        
        setFirstDayOfTheMonth(getDayOfTheWeek(year, index))
        setDays(createDays(calendar[currentMonth] ));
    }, [currentMonth]);

   
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

    // Whenever the month changes, update the days, if it's an empty array, it will only run once when the components mounts.
 
    /**
     * Sets the calendar to the next month.
     *
     * - Increments the `index` state by 1.
     * - Prevents incrementing if the index is already at the last month.
     * - Updates the current month based on the new index.
     */
    function handleNextMonth() {
        
        let newIndex = index + 1 
       
        if (newIndex > months.length - 1) {
            return;

        }

        setIndex(newIndex)
        setCurrentMonth(months[newIndex])


    }


    /**
     * Sets the calendar to the previous month.
     *
     * - Decrements the `index` state by 1.
     * - Prevents decrementing if the index is already at the month.
     * - Updates the current month based on the new index.
     */
    function handlePreviousMonth() {
   
        let newIndex = index - 1 
       
        if (newIndex < 0)  {
            return;
        }
        setIndex(newIndex)
        setCurrentMonth(months[newIndex])
    }

  

    return (

        <div className= "calendar-container"> 
    
            <div className= "year-month-container">
            <h2> {year} </h2>
            <h1 onClick={handleNextMonth}>  {currentMonth}  </h1>
            
            </div>
            <div className= "buttons-container">
            <div className= "previous-triangle" onClick= {handlePreviousMonth}> </div> 
            <div className= "next-triangle" onClick= {handleNextMonth}>  </div> 
          
            </div>
            <div className= "day-of-week-container">
            {daysOfTheWeek.map((day, index) => (
                <div  key={index} className= "day-of-week">
                    {day}
                </div>
            ))}
           
            </div>
            <MonthGrid  key = {currentMonth} offset = {firstDayOfTheMonth} month= {currentMonth} days={days} year={year} />
            
            
            
            
         
            
        </div>

    )
}

export default Calendar;