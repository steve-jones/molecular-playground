#! /bin/bash
## run it from this directory same location as the files.
## $  sh init-local_db.sh 

psql -f ./db_schema.sql
echo Finished loading database
echo

psql -f ./sampledata.sql molecular_db
echo Finished loading sample data into molecular_db
echo
