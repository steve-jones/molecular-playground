import psycopg2

try:
	conn = psycopg2.connect("host=localhost dbname=test user=postgres password=admin")	
        print "connected"
	cur = conn.cursor()
except:
	print "I was unable to connect"
def printCurrentDbs():
	cur.execute("""SELECT datname from pg_database""")
	rows = cur.fetchall()
	for row in rows:
		print "  ", row[0]

def addToDb():
	try:
		cur.execute("CREATE TABLE test4 (id serial PRIMARY KEY, num integer, data varchar);")
	except:
		print "table already exists"
		conn.rollback();#all errors need this
	cur.execute("INSERT INTO test4 (num,data) VALUES (201, 'de');")
	cur.execute("SELECT * FROM test4;")
	print cur.fetchall();

printCurrentDbs()
addToDb()
conn.commit()
cur.close()
conn.close()
