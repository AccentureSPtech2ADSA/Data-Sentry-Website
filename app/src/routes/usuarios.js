var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarHospital", function (req, res) {
    usuarioController.cadastrarHospital(req, res);
})

// router.post("/cadastrarUsuario", function (req, res) {
//     usuarioController.cadastrarUsuario(req, res);
// })

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/votacao", function (req, res) {
    usuarioController.votacao(req, res);
});

router.get("/pegar-votos", function (req, res) {
    usuarioController.pegarVotos(req, res);
});

module.exports = router;