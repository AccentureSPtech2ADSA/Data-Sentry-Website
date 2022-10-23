var express = require("express");
var router = express.Router();

var hospitalController = require("../controllers/hopistalController");

router.post("/insert", (req, res) => {
  hospitalController.insert(req, res);
});

module.exports = router;
