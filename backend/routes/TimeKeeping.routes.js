const middlewareController = require("../controllers/Middleware.controllers");
const TimeKeepingController = require("../controllers/TimeKeeping.controller");

const router = require("express").Router();

router.get(
  "/",
  // middlewareController.verifyTokenAndAdminAuth,
  TimeKeepingController.getAllTimeKP
);

router.post("/", TimeKeepingController.createTimeKP);
router.delete("/", TimeKeepingController.deleteTimeKp);

module.exports = router;
