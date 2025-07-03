
from flask import Flask
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS  
from config import Config
db = SQLAlchemy()
cors = CORS()

# Application Factory called from diary.py
def create_app(config_class = Config):

    # __name__ is app 
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Pair our app with DB and CORS
    db.init_app(app)
    cors.init_app(app)

    # This connects all the functionality inside main_bp to app
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    # Same here.
    from app.cli import bp as cli_bp
    app.register_blueprint(cli_bp)

    return app


# This is in the bottom, because only once db is created can we 
# create models ModelName(db.Model)
from app import models