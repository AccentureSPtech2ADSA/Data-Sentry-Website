var database = require("../database/config");

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
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
  (cnpj, cep, numberAdress, unit, fantasyName, corporateName, complement)
   VALUES ('${cnpj}', '${cep}', '${numberAdress}', '${unit}', '${fantasyName}', '${corporateName}', '${complement}')`;

  return await database.insert(query);
}
module.exports = {
  entrar,
  insert,
};
