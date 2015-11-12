So to install this, you should first install the Mono runtime: http://www.mono-project.com/download/

Then also install MonoDevlop (XarminStudio): http://www.monodevelop.com/download/

You will also need Postgres installed and have a database set up. I named my database test with the username jim and password test2. I have a single table called Table1 in it with a primary key of type int called ID, a Text field called NAME, and an int field called AGE. The Postgres commands should be something like:
CREATE DATABASE test;
\connect test;
CREATE USER jim WITH SUPERUSER PASSWORD 'test2'
CREATE TABLE Table1 (
	ID INT PRIMARY KEY NOT NULL,
	NAME TEXT NOT NULL,
	AGE INT NOT NULL);
INSERT INTO Table1 (ID, NAME, AGE) VALUES (1, 'Jim Calabro', 21);

And that should do it.




To run the site, open the solution (.sln) file in Xarmin studio, open up the Default.aspx document in the editor and press the start button. It should launch the page in your default browser and you should be good to go.