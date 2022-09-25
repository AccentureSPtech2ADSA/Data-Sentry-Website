var mysql = require("mysql2");
var sql = require('mssql');

// CONEXÃO DO SQL SERVER - AZURE (NUVEM)
var sqlServerConfig = {
    server: "localhost",
    trustServerCertificate: true, // para rodar docker
    database: "dataSentry",
    port: 1433, //rodar docker
    user: "SA",
    password: "#Gfgrupo1",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
    }
}

// CONEXÃO DO MYSQL WORKBENCH (LOCAL)
var mySqlConfig = {
    host: "localhost",
    database: "dataSentry",
    user: "root",
    password: "datasentry",
};

const AMBIENTE = process.env.AMBIENTE_PROCESSO;
const NOME_AMBIENTE_PRODUCAO = "producao";
const NOME_AMBIENTE_DESENVOLVIMENTO = "desenvolvimento";
// as quatros funcoes abaixos tem que ter a base para executar nossos scripts de banco de dados
// ou seja, no sql vamos receber como parametro uma string com uma query sql select
// vamos ter que retornar de forma IGUAL os dados
// ou seja, se no mysql retornou {nome: 'azul'} no azure tambem tem que retornar a mesma coisa
// digo isso agora porque por padrao eles vem com formatos de retorno diferente
// se baseie na funcao executar abaixo, vamos fazer de maneira diferente e melhor!
function insert(querySQL) {
    return new Promise(function (resolve) {

        const conexaoMysql = mysql.createConnection(mySqlConfig);
        conexaoMysql.connect();

        conexaoMysql.query(querySQL, (err, result) => {

            if (err) {
                resolve(err);
            } else {
                // deu certo
                const msgResponse = ` Hospital inserido com sucesso no ID = ${result.insertId}. `

                const response = {
                    data: result,
                    msg: msgResponse
                }

                resolve(response);
            }
        });
    })
        .then(res => res)
        .catch(err => err)
}
function insertUsuario(querySQL) {
    return new Promise(function (resolve) {

        const conexaoMysql = mysql.createConnection(mySqlConfig);
        conexaoMysql.connect();

        conexaoMysql.query(querySQL, (err, result) => {

            if (err) {
                resolve(err);
            } else {
                // deu certo
                const msgResponse = ` Usuario inserido com sucesso no ID = ${result.insertId}. `

                const response = {
                    data: result,
                    msg: msgResponse
                }

                resolve(response);
            }
        });
    })
        .then(res => res)
        .catch(err => err)
}

function executar(instrucao) {
    // VERIFICA A VARIÁVEL DE AMBIENTE SETADA EM app.js
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        return new Promise(function (resolve, reject) {
            sql.connect(sqlServerConfig).then(function () {
                return sql.query(instrucao);
            }).then(function (resultados) {
                console.log(resultados);
                resolve(resultados.recordset);
            }).catch(function (erro) {
                reject(erro);
                console.log('ERRO: ', erro);
            });
            sql.on('error', function (erro) {
                return ("ERRO NO SQL SERVER (Azure): ", erro);
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
            conexao.on('error', function (erro) {
                return ("ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage);
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        });
    }
}

module.exports = {
    executar,
    insert,
    insertUsuario
}