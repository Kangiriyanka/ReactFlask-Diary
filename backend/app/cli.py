
from flask import Blueprint
from datetime import date, timedelta
from app.models import DiaryEntry
from app import db
import click
import sqlite3
import os
import re
import html

# See https://docs.python.org/3/library/sqlite3.html

bp = Blueprint('cli', __name__)

START_DATE = date(2000, 1, 1)
END_DATE = date(2100, 12, 31)

# Change this according to your actual hiearchy
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "instance", "diary.db")




   

# The only table created is "diary_entries"
@bp.cli.command('create-db')
def init_database():
    db.create_all()
    click.echo("Succesfully created the database")




def clean_text(text, keyword):

    """HTML String Cleaner"""
    pattern = r"\\r|\\n"   
    cleaned_text = re.sub(pattern, '', text)
    cleaned_text = html.unescape(cleaned_text)
    sentences = re.split(r'(?<=[.!?])\s+', cleaned_text)
    return [s for s in sentences if keyword.lower() in s.lower()]
    



@bp.cli.command("pattern")
def query_content():
    """Search diary entries for a given keyword.
    Option 1: return only the date  
    Option 2: return the full content
    """

    search_pattern = input("Enter string pattern: ")
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()

    # Note: Different type of quotes if you wanna use strings inside {}
    sqlite_query = f"""
            SELECT date, day_title, day_content
            FROM diary_entries
            WHERE day_content LIKE "%{search_pattern}%"
            """
 
    
    click.echo(f"Querying for pattern: {search_pattern}")
    rows = cur.execute(sqlite_query)
    for row in rows:
        date, title, content = row
        print(f"Date: {date}, Title: {title} \n\n")

        matches = clean_text(content, search_pattern)
        for sentence in matches:
            print(sentence)

        print("\n" + "-"*40 + "\n")

    
    con.close()
        
    




@bp.cli.command("populate-days")
def populate_days():
    """Populate the database with diary entries between 2000 and 2100"""
    start_date = START_DATE
    end_date = END_DATE
    current_date = start_date
    
    click.echo("Populating diary entries... ")
    
    while current_date <= end_date: 
        try: 
            new_entry = DiaryEntry(date= current_date, day_title = "default_title", day_content= "default_content")
            db.session.add(new_entry)
            current_date += timedelta(days=1)
            
        except Exception as e:
            click.echo(f"An exception has occured: {str(e)}")
        
        
    db.session.commit()
    click.echo("Succesfully added all the dates")


@bp.cli.command('/drop-table')
@click.argument('table_name')
def drop_table(table_name):
    try:
        table = db.Model.metadata.tables[table_name]
        table.drop(db.engine)
        click.echo("Successfully deleted table {table_name}.")
    except Exception as e:
     
         click.echo(f"An exception has occured: {str(e)}")


@bp.cli.command('drop-tables')
def drop_all_tables():
    try:
      
        db.metadata.drop_all(db.engine)
        click.echo("Successfully dropped all tables")
    except Exception as e:
     
        click.echo(f"An exception has occured: {str(e)}")
    
    