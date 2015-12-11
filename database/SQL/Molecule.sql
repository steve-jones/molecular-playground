
CREATE TABLE Molecules (
	id SERIAL PRIMARY KEY,
	creator_userID INT NOT NULL REFERENCES Users(id),
	name TEXT NOT NULL,
	filepath TEXT NOT NULL UNIQUE,
	creation_day  INT NOT NULL CHECK(creation_day >= 0) CHECK(creation_day <= 31),
	creation_month INT NOT NULL CHECK(creation_month >= 0) CHECK(creation_month <= 12),
	creation_year INT NOT NULL CHECK(creation_year >= 2000),
	approval_status BOOLEAN NOT NULL
);



CREATE OR REPLACE FUNCTION public.create_molecule(creator_ID int, molecule_name text, path_to_file text, day int, month int, year int, pending_approval boolean)
RETURNS int as $molID$
DECLARE
	molID int;
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
	SELECT max(id) INTO molID FROM Molecules;
	RETURN molID;
END;
$molID$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.molecule_exists(moleculePath_check text)
RETURNS int AS $moleculeID$
DECLARE
	moleculeID int;
BEGIN
	SELECT id INTO moleculeID
	FROM Molecules WHERE
	filepath=moleculePath_check
	;
	RETURN moleculeID;
END;
$moleculeID$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.get_molecule(molecule_id int)
 RETURNS TABLE(moleculeID integer, creatorid integer, name text, filepath text, day integer, month integer, year integer, approvalStatus boolean)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY SELECT * FROM Molecules WHERE id=molecule_id;
END;
$function$

CREATE OR REPLACE FUNCTION public.get_molecules()
RETURNS TABLE(id INT
	,creatorUserID INT
	,name TEXT
	,filePath TEXT
	,day INT
	,month  INT
	,year INT
	,approvalStatus BOOLEAN) AS $all_molecules$
BEGIN
	RETURN QUERY SELECT * FROM molecules;
END;
$all_molecules$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.rename_molecule(mol_id int, new_name text)
RETURNS void AS $$
BEGIN
    UPDATE Molecules SET name=new_name
    WHERE id=mol_id
    ;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.change_path(mol_id int, new_path text)
RETURNS void AS $$
BEGIN
    UPDATE Molecules SET filepath=new_path
    WHERE id=mol_id
    ;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.change_approval_status(mol_id int, new_approval_status boolean)
RETURNS void AS $$
BEGIN
    UPDATE Molecules SET approval_status=new_approval_status
    WHERE id=mol_id
    ;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.get_molecule(molecule_id text)
RETURNS TABLE(molecule_id int, creatorID int, name text, filepath text, day int, month int, year int) AS $molecule$
BEGIN
	RETURN QUERY SELECT * FROM Molecules WHERE id=molecule_id
	;
END;
$user$ LANGUAGE plpgsql;
