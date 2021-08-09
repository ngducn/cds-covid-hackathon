const express = require("express");
const {
  createStore,
  getAll,
  getSingleStore,
} = require("../controllers/store.controller");
const { isAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @method : POST
 * @route : http://localhost:5000/store
 * @access : Admin required
 * @description : Create a store
 */
// router.post("/", isAdmin, createStore); <<< final stage
router.post("/create", createStore);

/**
 * @method : GET
 * @route : http://localhost:5000/store
 * @access : Public
 * @description : Get all store list
 */
router.get("/", getAll);

/**
 * @method : GET
 * @route : http://localhost:5000/store
 * @access : Public
 * @description : Get store detail
 */
router.get("/:id", getSingleStore);

module.exports = router;
