const express = require("express");
const { createStore } = require("../controllers/store.controller");
const { isAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @method : POST
 * @route : http://localhost:5000/store
 * @access : Admin required
 * @description : Create a store
 */
// router.post("/", isAdmin, createStore); <<< final stage
router.post("/", createStore);

/**
 * @method : GET
 * @route : http://localhost:5000/store
 * @access : Public
 * @description : Get all store list
 */
router.get("/");

module.exports = router;
