const mongoose = require("mongoose");
const moment = require("moment");

const TimeSchema = new mongoose.Schema({
  time_morning: {
    type: String,
  },

  time_afternoon: {
    type: String,
  },
 
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Time", TimeSchema);
