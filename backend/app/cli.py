
from flask import Blueprint
from datetime import date, timedelta
from app.models import DiaryEntry
from app import db
import click

bp = Blueprint('cli', __name__)

START_DATE = date(2000, 1, 1)
END_DATE = date(2100, 12, 31)



@bp.cli.command('create-db')
def init_database():
    db.create_all()
    click.echo("Succesfully created the database")


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


@bp.cli.command('/remove_table')
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
    
    