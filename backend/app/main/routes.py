from flask import jsonify, request
from app import db
from app.main import bp
from app.main.helpers import format_date
from app.models import DiaryEntry


@bp.route('/')
def home():
    return ("You are succesfully connected to the database")

@bp.route("/get_diary_entry/<year>/<month>/<day>/",  methods = ["GET"])
def get_diary_entry(year,month,day): 
    
    date_to_query = format_date(year, month, day)
    diary_entry = DiaryEntry.query.filter_by(date= date_to_query).first()
    diary_entry = diary_entry.to_json()
   
    return jsonify(diary_entry)


@bp.route('/edit_diary_entry/<year>/<month>/<day>/', methods = ["POST"])
def edit_day_entry(year,month,day):
    
    date_to_query = format_date(year,month,day)
    print("WE HERE")
    new_editted_title = request.form["dayTitle"]
    new_editted_content = request.form["dayContent"]
    print(new_editted_content)
    diary_entry = DiaryEntry.query.filter_by(date= date_to_query).first()
    diary_entry.day_title = new_editted_title
    
    diary_entry.day_content = new_editted_content
    db.session.commit()
    
    
    return "Succesfully edited day entry"



    