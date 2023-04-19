const middlewareController = require("../controllers/Middleware.controllers");
const userController = require("../controllers/User.controller");

const router = require("express").Router();

router.get("/", userController.getAllUsers);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);
router.put("/:id", middlewareController.verifyToken, userController.updateUser);

module.exports = router;
