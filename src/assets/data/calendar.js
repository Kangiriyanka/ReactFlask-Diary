
export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Pass the date as a string in the format "YYYY-MM-DD you silly goose 
export function getDayOfTheWeek(year, month) {

    const date = new Date(year, month , 1);
    return date.getDay();
}

