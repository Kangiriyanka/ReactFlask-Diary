from datetime import date


MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
def format_date(a_year, a_month, a_day): 
    
    # Cast the year and day parameters to integers
    # Use the indices of MONTHS list to get the appropriate month number.
    formatted_date = date(int(a_year), MONTHS.index(a_month) + 1, int(a_day))
  
    return formatted_date