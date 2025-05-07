// Months object 

// Check if a year is a leap year 
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


// Default is used only when you want to export one value.
export default isLeapYear;
