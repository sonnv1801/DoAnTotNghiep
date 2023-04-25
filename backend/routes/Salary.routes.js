const express = require("express");
const middlewareController = require("../controllers/Middleware.controllers");
const router = express.Router();
const SalaryController = require("../controllers/Salary.controllers");

router.get("/", SalaryController.getSalary);
router.get("/:id", SalaryController.getIdSalary);
router.post("/", middlewareController.verifyToken, SalaryController.createSalary);
router.put("/:id", middlewareController.verifyToken, SalaryController.updateSalary)
router.delete("/:id", middlewareController.verifyToken, SalaryController.deleteSalary
);

module.exports = router;
