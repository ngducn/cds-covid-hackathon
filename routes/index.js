var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// User route
const userApi = require("./users.api");
router.use("/users", userApi);

module.exports = router;
