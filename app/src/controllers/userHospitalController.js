var userHospitalModel = require("../models/userHospitalModel");
const {sign} = require('../util/auth/jwt');
/**
 * @param {Request} req
 * @param {Response} res
 */
async function insertUsuario(req, res) {
  //   console.log(`req.body`, req.body);
  if (Object.values(req.body).length !== 5) {
    const msg =
      "Campos invalidos, valide no arquivo userHospitalController quais os campos que essa requisicao pede. (funcão insertUsuario de userHospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametros = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      manager: req.body.manager || null,
      hospital: req.body.hospital || null,
    };
    const userHospitalResult = await userHospitalModel.insertUsuario(
      parametros
    );
    res.json(userHospitalResult).status(userHospitalResult.status);
  }
}

async function login(req, res) {
  //   console.log(`req.body`, req.body);
  if (Object.values(req.body).length !== 2) {
    const msg =
      "Campos invalidos, valide no arquivo userHospitalController quais os campos que essa requisicao pede. (funcão login de userHospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametros = {
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    };
    const userHospitalResult = await userHospitalModel.login(parametros);
    console.log(userHospitalResult);
    if (userHospitalResult.data[0] == undefined) {
      res
        .json({
          data: [],
          msg: "Email ou senha incorretos",
          status: 404,
        })
        .status(404);
    }
    const tokenLogin = sign(userHospitalResult.data[0][0]);
    userHospitalResult.token = tokenLogin;
    res.json(userHospitalResult).status(userHospitalResult.status);
  }
}
module.exports = {
  insertUsuario,
  login,
};
