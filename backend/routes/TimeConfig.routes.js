const express = require("express");
const middlewareController = require("../controllers/Middleware.controllers");
const router = express.Router();
const TimeController = require("../controllers/TimeCofig.controller");

// router.post('/time', TimeController.createTime )
// router.get('/time/:id', TimeController.getTime )
// router.get('/time', TimeController.getAllTimes )
// // router.put('/time/:id', TimeController.updateTime )
// router.delete('/time/:id', TimeController.deleteTime )

router.get("/", TimeController.getTimeCf);
router.post("/", middlewareController.verifyToken, TimeController.createTimeCf);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  TimeController.deleteTimeCf
);

module.exports = router;
