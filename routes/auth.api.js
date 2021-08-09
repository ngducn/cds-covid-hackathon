const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// POST create auth
// http://charity/auth
// access: public
// Description: creat an auth
router.post("/", authController.login);

module.exports = router;
