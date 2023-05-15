const mongoose = require("mongoose");

const timeKpSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
    },
    roll: {
      type: String,
    },
    name: {
      type: String,
    },
    Dep: {
      type: String,
    },
    day: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeKeeping", timeKpSchema);
