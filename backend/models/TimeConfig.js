const mongoose = require('mongoose');
const moment = require('moment');

const TimeSchema = new mongoose.Schema({
  time_in: {
    type: String,
  
  },
  time_out: {
    type: String,
  
  },
  created_at: {
    type: Date,
    default: moment(),
  },
});

module.exports = mongoose.model('Time', TimeSchema);