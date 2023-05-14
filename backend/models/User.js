const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    zid: {
      type: Number,
      default: 0,
    },
    deparment: {
      type: String,
      default: "",
    },
    Duty: {
      type: String,
      default: "",
    },
    year: {
      type: String,
      default: "",
    },
    personal_ID: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
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

    photo: {
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

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    let lastUser = await this.constructor.findOne(
      {},
      {},
      { sort: { zid: -1 } }
    );
    if (lastUser) {
      this.zid = lastUser.zid + 1;
    } else {
      this.zid = 1;
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
