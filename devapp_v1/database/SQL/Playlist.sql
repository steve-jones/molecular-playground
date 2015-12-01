
/*has not been created yet*/
CREATE TABLE Playlists (
	id INT PRIMARY KEY NOT NULL,
	name TEXT NOT NULL,
	playlist_creator TEXT NOT NULL,
	molecule_ids INT[] NOT NULL,
	installation TEXT NOT NULL,
	start_time INT NOT NULL,
	start_date  INT NOT NULL,
	stop_date INT NOT NULL,
	end_time INT NOT NULL,
	is_playing BOOLEAN NOT NULL

);

/*I tried this with users table and worked perfect. Just need to try it with playlist table*/
CREATE OR REPLACE FUNCTION public.get_playlist()
RETURNS TABLE(id INT, playlist_name TEXT, playlist_creator TEXT, molecule_scripts TEXT[],
	installation TEXT, start_time INT, start_date  INT, stop_date INT, end_time INT,
	is_playing BOOLEAN) AS $all_playlists$
BEGIN
	RETURN QUERY SELECT * FROM playlists;
END;
$all_playlists$ LANGUAGE plpgsql;

/*It compiles haven't tested though.*/
CREATE OR REPLACE FUNCTION public.get_specific_playlist(playlist_id text)
RETURNS TABLE(id INT, playlist_name TEXT, playlist_creator TEXT, molecule_scripts TEXT[],
	installation TEXT, start_time INT, start_date  INT, stop_date INT, end_time INT,
	is_playing BOOLEAN) AS $one_playlists$
BEGIN
	RETURN QUERY SELECT * FROM playlists WHERE id=playlist_id;
END;
$one_playlists$ LANGUAGE plpgsql;

/*this also has not been tested but compiles*/
CREATE OR REPLACE FUNCTION public.create_playlist(playlist_name TEXT, playlist_creator TEXT, molecule_scripts TEXT[],
	installation TEXT, start_time INT, start_date  INT, stop_date INT, end_time INT,
	is_playing BOOLEAN)
RETURNS int as $IDKey$
DECLARE
	IDKey int;
BEGIN
	SELECT MAX(ID) INTO IDKey FROM Users;
	IDKey := IDKey + 1;
	IF (IDKey IS NULL) THEN
		IDKey := 0;
	END IF;
	INSERT INTO playlists VALUES(IDKey, playlist_name, playlist_creator, installation,
		start_time, start_date, stop_date, end_time);
	RETURN IDKey;
END;
$IDKey$ LANGUAGE plpgsql;


/*yet again compiles but untested*/
CREATE OR REPLACE FUNCTION public.add_to_playlist(playlist_id INT, molecule_id INT)
RETURNS void AS $$
BEGIN
	SELECT molecule_ids || molecule_id FROM playlists WHERE id=playlist_id;
END;
$$ LANGUAGE plpgsql;

/*compiles untested*/
CREATE OR REPLACE FUNCTION public.remove_playlist(playlist_id INT)
RETURNS void AS $$
BEGIN
 	DELETE FROM playlists WHERE id=playlist_id;
END;
$$ LANGUAGE plpgsql;


/*compiles hasn't been tested*/
CREATE OR REPLACE FUNCTION public.schedule_content(playlist_id INT, startTime INT,
	endTime INT, startDate INT, endDate INT)
RETURNS void AS $$
BEGIN
 	UPDATE playlists SET start_time=startTime WHERE id = playlist_id;
 	UPDATE playlists SET end_time=endTime WHERE id = playlist_id;
 	UPDATE playlists SET start_date=startDate WHERE id = playlist_id;
 	UPDATE playlists SET end_date=endDate WHERE id = playlist_id;
END;
$$ LANGUAGE plpgsql;