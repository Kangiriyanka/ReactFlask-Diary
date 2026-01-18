from app import db
from datetime import datetime

# nullable means that the column can't be empty
class DiaryEntry(db.Model):
    __tablename__ = "diary_entries"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=False)
    day_title = db.Column(db.String(100))
    day_content = db.Column(db.Text)
    
    def to_json(self):
        return {
            "id": self.id,
            "date": self.date,
            "day_title": self.day_title,
            "day_content": self.day_content
        }


class Todo(db.Model):
    __tablename__ = "todos"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
  
    
    def to_json(self):
        return {
            "id": self.id,
            "date": self.date,
            "title": self.title,
            "completed": self.completed
        }
    
