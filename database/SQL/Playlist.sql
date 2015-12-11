
/*current table*/
CREATE TABLE Playlists (
	playlist_id SERIAL NOT NULL,
	name TEXT NOT NULL,
	playlist_creator INT NOT NULL REFERENCES Users(id),
	molecule_ids INT[] NOT NULL 
	installation_id INT NOT NULL REFERENCES Installations(id),
	start_time INT NOT NULL,
	start_date  INT NOT NULL,
	stop_date INT NOT NULL,
	end_time INT NOT NULL,
	is_playing BOOLEAN NOT NULL
);

/*completed*/
CREATE OR REPLACE FUNCTION public.get_playlist()
RETURNS TABLE(id INT
	,playlist_name TEXT
	,playlist_creator INT
	,molecule_scripts INT[]
	,installation_id INT
	,start_time INT
	,start_date  INT
	,stop_date INT
	,end_time INT,
	is_playing BOOLEAN) AS $all_playlists$
BEGIN
	RETURN QUERY SELECT * FROM playlists;
END;
$all_playlists$ LANGUAGE plpgsql;

/*complete*/
CREATE OR REPLACE FUNCTION public.get_specific_playlist(playlistID INT)
RETURNS TABLE(id INT 
	,playlist_name TEXT
	,playlist_creator INT
	,molecule_scripts INT[]
	,installation INT
	,start_time INT
	,start_date  INT
	,stop_date INT
	,end_time INT
	,is_playing BOOLEAN) 
AS $one_playlists$
BEGIN
	RETURN QUERY SELECT * FROM playlists WHERE playlist_id=playlistID;
END;
$one_playlists$ LANGUAGE plpgsql;



/*complete*/
CREATE OR REPLACE FUNCTION public.create_playlist(playlist_name TEXT, playlist_creator INT 
	,molecule_ids INT[], installation INT, start_time INT, start_date  INT, stop_date INT 
	,end_time INT, is_playing BOOLEAN)
RETURNS void as $$
BEGIN
	INSERT INTO playlists VALUES(
	 DEFAULT
	,playlist_name
	,playlist_creator
	,molecule_ids
	,installation
	,start_time
	,start_date
	,stop_date
	,end_time
	,is_playing);
END;
$$ LANGUAGE plpgsql;


/*comlpete*/
CREATE OR REPLACE FUNCTION public.add_to_playlist(playlistID INT, molecule_id INT)
RETURNS void AS $$
DECLARE 
	molecule_array int[];
BEGIN
	SELECT molecule_ids into molecule_array FROM playlists WHERE playlist_id=playlistID;
	molecule_array = array_append(molecule_array, molecule_id);
	UPDATE playlists SET molecule_ids = molecule_array WHERE playlist_id=playlistID; 
END;
$$ LANGUAGE plpgsql;

/*complete*/
CREATE OR REPLACE FUNCTION public.remove_playlist(playlistID INT)
RETURNS void AS $$
BEGIN
 	DELETE FROM playlists WHERE playlist_id=playlistID;
END;
$$ LANGUAGE plpgsql;


/*complete*/
CREATE OR REPLACE FUNCTION public.remove_molecule_from_playlist(playlistID INT, molecule_id INT)
RETURNS void AS $$
DECLARE 
	molecule_array int[];
BEGIN
	SELECT molecule_ids into molecule_array FROM playlists WHERE playlist_id=playlistID;
	molecule_array = array_remove(molecule_array, molecule_id);
	UPDATE playlists SET molecule_ids = molecule_array WHERE playlist_id=playlistID; 
END;
$$ LANGUAGE plpgsql;


/*complete*/
CREATE OR REPLACE FUNCTION public.schedule_content(playlistID INT, startTime INT,
	endTime INT, startDate INT, endDate INT)
RETURNS void AS $$
BEGIN
 	UPDATE playlists SET start_time=startTime WHERE playlist_id = playlistID;
 	UPDATE playlists SET end_time=endTime WHERE playlist_id = playlistID;
 	UPDATE playlists SET start_date=startDate WHERE playlist_id = playlistID;
 	UPDATE playlists SET stop_date=endDate WHERE playlist_id = playlistID;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.playlist_exists(playlistCheck int)
RETURNS int AS $playlistID$
DECLARE
	playlistID int;
BEGIN
	SELECT playlist_id INTO playlistID
	FROM playlists WHERE
	playlist_id=playlistCheck;
	RETURN playlistID;
END;
$playlistID$ LANGUAGE plpgsql;