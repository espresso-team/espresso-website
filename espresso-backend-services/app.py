from flask import Flask, request, jsonify
from model import Model
from mongo import Mongo
import os
from flask import send_from_directory
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from user import User, load_user
from mongo import MongoClient
from dotenv import load_dotenv


app = Flask(__name__)
load_dotenv('.env')
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
# Create a Mongo Client
mongo = Mongo().mongo
# Create a Model instance
model = Model(mongo)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.user_loader(lambda user_id: load_user(user_id, mongo))


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


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    if email is None or password is None:
        return jsonify({'error': 'Email and password are required'}), 400
    if mongo.database.users.find_one({'email': email}) is not None:
        return jsonify({'error': 'Email already exists'}), 400
    user = {'email': email, 'password': password, 'name': name}
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
    if user is None or user['password'] != password:
        return jsonify({'error': 'Invalid email or password'}), 401
    user_obj = User(email, mongo)
    login_user(user_obj)
    return jsonify({'message': 'Logged in successfully'}), 200


@app.route('/password/reset', methods=['POST'])
def password_reset():
    data = request.get_json()
    email = data.get('email')
    if email is None:
        return jsonify({'error': 'Email is required'}), 400
    user = mongo.database.users.find({'email': email})
    if user is None:
        return jsonify({'error': 'Email not found'}), 404
    # send password reset email
    return jsonify({'message': 'Password reset email sent'}), 200


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
