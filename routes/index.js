const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Transaction routes */
// const transactionRoute = require("./transaction.api");
// router.use("/transaction", transactionRoute);

/* Store route */
const storeApi = require("./store.api");
router.use("/store", storeApi);

/* Donate route */
// const donateApi = require("./donate.api");
// router.use("/donate", donateApi);

/* User route */
const userApi = require("./users.api");
router.use("/users", userApi);

module.exports = router;
