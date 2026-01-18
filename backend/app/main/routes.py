from flask import jsonify, request
from app import db
from app.main import bp
from app.main.helpers import format_date
from app.models import DiaryEntry, Todo
from datetime import datetime


@bp.route('/')
def home():
    return ("You are succesfully connected to the database")

@bp.route("/api/get_diary_entry/<year>/<month>/<day>/",  methods = ["GET"])
def get_diary_entry(year,month,day): 
    
   
    date_to_query = format_date(year, month, day)
    diary_entry = DiaryEntry.query.filter_by(date= date_to_query).first()
    diary_entry = diary_entry.to_json()
    return jsonify(diary_entry)


@bp.route('/api/edit_diary_entry/<year>/<month>/<day>/', methods = ["POST"])
def edit_day_entry(year,month,day):

    date_to_query = format_date(year,month,day)
    new_edited_title = request.form["dayTitle"]
    new_edited_content = request.form["dayContent"]
    diary_entry = DiaryEntry.query.filter_by(date= date_to_query).first()
    diary_entry.day_title = new_edited_title
    diary_entry.day_content = new_edited_content
    db.session.commit()
    
    
    return "Succesfully edited day entry"


# Todo routes
@bp.route("/api/todos/<year>/<month>/<day>/", methods=["GET"])
def get_todos(year, month, day):
    date_to_query = format_date(year, month, day)
    todos = Todo.query.filter_by(date=date_to_query).all()
    return jsonify([todo.to_json() for todo in todos])


@bp.route("/api/todos/", methods=["POST"])
def create_todo():
    data = request.json
    date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
    
    new_todo = Todo(
        date=date_obj,
        title=data['title'],
        completed=False
    )
    db.session.add(new_todo)
    db.session.commit()
    
    return jsonify(new_todo.to_json()), 201


@bp.route("/api/todos/<int:todo_id>/", methods=["PUT"])
def update_todo(todo_id):
    data = request.json
    todo = Todo.query.get(todo_id)
    
    if not todo:
        return jsonify({"error": "Todo not found"}), 404
    
    todo.title = data.get('title', todo.title)
    todo.completed = data.get('completed', todo.completed)
    db.session.commit()
    
    return jsonify(todo.to_json())


@bp.route("/api/todos/<int:todo_id>/", methods=["DELETE"])
def delete_todo(todo_id):
    todo = Todo.query.get(todo_id)
    
    if not todo:
        return jsonify({"error": "Todo not found"}), 404
    
    db.session.delete(todo)
    db.session.commit()
    
    return jsonify({"message": "Todo deleted"}), 200