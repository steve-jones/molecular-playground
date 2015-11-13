import os
import psycopg2
import psycopg2.extras
import urlparse
from flask import jsonify
from psycopg2.extensions import adapt
import datetime

def connect():
	os.environ["DATABASE_URL"] = "postgres://ehaxtcxuugahlv:6vv92WKuRCvNV6-1gMHlbbeOMM@ec2-54-83-10-210.compute-1.amazonaws.com:5432/d5cd7ej8t9fbns"
	urlparse.uses_netloc.append("postgres")
	url = urlparse.urlparse(os.environ["DATABASE_URL"])
	connect = psycopg2.connect(
	    database=url.path[1:],
	    user=url.username,
	    password=url.password,
	    host=url.hostname,
	    port=url.port
	)

	return connect

''' overview: returns cursor object'''
''' TODO: schema that also guards against other users voting more than once.'''
def create_schema(new_table_name):
	conn = connect()
	cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'") # lists just the table(s) that the admin creates.

	if new_table_name == cursor.fetchone()['table_name']:
		end(conn)
		return jsonify({"message":"table already exists"}), 404

	cursor.execute('''
		Create table {0}(
        note_id 			serial primary key,
		uid text              		not null,
		nickname text              		not null,
        note varchar(99)            not null,
		down smallint 				DEFAULT '0' ,
		up smallint					DEFAULT '0',
		timestamped text
		);

	''' . format(new_table_name))

	end(conn)
	return jsonify({"message":"new table created."})

def is_present(column, table, selection_item):
	conn = connect()
	cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	collection = {"conn":conn, "boolean":True, "cursor":cursor}
	query_string = "select {0} from {1} WHERE {0} = '{2}'". format(column, table, selection_item)
	cursor.execute(query_string)
	json = cursor.fetchone()

	if not json: # if response from query is '[]' -- the empty array, then
		collection["boolean"] = False
	return collection


def make_note(uid, note):
	'''overview:
	    api: is_present(column /*string*/, table /*string*/, selection_item):
	'''
	verify = is_present('note', 'note_metrics', note)
	timestamped = str(datetime.datetime.now())

	'''if the note does not exists, insert note.'''
	if verify['boolean'] == False:
		query_string = """INSERT INTO note_metrics (uid, nickname, note, \
		timestamped) VALUES ({0}, {1}, {2}, {3})""".format(adapt(uid),
		adapt(select(uid)["nickname"]), adapt(note), adapt(timestamped))
		verify["cursor"].execute(query_string);
		end(verify["conn"])
		return jsonify({"message":"new note created"})
	else:
		end(verify["conn"])
		return jsonify({"message":"uid already exists"}), 404

'''overview: endpoint interacts with the movements of the iOS client-side buttons
	to achieve backend collection logic.
	data is then computed and assessed in the cloud
'''
def update_note_metric(note_id, tag):
	conn = connect()
	cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	query_string = "select * from note_metrics where note_id = {0}". format(note_id)
	cursor.execute(query_string)
	note = cursor.fetchone()
	new_up = 0
	new_down = 0

	if int(tag) == 200:
		if note["down"] == 1:
			new_down = note["down"] - 1
	elif int(tag) == 201:
		if note["up"] == 0:
			new_up = note["up"] + 1

	query_string = """update note_metrics set down = {0}, up = {1} where note_id = '{2}'""".format(new_down, new_up, note_id)
	cursor.execute(query_string)
	end(conn)
	return jsonify({"message":"up: {0}, down: {1},\
					 note_id: {2}".format(new_up, new_down, note_id)})


def select_note(note_id):
	conn = connect()
	cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	query_string = "select note_id from note_metrics WHERE note_id = '{0}'". format(note_id)
	cursor.execute(query_string)
	json = cursor.fetchone()
	end(conn)

	if not json:
		return jsonify({"message":"no user found"}), 404
	return jsonify({"user":json})

def insert(uid, nickname, password):
	verify = is_present("uid", 'user_db', uid)
	if verify['boolean'] == False:
		query_string = """INSERT INTO user_db (uid, nickname, password) \
      	VALUES ({0}, {1}, {2})""".format(adapt(uid), adapt(nickname), adapt(password))
		verify["cursor"].execute(query_string);
		end(verify["conn"])
		return jsonify({"message":"new user created"})

	else:
		end(verify["conn"])
		return jsonify({"message":"uid already exists"}), 404

def login(uid, password):
	conn = connect()
	cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	query_string = "select * from user_db WHERE uid = '{0}'". format(uid)

	cursor.execute(query_string)
	selected_user = cursor.fetchone()

	if selected_user and selected_user["password"] == password:
		selected_user.pop("password", None) # keep server side password client side
		return jsonify({"message":"user and password verified",
						"user":selected_user})
	return jsonify({"message":"login unsuccessful"}), 404


def select(uid):
	conn = connect()
	cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	query_string = "select uid, nickname from user_db WHERE uid = '{0}'". format(uid)
	cursor.execute(query_string)
	json = cursor.fetchone()
	end(conn)
	return json

def list_all():
	conn = connect()
	cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	query_string = "select uid, nickname from user_db "
	cursor.execute(query_string)
	json = cursor.fetchall()
	end(conn)

	if not json:
		return {"message":"user_db is empty"}
	return json

def list_all_notes():
	conn = connect()
	cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	query_string = "select * from note_metrics "
	cursor.execute(query_string)
	json = cursor.fetchall()
	end(conn)

	if not json:
		return jsonify({"message":"user_db is empty"}), 404
	return jsonify({"users":json})

def delete(uid):

	verify = is_present("uid", 'user_db', uid)
	if verify['boolean'] == False: # if user is not present
		return jsonify({"message":"no rows affected -- user not found"}), 404
	else:
		query_string = "DELETE from user_db where uid='{0}'". format(uid)
		verify["cursor"].execute(query_string);
		end(verify["conn"])
		return jsonify({"message":"user deleted"})

def end(conn):
		conn.commit()
		conn.close()

''' for admin purposes only. this function should never be placed permanently under any route. '''
def _alter_psql_interface():
	'''
	conn = connect()
	cursor = conn.cursor()
	query_string = "ALTER TABLE {0} DROP COLUMN {1}".format('user_db','fname')
	cursor.execute(query_string)
	# query_string = "SELECT column_name FROM information_schema.columns WHERE table_name ='user_db'"
	query_string = "ALTER TABLE {0} RENAME COLUMN {1} to {2}".format('user_db','lname', 'nickname')
	cursor.execute(query_string)
	end(conn)
	'''
	return jsonify({"message":"schema altered"})
