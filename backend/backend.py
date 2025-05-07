
from datetime import date, timedelta
from flask import Flask, request, jsonify  
from flask_sqlalchemy import SQLAlchemy  
from flask_cors import CORS   


MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
# Modifications for date, 
START_DATE = date(2021, 1, 1)
END_DATE = date(2024, 12, 31)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydiary.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
cors = CORS(app)

 

# Tables 
class DiaryEntry(db.Model):
    __tablename__ = "diary_entries"
    date = db.Column(db.Date,  primary_key= True )
    day_title = db.Column(db.String(100))
    day_content = db.Column(db.Text)
    
    def to_json(self):
        return {
            "date": self.date,
            "day_title": self.day_title,
            "day_content":  self.day_content
            
        }
    


# Helper functions
# Format the date 
def formatDate(a_year, a_month, a_day): 
    
    # Cast the year and day parameters to integers
    # Use the indices of MONTHS list to get the appropriate month number.
    formatted_date = date(int(a_year), MONTHS.index(a_month) + 1, int(a_day))
  
    return formatted_date


# Routes

@app.route('/')
def home():
    return ("You are succesfully connected to the database")


@app.route('/create_all_tables')
def init_database():
    db.create_all()
    return "Successfully created all the tables"



@app.route('/populate')
def create_days():
    start_date = START_DATE
    end_date = END_DATE
    current_date = start_date
    
    
    while current_date <= end_date: 
        try: 
            new_entry = DiaryEntry(date= current_date, day_title = "default_title", day_content= "default_content")
            db.session.add(new_entry)
    
            current_date += timedelta(days=1)
            
        except Exception as e:
            return f"An exception has been occured {str(e)}"
        
        
    db.session.commit()
    
    return "Successfully added all the dates"




@app.route("/get_diary_entry/<year>/<month>/<day>/",  methods = ["GET"])
def get_diary_entry(year,month,day): 
    
    date_to_query = formatDate(year, month, day)
    diary_entry = DiaryEntry.query.filter_by(date= date_to_query).first()
    diary_entry = diary_entry.to_json()
   
    return jsonify(diary_entry)


@app.route('/edit_diary_entry/<year>/<month>/<day>/', methods = ["POST"])
def edit_day_entry(year,month,day):
    
    date_to_query = formatDate(year,month,day)
    
    new_editted_title = request.form["dayTitle"]
    new_editted_content = request.form["dayContent"]
    
    diary_entry = DiaryEntry.query.filter_by(date= date_to_query).first()
    print(diary_entry)
    diary_entry.day_title = new_editted_title
    
    diary_entry.day_content = new_editted_content
    db.session.commit()
    
    
    return "Succesfully edited day entry"



    
    