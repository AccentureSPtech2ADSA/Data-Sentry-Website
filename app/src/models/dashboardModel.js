

var database = require("../database/config");

async function getPercentagePerComponent({ // Table
    component,
    dataInicio = 'last',
    dataFim = 'last',
    idServer,
}) {
  let time = await getLastTimeInserted();
  console.log({time});
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

async function getPercentageUsePerCompenent({ // KPI
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
  const query = `select top 4 createdAt Horario from LogComponentPerProcess lcpp group by createdAt order by createdAt desc;`;
 let data = await database.execute(query);
  
 /**
  * @type Date
  */
  let horarioStart = data.data[0][2].Horario;
  let horarioMiddle = data.data[0][1].Horario;
  let horarioEnd = data.data[0][0].Horario;
  
  let initDate = horarioStart.toISOString().split('T');
  initDate = initDate[0] + " " +initDate[1].split('.')[0];

  let endDate = horarioEnd.toISOString().split('T'); 
  endDate = endDate[0] + " " +endDate[1].split('.')[0];


  let middleDate = horarioMiddle.toISOString().split('T'); 
  middleDate = middleDate[0] + " " +middleDate[1].split('.')[0];

  return [initDate, middleDate, endDate ];
}
module.exports = {
  getPercentagePerComponent,
  getDataChart,
  getPercentageUsePerCompenent,
};