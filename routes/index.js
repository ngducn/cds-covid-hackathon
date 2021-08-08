const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Request routes */
const requestRoute = require("./request.api");
router.use("/request", requestRoute);

/* Store route */
const storeApi = require("./store.api");
router.use("/store", storeApi);

/* Donate route */
const donateApi = require("./donate.api");
router.use("/donate", donateApi);

/* User route */
const userApi = require("./users.api");
router.use("/users", userApi);

module.exports = router;
