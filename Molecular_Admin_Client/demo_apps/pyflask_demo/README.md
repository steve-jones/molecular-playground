Folder overview:
Python Flask web apps are structured into three simple parts
1) app.py -- we can think of this file located in the root dir. as int main() from c/c++
2) templates -- directory which holds our views. they are contain .html files. the .html files can render dynamic
content by placing "{{ }}" around a variable name anywhere in file.
3) static -- directory which holds files which will not change such as css files or images or more python code. such files can be considered static.

Getting started:
begin by tracing through the code's comments in app.py
psqldb.py is the py which interfaces with our PostgreSQL db through its connection string
to run the code locally through the py interpreter, type: python app.py

Dependencies:
The only setup that needs to occur is hooking in our dependencies -- files our web app depends on to run.
Because flask and psqldb are not native libaries they must be downloaded to your local machine.
on mac os x (and linux): run python setup.py install after download

note: this application is using a cloud based PostgreSQL db deployed to heroku (part of the AWS family).
because of this, we can run all our commands to the db by interfacing with it through web service calls.
this convenience cuts the need to setup local dbs.

any questions, pls let me know.

-phil
