from app import db

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