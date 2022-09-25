var userModel = require("../models/userHospitalModel");
var hospitalModel = require("../models/hospitalModel");

/**
 * @description Vai inserir o Hospital e o usuario ao mesmo tempo
 * @param {Request} req
 * @param {Response} res
 */
async function insert(req, res) {
  //   console.log(`req.body`, req.body); // see body of request
  if (Object.values(req.body).length !== 10) {
    const msg =
      "Campos invalidos, valide no arquivo hospital controller quais os campos que essa requisicao pede. (funcão insert de hospitalController.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametrosInsereHospital = {
      cep: req.body.cep,
      cnpj: req.body.cnpj,
      complement: req.body.complement,
      corporateName: req.body.corporateName,
      fantasyName: req.body.fantasyName,
      numberAdress: req.body.numberAdress,
      unit: req.body.unit,
    };
    const hospitalModelResult = await hospitalModel.insert(
      parametrosInsereHospital
    );
    const parametrosInsereUserHospital = {
      email: req.body.email,
      hospital: hospitalModelResult.data.insertId, // mudar o inserted ID para o sql server dps
      name: req.body.name,
      password: req.body.password,
    };
    const userHospitalModelResult = await userModel.insertUsuario(
      parametrosInsereUserHospital
    );
    res.json(userHospitalModelResult).status(userHospitalModelResult.status);
  }
}

module.exports = {
  insert,
};
