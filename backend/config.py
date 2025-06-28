import os
from dotenv import load_dotenv

# Get the directory of the config file - In python, __file__ is the absolute path of the file.
basedir = os.path.abspath(os.path.dirname(__file__))
# Now the keys in your .env file are accessible with .environ
load_dotenv(os.path.join(basedir, '.env'))


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or 'you will never conquer my terminal, s/o to Mr. Grinberg '
    SQLALCHEMY_DATABASE_URI  =  os.environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.environ.get("DATABASE_TRACKING")


