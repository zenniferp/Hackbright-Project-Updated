from flask import Flask, jsonify, send_from_directory, render_template, request, session, flash, redirect
from time import sleep
import requests
import json

from requests import sessions
import crud
from model import connect_to_db, User
from jinja2 import StrictUndefined
from keys import ACCESS_TOKEN, YELP_API_KEY, MAPS_API_KEY

app = Flask(__name__)
app.secret_key = "secret"
app.jinja_env.undefined = StrictUndefined


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

@app.route('/api/getallfavorites', methods=['GET'])
def get_all_favorites():

    # user_id = User.query.first().user_id
    if "user_id" in session:
        user_id = session["user_id"]
        all_favorites = crud.get_all_favorites(user_id)
        businesses = []
        business_ids = set()

        for favorite in all_favorites:
            if favorite.yelp_id not in business_ids:
                endpoint = f'https://api.yelp.com/v3/businesses/{favorite.yelp_id}'
                headers = {'Authorization': 'Bearer %s' % YELP_API_KEY}
            
                response = requests.get(url=endpoint, headers=headers)

                business_data = response.json()
                
                business_data["yelp_id"] = business_data["id"]
                business_ids.add(business_data["yelp_id"])
                business_data["favorited"] = True
                businesses.append(business_data)

        return jsonify(businesses)
    else: 
        return jsonify({"success": False})

@app.route('/login', methods=['POST'])
def login(): 
    # form data from frontend
    email = request.json.get("email")
    password = request.json.get("password")

    user = crud.get_user_by_email(email)
    
    if user and password == user.password:
        session["user_id"] = user.user_id 
        return jsonify({"success": True})
    else: 
        return jsonify({"success": False})

@app.route('/logout', methods=['POST'])
def logout():

    if "user_id" in session:
        del session["user_id"]
    return jsonify({"success": True})

if __name__ == "__main__":

    connect_to_db(app)

    app.run("0.0.0.0", debug=True, port=5001) # will run on port 5000 by default
