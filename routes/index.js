const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/**Store route*/
const storeApi = require("./store.api");
router.use("/store", storeApi);
module.exports = router;
