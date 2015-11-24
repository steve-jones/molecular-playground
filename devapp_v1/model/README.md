default is to the server, but you can try local by switching it on


//blank db link created for this project on my account -Yong
var connString = 'postgres://test:12345678@ct2bdiqosbcm.us-east-1.rds.amazonaws.com:5432/test

//using terminal to connect for debugging
//psql --host=test.ct2bdiqosbcm.us-east-1.rds.amazonaws.com --port=5432 --username=test --password --dbname=test


//local db , turn this on if you want to work offline
// you will need to load the local db script first
//var connString = 'postgres://test:test@localhost/molecular_db';
