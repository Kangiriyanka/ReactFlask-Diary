
export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


// For the given year and month, 
export function getDayOfTheWeek(year, month) {

    const date = new Date(year, month , 1);
    return date.getDay();
}

export function getToday() {
    const today = new Date()
    return today;
}

export function getDayPrefix(a_day) {

      
    const firsts = /[1]$/;
    const seconds = /[2]$/;
    const thirds = /[3]$/;

    if (firsts.exec(a_day) && a_day !== "11") {
        return "st";
    }

    else if  (seconds.exec(a_day) && a_day !== "12" )  {
        return "nd";
    }

    else if  (thirds.exec(a_day) && a_day !== "13") {
        return "rd";
    }

    else {
        return "th"
    }



}

