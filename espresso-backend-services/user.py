class User:
  def __init__(self, email, mongo_client):
    self.email = email
    self.id = email
    self.client = mongo_client
    self.collection = mongo_client.database.users

  def is_authenticated(self):
    return True

  def is_active(self):
    return True

  def is_anonymous(self):
    return False

  def get_id(self):
    return self.id

def load_user(user_id, mongo_client):
  user = mongo_client.users.find_one({'email': user_id})
  if user is None:
    return None
  return User(user['email'], mongo_client)