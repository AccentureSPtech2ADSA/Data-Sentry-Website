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

// as quatros funcoes abaixos tem que ter a base para executar nossos scripts de banco de dados
// ou seja, no sql vamos receber como parametro uma string com uma query sql select
// vamos ter que retornar de forma IGUAL os dados
// ou seja, se no mysql retornou {nome: 'azul'} no azure tambem tem que retornar a mesma coisa
// digo isso agora porque por padrao eles vem com formatos de retorno diferente
// se baseie na funcao executar abaixo, vamos fazer de maneira diferente e melhor!
function insertMysql(querySQL) {
  return new Promise((resolve) => {
    const msgResponse = `Houve algum erro ao inserir no banco de dados \nQuery: ${querySQL}`;
    const response = {
      status: 500,
      msg: msgResponse,
    };
    const conexaoMysql = mysql.createConnection(mySqlConfig);
    conexaoMysql.connect();
    conexaoMysql.query(querySQL, (err, result) => {
      if (err) {
        response.data = err;
      } else {
        const msgResponse = `Inserido com sucesso no ID = ${result.insertId} `;
        response.data = result;
        response.msg = msgResponse;
        response.status = 201;
      }
      conexaoMysql.end();

      resolve(response);
    });
  });
}
function insertSqlServer(querySQL) {}
/**
 * @description Vai inserir de acordo com o ambiente de desenvolvimento, ou sql server ou mysql
 * @param {string} querySQL Query para insert ex: INSERT INTO User VALUES(1);
 * @returns {{data: mysql.ResultSetHeader | sql.IRecordSet, msg: string, status: number}}
 */
function insert(querySQL) {
  return new Promise(async (resolve) => {
    if (isAmbienteDesenvolvimento) {
      const resultInsertMysql = await insertMysql(querySQL);
      resolve(resultInsertMysql);
    } else if (isAmbienteProducao) {
      resolve(insertSqlServer(querySQL));
    } else {
      console.log("process.env.AMBIENTE incorreto");
    }
  })
    .then((res) => res)
    .catch((err) => err);
}

function executar(instrucao) {
  // VERIFICA A VARIÁVEL DE AMBIENTE SETADA EM app.js
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    return new Promise(function (resolve, reject) {
      sql
        .connect(sqlServerConfig)
        .then(function () {
          return sql.query(instrucao);
        })
        .then(function (resultados) {
          console.log(resultados);
          resolve(resultados.recordset);
        })
        .catch(function (erro) {
          reject(erro);
          console.log("ERRO: ", erro);
        });
      sql.on("error", function (erro) {
        return "ERRO NO SQL SERVER (Azure): ", erro;
      });
    });
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    return new Promise(function (resolve, reject) {
      var conexao = mysql.createConnection(mySqlConfig);
      conexao.connect();
      conexao.query(instrucao, function (erro, resultados) {
        conexao.end();
        if (erro) {
          reject(erro);
        }
        console.log(resultados);
        resolve(resultados);
      });
      conexao.on("error", function (erro) {
        return "ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage;
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      console.log(
        "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
      );
      reject("AMBIENTE NÃO CONFIGURADO EM app.js");
    });
  }
}

module.exports = {
  executar,
  insert,
};
