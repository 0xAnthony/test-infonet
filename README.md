# Infonet's technical tests

# Commands

Start server : `npm run start`
Import data from API : `npm run starwars:import`
Test database connection : `npm run db:test`

# Start database
Build container :
`docker build -t my-mysql .`

Run container : 
`docker run -dit --name mydb -p 3306:3306 my-mysql`


# Additional informations
I commited .env but we should avoid it and just commit a .env.example with placeholder data. I did it just for the test purpose

I got some problems running a mysql server on docker. For some reasons it didn't accepted my password and database name I was sending as env variable.

I didn't had time to implement db creation so we have to assume it alread exists with the correct structure.

I also didn't had time to implement an auth system but we should keep in mind that some routes shouldn't remain accessible such as CREATE, UPDATE and DELETE.