const express = require("express");
const deliverController = require("../controllers/deliver.controller");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @Path : localhost:5000/charity/deliver
 * @Method : GET
 * @Access : Admin
 * @Description : Get deliveries
 */

router.get("/", deliverController.getDeliveries);

/**
 * @Path : localhost:5000/charity/deliver
 * @Method : POST
 * @Access : Admin
 * @Description : Create a delivery
 */

router.post(
  "/",
  loginRequired,
  adminRequired,
  deliverController.createNewDelivery
);

module.exports = router;
