"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from hashlib import sha256
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/signup', methods=['POST'])
def signup():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    if not email or not password:
        return jsonify(error="Email or password not provided."), 400
    password = sha256(password.encode()).hexdigest()
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User sign-up successful."), 200


@api.route('/login', methods=['POST'])
def login():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    if not email or not password:
        return jsonify(error="Email or password not provided."), 400
    password = sha256(password.encode()).hexdigest()
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify(error="Invalid email or password."), 400
    token = create_access_token(identity=email)

    return jsonify(message="User log-in successful.", token=token), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    return jsonify(message='You have access!'), 200