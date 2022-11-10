var express = require("express");
const router = express.Router();
var userHospitalController = require("../controllers/userHospitalController");
const {authJwt} = require('../util/middleware/jwtMIddleware');
// se quiser usar como middleware da funcao, vai precisar utilizar esse authJwt

router.post("/insert", (req, res) => {
  console.log("estou na rota de insert do user hospital");
  userHospitalController.insertUsuario(req, res);
});
router.post("/login", (req, res) => {
  console.log('estou na rota de /login do user');
  userHospitalController.login(req, res);
});

router.post('/resetPasswordEmail', (req,res)=>{
  console.log('estou na rota de resetPassword do userHospital');
  userHospitalController.sendEmailToResetPassword(req,res);
})
router.put('/changePassword', authJwt, (req,res)=>{
  console.log('estou na rota de changePassword do userHospital');
  userHospitalController.changePassword(req,res);
});
router.get("/getListAnalists/:fkHospital", authJwt, (req,res)=>{
  console.log(`Estou na rota /getListAnalists/{fkHospital}...`);
  userHospitalController.getListAnalists(req,res);
})
module.exports = router;
