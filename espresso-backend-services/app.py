from flask import Flask, jsonify
from model import Model
import os
from flask import send_from_directory
from dotenv import load_dotenv



app = Flask(__name__)

load_dotenv('.env')

# MongoDB connection string, stored in a secret in GitHub
connection_string = os.environ['MONGO_CONNECTION_STRING']

# Create a Model instance
model = Model(connection_string)

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

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
  if path != "" and os.path.exists(app.static_folder + '/' + path):
    return send_from_directory(app.static_folder, path)
  else:
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run()