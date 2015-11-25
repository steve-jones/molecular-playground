CREATE OR REPLACE FUNCTION AddUser(firstName text, lastName text, email Text)
RETURNS int as $IDKey$
DECLARE
	IDKey int;
BEGIN
	SELECT MAX(ID) INTO IDKey FROM Users;
	IDKey := IDKey + 1;
	IF (IDKey IS NULL) THEN
		IDKey := 0;
	END IF;
	INSERT INTO Users VALUES (IDKey, firstName, lastName, email);
	RETURN IDKey;
END;
$IDKey$ LANGUAGE plpgsql;

