let model = require("../models/dashboardModel");
/**
 * @param {Request} req
 * @param {Response} res
 */
async function getPercentagePerComponent(req, res) {
  console.log(req.body)
  let component = req.body.component;
  let dataInicio = req.body.dataInicio;
  let dataFim = req.body.dataFim;
  let idServer = req.body.idServer;

  if (Object.values(req.body).length !== 4) {
    const msg =
      "Campos invalidos, valide no arquivo dashboard quais os campos que essa requisicao pede. (funcão getPercentagePerComponent de dashboard.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametros = {
        component : component,
        dataInicio : dataInicio,
        dataFim : dataFim,
        idServer : idServer
    };
    const resultPercentagePerComponent = await model.getPercentagePerComponent(
      parametros
    );
    res.json(resultPercentagePerComponent).status(resultPercentagePerComponent.status);
  }
}

module.exports = {
    getPercentagePerComponent,
};
