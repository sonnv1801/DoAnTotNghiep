const express = require("express");
const router = express.Router();
const TimeController = require("../controllers/TimeCofig.controller");

router.post('/time', TimeController.createTime )
router.get('/time/:id', TimeController.getTime )
router.get('/time', TimeController.getAllTimes )
router.put('/time/:id', TimeController.updateTime )
router.post('/time/:id', TimeController.deleteTime )


module.exports = router;
