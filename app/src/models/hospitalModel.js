var database = require("../database/config");

async function getLastInsertedId() {
  let query = "SELECT MAX(_idHospital) id FROM Hospital ORDER BY id DESC";
  if (database.isAmbienteProducao) {
    query = `SELECT TOP 1 _idHospital id FROM Hospital ORDER BY id DESC`;
  }
  const resultSelect = await database.execute(query);
  let lastId = resultSelect.data;
  if (database.isAmbienteProducao) {
    lastId = lastId[0][0]["id"];
  }
  if (database.isAmbienteDesenvolvimento) {
    lastId = lastId[0]["id"];
  }
  return lastId;
}
async function insert({
  cnpj = "",
  cep = "",
  numberAdress = "",
  unit = "",
  fantasyName = "",
  corporateName = "",
  complement = "",
}) {
  // query vai ser nosso comando sql -> para inserir -> insert into
  const query = `INSERT INTO Hospital 
  (cnpj, cep, numberAddress, unit, fantasyName, corporateName, complement)
   VALUES ('${cnpj}', '${cep}', '${numberAdress}', '${unit}', '${fantasyName}', '${corporateName}', '${complement}')`;

  return await database.execute(query);
}

async function listServerPerHospital({idHospital}){
  let query = `EXEC sp_getHospitalServers ${idHospital};`;
  if (database.isAmbienteProducao) {
    query = `EXEC sp_getHospitalServers ${idHospital};`;
    let data = await database.execute(query)
    console.log(data);
    data.data = data.data[0];
    return data;
  }
  return await database.execute(query);
}
module.exports = {
  insert,
  getLastInsertedId,
  listServerPerHospital
};
