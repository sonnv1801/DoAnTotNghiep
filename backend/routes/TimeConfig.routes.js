const express = require("express");
const middlewareController = require("../controllers/Middleware.controllers");
const router = express.Router();
const TimeController = require("../controllers/TimeCofig.controller");

router.get("/", TimeController.getTimeCf);
router.post("/", middlewareController.verifyToken, TimeController.createTimeCf);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  TimeController.deleteTimeCf
);

module.exports = router;
