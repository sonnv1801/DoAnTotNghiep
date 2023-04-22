const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    Dep: {
      type: String,
      require: true,
    },

    basicSalary: {
      type: Number,
      require: true,
    },
  
    allowance: {
      type: Number,
      require: true,
    },
 
    social_insurance: {
      type: Number,
      require: true,
    },
   
    health_Insurance: {
      type: number,
      require: true,
    },
  },
);

module.exports = mongoose.model("Salary", salarySchema);
