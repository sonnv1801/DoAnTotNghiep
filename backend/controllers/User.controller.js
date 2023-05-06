const User = require("../models/User");
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Xóa Thành Công!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    const results = await User.findById(req.params.id);
    try {
      if (results.userId === req.body.userId) {
        await results.updateOne({
          $set: {
            fullname: req.body.fullname,
            phone: req.body.phone,
            address: req.body.address,
          },
        });
        res.status(200).json("Update user successfully");
      } else {
        res.status(500).json("Can't update user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
