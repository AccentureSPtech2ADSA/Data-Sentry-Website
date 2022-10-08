var express = require("express");
var router = express.Router();
var userHospitalController = require("../controllers/userHospitalController");
const {authJwt} = require('../util/middleware/jwtMIddleware');

router.post("/insert", (req, res) => {
  console.log("estou na rota de insert do hospital");
  userHospitalController.insertUsuario(req, res);
});
router.post("/login", (req, res) => {
  console.log('estou na rota de /login do user');
  userHospitalController.login(req, res);
});
module.exports = router;
