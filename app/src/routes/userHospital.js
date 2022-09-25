var express = require("express");
var router = express.Router();

var userHospitalController = require("../controllers/userHospitalController");

router.post("/insert", (req, res) => {
  //console.log("estou na rota de insert do hospital");
  userHospitalController.insertUsuario(req, res);
});

module.exports = router;
