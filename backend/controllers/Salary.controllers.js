const Salary = require("../models/Salary");

const salaryConfig = {
  getSalary: async (req, res) => {
    try {
      Salary.find({}, (err, salarys) => {
        if (err) {
          res.status(500).json(err);
        }
        res.status(200).json(salarys);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getIdSalary: async (req, res) => {
    try {
      Salary.findById(req.params.id, (err, salary) => {
        if (err) {
          es.status(500).json(err);
        }
        res.status(200).json(salary);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createSalary: async (req, res) => {
    try {
      const existingSalary = await Salary.findOne({ Dep: req.body.Dep });
      if (existingSalary) {
        return res.status(400).json({
          error: "Phòng ban đã tồn tại! vui lòng chọn phòng ban khác",
        });
      }
      const newSalary = await new Salary({
        Dep: req.body.Dep,
        basicSalary: req.body.basicSalary,
        allowance: req.body.allowance,
        social_insurance: req.body.social_insurance,
        health_insurance: req.body.health_insurance,
      });
      const salary = await newSalary.save();
      res.status(200).json(salary);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateSalary: async (req, res) => {
    try {
      // const existingSalary = await Salary.findOne({ Dep: req.body.Dep });
      // if (!existingSalary) {
      const { id } = req.params;
      const updates = req.body;
      const updatedSalary = await Salary.findByIdAndUpdate(id, updates, {
        new: true,
      });

      res.status(200).json(updatedSalary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteSalary: async (req, res) => {
    try {
      Salary.findByIdAndRemove(req.params.id, (err, salary) => {
        if (err) {
          res.status(404).json("Can't find Id");
        } else {
          res.status(200).json("Delete salary successfully");
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = salaryConfig;
