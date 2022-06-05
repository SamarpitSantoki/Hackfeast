const User = require("../../models/userSchema");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({
    success: true,
    users: users,
  });
};
