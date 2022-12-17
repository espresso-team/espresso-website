from pymongo import MongoClient
from dotenv import load_dotenv
import os

class Mongo:
    def __init__(self):
        load_dotenv('.env')
        # MongoDB connection string, stored in a secret in GitHub
        connection_string = os.environ['MONGO_CONNECTION_STRING']
        self.mongo = MongoClient(connection_string)

    def close(self):
        # Close the connection to the MongoDB server
        self.client.close()