CREATE TABLE Users (
	id INT PRIMARY KEY NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	role INT NOT NULL
);

CREATE OR REPLACE FUNCTION add_user(firstName text, lastName text, username text, password text, email text, role int)
RETURNS int as $IDKey$
DECLARE
	IDKey int;
BEGIN
	SELECT MAX(ID) INTO IDKey FROM Users;
	IDKey := IDKey + 1;
	IF (IDKey IS NULL) THEN
		IDKey := 0;
	END IF;
	INSERT INTO Users VALUES (IDKey, firstName, lastName, username, password, email, role);
	RETURN IDKey;
END;
/*this is still in progress*/
/*CREATE OR REPLACE FUNCTION update_profile(firstName text, lastName text, username text, password text, email text, role int)
RETURNS boolean as $updateSuccessful$
DECLARE
	updateSuccessful boolean;
BEGIN
	IF (text IS NOT NULL) THEN
		INSERT INTO Users VALUES (text);	
	END IF;
	
END;*/
$IDKey$ LANGUAGE plpgsql;
