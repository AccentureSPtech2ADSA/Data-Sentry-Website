var database = require("../database/config");
async function insertUsuario({
  name = "",
  email = "",
  password = "",
  telefone = "",
  manager = null,
  hospital = null,
}) {
  // query vai ser nosso comando sql -> para inserir -> insert into

  let query = `CALL sp_insereUser("${name}", "${email}", '${password}', '${telefone}', ${hospital}, ${manager});`;

  if (database.isAmbienteProducao) {
    query = `sp_insereUser '${name}', '${email}', '${password}', '${telefone}', ${manager}, ${hospital};`;
  }

  return await database.execute(query);
}
async function login({ email = "", password = "" }) {
  let query = `
  CALL sp_loginUser ('${email}', '${password}');
  `;
  if (database.isAmbienteProducao) {
    query = `EXEC sp_loginUser '${email}', '${password}';`;
  }
  // query mysql
  return await database.execute(query);
}
async function isEmailsExitsInDatabase(email){
  let query = `SELECT name, _idUserHospital id FROM UserHospital WHERE email = '${email}' LIMIT 1`;
  if (database.isAmbienteProducao) {
    query = `SELECT TOP 1 name, _idUserHospital id FROM UserHospital WHERE email = '${email}'`;
    let data = await database.execute(query)
    data.data = data.data[0];
    return data;
  }


  return await database.execute(query);
}
async function changePassUser({id=0, newPass=''}){
  let query = `
  CALL sp_changePass ${id}, '${newPass}';
  `;
  if (database.isAmbienteProducao) {
    query = `EXEC sp_changePass ${id}, '${newPass}';`;
  }
  // query mysql
  return await database.execute(query);
}

async function updateAnalist({name, email, telefone, id}){
  let query = `
  CALL sp_updateAnalist '${name}', '${email}', '${telefone}', ${id};
  `;
  if (database.isAmbienteProducao) {
    query = `EXEC sp_updateAnalist '${name}', '${email}', '${telefone}', ${id};`;
  }
  // query mysql
  return await database.execute(query);
}

async function updateAdmin({fantasyName, cep, numberAddress, complement, unit, cnpj, fkHospital, email, telefone, idUserHospital}){
  let query = `
  CALL sp_updateAdmin '${fantasyName}', '${cep}', '${numberAddress}', '${complement}', '${unit}', '${cnpj}', ${fkHospital}, '${email}', '${telefone}', ${idUserHospital};
  `;
  if (database.isAmbienteProducao) {
    query = `EXEC sp_updateAdmin '${fantasyName}', '${cep}', '${numberAddress}', '${complement}', '${unit}', '${cnpj}', ${fkHospital}, '${email}', '${telefone}', ${idUserHospital};`;
  }
  // query mysql
  return await database.execute(query);
}

async function captarDadosUsuario({id}){
  let query = `SELECT _idUserHospital id, unit, name, email, contactPhone, 
  fkHospital, cnpj, cep, numberAddress, complement, fantasyName, corporateName,
  CASE
      WHEN fkManager IS NULL THEN 'admin'
      ELSE 'analist'
  END AS patent
  FROM UserHospital uh JOIN Hospital h
  ON h._idHospital = uh.fkHospital
  WHERE _idUserHospital =  ${id};`;

  return await database.execute(query);
}

async function getListAnalists({fkHospital}){
  let query = `EXEC sp_getListAnalistPerManager ${fkHospital};`;
  if (database.isAmbienteProducao) {
    query = `EXEC sp_getListAnalistPerManager ${fkHospital};`;
    let data = await database.execute(query)
    console.log(data);
    data.data = data.data[0];
    return data;
  }
  return await database.execute(query);
}

// se fkHospital == 0 nao apagar hospital
async function deleteUser({id=0, fkHospital = 0}){
  let query = `
  exec sp_deleteUser ${id}, ${fkHospital}
  `;
  if (database.isAmbienteProducao) {
    query = `exec sp_deleteUser ${id}, ${fkHospital}`;
  }
  
  // query mysql
  return await database.execute(query);
}
module.exports = {
  login,
  insertUsuario,
  isEmailsExitsInDatabase,
  changePassUser,
  getListAnalists,
  deleteUser,
  updateAnalist,
  updateAdmin,
  captarDadosUsuario,
};
