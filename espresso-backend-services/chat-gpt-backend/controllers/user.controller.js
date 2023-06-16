import { getUserByUserId, insertUser } from "../services/userProfileService.js";

export const getUserProfile = async (req, res) => {
  const user_id = req.params.user_id;
  var user = await getUserByUserId(user_id);
  if (user) {
    res.json({
      message: `user ${user.user_name} found!`,
      data: user,
      status: "success",
    });
  } else {
    res.status(404).json({ error: "User not found!" });
  }
};

export const postUserProfile = async (req, res) => {
  const user_id = req.body.user_id;
  const user_name = req.body.user_name;
  const gender = req.body.gender;
  const user = {
    user_id: user_id,
    user_name: user_name,
    gender: gender,
  };
  var existing_user = await getUserByUserId(user_id);
  if (existing_user) {
    res.status(409).json({ error: "User already existed!" });
    return;
  }
  try {
    await insertUser(user);
    res.json({ message: `user ${user_name} added!`, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
