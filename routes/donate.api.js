const express = require("express");
const donateController = require("../controllers/donate.controller");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @route GET localhost:5000/charity/donate/
 * @description Get all donates
 * @access Public
 */
// router.get("/", donateController.getAllDonate);

/**
 * @route GET localhost:5000/charity/donate/:id
 * @description Get a single donate
 * @access Public
 */
// router.get("/donateId", donateController.getSingleDonate);

/**
 * @route POST localhost:5000/charity/donate
 * @description Create a new donate
 * @access Pulbic
 */
router.post("/create", donateController.createDonate);

/**
 * @route Post api/donates/:id
 * @description Update a donate information
 * @access Admin required
 */
router.post(
  "/confirm",
  loginRequired,
  adminRequired,
  donateController.confirmDonate
);
module.exports = router;
