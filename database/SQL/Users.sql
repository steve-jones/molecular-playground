
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
$IDKey$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION user_exists(usernameCheck text)
RETURNS int AS $userID$
DECLARE
	userID int;
BEGIN
	SELECT id INTO userID FROM Users WHERE username=usernameCheck;
	RETURN userID;
END;
$userID$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_email(new_username text, new_email text)
RETURNS void AS $$
BEGIN
    UPDATE users SET email=new_email WHERE username=new_username;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION remove_user(current_username text)
RETURNS void AS $$
BEGIN
    DELETE FROM users WHERE username=current_username;
END;
$$ LANGUAGE plpgsql;

