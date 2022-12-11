from pymongo import MongoClient

class Model:
    def __init__(self, connection_string):
        self.client = MongoClient(connection_string)
        self.collection = self.client.database.models

    def get_all(self):
        models = self.collection.find()
        model_list = [model for model in models]
        return model_list

    def get_by_id(self, model_id):
        model = self.collection.find_one({'_id': model_id})
        return model
    
    def close(self):
        # Close the connection to the MongoDB server
        self.client.close()
