var express = require("express");
var router = express.Router();
const { authJwt } = require("../util/middleware/jwtMIddleware");
var hospitalController = require("../controllers/hopistalController");

router.post("/insert", (req, res) => {
  hospitalController.insert(req, res);
});
router.get("/getServers/:idHospital", authJwt, (req, res) => {
  console.log("Estou na rota getServers do arquivo hospital");
  hospitalController.listServerPerHospital(req, res);
});
module.exports = router;
