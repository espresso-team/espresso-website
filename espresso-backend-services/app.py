from flask import Flask, request, jsonify, redirect, make_response, render_template
from model import Model
from mongo import Mongo
import os
import re
from flask import send_from_directory
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (JWTManager, jwt_required,
                                get_jwt_identity,
                                create_access_token, create_refresh_token,
                                set_access_cookies, set_refresh_cookies,
                                unset_jwt_cookies, unset_access_cookies)

app = Flask(__name__)
load_dotenv('.env')
secret_key = os.environ['SECRET_KEY']
app.config['BASE_URL'] = 'http://127.0.0.1:5000'  # Running on localhost
app.config['JWT_SECRET_KEY'] = secret_key
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_CSRF_CHECK_FORM'] = True
jwt = JWTManager(app)

# Create a Mongo Client
mongo = Mongo().mongo
# Create a Model instance
model = Model(mongo)


@app.route('/api/models')
def get_models():
    # Query all models from the collection
    models = model.get_all()

    # Return the list of models as JSON
    return jsonify(models)


@app.route('/api/models/<model_id>')
def get_model(model_id):
    # Query the model with the specified ID from the collection
    model = model.get_by_id(model_id)

    # Return the model as JSON
    return jsonify(model)


def assign_access_refresh_tokens(name, url):
    access_token = create_access_token(identity=name)
    refresh_token = create_refresh_token(identity=name)
    resp = make_response(redirect(url, 302))
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp


@jwt.unauthorized_loader
def unauthorized_callback(callback):
    # No auth header
    return redirect(app.config['BASE_URL'] + '/signup', 302)


@jwt.invalid_token_loader
def invalid_token_callback(callback):
    # Invalid Fresh/Non-Fresh Access token in auth header
    resp = make_response(redirect(app.config['BASE_URL'] + '/signup'))
    unset_jwt_cookies(resp)
    return resp, 302


@jwt.expired_token_loader
def expired_token_callback(callback):
    # Expired auth header
    resp = make_response(redirect(app.config['BASE_URL'] + '/token/refresh'))
    unset_access_cookies(resp)
    return resp, 302


def unset_jwt():
    resp = make_response(redirect(app.config['BASE_URL'] + '/', 302))
    unset_jwt_cookies(resp)
    return resp


@app.route('/token/refresh', methods=['GET'])
@jwt_required(refresh=True)
def refresh():
    # Refreshing expired Access token
    name = get_jwt_identity()
    access_token = create_access_token(identity=str(name))
    resp = make_response(redirect(app.config['BASE_URL'] + '/', 302))
    set_access_cookies(resp, access_token)
    return resp


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    # Validate the data
    if not name or not email or not password:
        return jsonify({'message': 'Invalid signup data'}), 400

    if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return jsonify({'message': 'Invalid email address'}), 400

    if not re.match(r'(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}', password):
        return jsonify({'message': 'Invalid password. Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number'}), 400

    # Hash the password
    password_hash = generate_password_hash(password)

    if mongo.database.users.find_one({'email': email}) is not None:
        return jsonify({'error': 'Email already exists'}), 400
    user = {'email': email, 'password': password_hash, 'name': name}
    mongo.database.users.insert_one(user)
    return jsonify({'user': str(user)}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if email is None or password is None:
        return jsonify({'error': 'Email and password are required'}), 400
    user = mongo.database.users.find_one({'email': email})
    # Check if the user exists and the password is correct
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid login credentials'}), 401

    return assign_access_refresh_tokens(user['name'], app.config['BASE_URL'] + '/')


@app.route('/password/reset', methods=['POST'])
def password_reset():
    data = request.get_json()
    email = data.get('email')
    if email is None:
        return jsonify({'error': 'Email is required'}), 400
    user = mongo.database.users.find_one({'email': email})
    if user is None:
        return jsonify({'error': 'Email not found'}), 404
    # TODO: send password reset email
    return jsonify({'message': 'Password reset email sent'}), 200


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Revoke Fresh/Non-fresh Access and Refresh tokens
    return unset_jwt(), 302


@app.route('/profile', methods=['GET'])
@jwt_required(fresh=True)
def profile():
    # Get the user's username from the access token
    username = get_jwt_identity()

    # Retrieve the user's information from the database
    user = mongo.database.users.find_one({'name': username})

    # Return the user's information to the client
    return jsonify({
        'name': user['name'],
        'email': user['email']
    })


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
