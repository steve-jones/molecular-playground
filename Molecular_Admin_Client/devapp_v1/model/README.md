connect to db from terminal to live db

$ psql --host=test.ct2bdiqosbcm.us-east-1.rds.amazonaws.com --port=5432 --username=test --password --dbname=test
when promt for password is 12345678


*****************************
first you need to run the script to load the local db
$ sh init_local-db.sql

login to local db
$ psql molecular_db -U test



when inside your data base here are some helpful command
psql$ \d	this list all the tables in your db
psql$ \du	list all the user created in the local system
psql$ \l	list of all the databases in your local postgres


simple query:
psql$ select * from tablename; 	replace tablename with one of the tables