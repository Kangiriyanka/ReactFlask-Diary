from flask import Blueprint


bp = Blueprint('main', __name__)


# Packs the routes with the blueprint
from app.main import routes