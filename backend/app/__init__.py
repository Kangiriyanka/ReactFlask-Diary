
from flask import Flask
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config

db = SQLAlchemy()
cors = CORS()
migrate = Migrate()

# Application Factory
def create_app(config_class = Config):
    
    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)

    
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.cli import bp as cli_bp
    app.register_blueprint(cli_bp)

  
  
    return app

# SQLAlchemy needs to know about the models
from app import models