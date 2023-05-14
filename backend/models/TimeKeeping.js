const mongoose = require("mongoose");

const timeKpSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
    },
    roll: {
      type: String,
    },
    full_name: {
      type: String,
    },
    Depement: {
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
