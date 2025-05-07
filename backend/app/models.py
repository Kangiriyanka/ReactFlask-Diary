
from app import db

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
    
    
