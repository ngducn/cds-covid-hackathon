const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// POST create user
// http://charity/users/create
// access: public
// Description: creat an user
router.post("/", userController.createUser);

// GET user
// http://charity/users/
// access: public
// Description: find(get) an user
// router.get("/:params", userController.geteUser);
router.get("/", userController.getUsers);

// GET single
// http://charity/singles/
// access: public
// Description: find(get) an single
// router.get("/:params", singleController.geteUser);
router.get("/:id", userController.getSingleUser);

module.exports = router;
