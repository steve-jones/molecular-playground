
CREATE TABLE ErrorLog (
	id SERIAL PRIMARY KEY,
	code INT NOT NULL,
	second int CHECK(second >= 0) CHECK(second <= 60),
	minute int CHECK(minute >= 0) CHECK(minute <= 60),
	hour int CHECK(hour >= 0) CHECK(hour <= 24),
	day int CHECK(day >= 0) CHECK(day <= 31),
	month int CHECK(month >= 0) CHECK(month <= 12),
	year int CHECK(year >= 2000)
);



CREATE OR REPLACE FUNCTION public.log_error(error_code int, sec int, minu int, hr int, da int, mon int, yr int)
RETURNS int as $error_id$
DECLARE
	error_id int;
BEGIN
	INSERT INTO ErrorLog VALUES
		(DEFAULT
		,error_code
		,sec
		,minu
		,hr
		,da
		,mon
		,yr
		);
	SELECT max(id) INTO error_id FROM ErrorLog;
	RETURN error_id;
END;
$error_id$ LANGUAGE plpgsql;

