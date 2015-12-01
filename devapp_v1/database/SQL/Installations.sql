
/*hasn't been created yet. Values come from high level doc*/
CREATE TABLE Installations (
	id INT PRIMARY KEY NOT NULL,
	city TEXT NOT NULL,
	country TEXT NOT NULL,
	school_affiliation TEXT NOT NULL,
	local_admin TEXT NOT NULL,
	delegate_list[] TEXT NOT NULL,
	is_online  BOOLEAN NOT NULL,
	last_data_update TEXT NOT NULL,
	GPS_location TEXT NOT NULL

);