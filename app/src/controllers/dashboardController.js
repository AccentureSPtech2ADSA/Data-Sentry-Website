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

async function getDataChart(req, res) {
  console.log(req.body)
  let component = req.body.component;
  let idServer = req.body.idServer;

  if (Object.values(req.body).length !== 2) {
    const msg =
      "Campos invalidos, valide no arquivo dashboard quais os campos que essa requisicao pede. (funcão getDataChart de dashboard.js)";
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
        idServer : idServer
    };
    const resultPercentagePerComponent = await model.getDataChart(
      parametros
    );
    res.json(resultPercentagePerComponent).status(resultPercentagePerComponent.status);
  }
}

async function getPercentageUsePerCompenent(req, res) {
  console.log(req.body)
  let component = req.body.component;
  let idServer = req.body.idServer;
  let dataInicio = req.body.dataInicio;
  let dataFim = req.body.dataFim;

  if (Object.values(req.body).length !== 4) {
    const msg =
      "Campos invalidos, valide no arquivo dashboard quais os campos que essa requisicao pede. (funcão getPercentageUsePerCompenent de dashboard.js)";
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
        idServer : idServer,
        dataInicio: dataInicio,
        dataFim: dataFim
    };
    const resultPercentagePerComponent = await model.getPercentageUsePerCompenent(
      parametros
    );
    res.json(resultPercentagePerComponent).status(resultPercentagePerComponent.status);
  }
}

async function getThresholdsBasic(req, res) {
  let idServer = req.params.server;

  if (Object.values(req.params).length !== 1) {
    const msg =
      "Campos invalidos, valide no arquivo dashboard quais os campos que essa requisicao pede. (funcão getThresholdsBasic de dashboard.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametros = {
        idServer : idServer,
    };
    const resultgetThresholdsBasic = await model.getThresholdsBasic(
      parametros
    );
    res.json(resultgetThresholdsBasic).status(resultgetThresholdsBasic.status);
  }
}

function getDateInit(){
  let date = new Date();
  let dataDeInicio = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + '00:00:00';
  
  return dataDeInicio;
}

function getEndDate () {
  let date = new Date();
  let dataDeFim = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + '23:59:59';

  return dataDeFim;
}

async function getLastsLogsPerDay(req, res) {
  let idServer = req.params.server;
  let dataInit = getDateInit();
  let dataEnd = getEndDate();

  if (Object.values(req.params).length !== 1) {
    const msg =
      "Campos invalidos, valide no arquivo dashboard quais os campos que essa requisicao pede. (funcão getLastsLogsPerDay de dashboard.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametros = {
        idServer : idServer,
        dataInit: dataInit,
        dataEnd: dataEnd
    };
    const resultgetLastsLogsPerDay = await model.getLastsLogsPerDay(
      parametros
    );
    res.json(resultgetLastsLogsPerDay).status(resultgetLastsLogsPerDay.status);
  }
}

async function changeIsActiveServer(req, res){
  let idServer = req.body.idServer;
  let isActive = req.body.isActive;

  if (Object.values(req.body).length !== 2) {
    const msg =
      "Campos invalidos, valide no arquivo dashboard quais os campos que essa requisicao pede. (funcão getThresholdsBasic de dashboard.js)";
    res
      .json({
        data: null,
        msg: msg,
        status: 404,
      })
      .status(404);
  } else {
    const parametros = {
        idServer: idServer,
        isActive: isActive
    };
    if(isActive == "D"){
      const deleteResult = await model.deleteServer(parametros);
      console.dir(deleteResult)
    }
    const resultchangeIsActiveServer = await model.changeIsActiveServer(
      parametros
    );
    res.json(resultchangeIsActiveServer).status(resultchangeIsActiveServer.status);
  }

}

module.exports = {
    getPercentagePerComponent,
    getDataChart,
    getPercentageUsePerCompenent,
    getThresholdsBasic,
    getLastsLogsPerDay,
    changeIsActiveServer,
};
