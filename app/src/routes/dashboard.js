
var express = require("express");
const router = express.Router();
var dashboardController = require("../controllers/dashboardController");
const {authJwt} = require('../util/middleware/jwtMIddleware');
// se quiser usar como middleware da funcao, vai precisar utilizar esse authJwt

router.post("/getPercentagePerComponent", authJwt, (req, res) => {
  console.log("estou na rota de insert da dashboard");
  dashboardController.getPercentagePerComponent(req, res);
});
  
module.exports = router;