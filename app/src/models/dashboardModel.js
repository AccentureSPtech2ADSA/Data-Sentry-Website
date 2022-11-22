

var database = require("../database/config");

async function getPercentagePerComponent({
    component,
    dataInicio = 'last',
    dataFim = 'last',
    idServer,
}) {
  let time = await getLastTimeInserted();
  console.log(time);
  const query = `exec sp_getPercentagePerProcess
   '${component}', '${idServer}', '${dataInicio == 'last' ? time[0] : dataInicio }', '${dataFim == 'last' ? time[1] : dataFim}';`;
  return await database.execute(query);
}

async function getDataChart({
  component,
  idServer,
}) {
const query = `exec sp_getLastsPercentagesPerComponent
 '${component}', '${idServer}';`;
return await database.execute(query);
}

async function getPercentageUsePerCompenent({
  component,
  idServer,
  dataInicio = 'last',
  dataFim = 'last',
}) {
let time = await getLastTimeInserted();
console.log(time);
const query = `exec sp_getPercentagePerComponent
'${component}', '${idServer}', '${dataInicio == 'last' ? time[0] : dataInicio }', '${dataFim == 'last' ? time[1] : dataFim}';`;
return await database.execute(query);
}


async function getLastTimeInserted(){
  const query = `select top 1 createdAt Horario from LogComponentPerProcess lcpp order by createdAt desc;`;
 let data = await database.execute(query);
  
 /**
  * @type Date
  */
  let horario = data.data[0][0].Horario;
  let initDate = horario.toISOString().split('T');
  initDate = initDate[0] + " "+initDate[1].split('.')[0];
  horario.setMinutes(horario.getMinutes() + 2);
  let endDate = horario.toISOString().split('T'); // 2 minuto
  endDate = endDate[0] + " "+endDate[1].split('.')[0];
  return [initDate, endDate];
}
module.exports = {
  getPercentagePerComponent,
  getDataChart,
  getPercentageUsePerCompenent,
};