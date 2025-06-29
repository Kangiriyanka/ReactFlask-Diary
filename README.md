
# Usage Guide

## 1. Setup the environments

In the root of your project folder, enter the following commands in your terminal.

```
npm install 
npm run create-venv   
npm run create-env
```


1. create-venv creates a virtual environment and installs all backend dependencies.
2. create-env  generates a template .env file with fields to fill in.

### .env 
You must manually fill in your own SECRET_KEY and DATABASE_URL.

Note: Installing the actual database server (e.g., sqlite, PostgreSQL) is outside the scope of this guide.


```
SECRET_KEY=                     # Example: (Shh.. it's a secret)
DATABASE_URL=                   # Example: sqlite:///diary.db
DATABASE_TRACKING=False
FLASK_APP=diary.py
FLASK_ENV=development

```



## 2. Setup the database

Once you've properly set up your database URL and secret key,  you can create and populate the database. Run:
 
```bash
cd backend && flask cli create-db && flask cli populate-days
```


The populate-days command inserts all dates from the year 2000 to 2100 in the diary_entries table.  
You can change the date range in backend/cli.py. Additional CLI commands are also available in that file.

```python
#cli.py

# Customize the range
START_DATE = date(2000, 1, 1) 
END_DATE = date(2100, 12, 31)

# The only table created is "diary_entries"
@bp.cli.command('create-db')
def init_database():
    db.create_all()
    click.echo("Succesfully created the database")

# And more...


```



## 3. Run the application

Once everything is set up, run in two separate terminals:
```
npm run dev
```
```
npm run backend
```

and you'll be all set.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
