const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// POST create user
// http://charity/users/create
// access: public
// Description: creat an user
router.post("/create", userController.createUser);

// GET user
// http://charity/users/getuser/slug
// access: public
// Description: find(get) an user
// router.get("/:params", userController.geteUser);

module.exports = router;
