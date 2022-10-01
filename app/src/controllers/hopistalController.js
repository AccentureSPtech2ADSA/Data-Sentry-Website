var userModel = require("../models/userHospitalModel");
var hospitalModel = require("../models/hospitalModel");

/**
 * @description Vai inserir o Hospital e o usuario ao mesmo tempo
 * @param {Request} req
 * @param {Response} res
 */
async function insert(req, res) {
  // console.log(`req.body`, req.body); // see body of request
  if (Object.values(req.body).length !== 11) {
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
    if (
      hospitalModelResult.status == 200 ||
      hospitalModelResult.status == 201
    ) {
      const resultLastInsertedIdHospital =
        await hospitalModel.getLastInsertedId();

      const parametrosInsereUserHospital = {
        email: req.body.email,
        hospital: resultLastInsertedIdHospital,
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
      };
      const userHospitalModelResult = await userModel.insertUsuario(
        parametrosInsereUserHospital
      );
      if (userHospitalModelResult.status == 200) {
        userHospitalModelResult.longMessage = `Hospital e usuário admin foram inseridos com sucesso no sistema Data Sentry`;
        userHospitalModelResult.shortMessage = `Hospital e usuário adicionados.`;
      }
      res.status(userHospitalModelResult.status);
      res.json(userHospitalModelResult);
    } else {
      res
        .json({
          data: hospitalModelResult,
          msg: "Hospital nao foi inserido",
          status: 404,
        })
        .status(404);
    }

  }
}

module.exports = {
  insert,
};
