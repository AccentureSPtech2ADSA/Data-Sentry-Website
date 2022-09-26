var database = require("../database/config");

async function insertUsuario({
  name = "",
  email = "",
  password = "",
  manager = null,
  hospital = null,
}) {
  // query vai ser nosso comando sql -> para inserir -> insert into

  const query = `INSERT INTO UserHospital (name, email, password, fkManager, fkHospital) VALUES
    ('${name}', '${email}', '${password}', ${manager}, ${hospital})`;

  return await database.execute(query);
}

module.exports = {
  insertUsuario,
};
