const mysql = require("mysql2");
const sql = require("mssql");

const AMBIENTE = process.env.AMBIENTE_PROCESSO;
const NOME_AMBIENTE_PRODUCAO = "PROD";
const NOME_AMBIENTE_DESENVOLVIMENTO = "DEV";
const isAmbienteDesenvolvimento = AMBIENTE == NOME_AMBIENTE_DESENVOLVIMENTO;
const isAmbienteProducao = AMBIENTE == NOME_AMBIENTE_PRODUCAO;

// CONEXÃO DO SQL SERVER - AZURE (NUVEM)
const sqlServerConfig = {
  server: process.env.MSSQL_HOST,
  trustServerCertificate: true, // para rodar docker
  database: process.env.MSSQL_DATABASE,
  port: process.env.MSSQL_PORT, //rodar docker
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
  },
};
// CONEXÃO DO MYSQL WORKBENCH (LOCAL)
var mySqlConfig = {
  host: "localhost",
  database: "dataSentry",
  user: "root",
  password: "datasentry",
};
const msgResponseError = `Houve algum erro executar a query.`;
const msgResponseOk = `Query executada com sucesso.`;

let response = {
  status: 500,
  msg: msgResponseError,
};

function executeMysql(querySQL) {
  return new Promise((resolve) => {
    const conexaoMysql = mysql.createConnection(mySqlConfig);
    conexaoMysql.connect();
    conexaoMysql.query(querySQL, (err, result) => {
      if (err) {
        console.log(err);
        err.status = 500;
        err.msg = msgResponseError;
        resolve(err);
      }
      response.msg = msgResponseOk;
      response.status = 200;
      response.data = result;
      resolve(response);
      conexaoMysql.end();
    });
  });
}
function executeSqlServer(querySQL) {
  return new Promise(async (resolve) => {
    try {
      await sql.connect(sqlServerConfig);
      const resultMssql = await sql.query(querySQL);
      response.status = 201;
      response.msg = msgResponseOk;
      response.data = resultMssql.recordsets;
      resolve(response);
    } catch (error) {
      response.data = error;
      // console.dir(response);
      resolve(response);
    }
  });
}
/**
 * @description Vai executar a query de acordo com o ambiente de desenvolvimento, ou sql server ou mysql
 * @param {string} querySQL Query para insert ex: INSERT INTO User VALUES(1);
 * @returns {{data: mysql.ResultSetHeader | sql.IRecordSet, msg: string, status: number}}
 */
function execute(querySQL) {
  return new Promise(async (resolve) => {
    let result = {};
    if (isAmbienteDesenvolvimento) {
      result = await executeMysql(querySQL);
    } else if (isAmbienteProducao) {
      result = await executeSqlServer(querySQL);
    } else {
      console.dir("process.env.AMBIENTE incorreto");
    }
    resolve(result);
  })
    .then((res) => res)
    .catch((err) => err);
}
module.exports = {
  execute,
  isAmbienteDesenvolvimento,
  isAmbienteProducao,
};
