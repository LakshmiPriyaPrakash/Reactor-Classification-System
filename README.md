# Getting Started Reactor Classification App

Watch app demo video at: https://www.loom.com/share/fa7f1463e2a248b0933cebe8b887c5cc

After cloning the repo to your system, follow the below steps to install requirements and start the app.

## BACKEND: flask-server

Open a terminal and `cd` into flask-server directory

**STEP 1:** create user, password, and database in PostgreSQL

*Example:*

`CREATE USER reac_user WITH PASSWORD 'password' CREATEDB;`

`CREATE DATABASE reactor WITH OWNER reac_user;`

Executing the above two commands in psql on the command line would have created the user, password, and database.

**STEP 2:** create `.env` file

- cd into flask-server directory
- create a `.env` file in the root of flask-server directory
- copy contents of `.env.example` file to `.env` file
- change `DATABASE_URL` to the username, password, and database you create in PostgreSQL

*using example from step 1:*

`DATABASE_URL=postgresql://reac_user:password@localhost/reactor`

**STEP 3:** In terminal, enter commands:

`pipenv install -r requirements.txt`

`pipenv shell`

`flask db upgrade`

`flask seed all`

**STEP 4:** once the tables have been populated, enter the command `flask run` to start server.

Data from server is available at http://localhost:5000/


## FRONTEND: react-app

**STEP 1:** open another terminal and `cd` into react-app directory

**STEP 2:** in terminal enter command `npm install` to install requirements

**STEP 3:** start the server by entering command `npm start`

The application would run at http://localhost:3000/

You can classify the reactor images as foaming or non-foaming and the classification will be saved in the database.

To start the servers anytime after the requirements are installed:

**flask-server:**

`pipenv shell`

`flask run`

**react-app:**

`npm start`


