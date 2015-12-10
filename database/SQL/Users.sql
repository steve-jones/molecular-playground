
CREATE TABLE Users (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	role INT NOT NULL
);



CREATE OR REPLACE FUNCTION public.add_user(firstName text, lastName text, username text, password text, email text, role int)
RETURNS void as $$
DECLARE
BEGIN
	INSERT INTO Users VALUES
		(DEFAULT
		,firstName
		,lastName
		,username
		,password
		,email
		,role);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.user_exists(usernameCheck text)
RETURNS int AS $userID$
DECLARE
	userID int;
BEGIN
	SELECT id INTO userID
	FROM Users WHERE
	username=usernameCheck;
	RETURN userID;
END;
$userID$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.update_email(new_username text, new_email text)
RETURNS void AS $$
BEGIN
    UPDATE users SET email=new_email
    WHERE username=new_username;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_password(current_username text, new_password text)
RETURNS void AS $$
BEGIN
    UPDATE users SET password=new_password
    WHERE username=new_username;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_name(current_username text, new_first text, new_last text)
RETURNS void AS $$
BEGIN
    UPDATE users
    SET first_name=new_first
    ,last_name=new_last
    WHERE username=current_username;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.remove_user(current_username text)
RETURNS void AS $$
BEGIN
    DELETE FROM users WHERE username=current_username;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_role(current_username text, new_role int)
RETURNS void AS $$
BEGIN
	IF new_role < 0 OR new_role > 4 THEN
		RETURN;
	END IF;
    UPDATE users SET role=new_role
    WHERE username=current_username;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.get_user_by_username(username_check text)
 RETURNS TABLE(id integer, firstName text, lastName text, uname text, password text, email text, role int)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY SELECT * FROM Users WHERE username=username_check;
END;
$function$


