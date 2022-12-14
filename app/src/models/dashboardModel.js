var database = require("../database/config");

async function getPercentagePerComponent({
  // Table
  component,
  dataInicio = "last",
  dataFim = "last",
  idServer,
}) {
  let time = await getLastTimeInserted(idServer);
  console.log({ time });
  const query = `exec sp_getPercentagePerProcess
   '${component}', '${idServer}', '${
    dataInicio == "last" ? time[0] : dataInicio
  }', '${dataFim == "last" ? time[1] : dataFim}';`;
  return await database.execute(query);
}

async function getDataChart({ component, idServer }) {
  const query = `exec sp_getLastsPercentagesPerComponent
 '${component}', '${idServer}';`;
  return await database.execute(query);
}

async function getPercentageUsePerCompenent({
  // KPI
  component,
  idServer,
  dataInicio = "last",
  dataFim = "last",
}) {
  let time = await getLastTimeInserted(idServer);
  console.log(time);
  const query = `exec sp_getPercentagePerComponent
'${component}', '${idServer}', '${
    dataInicio == "last" ? time[0] : dataInicio
  }', '${dataFim == "last" ? time[1] : dataFim}';`;
  return await database.execute(query);
}

async function getLastTimeInserted(server) {
  const query = `select top 4 lcpp.createdAt Horario, cs.fkServer server from LogComponentPerProcess lcpp 
  join ComponentServer cs on cs.[_idComponentServer] = lcpp.fkComponentServer
  where cs.fkServer = '${server}'
  group by  cs.fkServer, lcpp.createdAt 
  order by lcpp.createdAt desc;`;
  let data = await database.execute(query);

  let horarioStart = data.data[0][2].Horario;
  /**
   * @type Date
   */
  let horarioMiddle = data.data[0][1].Horario;
  let horarioEnd = data.data[0][0].Horario;

  let initDate = horarioStart.toISOString().split("T");
  initDate = initDate[0] + " " + initDate[1].split(".")[0];

  let endDate = horarioEnd.toISOString().split("T");
  endDate = endDate[0] + " " + endDate[1].split(".")[0];

  let middleDate = horarioMiddle.toISOString().split("T");
  middleDate = middleDate[0] + " " + middleDate[1].split(".")[0];

  return [initDate, middleDate, endDate];
}

async function getThresholdsBasic({
  // KPI
  idServer,
}) {
  const query = `EXEC sp_getThresholdsBasic '${idServer}'`;
  return await database.execute(query);
}

async function getLastsLogsPerDay({
  // KPI
  idServer,
  dataInit,
  dataEnd,
}) {
  console.log(idServer);
  console.log(dataInit);
  console.log(dataEnd);
  const query = `EXEC sp_getLastsLogsPerDay '${idServer}', '${dataInit}', '${dataEnd}';`;
  return await database.execute(query);
}

async function changeIsActiveServer({ idServer, isActive }) {
  const query = `UPDATE Server SET isActive = '${isActive}' WHERE [_serialServer] = '${idServer}';`;
  return await database.execute(query);
}

async function deleteServer({ idServer, isActive }) {
  if (isActive.toUpperCase() == "D") {
    const query = `DELETE FROM Server WHERE _serialServer = '${idServer}';`;
    return await database.execute(query);
  }
}
module.exports = {
  getPercentagePerComponent,
  getDataChart,
  getPercentageUsePerCompenent,
  getThresholdsBasic,
  getLastsLogsPerDay,
  changeIsActiveServer,
  deleteServer,
};
