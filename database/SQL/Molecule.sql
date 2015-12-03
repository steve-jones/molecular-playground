

CREATE TABLE Molecules (
	id SERIAL PRIMARY KEY,
	creator_userID INT NOT NULL REFERENCES Users(id),
	name TEXT NOT NULL,
	filepath TEXT NOT NULL UNIQUE,
	creation_day  INT NOT NULL CHECK(creation_day > 0) CHECK(creation_day <= 31),
	creation_month INT NOT NULL CHECK(creation_month > 0) CHECK(creation_month <= 12),
	creation_year INT NOT NULL CHECK(creation_year > 2000)
);



CREATE OR REPLACE FUNCTION create_molecule(creator_ID int, molecule_name text, path_to_file text, day int, month int, year int, pending_approval boolean)
RETURNS void as $$
DECLARE
BEGIN
	INSERT INTO Molecules VALUES
		(DEFAULT
		,creator_ID
		,molecule_name
		,path_to_file
		,day
		,month
		,year
		,pending_approval
		);
END;
$$ LANGUAGE plpgsql;

/* FIX THIS, IT WAS JUST COPIED AND PASTER FROM USERS.SQL */
CREATE OR REPLACE FUNCTION molecule_exists(molecule_id int)
RETURNS int AS $moleculeID$
DECLARE
	moleculeID int;
BEGIN
	SELECT id INTO moleculeID
	FROM Molecules WHERE
	id=molecule;
	RETURN userID;
END;
$userID$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION rename_molecule(mol_id int, new_name text)
RETURNS void AS $$
BEGIN
    UPDATE Molecules SET name=new_name
    WHERE id=mol_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION change_path(mol_id int, new_path text)
RETURNS void AS $$
BEGIN
    UPDATE Molecules SET filepath=new_path
    WHERE id=mol_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_molecule(molecule_id text)
RETURNS TABLE(molecule_id int, creatorID int, name text, filepath text, day int, month int, year int) AS $molecule$
BEGIN
	RETURN QUERY SELECT * FROM Molecules WHERE id=molecule_id;
END;
$user$ LANGUAGE plpgsql;