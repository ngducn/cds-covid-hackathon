var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// doante route
const donateApi = require("./donate.api");
router.use("/donate", donateApi); //localhost:5000/charity/donate

module.exports = router;
