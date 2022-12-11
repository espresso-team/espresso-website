from flask import Flask, jsonify
from model import Model
import os



app = Flask(__name__)

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

if __name__ == '__main__':
    app.run()