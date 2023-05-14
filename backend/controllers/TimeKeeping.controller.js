const TimeKeeping = require("../models/TimeKeeping");

const TimeKeepingController = {
  getAllTimeKP: async (req, res) => {
    try {
      const timekp = await TimeKeeping.find();
      res.status(200).json(timekp);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createTimeKP: async (req, res) => {
    try {
      const newTime = await new TimeKeeping({
        Id: req.body.Id,
        roll: req.body.roll,
        ful_name: req.body.ful_name,
        Depement: req.body.Depement,
        day: req.body.day,
        time: req.body.time,
      });
      const timekp = await newTime.save();
      res.status(200).json(timekp);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = TimeKeepingController;
