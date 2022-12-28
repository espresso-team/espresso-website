class Work:
    def __init__(self, mongo):
        self.collection = mongo.database.works

    def get_by_userid(self, user_id):
        works = self.collection.find({},{"user_id":user_id})
        work_list = [work for work in works]
        return work_list

    def get_by_workid(self, work_id):
        work = self.collection.find_one({'_id': work_id})
        return work
    
    def create_work(self, data):
        work = {
            "user_id": data["user_id"],
            "name": data["name"],
            "img_addr": data["img_addr"],
            "created_by": data["created_by"],
            "created_on": data["created_on"],
            "like_num": data["like_num"],
        }
        result = self.works.insert_one(work)
        return str(result.inserted_id)
    
    def delete_work(self, work_id, user_id):
        result = self.works.find_one({"_id": work_id, "created_by": user_id})
        if result:
            delete_result = self.works.delete_one({"_id": work_id})
            if delete_result.deleted_count:
                return {"success": "Work deleted"}
            else:
                return {"error": "Error deleting work"}, 500
        else:
            return {"error": "Work not found or not created by current user"}, 404

    # TODO: implement a thread safe like counter
    def update_work_like_num(self, work_id, like):
        return
    
    
    def close(self):
        # Close the connection to the MongoDB server
        self.client.close()
