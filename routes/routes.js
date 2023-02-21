const express = require("express");
const UserController = require("../controllers/course_controllers");
const router = express.Router();

module.exports = router;

router.post("/course", UserController.create);
router.get("/course/get", UserController.findAll);
router.get("/course/get/:id", UserController.findOne);
router.patch("/course/:id", UserController.update);
router.delete("/course/:id", UserController.destroy);
