# overview: as with most python-esque statements, this simply directs the
# application to the dependency on the deployed server to grab these specific
# files from the 'flask' web framework package
from flask import Flask, render_template, jsonify, request, abort

# overview: the lib which allows us to interface with PostgreSQL
import psqldb

# overview: create an instance of the flask webframe with the name of our app..
app = Flask(__name__)

''' route handling begins below
    api/usage:
    @app.route('base url (and endpoint if making more than one route) '[OPTIONAL PARAM: ,  methods=['GET']])

    note: the optional param can be and should be explicity if you are defining more than one
    http request method for a route handler

    if the route handling logic is only executing HTTP GET requests, it is okay to
    leave the second parameter out. it will be assumed that the routes logic handles only HTTP GET requests.
    ofcourse, for the sake of code readability, it might be helpful to explicity include which HTTP request methods
    are being used, regardless of the method being GET.

'''

# overview: defines route handler for the (main) landing page.
@app.route('/')
def landing_pg():

    ''' overview: render_template() usgae: api
        render_template( name_of_.html_page [ OPTIONAL PARAM: , variable name to locate within the html page])
    '''
    # overview: since we do not need to dynamically change any information on our main page
    # we just return a static page which has already designed with all desired content.
    return render_template('index.html')

@app.route('/edit')
def e_installations():
    ''' overview: render_template() usgae: api
        render_template( name_of_.html_page [ OPTIONAL PARAM: , variable name to locate within the html page])
    '''

    # overview: this route handler will use a function define within
    # the file psqldb in order to make calls to our db
    # what's return from this process is json.
    # from the data returned (json), we'll return once more --
    # this time, client-side.
    # return render_template('base1.html', data=psqldb.list_all()[0]['nickname'])
    return render_template('base1.html', overview="overview: this string is static. the json below is dynamic. the data seen below is as a result of the route handler using a function from our file psqldb which enables us to make calls to our PostgreSQL in the cloud. The result of this method call is an array of json. This json is then passed to the render_template function to be sent client-side.  PS. Sry for the wierd json data, it's information being fetched from one of my personal dbs :)", data=psqldb.list_all())

# overview: logic which allows for this file to be the driver file
# in python, a python file is assigned the name main if it is the module which is first
# evoke by the by interperter or the ysytem..
# think int main() in c/c++
# note: *removed if statement for testing purposes.
if __name__ == 'main':
    app.run(port=3001, debug=True)
