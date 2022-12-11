import pytest
import unittest
from model import Model

class TestModel(unittest.TestCase):
    def setUp(self):
        # MongoDB connection string, stored in a secret in GitHub
        connection_string = os.environ['MONGO_CONNECTION_STRING_FOR_TEST']

        # Create a Model instance
        self.model = Model(connection_string)

        # Create some mock data
        mock_data = [
            {
                '_id': 'abc123',
                'name': 'Model 1',
                'description': 'This is the first model',
                'created_at': '2022-12-11'
            },
            {
                '_id': 'def456',
                'name': 'Model 2',
                'description': 'This is the second model',
                'created_at': '2022-12-12'
            }
        ]

        # Insert the mock data into the collection
        self.model.collection.insert_many(mock_data)

    def tearDown(self):
        # Delete all documents from the collection
        self.model.collection.delete_many({})

        # Close the connection to the MongoDB server
        self.model.close()

    @pytest.mark.test
    def test_get_all(self):
        # Test the get_all method
        models = self.model.get_all()

        # Verify that the returned list of models has the expected length
        self.assertEqual(len(models), 2)

        # Verify that the returned list of models contains the expected data
        expected_models = [
            {
                '_id': 'abc123',
                'name': 'Model 1',
                'description': 'This is the first model',
                'created_at': '2022-12-11'
            },
            {
                '_id': 'def456',
                'name': 'Model 2',
                'description': 'This is the second model',
                'created_at': '2022-12-12'
            }
        ]

        self.assertListEqual(models, expected_models)