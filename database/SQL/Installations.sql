
CREATE TABLE Installations (
	installation_id SERIAL PRIMARY KEY,
	city TEXT NOT NULL,
	country TEXT NOT NULL,
	school_affliation TEXT NOT NULL,
	local_admin_id INT  NOT NULL REFERENCES Users(id),
	delegate_list INT[] NOT NULL, 
	is_online BOOLEAN NOT NULL,
	last_data_update INT NOT NULL,
	GPS_location_x INT NOT NULL,
	GPS_location_y INT NOT NULL
);

/*complete*/
CREATE OR REPLACE FUNCTION public.get_installations()
RETURNS TABLE(id INT, City TEXT, Country TEXT,
	SchoolAffliation TEXT, LocalAdminId INT, DelegateList INT[], Online BOOLEAN,
	LastDataUpdate INT, GPSLocationX INT, GPSLocationY INT) 
AS $all_installations$
BEGIN
	RETURN QUERY SELECT * FROM installations;
END;
$all_installations$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.installation_exists(installationCheck int)
RETURNS int AS $installationID$
DECLARE
	installationID int;
BEGIN
	SELECT installation_id INTO installationID
	FROM installations WHERE
	installation_id=installationCheck;
	RETURN installationID;
END;
$installationID$ LANGUAGE plpgsql;

/*complete*/
CREATE OR REPLACE FUNCTION public.add_installation(City TEXT, Country TEXT,
	SchoolAffliation TEXT, LocalAdminId INT, DelegateList INT[], Online BOOLEAN,
	LastDataUpdate INT, GPSLocationX INT, GPSLocationY INT)
RETURNS void as $$
BEGIN
	INSERT INTO installations VALUES(DEFAULT
	,City
	,Country
	,SchoolAffliation
	,LocalAdminId
	,DelegateList
	,Online
	,LastDataUpdate
	,GPSLocationX
	,GPSLocationY);
END;
$$ LANGUAGE plpgsql;


/*complete*/
CREATE OR REPLACE FUNCTION public.delete_installation(installationID INT)
RETURNS void AS $$
BEGIN
 	DELETE FROM installations WHERE installation_id=installationID;
END;
$$ LANGUAGE plpgsql;

/*complete*/
CREATE OR REPLACE FUNCTION public.disable_installation(installationID INT)
RETURNS void AS $$
BEGIN
 	UPDATE installations SET is_online=false WHERE installation_id=installationID;
END;
$$ LANGUAGE plpgsql;

/*complete*/
CREATE OR REPLACE FUNCTION public.get_local_delegates(installationID INT)
RETURNS INT[]
AS $all_delegates$
DECLARE 
	delegate_array int[];
BEGIN
	SELECT delegate_list into delegate_array FROM installations WHERE installation_id=installationID;
	RETURN delegate_array;
END;
$all_delegates$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_local_admin(installationID INT, localAdminId INT)
RETURNS void AS $$
BEGIN
    UPDATE installations
    SET local_admin_id=localAdminId
    WHERE installation_id=installationID;
END;
$$ LANGUAGE plpgsql;

/*complete*/
CREATE OR REPLACE FUNCTION public.add_local_delegate(installationID INT, delegateID INT)
Returns void AS $$
DECLARE 
	delegate_array int[];
BEGIN
	SELECT delegate_list into delegate_array FROM installations WHERE installation_id=installationID;
	delegate_array = array_append(delegate_array, delegateID);
	UPDATE installations SET delegate_list = delegate_array WHERE installation_id=installationID;
END;
$$
LANGUAGE plpgsql;

/*complete*/
CREATE OR REPLACE FUNCTION public.remove_local_delegate(installationID INT, delegateID INT)
Returns void AS $$
DECLARE 
	delegate_array int[];
BEGIN
	SELECT delegate_list into delegate_array FROM installations WHERE installation_id=installationID;
	delegate_array = array_remove(delegate_array, delegateID);
	UPDATE installations SET delegate_list = delegate_array WHERE installation_id=installationID;
END;
$$ LANGUAGE plpgsql;