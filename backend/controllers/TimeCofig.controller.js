// const moment = require("moment");
const Time = require("../models/TimeConfig");

const timeConfig = {
  getTimeCf: async (req, res) => {
    try {
      Time.find({}, (err, times) => {
        if (err) {
          res.status(500).json(err);
        }
        res.status(200).json(times);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createTimeCf: async (req, res) => {
    try {
      const newTime = await new Time({
        time_morning: req.body.time_morning,
        time_afternoon: req.body.time_afternoon,
      });
      const time = await newTime.save();
      res.status(200).json(time);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteTimeCf: async (req, res) => {
    try {
      Time.findByIdAndRemove(req.params.id, (err, time) => {
        if (err) {
          res.status(404).json("Can't find Id");
        } else {
          res.status(200).json("Delete times time successfully");
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = timeConfig;

