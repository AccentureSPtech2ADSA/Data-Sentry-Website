var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");
var hospitalController = require("../controllers/hopistalController")


router.get("/insert", (req, res) =>{
    
    //console.log("estou na rota de insert do hospital");
    hospitalController.insert(req, res)

});


module.exports = router;