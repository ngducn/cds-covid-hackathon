var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Request routes */
const requestRoute = require("./request.api");
router.use("/request", requestRoute);

module.exports = router;
