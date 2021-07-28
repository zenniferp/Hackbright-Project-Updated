from flask import Flask, jsonify, send_from_directory, render_template, request, session, flash, redirect
from time import sleep
import requests
import json
import crud
from model import connect_to_db, User
from jinja2 import StrictUndefined
from keys import ACCESS_TOKEN, YELP_API_KEY, MAPS_API_KEY

app = Flask(__name__)
app.secret_key = "secret"
app.jinja_env.undefined = StrictUndefined


# TBD: Add routes for production mode

# @app.route("/")
# def home():

#     return render_template("index.html")


# @app.route("/<path>")
# def route(path):

#     return render_template("index.html")


# @app.route("/<path>/<code>")
# def nested_route(path, code):

#     return render_template("index.html")

@app.route('/')
def home():
    """show main page"""
    return render_template('main.html')

@app.route('/api/search', methods=['POST'])
def search_rooftop():
    """Get address and radius from user input and return results of rooftop bars in Yelp"""
    street = request.json.get("street")
    city = request.json.get("city")
    state = request.json.get("state")
    radius = request.json.get("radius")

    # Convert user's input to meters
    radius = int(radius)*1607

    # Define the API Key, endpoing, and header
    endpoint = 'https://api.yelp.com/v3/businesses/search'
    headers = {'Authorization': 'Bearer %s' % YELP_API_KEY}

    # Define the parameters
    parameters = {  'term': 'rooftop bar',
                    'limit': 10,
                    'location': f"{street}, {city}, {state}",
                    'radius': radius}
   
    # Make a request to the Yelp API
    response = requests.get(url=endpoint, params=parameters, headers=headers)
    print(response.status_code)
    # Translate the returned JSON string to a dict
    rooftop_data = response.json()

    user_id = User.query.first().user_id
    
    businesses = rooftop_data["businesses"]
    for business in businesses:
        yelp_id = business["id"]
        favorite = crud.get_favorite(user_id, yelp_id)
        business["favorited"] = True if favorite else False

    return jsonify(businesses)

@app.route('/api/favorite', methods=['POST'])
def save_favorite():

    yelp_id=request.json.get("result_id")
    user_id = User.query.first().user_id
    print("result_id", yelp_id)
    crud.create_favorite(user_id, yelp_id)
    return jsonify({"success": True})

@app.route('/api/unfavorite', methods=['POST'])
def unsave_favorite():

    yelp_id=request.json.get("result_id")
    user_id = User.query.first().user_id
    print("result_id", yelp_id)
    crud.remove_favorite(user_id, yelp_id)
    return jsonify({"success": True})

@app.route('/api/getfavorite', methods=['POST'])
def get_favorite():

    yelp_id=request.json.get("result_id")
    user_id = User.query.first().user_id
    print("result_id", yelp_id)
    crud.get_favorite(user_id, yelp_id)
    return jsonify({"success": True})

@app.route('/api/getallfavorites', methods=['POST'])
def get_all_favorites():

    user_id = User.query.first().user_id
    print("result_id")
    crud.get_all_favorites(user_id)
    return jsonify({"success": True})


if __name__ == "__main__":

    connect_to_db(app)

    app.run("0.0.0.0", debug=True, port=5001) # will run on port 5000 by default
