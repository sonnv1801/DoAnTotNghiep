const moment = require("moment");
const Time = require("../models/TimeConfig");

exports.getAllTimes = async (req, res) => {
  try {
    const times = await Time.find();
    res.status(200).json({ message: "Time successfully", times });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTime = async (req, res) => {
  const { id } = req.params;
  try {
    const time = await Time.findById(id);

    if (!time) {
      return res.status(404).json({ message: "Time not found" });
    }
    res.status(200).json(time);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createTime = async (req, res) => {
  const { time_in, time_out } = req.body;
  try {
    const time = new Time({ time_in, time_out });
    await time.save();
    res.status(200).json({ message: "Time add successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTime = async (req, res) => {
  const { id } = req.params;
  try {
    const time = await Time.findByIdAndDelete(id);
    console.log(time);
    if (!time) {
      return res.status(404).json({ message: "Resource not found" });
    }
    await time.remove();
    res.status(200).json({ message: "Time deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
