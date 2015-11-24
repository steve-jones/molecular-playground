
drop database if exists molecular_db;
create database molecular_db;
\c molecular_db;

drop user if exists test;
create user test with password 'password' SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN;
GRANT ALL PRIVILEGES ON DATABASE molecular_db to test;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO test;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO test;

create type level as enum ('Freshman', 'Sophomore', 'Junior', 'Senior');
create type grade as enum ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F');
create type sem as enum ('Fall', 'Spring', 'Summer');
create type offered as enum ('Fall', 'Spring', 'Summer', 'Fall/Spring', 'Fall/Summer', 'Spring/Summer', 'Fall/Spring/Summer');
create type track as enum ('General Computer Science', 'Software Engineering', 'Security & Privacy', 'Robotics, Vision, and Graphics', 'Artificial Intelligence', 'Computer Architecture', 'Networking', 'Software Systems', 'Programming Languages & Compiler', 'Theory of Computation', 'Search & Data Mining');

create table students (
	id varchar(25),
	password varchar(25),
	firstname varchar(50),
	lastname varchar(50),
	year level,
	schoolorg varchar(100),
	gpa decimal,
	trackid varchar(50),
	primary key (id)
);

create table admins (
	id varchar(16),
	password varchar(25),
	firstname varchar(50),
	lastname varchar(50),
	isadminfor varchar(50)
);

create table coursecatalog (
	coursenumber varchar(20),
	coursename varchar(100),
	credits int,
	semestersoffered offered,
	instructor varchar(50),
	primary key (coursenumber)
);

create table prerequisites (
	coursenumber varchar(6),
	prereq varchar(6)
);

create table studentschedule (
	studentid varchar(25),
	coursenumber varchar(25),
	term varchar(20),
	instructor varchar(50)
);
