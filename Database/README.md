Installation
------------

Before you can run this test you must donwload python 2.7,
postgres 9.3, and psycopg2 from initd.org/psycopg/download/.
This library is what allows us to communicate to postgres
through python. Also if you try and do this on a windows machine you are going to have a hard time so i recommend downloading all of this on a mac or linux based operating system. I set a vm with ubuntu on it to run my test and it works quite well.

Postgres Tutorial
------------
If you want to manually go into the postgres databases and insert and delete from there or to check that the code worked you can run sudo -u postgres psql to access postgres and then \connect youDB Name

Test.py Code
------------
The psycopg2 library will allow you to connect to a database
and execute postgres commands such as create, insert, and delete from a table to name a few. In test.py I open a connection to the postgres db called test and then i call a function to create a table if it doesn't already exist, insert data into that table and print the current values of that table. This code is nothing special it is just being used to show that this can be done if we choose these languages.
