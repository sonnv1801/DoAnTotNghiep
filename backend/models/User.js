const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      maxlength: 50,
    },

    username: {
      type: String,
      require: true,
      maxlength: 20,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },

    image: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
    },
    role: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
